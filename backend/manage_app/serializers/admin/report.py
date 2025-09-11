from rest_framework import serializers
from django.db.models import Sum, Q
from ...models import StockExport,Purchase, StockImport,InvoicePurchase, Inventory,PaymentPurchase, PaymentOrder, Order, Product

class StockReportSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    product_name = serializers.SerializerMethodField()
    beginning_inventory = serializers.SerializerMethodField()
    imports = serializers.SerializerMethodField()
    exports = serializers.SerializerMethodField()
    ending = serializers.SerializerMethodField()

    def get_product_name(self, obj):
        product_id = obj['product_id']
        product = Product.objects.filter(pk=product_id).first()
        return product.name if product else ""

    def get_beginning_inventory(self, obj):
        product_id = obj['product_id']
        # Tính tổng nhập - tổng xuất trước ngày start_date
        total_imports = StockImport.objects.filter(
            product__ProductID=product_id,
            created_at__lt=obj['start_date']
        ).aggregate(total=Sum("quantity"))["total"] or 0
        total_exports = StockExport.objects.filter(
            product__ProductID=product_id,
            created_at__lt=obj['start_date']
        ).aggregate(total=Sum("quantity"))["total"] or 0
        return total_imports - total_exports

    def get_imports(self, obj):
        product_id = obj["product_id"]
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        return StockImport.objects.filter(
            product__ProductID=product_id,
            created_at__range=(start_date, end_date)
        ).aggregate(total=Sum("quantity"))["total"] or 0

    def get_exports(self, obj):
        product_id = obj["product_id"]
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        return StockExport.objects.filter(
            product__ProductID=product_id,
            created_at__range=(start_date, end_date)
        ).aggregate(total=Sum("quantity"))["total"] or 0

    def get_ending(self, obj):
        beginning = self.get_beginning_inventory(obj)
        imports = self.get_imports(obj)
        exports = self.get_exports(obj)
        return beginning + imports - exports

class ReportRevenueSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()
    total_revenue = serializers.SerializerMethodField()
    total_paid_purchase = serializers.SerializerMethodField()
    total_unpaid_purchases = serializers.SerializerMethodField()
    total_amount = serializers.SerializerMethodField()

    def get_total_revenue(self, obj):
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        paid_orders = PaymentOrder.objects.filter(
            status="completed",
            payment_date__range=(start_date, end_date)
        ).values_list('order', flat=True).distinct()
        orders = Order.objects.filter(orderID__in=paid_orders)
        total = orders.aggregate(total=Sum("total_amount"))["total"] or 0
        return total
    def get_total_paid_purchase(self, obj):
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        paid_purchases = PaymentPurchase.objects.filter(
            status="completed",
            payment_date__range=(start_date, end_date)
        ).values_list('purchase', flat=True).distinct()
        purchase = Purchase.objects.filter(purchaseID__in=paid_purchases)
        total = purchase.aggregate(total=Sum("total_amount"))["total"] or 0
        return total
    def get_total_unpaid_purchases(self, obj):
        start_date = obj["start_date"]
        end_date = obj["end_date"]
        unpaid_purchases = PaymentPurchase.objects.filter(
            status="pending",
            payment_date__range=(start_date, end_date)
        ).values_list('purchase', flat=True).distinct()
        purchase = Purchase.objects.filter(purchaseID__in=unpaid_purchases)
        total = purchase.aggregate(total=Sum("total_amount"))["total"] or 0
        return total
    def get_total_amount(self, obj):
        revenue = self.get_total_revenue(obj)
        paid_purchase = self.get_total_paid_purchase(obj)
        unpaid_orders = self.get_total_unpaid_purchases(obj)
        return revenue - paid_purchase - unpaid_orders

class ReportInvoicePurchaseSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    purchase_id = serializers.IntegerField()
    supplier_name = serializers.SerializerMethodField() 
    supplier_email = serializers.SerializerMethodField()  
    supplier_phone = serializers.SerializerMethodField()  
    supplier_address = serializers.SerializerMethodField()
    supplier_company = serializers.SerializerMethodField()
    purchase_date = serializers.SerializerMethodField() 
    total_amount = serializers.SerializerMethodField() 
    invoice_number = serializers.SerializerMethodField()
    method = serializers.SerializerMethodField()  
    status = serializers.SerializerMethodField()  
    items = serializers.SerializerMethodField()  

    def get_supplier_name(self, obj):
        return obj.purchase.supplier.full_name if obj and obj.purchase and obj.purchase.supplier else ""
    def get_supplier_email(self, obj):
        return obj.purchase.supplier.user.email if obj and obj.purchase and obj.purchase.supplier and obj.purchase.supplier.user else ""
    def get_supplier_phone(self, obj):
        return obj.purchase.supplier.phone if obj and obj.purchase and obj.purchase.supplier else ""
    def get_supplier_company(self, obj):
        return obj.purchase.supplier.company_name if obj and obj.purchase and obj.purchase.supplier else ""
    def get_purchase_date(self, obj):
        return obj.purchase.purchase_date if obj and obj.purchase else None
    def get_total_amount(self, obj):
        return obj.total_amount if obj else 0
    def get_supplier_address(self, obj):
        return obj.purchase.supplier.address if obj and obj.purchase and obj.purchase.supplier else ""
    def get_items(self, obj):
        if not obj.purchase or not obj.purchase.purchasedetail_set.exists():
            return []
        item = []
        for detail in obj.purchase.purchasedetail_set.all():
            item.append({
                "product_name": detail.product.name,
                "quantity": detail.quantity,
                "price": detail.price,
                "total": detail.total
            })
        return item
    def get_invoice_number(self, obj):
        return obj.invoice_number if obj and obj.invoice_number else ""
    def get_method(self, obj):
        return obj.method if obj and obj.method else ""
    def get_status(self, obj):
        return obj.status if obj and obj.status else ""
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['supplier_name'] = self.get_supplier_name(instance)
        representation['supplier_email'] = self.get_supplier_email(instance)
        representation['supplier_phone'] = self.get_supplier_phone(instance)
        representation['purchase_date'] = self.get_purchase_date(instance)
        representation['total_amount'] = self.get_total_amount(instance)
        representation['supplier_address'] = self.get_supplier_address(instance)
        representation['items'] = self.get_items(instance)
        representation['invoice_number'] = self.get_invoice_number(instance)
        representation['method'] = self.get_method(instance)
        representation['status'] = self.get_status(instance)
        return representation
    
class ReportInvoiceOrderSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    order_id = serializers.IntegerField()
    customer_name = serializers.SerializerMethodField() 
    customer_email = serializers.SerializerMethodField()  
    customer_phone = serializers.SerializerMethodField()  
    customer_address = serializers.SerializerMethodField()
    order_date = serializers.SerializerMethodField() 
    total_amount = serializers.SerializerMethodField() 
    invoice_number = serializers.SerializerMethodField()
    method = serializers.SerializerMethodField()  
    status = serializers.SerializerMethodField()  
    items = serializers.SerializerMethodField()  

    def get_customer_name(self, obj):
        return obj.order.customer.full_name if obj and obj.order and obj.order.customer else ""
    def get_customer_email(self, obj):
        return obj.order.customer.user.email if obj and obj.order and obj.order.customer and obj.order.customer.user else ""
    def get_customer_phone(self, obj):
        return obj.order.customer.phone if obj and obj.order and obj.order.customer else ""
    def get_customer_company(self, obj):
        return obj.order.customer.company_name if obj and obj.order and obj.order.customer else ""
    def get_order_date(self, obj):
        return obj.order.order_date if obj and obj.order else None
    def get_total_amount(self, obj):
        return obj.total_amount if obj else 0
    def get_customer_address(self, obj):
        return obj.order.customer.address if obj and obj.order and obj.order.customer else ""
    def get_items(self, obj):
        if not obj.order or not obj.order.orderdetail_set.exists():
            return []
        item = []
        for detail in obj.order.orderdetail_set.all():
            item.append({
                "product_name": detail.product.name,
                "quantity": detail.quantity,
                "price": detail.price,
                "total": detail.total
            })
        return item
    def get_invoice_number(self, obj):
        return obj.invoice_number if obj and obj.invoice_number else ""
    def get_method(self, obj):
        return obj.method if obj and obj.method else ""
    def get_status(self, obj):
        return obj.status if obj and obj.status else ""
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['customer_name'] = self.get_customer_name(instance)
        representation['customer_email'] = self.get_customer_email(instance)
        representation['customer_phone'] = self.get_customer_phone(instance)
        representation['order_date'] = self.get_order_date(instance)
        representation['total_amount'] = self.get_total_amount(instance)
        representation['customer_address'] = self.get_customer_address(instance)
        representation['items'] = self.get_items(instance)
        representation['invoice_number'] = self.get_invoice_number(instance)
        representation['method'] = self.get_method(instance)
        representation['status'] = self.get_status(instance)
        return representation