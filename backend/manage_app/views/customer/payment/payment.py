from rest_framework import viewsets, status

from ....permissions import IsCustomerRole
from ....serializers import PaymentPurchaseCreateSerializer,PaymentOrderCreateSerializer
from ....models import PaymentOrder, Order, InvoiceOrder
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
class PaymentOrderCreateView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print("Request query params:", request.query_params)
        bank = "Vietcombank"
        account_no = "1030475573"
        account_name = "NGUYEN NHAT TRUONG"
        amount = request.query_params.get("amount", 100000)
        qr_url = (
            f"https://img.vietqr.io/image/{bank}-{account_no}-qr_only.png"
            f"?amount={amount}&accountName={account_name.replace(' ', '%20')}"
        )
        return Response({"qr_url": qr_url,"bank": bank,"account_name": account_name,"amount": amount}, status=status.HTTP_200_OK)
