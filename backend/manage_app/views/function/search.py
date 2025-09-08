from rest_framework import viewsets,status
from rest_framework.response import Response
from ...models import Inventory,Product
from ...serializers import ProductSerializer,InventorySerializer

import unicodedata

class SearchbyLocationViewSet(viewsets.ViewSet):
    def list(self, request):
        location = request.query_params.get('location', '')
        inventory = Inventory.objects.all()
        if location:
            inventory = inventory.filter(location__icontains=location)
        serializer = InventorySerializer(inventory, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class CombinedSearchViewSet(viewsets.ViewSet):
    def list(self, request):
        search = request.query_params.get('search', '')
        location = request.query_params.get('location', '')
        supplierID = request.query_params.get('supplier', '')
        categoryID = request.query_params.get('category', '')
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)

        products = Product.objects.all()
        if search:
            products = products.filter(name__icontains=search)
        if location:
            inventory = Inventory.objects.filter(location__icontains=location)
            products = products.filter(ProductID__in=[inv.product.ProductID for inv in inventory])
        if supplierID:
            products = products.filter(suppliers__SupplierID__icontains=supplierID)
        if categoryID:
            products = products.filter(category__CategoryID__icontains=categoryID)
        if min_price is not None:
            products = products.filter(price__gte=min_price)
        if max_price is not None:
            products = products.filter(price__lte=max_price)

        serializer = ProductSerializer(products.distinct(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
