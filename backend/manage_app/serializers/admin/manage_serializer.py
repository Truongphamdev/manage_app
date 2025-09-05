from email.mime import image
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
        fields = ['CategoryID', 'name']
        extra_kwargs = {
            'CategoryID': {'read_only': True}
        }

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['SupplierID', 'full_name', 'company_name']

class ProductSerializer(serializers.ModelSerializer):
    suppliers = SupplierSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    location = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = '__all__'
    def get_location(self, obj):
        inventory = Inventory.objects.filter(product=obj).first()
        return inventory.location if inventory else None

class CreateProductSerializer(serializers.ModelSerializer):
    location = serializers.ChoiceField(choices=(
        ('kho HCM', 'Kho HCM'),
        ('kho HN', 'Kho HN'),
        ('kho DN', 'Kho DN'),
    ), default='kho HCM')
    image = serializers.ImageField(write_only=True, required=True)

    class Meta:
        model = Product
        fields = ['name', 'image', 'category', 'suppliers', 'price', 'cost_price', 'unit', 'location']
        extra_kwargs = {
            'name': {'required': True},
            'image': {'required': True},
            'category': {'required': True},
            'suppliers': {'required': False},
            'price': {'required': True},
            'cost_price': {'required': False, 'default': None},
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
    def validate_unit(self, value):
        if not value:
            raise serializers.ValidationError("Unit là bắt buộc.")
        return value
    def validate_location(self, value):
        if not value:
            raise serializers.ValidationError("Location là bắt buộc.")
        return value
    def create(self, validated_data):
        suppliers = validated_data.pop('suppliers', [])
        image = validated_data.pop('image', None)
        location = validated_data.pop('location', 'kho HCM')
        validated_data['quantity_stock'] = 0
        if image:
            try:
                print("=== [LOG] Bắt đầu upload Cloudinary ===")
                print("Loại image:", type(image), "Tên file:", getattr(image, 'name', None))
                upload_result = cloudinary.uploader.upload(image)
                print("=== [LOG] Kết quả upload Cloudinary:", upload_result)
                validated_data['image'] = upload_result.get('secure_url')
            except Exception as e:
                print("Cloudinary upload error:", e)
                raise serializers.ValidationError({"image": "Lỗi upload Cloudinary: %s" % e})
        product = Product.objects.create(**validated_data)
        if suppliers:
            product.suppliers.set(suppliers)
        Inventory.objects.create(product=product, quantity=product.quantity_stock, location=location)
        return product

class UpdateProductSerializer(serializers.ModelSerializer):
    location = serializers.ChoiceField(choices=(
        ('kho HCM', 'Kho HCM'),
        ('kho HN', 'Kho HN'),
        ('kho DN', 'Kho DN'),
    ), default='kho HCM')
    image = serializers.ImageField(write_only=True, required=True)
    class Meta:
        model = Product
        fields = ['name', 'image', 'category', 'suppliers', 'price', 'unit', 'location']

        extra_kwargs = {
            'name': {'required': True},
            'image': {'required': True},
            'category': {'required': True},
            'suppliers': {'required': False},
            'price': {'required': True},
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
    def validate_unit(self, value):
        if not value:
            raise serializers.ValidationError("Unit là bắt buộc.")
        return value
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.category = validated_data.get('category', instance.category)
        instance.price = validated_data.get('price', instance.price)
        instance.unit = validated_data.get('unit', instance.unit)
        image = validated_data.pop('image', None)
        suppliers = validated_data.pop('suppliers', None)
        if suppliers is not None:
            instance.suppliers.set(suppliers)
        if image:
            upload_result = cloudinary.uploader.upload(image)
            instance.image = upload_result.get('secure_url')
        elif isinstance(image, str):
            instance.image = image
        instance.save()
        Inventory.objects.filter(product=instance).update( quantity=instance.quantity_stock, location=validated_data.get('location'))
        return instance
    