from rest_framework import serializers
from ..models import User, Supplier, Customer

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

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email đã tồn tại")
        return value

    def validate_password(self, value):
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
        email = validated_data.pop('email')

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            role=role,
        )
        # Tùy hệ thống bạn định nghĩa 'role'
        if role == "supplier":
            Supplier.objects.create(
                user=user,
                full_name=full_name,
                address=address,
                phone=phone
            )
        elif role == "customer":
            Customer.objects.create(
                user=user,
                full_name=full_name,
                address=address,
                phone=phone
            )
        return user

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
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'is_block']

class UserUpdateSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(required=True)
    address = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['full_name', 'address', 'phone']

    def update(self, instance, validated_data):
        full_name = validated_data.get('full_name')
        address = validated_data.get('address', '')
        phone = validated_data.get('phone', '')
        # Update username nếu muốn
        if full_name:
            instance.username = full_name
        instance.save()
        # Update vào bảng phụ
        if instance.role == "supplier":
            supplier = Supplier.objects.filter(user=instance).first()
            if supplier:
                supplier.full_name = full_name
                supplier.address = address
                supplier.phone = phone
                supplier.save()
        elif instance.role == "customer":
            customer = Customer.objects.filter(user=instance).first()
            if customer:
                customer.full_name = full_name
                customer.address = address
                customer.phone = phone
                customer.save()
        return instance

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        user = self.instance
        if not user.check_password(value):
            raise serializers.ValidationError("Mật khẩu cũ không đúng")
        return value

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Mật khẩu mới phải có ít nhất 8 ký tự")
        if len(value) > 20:
            raise serializers.ValidationError("Mật khẩu mới không được vượt quá 20 ký tự")
        return value

    def validate(self, attrs):
        if attrs['old_password'] == attrs['new_password']:
            raise serializers.ValidationError("Mật khẩu mới không được trùng với mật khẩu cũ")
        return attrs

    def save(self):
        user = self.instance
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user