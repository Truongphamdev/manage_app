from rest_framework import viewsets,status
from rest_framework.response import Response
from ...models import Purchase, PurchaseDetail, Supplier
from ...serializers import PurchaseSerializer, PurchaseDetailSerializer
from ...permissions import IsSupplierRole
from django.shortcuts import get_object_or_404


class ManagePurchaseViewSet(viewsets.ViewSet):
    permission_classes = [IsSupplierRole]

    def list(self, request):
        purchase = Purchase.objects.filter(supplier__user = request.user).order_by('-purchase_date')
        serializer = PurchaseSerializer(purchase, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def retrive(self,request,pk=None):
        purchase = get_object_or_404(Purchase, pk=pk)
        purchase_detail = PurchaseDetail.objects.filter(purchase=purchase)
        serializer = PurchaseDetailSerializer(purchase_detail, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)