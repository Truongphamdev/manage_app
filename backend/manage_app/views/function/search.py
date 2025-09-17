from rest_framework import viewsets,status
from rest_framework.response import Response

from .pagination import StandardResultsSetPagination
from ...models import Inventory,Product,User,Customer,Supplier,Order
from ...serializers import ProductSerializer,InventorySerializer,CustomerSerializer,SupplierSerializer,UserSerializer,AllOrderSerializer

import unicodedata

class SearchbyLocationViewSet(viewsets.ViewSet):
    def list(self, request):
        location = request.query_params.get('location', '')
        inventory = Inventory.objects.all()
        if location:
            inventory = inventory.filter(location__icontains=location)
        serializer = InventorySerializer(inventory, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SearchbyProductNameViewSet(viewsets.ViewSet):
    def list(self, request):
        search = request.query_params.get('search', '')
        inventory = Inventory.objects.all()
        if search:
            inventory = inventory.filter(product__name__icontains=search)
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
class SearchbyUsernameViewSet(viewsets.ViewSet):
    def list(self, request):
        search = request.query_params.get('search', '')
        users = User.objects.all()
        users = users.filter(username__icontains=search)
        user_data = UserSerializer(users, many=True)

        customer = Customer.objects.filter(full_name__icontains=search)
        customer_data = CustomerSerializer(customer, many=True)

        supplier = Supplier.objects.filter(full_name__icontains=search)
        supplier_data = SupplierSerializer(supplier, many=True)
        return Response(
            {
            "users": user_data.data,
            "customers": customer_data.data,
            "suppliers": supplier_data.data
        }, status=status.HTTP_200_OK)
class SearchbyUsernameOrderViewSet(viewsets.GenericViewSet):  # đổi sang GenericViewSet để dùng phân trang
    pagination_class = StandardResultsSetPagination

    def list(self, request):
        search = request.query_params.get('search', '')
        orders = Order.objects.filter(customer__full_name__icontains=search).order_by('-order_date')
        page = self.paginate_queryset(orders)
        if page is not None:
            serializer = AllOrderSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = AllOrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)