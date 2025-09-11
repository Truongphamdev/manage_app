from rest_framework import serializers
from ....models import Product,Category,    Inventory
from django.db.models import Sum


class ProductCustomerSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    stock = serializers.SerializerMethodField()
    supplier_name = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['ProductID','category_name','supplier_name','stock', 'image', 'name', 'price', 'unit', 'created_at', 'updated_at']

    def get_category_name(self, obj):
        return obj.category.name if obj.category else ""
    def get_supplier_name(self, obj):
        return [supplier.full_name for supplier in obj.suppliers.all()]  # List tên suppliers
    def get_stock(self, obj):
        return Inventory.objects.filter(product = obj).aggregate(total = Sum('quantity'))['total'] or 0