from rest_framework import viewsets, status
from ...permissions import IsSupplierRole
from ...serializers import ConfirmPurchaseSerializer
from ...models import Purchase,Inventory
from rest_framework.decorators import action
from rest_framework.response import Response



class ConfirmPurchaseViewSet(viewsets.GenericViewSet):
    permission_classes = [IsSupplierRole]
    def list(self, request):
        purchases = Purchase.objects.filter(paymentpurchase__status='pending').order_by('-purchase_date')
        serializer = ConfirmPurchaseSerializer(purchases, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def retrieve(self, request, pk=None):
        purchase = Purchase.objects.filter(pk=pk, paymentpurchase__status='pending').first()
        if not purchase:
            return Response({"error": "Purchase not found or not pending"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ConfirmPurchaseSerializer(purchase)
        return Response(serializer.data, status=status.HTTP_200_OK)
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        purchase = Purchase.objects.filter(pk=pk, paymentpurchase__status='pending').first()
        if not purchase:
            return Response({"error": "Purchase not found or not pending"}, status=status.HTTP_404_NOT_FOUND)
        payment = purchase.paymentpurchase_set.filter(status='pending').first()
        if not payment:
            return Response({"error": "No pending payment for this purchase"}, status=status.HTTP_400_BAD_REQUEST)
        invoice = purchase.invoicepurchase_set.filter(status='unpaid').first()
        if not invoice:
            return Response({"error": "No invoice for this purchase"}, status=status.HTTP_400_BAD_REQUEST)

        payment.status = 'completed'
        invoice.status = 'paid'
        payment.save()
        invoice.save()
        return Response({"status": "Purchase approved"}, status=status.HTTP_200_OK)
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        purchase = Purchase.objects.filter(pk=pk, paymentpurchase__status='pending').first()
        if not purchase:
            return Response({"error": "Purchase not found or not pending"}, status=status.HTTP_404_NOT_FOUND)
        payment = purchase.paymentpurchase_set.filter(status='pending').first()
        if not payment:
            return Response({"error": "No pending payment for this purchase"}, status=status.HTTP_400_BAD_REQUEST)
        invoice = purchase.invoicepurchase_set.filter(status='unpaid').first()
        if not invoice:
            return Response({"error": "No invoice for this purchase"}, status=status.HTTP_400_BAD_REQUEST)
        purchase_details = purchase.purchasedetail_set.all()
        for detail in purchase_details:
            inventory = Inventory.objects.filter(product=detail.product,location = detail.inventory.location).first()
            if not inventory:
                return Response({"error": f"Inventory not found for product {detail.product.name} in location {detail.location}"}, status=status.HTTP_404_NOT_FOUND)
            inventory.quantity -= detail.quantity  
            if inventory.quantity < 0:
                inventory.quantity = 0  
            inventory.save()
        payment.status = 'failed'
        invoice.status = 'canceled'
        payment.save()
        invoice.save()
        return Response({"status": "Purchase rejected"}, status=status.HTTP_200_OK)