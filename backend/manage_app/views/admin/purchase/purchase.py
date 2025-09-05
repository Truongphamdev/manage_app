from ....serializers import PaymentPurchaseCreateSerializer,ProductSerializer,PurchaseSerializer,\
PurchaseDetailSerializer,InventorySerializer,CreatePurchaseSerializer

from ....models import PaymentPurchase, Purchase
from rest_framework import generics, status

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ....permissions import IsAdminRole
from rest_framework import viewsets
from django.db.models import Sum


class PurchaseCreateView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def create(self, request):
        print("create validated_data:", request.data)
        serializer = CreatePurchaseSerializer(data=request.data)
        if serializer.is_valid():
            purchase = serializer.save()
            return Response(PurchaseSerializer(purchase).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class PaymentPurchaseCreateView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    def get(self, request, pk=None):
        bank = "Vietcombank"
        account_no = "1030475573"
        account_name = "NGUYEN NHAT TRUONG"
        amount = request.data.get("amount", 100000)
        transaction_id = request.data.get("transaction_id", "DH001")
        qr_url = (
            f"https://img.vietqr.io/image/{bank}-{account_no}-qr_only.png"
            f"?amount={amount}&addInfo={transaction_id}&accountName={account_name.replace(' ', '%20')}"
        )
        return Response({"qr_url": qr_url}, status=status.HTTP_200_OK)
    def create(self, request):
        serializer = PaymentPurchaseCreateSerializer(data=request.data)
        if serializer.is_valid():
            payment = serializer.save()

            return Response(PaymentPurchaseCreateSerializer(payment).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)