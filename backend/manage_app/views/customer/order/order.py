from rest_framework import status,viewsets
from rest_framework.response import Response
from ....models import Order,OrderDetail,Cart,Customer,CartItem
from ....serializers import CreateOrderSerializer,CartItemDisplaySerializer,OrderSerializer
from rest_framework.permissions import IsAuthenticated
from ....permissions import IsCustomerRole
from rest_framework.decorators import action
from ...function.pagination import StandardResultsSetPagination

class OrderCreateViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    @action(detail=False, methods=['post'])
    def selected_items(self, request):
        try:
            customer = Customer.objects.filter(user=request.user).first()
            if not customer:
                return Response({"error": "Customer profile not found"}, status=status.HTTP_404_NOT_FOUND)
            
            # Lấy dữ liệu từ request.data (POST body)
            selected_items = request.data.get('selectedItems', [])
            
            if not selected_items:
                return Response({"error": "No items selected"}, status=status.HTTP_400_BAD_REQUEST)
            
            cartItems = CartItem.objects.filter(id__in=selected_items, cart__customer=customer)
            
            if not cartItems.exists():
                return Response({"error": "No cart items found with the given IDs"}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = CartItemDisplaySerializer(cartItems, many=True)
            return Response(serializer.data)
        except Exception as e:
            print(f"Error in selected_items: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def create(self, request):
        print("Request data:", request.data)
        serializer = CreateOrderSerializer(data=request.data,context={'request': request})
        if serializer.is_valid():
            order = serializer.save()
            if order:
                selected_cart_items = request.data.get('selected_cart_items', False)
                if selected_cart_items:
                    for item_id in selected_cart_items:
                        cart_item = CartItem.objects.filter(id=item_id, cart__customer__user=request.user).first()
                        if cart_item:
                            cart_item.delete()
                        else:
                            # Nếu muốn thông báo lỗi khi không tìm thấy, có thể trả về lỗi luôn
                            return Response(
                                {'detail': f'Cart item with id {item_id} not found.'}, 
                                status=status.HTTP_404_NOT_FOUND
                            )
            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    