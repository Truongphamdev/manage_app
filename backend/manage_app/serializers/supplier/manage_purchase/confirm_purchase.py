from rest_framework import serializers
from ....models import Purchase,InvoicePurchase,PaymentPurchase,PurchaseDetail,Inventory, Product

class PurchaseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseDetail
        fields = '__all__'

class ConfirmPurchaseSerializer(serializers.ModelSerializer):
    purchase_details = serializers.SerializerMethodField()
    supplier = serializers.SerializerMethodField()
    class Meta:
        model = Purchase
        fields = ['purchaseID', 'total_amount','purchase_date','supplier', 'purchase_details']
    def get_purchase_details(self, obj):
        details = PurchaseDetail.objects.filter(purchase=obj)
        return [
            {
                "ProductID": detail.product.pk,
                "product_name": detail.product.name,
                "quantity": detail.quantity,
                "price": detail.price,
                "inventory": detail.inventory.location if detail.inventory else None,
                "category": detail.product.category.name if detail.product.category else None,
            }
            for detail in details
        ]
    def get_supplier(self, obj):
        if obj.supplier:
            return {
                "id": obj.supplier.user.pk,
                "full_name": obj.supplier.user.username,
                "email": obj.supplier.user.email,
            }
        return None