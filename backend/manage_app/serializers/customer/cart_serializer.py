from rest_framework import serializers
from ...models import Cart, CartItem  

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name')
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']

class CartSerializer(serializers.ModelSerializer):
    item = CartItemSerializer(many=True, read_only=True, source='cartitem_set')
    class Meta:
        model = Cart
        fields = ['id', 'customer', 'item', 'created_at', 'updated_at']