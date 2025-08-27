from rest_framework import viewsets
from ...permissions import IsSupplierRole
from rest_framework import status
from rest_framework.response import Response
from ...serializers import ProsalProductSerializer
class ProsalProductViewSet(viewsets.ViewSet):
    permission_classes = [IsSupplierRole]

    def create_prosal(self, request):
        serializer = ProsalProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
