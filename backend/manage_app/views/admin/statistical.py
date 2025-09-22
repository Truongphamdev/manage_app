from rest_framework import viewsets, status
from ...permissions import IsAdminRole
from ...models import Product,OrderDetail,Order,Purchase,PurchaseDetail,InvoiceOrder,InvoicePurchase
from rest_framework.response import Response
from django.db.models import Sum, F
from django.db.models.functions import Coalesce

class StatisticalViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAdminRole]
    def get_statistical_sales_date(self,request):
        year = request.query_params.get('year')
        if not year:
            return Response({"error": "Year parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            year = int(year)
            # Lấy danh sách order_id đã thanh toán
            paid_order_ids = InvoiceOrder.objects.filter(
                status='paid',
                order__order_date__year=year
            ).values_list('order_id', flat=True)
            # Lấy số lượng bán từ OrderDetail
            stats = (
                OrderDetail.objects.filter(
                    order_id__in=paid_order_ids,
                    order__order_date__year=year
                )
                .values(month=F('order__order_date__month'))
                .annotate(total_sold=Coalesce(Sum('quantity'), 0))
                .order_by('month')
            )
            labels = [f"Tháng {i}" for i in range(1, 13)]
            data = [0] * 12
            for stat in stats:
                month_index = stat['month'] - 1
                data[month_index] = stat['total_sold']
            return Response({"labels": labels, "data": data})
        except ValueError:
            return Response({"error": "Invalid year parameter."}, status=status.HTTP_400_BAD_REQUEST)

    def get_statistical_purchase_data(self, request):
        year = request.query_params.get('year')
        if not year:
            return Response({"error": "Year parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            year = int(year)
            paid_purchase_ids = InvoicePurchase.objects.filter(
                status='paid',
                purchase__purchase_date__year=year
            ).values_list('purchase_id', flat=True)
            stats = (
                PurchaseDetail.objects.filter(
                    purchase_id__in=paid_purchase_ids,
                    purchase__purchase_date__year=year
                ).values(month=F('purchase__purchase_date__month'))
                .annotate(total_purchased=Coalesce(Sum('quantity'), 0))
                .order_by('month')
            )
            labels = [f"Tháng {i}" for i in range(1, 13)]
            data = [0] * 12
            for stat in stats:
                month_index = stat['month'] - 1
                data[month_index] = stat['total_purchased']
            return Response({"labels": labels, "data": data})
        except ValueError:
            return Response({"error": "Invalid year parameter."}, status=status.HTTP_400_BAD_REQUEST)
