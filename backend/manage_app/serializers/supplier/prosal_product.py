from rest_framework import serializers
from ...models import Product, ProductProposals

class ProsalProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductProposals
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

    def validate_proposed_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Proposed price must be positive.")
        return value

    def validate_proposed_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("Proposed stock must be non-negative.")
        return value

    def validate_status(self, value):
        valid_statuses = ['pending', 'approved', 'rejected']
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(valid_statuses)}.")
        return value

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        supplier = user.supplier
        validated_data['supplier'] = supplier
        product_id = validated_data['product'].id
        product = Product.objects.filter(id=product_id).first()
        if not product:
            raise serializers.ValidationError("Product not found.")
        validated_data['product'] = product
        return ProductProposals.objects.create(product=product, supplier=supplier, **validated_data)
    

# admin
class ProsalProductAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductProposals
        fields = 'status'

    def validate_status(self, value):
        value_valid = ["approved","rejected"]
        if value not in value_valid:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(value_valid)}.")
        return value