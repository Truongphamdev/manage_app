from rest_framework import viewsets, status
from rest_framework.response import Response
from permissions import IsAdminRole
from models import User,Customer,Supplier
from serializers import CustomerSupplierUserSerializer
from django.shortcuts import get_object_or_404

class UserManagementViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]
    def list_users(self, request):
        users = User.objects.all()
        customer = Customer.objects.all()
        supplier = Supplier.objects.all()
        data = {
            'customer': customer,
            'supplier': supplier,
            'user': users
        }
        serializer = CustomerSupplierUserSerializer(data,many=True)
        return Response(serializer.data)
    def detail_user(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        customer = Customer.objects.filter(user=user).first() if user.role == "customer" else None
        supplier = Supplier.objects.filter(user=user).first() if user.role == "supplier" else None
        if user:
            serializer = CustomerSupplierUserSerializer({
                'user': user,
                'customer': customer,
                'supplier': supplier
            })
            return Response(serializer.data)
        return Response({"error": "không tìm thấy người dùng"}, status=status.HTTP_404_NOT_FOUND)
    def block_user(self,request,pk=None):
        user = get_object_or_404(User, pk=pk)
        if user:
            user.is_block = True
            user.save()
            return Response({"status": "người dùng đã bị chặn"}, status=status.HTTP_200_OK)
        return Response({"error": "không tìm thấy người dùng"}, status=status.HTTP_404_NOT_FOUND)
    def unblock_user(self,request,pk =None):
        user = get_object_or_404(User, pk=pk)
        if user:
            user.is_block = False
            user.save()
            return Response({"status": "người dùng đã được bỏ chặn"}, status=status.HTTP_200_OK)
        return Response({"error": "không tìm thấy người dùng"}, status=status.HTTP_404_NOT_FOUND)
    def destroy(self,request,pk=None):
        user = get_object_or_404(User, pk=pk)
        if user.role == "admin":
            return Response({"error": "không thể xóa người dùng admin"}, status=status.HTTP_400_BAD_REQUEST)
        if user:
            user.delete()
            return Response({"status": "người dùng đã bị xóa"}, status=status.HTTP_200_OK)
        return Response({"error": "không tìm thấy người dùng"}, status=status.HTTP_404_NOT_FOUND)
    
