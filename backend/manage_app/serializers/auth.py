from rest_framework import serializers
from django.contrib.auth.models import User
from models import User, Supplier, Customer
# đăng ký
class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, required=True)

    full_name = serializers.CharField(required=True)
    address = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model = User
        fields = ['email', 'password', 'role', 'full_name', 'address', 'phone']
        extra_kwargs = {'password': {'write_only': True}}
    def validate_email(self,value):
        if User.objects.filter(email = value).exists():
            raise serializers.ValidationError("Email đã tồn tại")
        return value
    def validate_password(self,value):
        if len(value) < 8:
            raise serializers.ValidationError("Mật khẩu phải có ít nhất 8 ký tự")
        if len(value) > 20:
            raise serializers.ValidationError("Mật khẩu không được vượt quá 20 ký tự")
        return value
    
    def create(self, validated_data):
        role = validated_data.pop('role')
        password = validated_data.pop('password')
        full_name = validated_data.pop('full_name')
        address = validated_data.pop('address', '')
        phone = validated_data.pop('phone', '')

        user = User.objects.create_user(
            username=full_name,
            email=validated_data['email'],
            password=password,
            role=role,
        )
        if role == "supplier":
            Supplier.objects.create(
                user=user,
                full_name=full_name,
                address=address,
                phone=phone
            )
        elif role == "user":
            Customer.objects.create(
                user=user,
                full_name=full_name,
                address=address,
                phone=phone
            )
        return user

# Đăng nhập
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Email không đúng")
        if not user.check_password(password):
            raise serializers.ValidationError("Mật khẩu không đúng")
        data['user'] = user
        return data
    
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'full_name', 'address', 'phone']

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'user', 'full_name', 'address', 'phone']