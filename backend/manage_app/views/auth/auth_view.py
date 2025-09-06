from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from ...serializers import (
    UserRegistrationSerializer, UserLoginSerializer, SupplierSerializer,
    CustomerSerializer, UserUpdateSerializer, ChangePasswordSerializer
)
from ...models import User, Supplier, Customer

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Đăng ký thành công"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            user_data = {}
            if user.role == "supplier":
                supplier = Supplier.objects.filter(user=user).first()
                if not supplier:
                    return Response({'detail': 'Supplier profile not found'}, status=status.HTTP_404_NOT_FOUND)
                user_data = SupplierSerializer(supplier).data
            elif user.role == "customer":
                customer = Customer.objects.filter(user=user).first()
                if not customer:
                    return Response({'detail': 'Customer profile not found'}, status=status.HTTP_404_NOT_FOUND)
                user_data = CustomerSerializer(customer).data
            else:
                user_data = {"id": user.id, "email": user.email}
            user_data['role'] = user.role
            user_data['is_block'] = user.is_block
            user_data['full_name'] = user.username
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': user_data,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, *args, **kwargs):
        serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Cập nhật thành công"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = ChangePasswordSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': "Đổi mật khẩu thành công"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)