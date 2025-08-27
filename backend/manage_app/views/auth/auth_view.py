from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from ...serializers import UserRegistrationSerializer,UserLoginSerializer,SupplierSerializer,\
CustomerSerializer,UserUpdateSerializer,ChangePasswordSerializer

from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from ...models import User,Supplier,Customer
# Register your views here.
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'result':"Đăng ký thành công"}, status=201)
        return Response(serializer.errors, status=400)

# Login
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            user_data = {}
            if user.role =="supplier":
                supplier = Supplier.objects.get(user=user)
                user_data = SupplierSerializer(supplier).data
            elif user.role =="customer":
                customer = Customer.objects.get(user=user)
                user_data = CustomerSerializer(customer).data
            else:
                user_data = {"id": user.id, "email": user.email}
            user_data['role'] = user.role
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': user_data,
            }, status=200)
        return Response(serializer.errors, status=400)
# update
class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self,request,*args,**kwargs):
        serializer = UserUpdateSerializer(request.user, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'result':"Cập nhật thành công"}, status=200)
        return Response(serializer.errors, status=400)

# changepassword
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = ChangePasswordSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'result': "Đổi mật khẩu thành công"}, status=200)
        return Response(serializer.errors, status=400)
