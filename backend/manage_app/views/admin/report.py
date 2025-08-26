from rest_framework import viewsets, status
from rest_framework.response import Response
from permissions import IsAdminRole
from models import StockMovement, Product
from serializers import StockReportSerializer,ReportRevennueSerializer
from rest_framework.views import APIView

class ReportViewSet(APIView):
    permission_classes = [IsAdminRole]
    def get(self, request, product_id, start_date, end_date):
        if not product_id or not start_date or not end_date:
            return Response({"error": "Vui lòng cung cấp product_id, start_date và end_date"}, status=status.HTTP_400_BAD_REQUEST)
        if product_id:
            product_name = Product.objects.filter(id=product_id).first()
        data = {
            "product_id": product_id,
            "product_name": product_name.name,
            "start_date": start_date,
            "end_date": end_date
        }
        serializer = StockReportSerializer(data)
        return Response(serializer.data)
# báo cáo doanh thu
class ReportRevennueViewSet(APIView):
    permission_classes = [IsAdminRole]
    def get(self, request, start_date, end_date):
        if not start_date or not end_date:
            return Response({"error": "Vui lòng cung cấp start_date và end_date"}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            "start_date": start_date,
            "end_date": end_date
        }
        serializer = ReportRevennueSerializer(data)
        return Response(serializer.data)