from rest_framework import serializers
from django.db.models import Sum
from models import StockMovement,Payment,Order


class StockReportSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    product_name = serializers.CharField(read_only=True)
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    beginning_inventory = serializers.SerializerMethodField()
    imports = serializers.SerializerMethodField()
    exports = serializers.SerializerMethodField()
    ending = serializers.SerializerMethodField()

    def get_beginning_inventory(self, obj):
        product_id = obj['product_id']
        start_date = obj['start_date']
        total_imports = StockMovement.objects.filter(
            product = product_id,
            movement_type = "import",
            created_at__lt = start_date
        ).aggregate(total = Sum("quantity"))["total"] or 0

        total_exports = StockMovement.objects.filter(
            product = product_id,
            movement_type = "export",
            created_at__lt = start_date
        ).aggregate(total = Sum("quantity"))["total"] or 0
        return total_imports - total_exports

    def get_imports(self, obj):
        product_id = obj["product_id"]
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        return StockMovement.objects.filter(
            product = product_id,
            movement_type = "import",
            created_at__range = (start_date,end_date)
        ).aggregate(total = Sum("quantity"))["total"] or 0

    def get_exports(self, obj):
        product_id = obj["product_id"]
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        return StockMovement.objects.filter(
            product = product_id,
            movement_type = "export",
            created_at__range = (start_date,end_date)
        ).aggregate(total = Sum("quantity"))["total"] or 0

    def get_ending(self, obj):
        beginning = self.get_beginning_inventory(obj)
        imports = self.get_imports(obj)
        exports = self.get_exports(obj)
        return beginning + imports - exports
class ReportRevennueSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    total_revenue = serializers.SerializerMethodField()

    def get_total_revenue(self, obj):
        Paid_order = Payment.objects.filter(
            status="completed"
        ).values_list('order_id', flat=True).distinct()
        orders = Order.objects.filter(orderId__in=Paid_order)
        total = orders.aggregate(total=Sum("total_amount"))["total"] or 0
        return total