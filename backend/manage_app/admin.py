from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import User, Customer, Supplier  # Import model bạn muốn quản lý

admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Supplier)