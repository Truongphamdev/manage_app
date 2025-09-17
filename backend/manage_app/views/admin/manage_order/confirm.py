from rest_framework import viewsets, status
from ....permissions import IsAdminRole
from ....serializers import ConfirmOrderSerializer
from ....models import Order,Inventory,StockExport
from rest_framework.decorators import action
from rest_framework.response import Response
class ConfirmOrderViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAdminRole]
    def list(self, request):
        orders = Order.objects.filter(paymentorder__status='pending').order_by('-order_date')
        serializer = ConfirmOrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def retrieve(self, request, pk=None):
        order = Order.objects.filter(pk=pk, paymentorder__status='pending').first()
        if not order:
            return Response({"error": "Order not found or not pending"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ConfirmOrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    action(detail=True, methods=['post'])
    def confirm_approve(self, request, pk=None):
        order = Order.objects.filter(pk=pk, paymentorder__status='pending').first()
        if not order:
            return Response({"error": "Order not found or not pending"}, status=status.HTTP_404_NOT_FOUND)
        payment = order.paymentorder_set.filter(status='pending').first()
        if not payment:
            return Response({"error": "No pending payment for this order"}, status=status.HTTP_400_BAD_REQUEST)
        invoice = order.invoiceorder_set.filter(status='unpaid').first()
        if not invoice:
            return Response({"error": "No invoice for this order"}, status=status.HTTP_400_BAD_REQUEST)

        payment.status = 'completed'
        invoice.status = 'paid'
        payment.save()
        invoice.save()
        return Response({"status": "Order approved"}, status=status.HTTP_200_OK)
    action(detail=True, methods=['post'])
    def confirm_reject(self, request, pk=None):

        order = Order.objects.filter(pk=pk, paymentorder__status='pending').first()
        if not order:
            return Response({"error": "Order not found or not pending"}, status=status.HTTP_404_NOT_FOUND)
        payment = order.paymentorder_set.filter(status='pending').first()
        if not payment:
            return Response({"error": "No pending payment for this order"}, status=status.HTTP_400_BAD_REQUEST)
        invoice = order.invoiceorder_set.filter(status='unpaid').first()
        if not invoice:
            return Response({"error": "No invoice for this order"}, status=status.HTTP_400_BAD_REQUEST)
        order_details = order.orderdetail_set.all()
        for detail in order_details:
            inventory = Inventory.objects.filter(product=detail.product,location = detail.inventory.location).first()
            if not inventory:
                return Response({"error": f"Inventory not found for product {detail.product.name} in location {detail.location}"}, status=status.HTTP_404_NOT_FOUND)
            inventory.quantity += detail.quantity  # Cộng lại số lượng đã xuất kho
            inventory.save()
        payment.status = 'failed'
        invoice.status = 'canceled'
        payment.save()
        invoice.save()
        return Response({"status": "Order rejected"}, status=status.HTTP_200_OK)