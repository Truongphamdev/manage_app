from rest_framework import serializers
from ...models import Purchase, PurchaseDetail, InvoicePurchase

class PurchaseSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Purchase
        fields = ['purchaseID', 'supplier', 'purchase_date', 'total_amount', 'status']
    def get_status(self, obj):
        invoice = obj.invoicepurchase_set.first()
        if invoice:
            return invoice.status
        return 'unpaid'



class PurchaseDetailSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    purchase_date = serializers.DateTimeField(source='created_at')
    payment_method = serializers.SerializerMethodField()

    class Meta:
        model = PurchaseDetail
        fields = ['purchaseDetailID', 'product', 'image', 'quantity', 'price', 'total_price', 'status', 'purchase_date', 'payment_method']

    def get_total_price(self, obj):
        return obj.quantity * obj.price

    def get_status(self, obj):
        invoice = obj.purchase.invoicepurchase_set.first()
        if invoice:
            return invoice.status
        return 'unpaid'

    def get_payment_method(self, obj):
        invoice = obj.purchase.invoicepurchase_set.first()
        if invoice:
            return invoice.method
        return 'N/A'
    def get_product(self, obj):
        return obj.product.name if obj.product else None
    def get_image(self, obj):
        return obj.product.image if obj.product and obj.product.image else None