from rest_framework import serializers
from ....models import Order,OrderDetail,Customer,InvoiceOrder
import django.db.models as models
from django.utils.timezone import now


class AllOrderSerializer(serializers.ModelSerializer):
    customer = serializers.SerializerMethodField()
    order_details = serializers.SerializerMethodField()
    invoice = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['orderID', 'customer', 'order_date', 'total_amount', 'order_details', 'invoice']

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

    def get_order_details(self, obj):
        details = OrderDetail.objects.filter(order=obj)
        return [
            {
                "ProductID": detail.product.pk,
                "product_name": detail.product.name,
                "quantity": detail.quantity,
                "price": detail.price,
                "category": detail.product.category.name if detail.product.category else None,
            }
            for detail in details
        ]
    def get_invoice(self, obj):
        invoice = InvoiceOrder.objects.filter(order=obj).first()
        if invoice:
            return {
                "InvoiceID": invoice.pk,
                "invoice_date": invoice.invoice_date,
                "total_amount": invoice.total_amount,
                "method": invoice.method,
                "status": invoice.status,
                "address": invoice.address,
            }
        return None