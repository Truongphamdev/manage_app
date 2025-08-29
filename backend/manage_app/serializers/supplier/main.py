from rest_framework import serializers
from ...models import OrderDetail

class OrderDetailSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    supplier_name = serializers.CharField(source='product.supplier.full_name', read_only=True)
    class Meta:
        model = OrderDetail
        fields = ['product_name', 'supplier_name', 'quantity', 'price', 'created_at']

class HistoryStockSerializer(serializers.Serializer):
    product_name = serializers.CharField()
    supplier_name = serializers.CharField()
    movement_type = serializers.CharField()
    quantity = serializers.IntegerField()
    date = serializers.DateField()