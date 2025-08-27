from rest_framework import viewsets, status
from rest_framework.response import Response
from ...permissions import IsCustomerRole
from ...models import Cart, CartItem
from ...serializers import CartSerializer, CartItemSerializer

class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsCustomerRole] 
    def list(self, request):
        cart,_ = Cart.objects.get_or_create(customer=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def add_to_cart(self, request):
       cart,_ = Cart.objects.get_or_create(customer=request.user)
       product = request.data.get('product')
       quantity = request.data.get('quantity',1)
       price = request.data.get('price',0)
       if not product:
           return Response({"error": "Sản phẩm là bắt buộc"}, status=status.HTTP_400_BAD_REQUEST)
       if not isinstance(quantity,int) or quantity <= 0:
           return Response({"error": "Số lượng phải là số nguyên dương"}, status=status.HTTP_400_BAD_REQUEST)
       if not isinstance(price,(int,float)) or price < 0:
           return Response({"error": "Giá phải là số không âm"}, status=status.HTTP_400_BAD_REQUEST)
       cart_item,created = CartItem.objects.get_or_create(cart=cart,product=product)
       if not created:
           cart_item.quantity += quantity
       else:
           cart_item.quantity = quantity
           cart_item.price = price
       cart_item.save()
       serializer = CartItemSerializer(cart_item)
       return Response(serializer.data, status=status.HTTP_201_CREATED)
    def remove_cartitem(self,pk=None):
        cart_item = CartItem.objects.filter(id=pk, cart__customer=self.request.user).first()
        if not cart_item:
            return Response({"error": "Không tìm thấy sản phẩm trong giỏ hàng"}, status=status.HTTP_404_NOT_FOUND)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)