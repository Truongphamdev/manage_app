from rest_framework import viewsets, status
from rest_framework.response import Response
from ....permissions import IsSupplierRole
from ....models import Supplier
from ....serializers import SupplierDashboardSerializer


class SupplierDashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsSupplierRole]

    def list(self, request):
        supplier = Supplier.objects.get(full_name=request.user.username)
        serializer = SupplierDashboardSerializer(supplier)
        return Response(serializer.data)