from rest_framework import serializers
from ....models import Order, OrderDetail, InvoiceOrder, PaymentOrder, StockExport, Product

class OrderDetailSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    class Meta:
        model = OrderDetail
        fields = '__all__'
class InvoiceOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceOrder
        fields = '__all__'
class AllOrderCustomerSerializer(serializers.ModelSerializer):
    order_details = OrderDetailSerializer(many=True, read_only=True, source='orderdetail_set')
    invoice_orders = InvoiceOrderSerializer(many=True, read_only=True, source='invoiceorder_set')
    status  = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = ['orderID', 'customer', 'order_date','total_amount',  'order_details', 'invoice_orders', 'status',]
    def get_status(self, obj):
        invoice = InvoiceOrder.objects.filter(order=obj).first()
        if invoice:
            return invoice.status
        return None
