from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from ....permissions import IsAdminRole
from ....serializers import DashboardSerializer

class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]
    def list(self, request):
        serializer = DashboardSerializer({})
        return Response(serializer.data)
