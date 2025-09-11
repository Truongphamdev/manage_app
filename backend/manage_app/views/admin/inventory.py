from rest_framework import viewsets,status
from rest_framework.response import Response
from ...models import Inventory, Product
from ...serializers import InventorySerializer,InventoryDetailSerializer
from ...permissions import IsAdminRole
from django.shortcuts import get_object_or_404

class InventoryViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]
    def list(self, request):
        inventory = Inventory.objects.all()
        serializer = InventorySerializer(inventory, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def retrieve(self, request, pk=None):
        inventory = get_object_or_404(Inventory, pk=pk)
        serializer = InventoryDetailSerializer(inventory)
        return Response(serializer.data, status=status.HTTP_200_OK)