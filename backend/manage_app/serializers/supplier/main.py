from rest_framework import serializers
from ...models import OrderDetail,StockMovement

class OrderDetailSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    supplier_name = serializers.CharField(source='product.supplier.full_name', read_only=True)
    class Meta:
        model = OrderDetail
        fields = 'product_name', 'supplier_name', 'quantity', 'price','created_at'

class HistoryStockSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    supplier_name = serializers.CharField(source='product.supplier.full_name', read_only=True)

    class Meta:
        model = StockMovement
        fields = 'product_name', 'supplier_name', 'quantity', 'movement_type','created_at'