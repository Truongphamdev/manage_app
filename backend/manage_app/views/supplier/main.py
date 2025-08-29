from rest_framework import viewsets, status
from rest_framework.response import Response
from ...permissions import IsSupplierRole
from django.db.models import F, Value, CharField
from django.shortcuts import get_object_or_404
from ...models import OrderDetail, StockImport, StockExport
from ...serializers import OrderDetailSerializer, HistoryStockSerializer
from itertools import chain

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
        supplier = request.user.supplier
        imports = StockImport.objects.filter(product__supplier=supplier).annotate(
            product_name=F('product__name'),
            supplier_name=F('supplier__full_name'),
            date=F('import_date'),  
            quantity=F('quantity'),
            movement_type=Value('import', output_field=CharField())
        ).values('product_name', 'supplier_name', 'movement_type', 'quantity', 'date')
        exports = StockExport.objects.filter(product__supplier=supplier).annotate(
            product_name=F('product__name'),
            supplier_name=F('supplier__full_name'),
            date=F('export_date'),  
            quantity=F('quantity'),
            movement_type=Value('export', output_field=CharField())
        ).values('product_name', 'supplier_name', 'movement_type', 'quantity', 'date')
        history = sorted(chain(imports, exports), key=lambda x: x['date'], reverse=True)
        serializer = HistoryStockSerializer(history, many=True)
        return Response(serializer.data)