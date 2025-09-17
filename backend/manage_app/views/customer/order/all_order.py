from rest_framework import viewsets, status
from rest_framework.response import Response
from ....models import Order,Customer
from ....serializers import AllOrderCustomerSerializer
from ....permissions import IsCustomerRole

class AllOrderView(viewsets.ViewSet):
    permission_classes = [IsCustomerRole]

    def list(self, request):
        customer = Customer.objects.get(full_name=request.user)
        orders = Order.objects.filter(customer=customer)
        serializer = AllOrderCustomerSerializer(orders, many=True)
        return Response(serializer.data)
    def retrieve(self, request, pk=None):
        customer = Customer.objects.get(full_name=request.user)
        try:
            order = Order.objects.get(pk=pk, customer=customer)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = AllOrderCustomerSerializer(order)
        return Response(serializer.data)

