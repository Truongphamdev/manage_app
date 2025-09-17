from rest_framework import viewsets, status
from ....permissions import IsAdminRole
from ....serializers import AllOrderSerializer
from ....models import Order
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ...function.pagination import StandardResultsSetPagination

class AllOrderViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    pagination_class = StandardResultsSetPagination

    def list(self, request):
        try:
            orders = Order.objects.all().order_by('-order_date')
            page = self.paginate_queryset(orders)
            if page is not None:
                serializer = AllOrderSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = AllOrderSerializer(orders, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error in AllOrderViewSet: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def retrieve(self, request, pk=None):
        try:
            order = Order.objects.filter(pk=pk).first()
            if not order:
                return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = AllOrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error in AllOrderViewSet retrieve: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)