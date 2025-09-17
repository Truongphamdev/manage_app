from rest_framework import serializers
from ....models import Supplier, Order,Product,InvoicePurchase
import django.db.models as models
from django.utils.timezone import now


class SupplierDashboardSerializer(serializers.Serializer):
    total_orders_relevant = serializers.SerializerMethodField()
    total_products = serializers.SerializerMethodField()
    total_revenue = serializers.SerializerMethodField()

    def get_total_orders_relevant(self, obj):
        return Order.objects.filter(orderdetail__product__suppliers=obj).distinct().count()

    def get_total_products(self, obj):
        return Product.objects.filter(suppliers=obj).count()

    def get_total_revenue(self, obj):
        return InvoicePurchase.objects.filter(
            purchase__purchasedetail__product__suppliers=obj,
            status='paid'  # chỉ tính hóa đơn đã thanh toán
        ).aggregate(total=models.Sum('total_amount'))['total'] or 0