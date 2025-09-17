from rest_framework import serializers
from ....models import Product,Category,    Inventory,OrderDetail
from django.db.models import Sum


class ProductCustomerSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    stock = serializers.SerializerMethodField()
    supplier_name = serializers.SerializerMethodField()
    location_info = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ['ProductID','category_name','supplier_name','location_info','stock', 'image', 'name', 'price', 'unit', 'created_at', 'updated_at']
    def get_location_info(self, obj):
        inventories = Inventory.objects.filter(product=obj)
        result = []
        for inv in inventories:
            # Tổng số lượng unpaid ở đúng kho này
            unpaid_qty = OrderDetail.objects.filter(
                product=obj,
                inventory=inv,
                order__invoiceorder__status='unpaid'
            ).aggregate(total=Sum('quantity'))['total'] or 0
            result.append({
                "id": inv.id,
                "location": inv.location,
                "quantity": inv.quantity + unpaid_qty
            })
        return result
    def get_category_name(self, obj):
        return obj.category.name if obj.category else ""
    def get_supplier_name(self, obj):
        return [supplier.full_name for supplier in obj.suppliers.all()]  # List tên suppliers
    def get_stock(self, obj):
    # Tổng nhập kho
        total_in_stock = Inventory.objects.filter(product=obj).aggregate(total=Sum('quantity'))['total'] or 0
        # Tổng xuất kho ở các đơn hàng đã thanh toán
        total_out_stock = OrderDetail.objects.filter(
            product=obj,
            order__invoiceorder__status='unpaid'
        ).aggregate(total=Sum('quantity'))['total'] or 0
        # Tồn kho thực tế
        stock = total_in_stock + total_out_stock
        return stock