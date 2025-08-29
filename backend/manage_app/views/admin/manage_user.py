from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ...permissions import IsAdminRole
from ...models import User, Customer, Supplier
from ...serializers import UserSerializer, CustomerSerializer, SupplierSerializer,SupplierCreateSerializer
from django.shortcuts import get_object_or_404

class UserManagementViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]

    def list(self, request):
        customers = Customer.objects.all()
        suppliers = Supplier.objects.all()
        return Response({
            "customers": CustomerSerializer(customers, many=True).data,
            "suppliers": SupplierSerializer(suppliers, many=True).data,
        })

    def retrieve(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        data = {
            "user": UserSerializer(user).data
        }
        if user.role == "customer":
            customer = Customer.objects.filter(user=user).first()
            data["customer"] = CustomerSerializer(customer).data if customer else None
        elif user.role == "supplier":
            supplier = Supplier.objects.filter(user=user).first()
            data["supplier"] = SupplierSerializer(supplier).data if supplier else None
        return Response(data)

    @action(detail=True, methods=["post"])
    def block(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        user.is_block = True
        user.save()
        return Response({"status": "người dùng đã bị chặn"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def unblock(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        user.is_block = False
        user.save()
        return Response({"status": "người dùng đã được bỏ chặn"}, status=status.HTTP_200_OK)
    
    def destroy(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        if user.role == "admin":
            return Response({"error": "không thể xóa người dùng admin"}, status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response({"status": "người dùng đã bị xóa"}, status=status.HTTP_200_OK)
    
class SupplierCreateViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]

    def create(self, request):
        serializer = SupplierCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {
                    "status": "nhà cung cấp đã được tạo",
                    "user": UserSerializer(user).data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
