from django.db import models
from django.contrib.auth.models import AbstractUser
# bảng user
class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("customer", "Customer"),
        ("supplier", "Supplier")
    )
    role = models.CharField(max_length=10,choices=ROLE_CHOICES,default="customer")
    is_block = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.username

# bảng Supplier
class Supplier(models.Model):
    SupplierID = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete= models.CASCADE)
    full_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name
    
# bảng Customer
class Customer(models.Model):
    CustomerID = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete= models.CASCADE)
    full_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name
    
# bảng categories
class Category(models.Model):
    CategoryID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
# bảng Product
class Product(models.Model):
    ProductID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    image = models.URLField(max_length=500, blank=True, null=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier,on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    quantity_stock = models.IntegerField()
    cost_price = models.DecimalField(max_digits=12, decimal_places=2)
    unit = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class ProductProposals(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='proposals')
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='proposals')
    proposed_price = models.DecimalField(max_digits=10, decimal_places=2)
    proposed_stock = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Proposal {self.id} for {self.product} by {self.supplier}"
# bảng mua
class Purchase(models.Model):
    purchaseID = models.AutoField(primary_key=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    purchase_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"Purchase {self.purchaseID} - {self.supplier.name}"
class PurchaseDetail(models.Model):
    purchaseDetailID = models.AutoField(primary_key=True)
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"PurchaseDetail {self.id} - {self.purchase.id} - {self.product.name}"
# bảng order
class Order(models.Model):
    orderID = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    def __str__(self):
        return f"Order {self.orderID} - {self.customer.full_name}"
# bảng order detail
class OrderDetail(models.Model):
    orderDetailID = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"OrderDetail {self.orderDetailID} - {self.order.customer.full_name} - {self.product.name}"
# bảng Inventory 
class Inventory(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    location = models.CharField(max_length=100,choices=(
        ('kho HCM', 'Kho HCM'),
        ('kho HN', 'Kho HN'),
        ('kho DN', 'Kho DN'),
    ), default='kho HCM')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Inventory {self.id} - {self.product.name} - {self.quantity}"

# stock
class StockImport(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    cost_price = models.DecimalField(max_digits=12, decimal_places=2)
    import_date = models.DateTimeField(auto_now_add=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)

    def __str__(self):
        return f"StockImport {self.id} - {self.product.name} - {self.quantity} - {self.cost_price}"

class StockExport(models.Model):
    id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    export_date = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return f"StockExport {self.id} - {self.product.name} - {self.quantity} - {self.export_date}"

# bảng invoice
class InvoiceOrder(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    invoice_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    invoice_number = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50, choices=(
        ("paid", "Paid"),
        ("unpaid", "Unpaid"),
        ("canceled", "Canceled"),
    ), default="unpaid")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Invoice {self.id} - {self.order.customer.full_name} - {self.total_amount}"

class InvoicePurchase(models.Model):
    id = models.AutoField(primary_key=True)
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    invoice_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    invoice_number = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50, choices=(
        ("paid", "Paid"),
        ("unpaid", "Unpaid"),
        ("canceled", "Canceled"),
    ), default="unpaid")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"InvoicePurchase {self.id} - {self.total_amount}"

# bảng payment
class PaymentOrder(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50,choices=(
        ("credit_card", "Credit Card"),
        ("paypal", "PayPal"),
        ("bank_transfer", "Bank Transfer"),
        ("cash", "Cash"),
    ))
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50, choices=(
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ), default="pending")

# paymentpurchase
class PaymentPurchase(models.Model):
    id = models.AutoField(primary_key=True)
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50,choices=(
        ("credit_card", "Credit Card"),
        ("paypal", "PayPal"),
        ("bank_transfer", "Bank Transfer"),
        ("cash", "Cash"),
    ))
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50, choices=(
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ), default="pending")

# bảng cart
class Cart(models.Model):
    id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# bảng cart_item
class CartItem(models.Model):
    id = models.AutoField(primary_key=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
# thêm bảng xuất ,háo đơn xuát