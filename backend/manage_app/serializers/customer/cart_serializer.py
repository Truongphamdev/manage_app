from rest_framework import serializers
from ...models import Cart, CartItem  
class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.URLField(source='product.image', read_only=True)
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)
    address = serializers.CharField(source='cart.customer.address', read_only=True)
    location = serializers.CharField(source='location.location', read_only=True)
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price', 'product_image', 'product_price', 'address', 'location']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True, source='cartitem_set')
    class Meta:
        model = Cart
        fields = ['id', 'customer', 'items', 'created_at', 'updated_at']




    
