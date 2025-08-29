from rest_framework import serializers
from ...models import Product, ProductProposals

class ProposalProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductProposals
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'supplier']

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
        if not hasattr(user, 'supplier'):
            raise serializers.ValidationError("User must be a supplier.")
        validated_data['supplier'] = user.supplier
        product = validated_data.get('product')
        if not isinstance(product, Product):
            raise serializers.ValidationError("Product is invalid.")
        return ProductProposals.objects.create(**validated_data)

class ProposalProductAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductProposals
        fields = ('status',)

    def validate_status(self, value):
        value_valid = ["approved", "rejected"]
        if value not in value_valid:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(value_valid)}.")
        return value