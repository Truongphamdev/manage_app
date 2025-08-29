from rest_framework import status, viewsets
from rest_framework.response import Response
from ...serializers import ProposalProductAdminSerializer
from ...models import ProductProposals
from ...permissions import IsAdminRole
from django.shortcuts import get_object_or_404

class ProposalProductAdminViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]

    def partial_update(self, request, pk=None):
        proposal = get_object_or_404(ProductProposals, pk=pk)
        serializer = ProposalProductAdminSerializer(proposal, data=request.data, partial=True)
        if serializer.is_valid():
            instance = serializer.save()
            if instance.status == "approved":
                product = proposal.product
                product.price = proposal.proposed_price
                product.quantity_stock += proposal.proposed_stock
                product.save()
            return Response({"status": "Cập nhật trạng thái thành công"}, status=status.HTTP_200_OK)
        return Response({"status": "Cập nhật trạng thái thất bại", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)