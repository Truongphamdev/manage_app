from rest_framework import serializers
from django.db.models import Sum, Q
from ...models import StockExport, StockImport, Inventory, PaymentOrder, Order, Product

class StockReportSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    product_name = serializers.SerializerMethodField()
    beginning_inventory = serializers.SerializerMethodField()
    imports = serializers.SerializerMethodField()
    exports = serializers.SerializerMethodField()
    ending = serializers.SerializerMethodField()

    def get_product_name(self, obj):
        product_id = obj['product_id']
        product = Product.objects.filter(pk=product_id).first()
        return product.name if product else ""

    def get_beginning_inventory(self, obj):
        product_id = obj['product_id']
        # Tính tổng nhập - tổng xuất trước ngày start_date
        total_imports = StockImport.objects.filter(
            product=product_id,
            created_at__lt=obj['start_date']
        ).aggregate(total=Sum("quantity"))["total"] or 0
        total_exports = StockExport.objects.filter(
            product=product_id,
            created_at__lt=obj['start_date']
        ).aggregate(total=Sum("quantity"))["total"] or 0
        return total_imports - total_exports

    def get_imports(self, obj):
        product_id = obj["product_id"]
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        return StockImport.objects.filter(
            product=product_id,
            created_at__range=(start_date, end_date)
        ).aggregate(total=Sum("quantity"))["total"] or 0

    def get_exports(self, obj):
        product_id = obj["product_id"]
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        return StockExport.objects.filter(
            product=product_id,
            created_at__range=(start_date, end_date)
        ).aggregate(total=Sum("quantity"))["total"] or 0

    def get_ending(self, obj):
        beginning = self.get_beginning_inventory(obj)
        imports = self.get_imports(obj)
        exports = self.get_exports(obj)
        return beginning + imports - exports

class ReportRevenueSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    total_revenue = serializers.SerializerMethodField()

    def get_total_revenue(self, obj):
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        paid_orders = PaymentOrder.objects.filter(
            status="completed",
            created_at__range=(start_date, end_date)
        ).values_list('order_id', flat=True).distinct()
        orders = Order.objects.filter(orderId__in=paid_orders)
        total = orders.aggregate(total=Sum("total_amount"))["total"] or 0
        return total