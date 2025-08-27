from rest_framework import status,viewsets
from ...serializers import ProsalProductAdminSerializer
from ...models import ProductProposals
from ...permissions import IsAdminRole
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class ProsalProductAdminViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]
    def prosal_admin(self,request,pk=None):
        prosal = get_object_or_404(ProductProposals, pk=pk)
        serializer = ProsalProductAdminSerializer(prosal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            if serializer.data.get("status") == "approved":
                product = prosal.product
                product.price = prosal.proposed_price
                product.quantity_stock += prosal.proposed_stock
                product.save()
            return Response({"status": "Cập nhật trạng thái thành công"}, status=status.HTTP_200_OK)
        return Response({"status": "Cập nhật trạng thái thất bại"}, status=status.HTTP_400_BAD_REQUEST)