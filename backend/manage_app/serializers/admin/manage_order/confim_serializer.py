from rest_framework import serializers
from ....models import Product,Order,OrderDetail,Inventory,PaymentOrder
import django.db.models as models
from django.utils.timezone import now
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'
class ConfirmOrderSerializer(serializers.ModelSerializer):
    order_details = serializers.SerializerMethodField()
    customer = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = ['orderID', 'total_amount','order_date','customer', 'order_details']
    def get_order_details(self, obj):
        details = OrderDetail.objects.filter(order=obj)
        return [
            {
                "ProductID": detail.product.pk,
                "product_name": detail.product.name,
                "quantity": detail.quantity,
                "price": detail.price,
                "inventory": detail.inventory.location if detail.inventory else None,
                "category": detail.product.category.name if detail.product.category else None,
            }
            for detail in details
        ]
    def get_customer(self, obj):
        if obj.customer:
            return {
                "CustomerID": obj.customer.pk,
                "full_name": obj.customer.full_name,
                "email": obj.customer.user.email,
                "phone": obj.customer.phone,
                'address': obj.customer.address,
            }
        return None