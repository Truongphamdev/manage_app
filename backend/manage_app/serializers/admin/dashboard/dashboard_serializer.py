from rest_framework import serializers
from ....models import Order,OrderDetail,InvoiceOrder,Inventory,Product
import django.db.models as models
from django.utils.timezone import now


class DashboardSerializer(serializers.Serializer):
    total_orders = serializers.SerializerMethodField()
    total_revenue = serializers.SerializerMethodField()
    total_products = serializers.SerializerMethodField()
    total_stock = serializers.SerializerMethodField()
    low_stock_products = serializers.SerializerMethodField()
    recent_orders = serializers.SerializerMethodField()
    def get_low_stock_products(self, obj):
        low_stock_threshold = 100
        low_stock_inventories = Inventory.objects.filter(quantity__lt=low_stock_threshold)
        low_stock_products = []
        for inventory in low_stock_inventories:
            low_stock_products.append({
                "ProductID": inventory.product.pk,
                "product_name": inventory.product.name,
                "category": inventory.product.category.name if inventory.product.category else None,
                "supplier": inventory.product.suppliers.first().full_name if inventory.product.suppliers.exists() else None,
                "location": inventory.location,
                "quantity": inventory.quantity,
            })
        return low_stock_products
    def get_total_stock(self, obj):
        total_stock = Inventory.objects.aggregate(total=models.Sum('quantity'))['total'] or 0
        return total_stock
    def get_recent_orders(self, obj):
        order = Order.objects.all().order_by('-order_date')[:5]
        recent_orders = []
        for ord in order:
            recent_orders.append({
                "orderID": ord.pk,
                "customer": {
                    "CustomerID": ord.customer.pk,
                    "full_name": ord.customer.full_name,
                    "email": ord.customer.user.email,
                    "phone": ord.customer.phone,
                    'address': ord.customer.address,
                } if ord.customer else None,
                "order_date": ord.order_date,
                "total_amount": ord.total_amount,
                "status": InvoiceOrder.objects.filter(order=ord).first().status if InvoiceOrder.objects.filter(order=ord).exists() else None,
            })
        return recent_orders
    def get_total_orders(self, obj):
        return Order.objects.count()
    def get_total_revenue(self, obj):
        return InvoiceOrder.objects.filter(status='paid').aggregate(total=models.Sum('total_amount'))['total'] or 0
    def get_total_products(self, obj):
        return Product.objects.count()