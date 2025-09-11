from rest_framework import serializers
from ...models import Product, Supplier

class ProductSupplierSerializer(serializers.Serializer):
    ProductID = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    category = serializers.CharField(max_length=1000)
    cost_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    created_at = serializers.DateTimeField()

