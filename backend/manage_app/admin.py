from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import User, Customer, Supplier, Category,Product,Inventory,StockImport,Purchase,PurchaseDetail  # Import model bạn muốn quản lý

admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Supplier)
admin.site.register(Category)
admin.site.register(Product)
# admin.site.register(Inventory)
admin.site.register(StockImport)
admin.site.register(Purchase)
admin.site.register(PurchaseDetail)