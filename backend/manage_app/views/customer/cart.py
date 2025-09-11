from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from ...permissions import IsCustomerRole
from ...models import Cart, CartItem, Product,Customer
from ...serializers import CartSerializer, CartItemSerializer

class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsCustomerRole]

    def list(self, request):
        cart, _ = Cart.objects.get_or_create(customer=Customer.objects.get(user=request.user))
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_to_cart(self, request):
        cart, _ = Cart.objects.get_or_create(customer=Customer.objects.get(user=request.user))
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        # Validate product
        product = get_object_or_404(Product, ProductID=product_id)
        if not product:
            return Response({"error": "Sản phẩm không tồn tại"}, status=status.HTTP_400_BAD_REQUEST)
        # Validate quantity
        try:
            quantity = int(quantity)
        except Exception:
            return Response({"error": "Số lượng phải là số nguyên dương"}, status=status.HTTP_400_BAD_REQUEST)
        if quantity <= 0:
            return Response({"error": "Số lượng phải là số nguyên dương"}, status=status.HTTP_400_BAD_REQUEST)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product,defaults={'quantity': quantity, 'price': product.price * quantity})
        if not created:
            cart_item.quantity += quantity
            cart_item.price = product.price * cart_item.quantity
            cart_item.save()
        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['delete'])
    def remove_cartitem(self, request, pk=None):
        cart, _ = Cart.objects.get_or_create(customer=Customer.objects.get(user=request.user))
        cart_item = CartItem.objects.filter(id=pk, cart=cart).first()
        if not cart_item:
            return Response({"error": "Không tìm thấy sản phẩm trong giỏ hàng"}, status=status.HTTP_404_NOT_FOUND)
        cart_item.delete()
        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
    @action(detail=True, methods=['put'])
    def update_cartitem_quantity(self,request,pk=None):
        cart,_ = Cart.objects.get_or_create(customer = Customer.objects.get(user=request.user))
        cart_item = CartItem.objects.filter(id=pk,cart=cart).first()
        if not cart_item:
            return Response({"error":"Không tìm thấy sản phẩm trong giỏ hàng"},status=status.HTTP_404_NOT_FOUND)
        quantity = request.data.get('quantity',1)
        try:
            quantity = int(quantity)
        except Exception:
            return Response({"error":"Số lượng phải là số nguyên dương"},status=status.HTTP_400_BAD_REQUEST)
        if quantity <= 0:
            return Response({"error":"Số lượng phải là số nguyên dương"},status=status.HTTP_400_BAD_REQUEST)
        cart_item.quantity = quantity
        cart_item.price = cart_item.product.price * cart_item.quantity
        cart_item.save()
        return Response(CartItemSerializer(cart_item).data,status=status.HTTP_200_OK)