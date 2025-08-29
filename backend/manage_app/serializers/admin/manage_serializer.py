from rest_framework import serializers
from ...models import User, Product, Category, Supplier, Inventory
from ...serializers import SupplierSerializer, CustomerSerializer
import cloudinary.uploader

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_block']

class CustomerSupplierUserSerializer(serializers.Serializer):
    customer = CustomerSerializer(many=True)
    supplier = SupplierSerializer(many=True)
    user = UserSerializer(many=True)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'full_name']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    supplier = SupplierSerializer(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

class CreateProductSerializer(serializers.ModelSerializer):
    location = serializers.ChoiceField(choices=(
        ('kho HCM', 'Kho HCM'),
        ('kho HN', 'Kho HN'),
        ('kho DN', 'Kho DN'),
    ), default='kho HCM')
    class Meta:
        model = Product
        fields = ['name', 'image', 'category', 'supplier', 'price', 'cost_price', 'unit', 'location']
        extra_kwargs = {
            'name': {'required': True},
            'image': {'required': False},
            'category': {'required': False},
            'supplier': {'required': False},
            'price': {'required': True},
            'cost_price': {'required': True},
            'unit': {'required': True},
            'location': {'required': True},
        }
    def validate_image(self, value):
        if value and hasattr(value, 'size') and value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError("Kích thước ảnh phải nhỏ hơn 2MB.")
        if value and not hasattr(value, 'file'):
            raise serializers.ValidationError("Ảnh không hợp lệ.")
        return value
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Giá phải lớn hơn 0.")
        return value
    
    def validate_cost_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Giá nhập vào không được nhỏ hơn 0.")
        return value
    def validate_unit(self, value):
        if not value:
            raise serializers.ValidationError("Unit là bắt buộc.")
        return value
    def validate(self, data):
        if data.get('price', 0) < data.get('cost_price', 0):
            raise serializers.ValidationError("Giá hiện tại phải lớn hơn giá nhập vào.")
        return data
    def validate_location(self, value):
        if not value:
            raise serializers.ValidationError("Location là bắt buộc.")
        return value
    def create(self, validated_data):
        image = validated_data.pop('image', None)
        location = validated_data.pop('location', 'kho HCM')
        validated_data['quantity_stock'] = 0
        if image:
            upload_result = cloudinary.uploader.upload(image)
            validated_data['image'] = upload_result.get('secure_url')
        product = Product.objects.create(**validated_data)
        Inventory.objects.create(product=product, quantity=product.quantity_stock, location=location)
        return product

class UpdateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'category', 'supplier', 'price', 'cost_price', 'unit']
        extra_kwargs = {
            'name': {'required': True},
            'image': {'required': False},
            'category': {'required': False},
            'supplier': {'required': False},
            'price': {'required': True},
            'cost_price': {'required': True},
            'unit': {'required': True},
        }
    def validate_image(self, value):
        if value and hasattr(value, 'size') and value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError("Kích thước ảnh phải nhỏ hơn 2MB.")
        if value and not hasattr(value, 'file'):
            raise serializers.ValidationError("Ảnh không hợp lệ.")
        return value
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Giá phải lớn hơn 0.")
        return value
    def validate_cost_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Giá nhập vào không được nhỏ hơn 0.")
        return value
    def validate_unit(self, value):
        if not value:
            raise serializers.ValidationError("Unit là bắt buộc.")
        return value
    def validate(self, data):
        if data.get('price', 0) < data.get('cost_price', 0):
            raise serializers.ValidationError("Giá hiện tại phải lớn hơn giá nhập vào.")
        return data
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.category = validated_data.get('category', instance.category)
        instance.supplier = validated_data.get('supplier', instance.supplier)
        instance.price = validated_data.get('price', instance.price)
        instance.cost_price = validated_data.get('cost_price', instance.cost_price)
        instance.unit = validated_data.get('unit', instance.unit)
        image = validated_data.pop('image', None)
        if image:
            upload_result = cloudinary.uploader.upload(image)
            instance.image = upload_result.get('secure_url')
        elif isinstance(image, str):
            instance.image = image
        instance.save()
        return instance
