from ...serializers import OrderDetailSerializer,HistoryStockSerializer
from rest_framework import viewsets
from ...permissions import IsSupplierRole
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ...models import OrderDetail,StockMovement

class OrderDetailViewSet(viewsets.ViewSet):
    permission_classes = [IsSupplierRole]

    def list(self, request):
        order_details = OrderDetail.objects.filter(product__supplier=request.user.supplier)
        serializer = OrderDetailSerializer(order_details, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        order_detail = get_object_or_404(OrderDetail, pk=pk, product__supplier=request.user.supplier)
        serializer = OrderDetailSerializer(order_detail)
        return Response(serializer.data)
class HistoryStockViewSet(viewsets.ViewSet):
    permission_classes = [IsSupplierRole]

    def list(self, request):
        stock_movements = StockMovement.objects.filter(product__supplier=request.user.supplier)
        serializer = HistoryStockSerializer(stock_movements, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        stock_movement = get_object_or_404(StockMovement, pk=pk, product__supplier=request.user.supplier)
        serializer = HistoryStockSerializer(stock_movement)
        return Response(serializer.data)