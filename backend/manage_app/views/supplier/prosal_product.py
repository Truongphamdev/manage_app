from rest_framework import viewsets, status
from rest_framework.response import Response
from ...permissions import IsSupplierRole
from ...serializers import ProposalProductSerializer 

class ProposalProductViewSet(viewsets.ViewSet):
    permission_classes = [IsSupplierRole]

    def create(self, request):
        serializer = ProposalProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            instance = serializer.save()
            return Response(ProposalProductSerializer(instance).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)