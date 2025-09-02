from rest_framework import serializers
from ..models import User, Supplier, Customer
from django.db import transaction
from django.contrib.auth import get_user_model
class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    full_name = serializers.CharField(required=True)
    address = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'full_name', 'address', 'phone']
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
    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop('password')
        full_name = validated_data.pop('full_name')
        address = validated_data.pop('address', '')
        phone = validated_data.pop('phone', '')
        email = validated_data.pop('email')

        try:
            user = User.objects.create_user(
            username=full_name,
            email=email,
            password=password,
            role='customer',
        )
            Customer.objects.create(
                user=user,
                full_name=full_name,
                address=address,
                phone=phone
            )
        except Exception as e:
            raise serializers.ValidationError("Đã xảy ra lỗi khi tạo người dùng")
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
    email = serializers.EmailField(source='user.email')
    is_block = serializers.BooleanField(source='user.is_block', read_only=True)

    class Meta:
        model = Customer
        fields = ['CustomerID', 'user', 'full_name', 'address', 'phone', 'email', 'is_block']
        read_only_fields = ['CustomerID', 'is_block']

    def validate_email(self, value):
        User = get_user_model()
        # Nếu là update, loại trừ user hiện tại ra khỏi check trùng
        user_instance = getattr(self.instance, 'user', None)
        qs = User.objects.filter(email=value)
        if user_instance:
            qs = qs.exclude(pk=user_instance.pk)
        if qs.exists():
            raise serializers.ValidationError("Email này đã tồn tại trong hệ thống.")
        return value
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        email = user_data.get('email')
        if email:
            instance.user.email = email
            instance.user.username = validated_data.get('full_name', instance.user.username)
            instance.user.save()

        # Cập nhật các trường của Customer
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.address = validated_data.get('address', instance.address)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.save()
        return instance

class SupplierSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    is_block = serializers.BooleanField(source='user.is_block', read_only=True)

    class Meta:
        model = Supplier
        fields = ['SupplierID', 'user', 'full_name', 'address', 'phone', 'company_name', 'email', 'is_block']
        read_only_fields = ['SupplierID', 'is_block']

    def validate_email(self, value):
        User = get_user_model()
        user_instance = getattr(self.instance, 'user', None)
        qs = User.objects.filter(email=value)
        if user_instance:
            qs = qs.exclude(pk=user_instance.pk)
        if qs.exists():
            raise serializers.ValidationError("Email này đã tồn tại trong hệ thống.")
        return value
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        email = user_data.get('email')
        if email:
            instance.user.email = email
            instance.user.username = validated_data.get('full_name', instance.user.username)
            instance.user.save()
        
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.address = validated_data.get('address', instance.address)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.save()
        return instance
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email','username', 'role', 'is_block']

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

# thêm supplier
class SupplierCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(required=True)
    address = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    company_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'full_name', 'address', 'phone', 'company_name']
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
    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data['full_name'],
            role='supplier'
        )
        Supplier.objects.create(
            user=user,
            full_name=validated_data['full_name'],
            address=validated_data['address'],
            phone=validated_data['phone'],
            company_name=validated_data['company_name']
        )
        return user 