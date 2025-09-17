from rest_framework import viewsets, status
from rest_framework.response import Response
from ....models import PaymentOrder, Customer
from ....serializers import PaymentOrderSerializer


class PaymentHistoryView(viewsets.ViewSet):
    def list(self, request):
        customer = Customer.objects.get(full_name=request.user)
        payments = PaymentOrder.objects.filter(order__customer=customer)
        serializer = PaymentOrderSerializer(payments, many=True)
        return Response(serializer.data)