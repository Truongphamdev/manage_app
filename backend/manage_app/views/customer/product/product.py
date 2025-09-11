from rest_framework import status,viewsets
from rest_framework.response import Response
from ....models import Product
from ....serializers import ProductCustomerSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

class CustomerProductViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def list(self, request):
        products = Product.objects.all()
        serializer = ProductCustomerSerializer(products, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductCustomerSerializer(product)
        return Response(serializer.data)