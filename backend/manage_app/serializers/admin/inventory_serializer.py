from rest_framework import serializers
from ...models import Inventory, Product

class InventorySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    class Meta:
        model = Inventory
        fields = '__all__'
class InventoryDetailSerializer(serializers.ModelSerializer):
    product = serializers.CharField(source='product.name', read_only=True)
    cost_price = serializers.DecimalField(source='product.cost_price', max_digits=10, decimal_places=2, read_only=True)
    price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)
    category = serializers.CharField(source='product.category.name', read_only=True)
    supplier = serializers.CharField(source='product.suppliers.first.full_name', read_only=True)

    class Meta:
        model = Inventory
        fields = ['id', 'product', 'location', 'quantity', 'cost_price', 'price', 'category', 'supplier']