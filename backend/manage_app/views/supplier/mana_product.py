from rest_framework import status,viewsets
from rest_framework.response import Response
from ...models import Product, Supplier
from ...serializers import ProductSupplierSerializer
from ...permissions import IsSupplierRole
from django.shortcuts import get_object_or_404

class ProductSupplierViewSet(viewsets.ViewSet):
    permission_classes = [IsSupplierRole]

    def list(self, request):
        supplier = get_object_or_404(Supplier, user=request.user)
        products = Product.objects.filter(suppliers=supplier)
        serializer = ProductSupplierSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def retrieve(self, request, pk=None):
        supplier = get_object_or_404(Supplier, user=request.user)
        product = get_object_or_404(Product, pk=pk, suppliers=supplier)
        serializer = ProductSupplierSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)