from rest_framework import serializers
from ...models import Purchase,InvoicePurchase,PaymentPurchase,PurchaseDetail,Inventory, Product, Supplier,StockImport
import django.db.models as models
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
    class Meta:
        model = Product
        fields = '__all__'

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
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
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
        purchase = Purchase.objects.create(
            supplier = supplier,
            purchase_date = purchase_date,
            total_amount = total_amount,
        )
        for item in products_data:
            product_item = item['product']
            quantity = item['quantity']
            cost_price = item['cost_price']
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
            )
            # cập nhật tồn kho
            inventory,created = Inventory.objects.get_or_create(
                product = product_item,
                location = location,
                defaults={'quantity': quantity}
            )
            if not created:
                inventory.quantity += quantity
                inventory.save()
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
                status='unpaid',
                total_amount=total_amount,
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


