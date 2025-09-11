from rest_framework import serializers
from ....models import InvoicePurchase,Purchase,PurchaseDetail,InvoiceOrder


class InvoicePurchaseSerializer(serializers.ModelSerializer):
    product_names = serializers.SerializerMethodField()

    def get_product_names(self, obj):
        product_names = []
        for detail in obj.purchase.purchasedetail_set.all():
            product_names.append(detail.product.name)
        return product_names

    class Meta:
        model = InvoicePurchase
        fields = ['id', 'purchase', 'total_amount', 'product_names', 'status','invoice_number', 'method', 'created_at']


class InvoiceOrderSerializer(serializers.ModelSerializer):
    product_names = serializers.SerializerMethodField()

    def get_product_names(self, obj):
        product_names = []
        for detail in obj.order.orderdetail_set.all():
            product_names.append(detail.product.name)
        return product_names

    class Meta:
        model = InvoiceOrder
        fields = ['id', 'order', 'total_amount', 'product_names', 'status','invoice_number', 'method', 'created_at']