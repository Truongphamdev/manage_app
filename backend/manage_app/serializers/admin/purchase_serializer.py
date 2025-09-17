from rest_framework import serializers
from ...models import Purchase,InvoicePurchase,PaymentPurchase,PurchaseDetail,Inventory, Product, Supplier,StockImport,OrderDetail
from django.db.models import Sum
import django.db.models as models
from django.db import transaction
from django.utils.timezone import now
class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'

class PaymentPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentPurchase
        fields = '__all__'

class PurchaseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseDetail
        fields = '__all__'

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    suppliers = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()
    quantity_stock = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = 'suppliers', 'category', 'company_name', 'ProductID', 'name', 'image', 'price', 'cost_price', 'unit', 'quantity_stock'
    def get_quantity_stock(self, obj):
        total_in_stock = Inventory.objects.filter(product=obj).aggregate(total=Sum('quantity'))['total'] or 0
        # Tổng xuất kho ở các đơn hàng đã thanh toán
        total_out_stock = OrderDetail.objects.filter(
            product=obj,
            order__invoiceorder__status='unpaid'
        ).aggregate(total=Sum('quantity'))['total'] or 0
        total_import_stock = PurchaseDetail.objects.filter(
            product=obj,
            purchase__invoicepurchase__status='unpaid'
        ).aggregate(total=Sum('quantity'))['total'] or 0
        print("total_import_stock", total_import_stock)
        # Tồn kho thực tế
        stock = (total_in_stock + total_out_stock) - total_import_stock
        return stock
    def get_suppliers(self, obj):
        # Trả về danh sách NCC dạng object (id, full_name, company_name)
        return [
            {
                "SupplierID": sup.pk,
                "full_name": sup.full_name,
                "company_name": sup.company_name
            }
            for sup in obj.suppliers.all()
        ]

    def get_category(self, obj):
        # Trả về category là object (id, name)
        if obj.category:
            return {
                "CategoryID": obj.category.pk,
                "name": obj.category.name
            }
        return None

    def get_company_name(self, obj):
        # Trả về tên công ty của NCC đầu tiên (nếu có)
        first_sup = obj.suppliers.first()
        return first_sup.company_name if first_sup else None

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'
class PurchaseProductSerializer(serializers.Serializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    quantity = serializers.IntegerField()
    cost_price = serializers.DecimalField(max_digits=12, decimal_places=2)
class CreatePurchaseSerializer(serializers.Serializer):
    LOCATION_CHOICES = (
        ('kho HCM', 'Kho HCM'),
        ('kho HN', 'Kho HN'),
        ('kho DN', 'Kho DN'),
    )
    payment_method = serializers.ChoiceField(choices=[('cash', 'Cash'), ('bank_transfer', 'Bank Transfer')])
    supplier = serializers.PrimaryKeyRelatedField(queryset=Supplier.objects.all())
    purchase_date = serializers.DateField(read_only=True, default=now().date())
    total_amount = serializers.DecimalField(max_digits=30, decimal_places=2)
    location = serializers.ChoiceField(choices=LOCATION_CHOICES)
    products = PurchaseProductSerializer(many=True)
    
    def validate_supplier(self, value):
        if not Supplier.objects.filter(pk=value.pk).exists():
            raise serializers.ValidationError("Supplier does not exist.")
        return value
    def validate_total_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Total amount must be greater than zero.")
        return value
    def validate_location(self, value):
        if value not in dict(self.LOCATION_CHOICES).keys():
            raise serializers.ValidationError("Invalid location.")
        return value
    def validate_products(self, value):
        if not value:
            raise serializers.ValidationError("Products list cannot be empty.")
        for item in value:
            if item['quantity'] <= 0:
                raise serializers.ValidationError("Quantity must be greater than zero.")
            if item['cost_price'] <= 0:
                raise serializers.ValidationError("Cost price must be greater than zero.")
        return value

    def create(self, validated_data):
        supplier = validated_data['supplier']
        purchase_date = now().date() 
        total_amount = validated_data['total_amount']
        location = validated_data['location']
        products_data = validated_data['products']
        payment_method = validated_data.get('payment_method', 'cash')
        with transaction.atomic():
            purchase = Purchase.objects.create(
                supplier = supplier,
                purchase_date = purchase_date,
                total_amount = total_amount,
            )
            for item in products_data:
                product_item = item['product']
                quantity = item['quantity']
                cost_price = item['cost_price']
                                # cập nhật tồn kho
                inventory,created = Inventory.objects.get_or_create(
                    product = product_item,
                    location = location,
                    defaults={'quantity': quantity}
                )
                if not created:
                    inventory.quantity += quantity
                    inventory.save()
                Product.objects.filter(pk=product_item.pk).update(cost_price=cost_price,quantity_stock=models.F('quantity_stock') + quantity)
                if not product_item.suppliers.filter(pk=supplier.pk).exists():
                    product_item.suppliers.add(supplier)
                # cập nhật mua hàng chi tiết
                PurchaseDetail.objects.create(
                    purchase = purchase,
                    product = product_item,
                    quantity = quantity,
                    price = cost_price,
                    total = quantity * cost_price,
                    inventory = inventory,
                )

                # tạo stockImport
                StockImport.objects.create(
                    product = product_item,
                    quantity = quantity,
                    cost_price = cost_price,
                    supplier = supplier,
                )
            if payment_method == 'cash':
                InvoicePurchase.objects.create(
                    purchase=purchase,
                    invoice_date=purchase_date,
                    method='cash',
                    status='paid',
                    total_amount=total_amount,
                )
                PaymentPurchase.objects.create(
                    purchase=purchase,
                    payment_method='cash',
                    amount=total_amount,
                    status='completed',
                )
            elif payment_method == 'bank_transfer':
                InvoicePurchase.objects.create(
                    purchase=purchase,
                    invoice_date=purchase_date,
                    method='bank_transfer',
                    status='unpaid',
                    total_amount=total_amount,
                )
                PaymentPurchase.objects.create(
                    purchase=purchase,
                    payment_method='bank_transfer',
                    amount=total_amount,
                    status='pending',
                )
            return purchase
class PaymentPurchaseCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentPurchase
        fields = ['purchase', 'payment_method', 'amount','transaction_id','status']
    CHOICES_PAYMENT_METHOD = (
        ("vnpay", "VNPAY"),
        ("cash", "Cash"),
    )
    def validate_purchase(self, value):
        if not Purchase.objects.filter(pk=value.pk).exists():
            raise serializers.ValidationError("Purchase does not exist.")
        return value
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value
    def validate_payment_method(self, value):
        valid_methods = dict(self.CHOICES_PAYMENT_METHOD).keys()
        if value not in valid_methods:
            raise serializers.ValidationError("Invalid payment method.")
        return value
    def create(self, validated_data):
        payment = PaymentPurchase.objects.create(**validated_data)
        purchase = payment.purchase
        invoice = InvoicePurchase.objects.filter(purchase=purchase).first()
        total_paid = PaymentPurchase.objects.filter(purchase=purchase).aggregate(
            total=models.Sum('amount')
        )['total'] or 0
        if invoice:
            if total_paid >= purchase.total_amount:
                invoice.status = 'paid'
            elif total_paid > 0:
                invoice.status = 'partially_paid'
            else:
                invoice.status = 'unpaid'
            invoice.save()
        return payment


