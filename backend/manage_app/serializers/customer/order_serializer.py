from rest_framework import serializers
from ...models import Order,OrderDetail,InvoiceOrder,PaymentOrder,StockExport,Product,Customer,Inventory,CartItem
import django.db.models as models
from django.utils.timezone import now
from django.db import transaction

class OrderProductSerializer(serializers.Serializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    quantity = serializers.IntegerField()
    price = serializers.DecimalField(max_digits=12, decimal_places=2)
    location = serializers.IntegerField() 
    location_name = serializers.CharField()  

class CreateOrderSerializer(serializers.Serializer):
    payment_method = serializers.ChoiceField(choices=[('cash', 'Cash'), ('bank_transfer', 'Bank Transfer')])
    customer = serializers.PrimaryKeyRelatedField(read_only=True)
    order_date = serializers.DateField(read_only=True)
    total_amount = serializers.DecimalField(max_digits=30, decimal_places=2)
    products = OrderProductSerializer(many=True)
    address = serializers.CharField(max_length=255, required=False, allow_blank=True)
    def validate_total_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Tổng số tiền phải lớn hơn 0.")
        return value
    def validate_products(self, value):
        if not value:
            raise serializers.ValidationError("Danh sách sản phẩm không được để trống.")
        for item in value:
            if item['quantity'] <= 0:
                raise serializers.ValidationError("Số lượng sản phẩm phải lớn hơn 0.")
            if item['price'] <= 0:
                raise serializers.ValidationError("Giá sản phẩm phải lớn hơn 0.")
        return value
    def create(self, validated_data):
        request = self.context.get("request")
        customer = request.user.customer
        order_date = now().date()
        total_amount = validated_data['total_amount']
        products_data = validated_data['products']
        payment_method = validated_data.get('payment_method')
        address = validated_data.get('address', '')            # tạo order
        with transaction.atomic():
                order = Order.objects.create(
                    customer = customer,
                    order_date = order_date,
                    total_amount = total_amount,
                )
                # tạo chi tiết đơn hàng và cập nhật tồn kho
                for item in products_data:
                    product = item['product']
                    quantity = item['quantity']
                    price = item['price']
                    location = item.get('location', '')
                    location_name = item.get('location_name', '')
                    print("location:", location)
                    try:
                        inventory = Inventory.objects.filter(product=product,location=location_name).first()
                        if inventory:
                            inventory.quantity -= quantity
                            inventory.save()
                        else:
                            raise serializers.ValidationError(f"Không tìm thấy tồn kho cho sản phẩm {product.name} tại vị trí {location}.")
                    except Inventory.DoesNotExist:
                        raise serializers.ValidationError(f"Không tìm thấy tồn kho cho sản phẩm {product.name} tại vị trí {location}.")
                    Product.objects.filter(pk=product.pk).update(quantity_stock = models.F('quantity_stock') - quantity)
                    # tạo chi tiết đơn hàng
                    OrderDetail.objects.create(
                        order = order,
                        product = product,
                        quantity = quantity,
                        price = price,
                        total = quantity * price,
                        inventory = inventory,
                    )
                    # tạo stock export
                    
                    StockExport.objects.create(
                        product = product,
                        quantity = quantity,
                        price = price,
                        customer = customer,
                    )
                if payment_method == 'cash':
                    InvoiceOrder.objects.create(
                        order=order,
                        invoice_date=order_date,
                        total_amount=total_amount,
                        method='cash',
                        status='paid',
                        address=address,
                    )
                    PaymentOrder.objects.create(
                        order=order,
                        payment_date=order_date,
                        amount=total_amount,
                        payment_method='cash',
                        status='completed',
                    )
                elif payment_method == 'bank_transfer':
                    InvoiceOrder.objects.create(
                        order=order,
                        invoice_date=order_date,
                        total_amount=total_amount,
                        method='bank_transfer',
                        status='unpaid',
                        address=address,
                    )
                    PaymentOrder.objects.create(
                        order=order,
                        payment_date=order_date,
                        amount=total_amount,
                        payment_method='bank_transfer',
                        status='pending',
                    )
        return order
class ProductBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['ProductID', 'name', 'price', 'image', 'quantity_stock', 'category']
        depth = 1  

# lấy danh sách giỏ hàng được chọn
class CartItemDisplaySerializer(serializers.ModelSerializer):
    product = ProductBriefSerializer(read_only=True)
    address = serializers.CharField(source='cart.customer.address', read_only=True)
    location = serializers.CharField(source='location.location', read_only=True)
    location_id = serializers.IntegerField(source='location.id', read_only=True)
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'cart', 'address', 'location', 'location_id']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'