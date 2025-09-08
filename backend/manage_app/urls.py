from django.urls import path
from .views import (
    RegisterView, LoginView, UserManagementViewSet, ManageProductViewSet,
    ReportViewSet, ReportRevenueViewSet, ProposalProductAdminViewSet, ProposalProductViewSet,
    OrderDetailViewSet, HistoryStockViewSet, CategoryViewSet, CartViewSet, SupplierCreateViewSet,
    PurchaseCreateView, PaymentPurchaseCreateView, UpdateUserView, ChangePasswordView,
    ProductSupplierViewSet, ManagePurchaseViewSet, InventoryViewSet,SearchbyLocationViewSet,CombinedSearchViewSet
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Admin user management
    path('admin/users/', UserManagementViewSet.as_view({'get': 'list'})),
    path('admin/users/<int:pk>/', UserManagementViewSet.as_view({
        'put': 'update',
        'get': 'retrieve',
        'delete': 'destroy'
    })),
    path('admin/users/<int:pk>/block/', UserManagementViewSet.as_view({'post': 'block'})),
    path('admin/users/<int:pk>/unblock/', UserManagementViewSet.as_view({'post': 'unblock'})),
    path('admin/supplier/', SupplierCreateViewSet.as_view({'post': 'create'}), name='create-supplier'),

    # Admin product management
    path('admin/products/', ManageProductViewSet.as_view({'get':'list', 'post':'create'})),
    path('admin/products/<int:pk>/', ManageProductViewSet.as_view({'get':'retrieve', 'put':'update', 'delete':'destroy'})),
    path('admin/products/form-data/', ManageProductViewSet.as_view({'get':'form_data'})),
    path('admin/inventory/', InventoryViewSet.as_view({'get':'list'}), name='inventory-list'),
    path('admin/inventory/<int:pk>/', InventoryViewSet.as_view({'get':'retrieve'}), name='inventory-detail'),
    # Admin report
    path('admin/report/', ReportViewSet.as_view({'get':'list'}), name='stock-report'),
    path('admin/report/export/', ReportViewSet.as_view({'get':'export_report'}), name='stock-report-export'),
    path('admin/report/revenue/', ReportRevenueViewSet.as_view({'get':'list'}), name='revenue-report'),
    path('admin/report/revenue/export/', ReportRevenueViewSet.as_view({'get':'export_report'}), name='revenue-report-export'),

    # Admin proposal
    path('admin/proposal/<int:pk>/', ProposalProductAdminViewSet.as_view({'patch': 'partial_update'}), name='proposal-admin'),

    # Admin category
    path('admin/categories/', CategoryViewSet.as_view({'post': 'create'}), name='add-category'),
    path('admin/categories/<int:pk>/', CategoryViewSet.as_view({'put': 'update', 'delete': 'destroy'}), name='update-delete-category'),
    # purchase
    path('admin/purchase/', PurchaseCreateView.as_view({'post': 'create'}), name='create'),
    path('admin/purchase/payment/', PaymentPurchaseCreateView.as_view({'post': 'create'}), name='payment-create'),
    path('admin/purchase/payment/qrcode/<int:pk>/', PaymentPurchaseCreateView.as_view({'get': 'get'}), name='payment-qrcode'),
    # Supplier proposal
    path('supplier/proposal/', ProposalProductViewSet.as_view({'post': 'create'}), name='create-proposal'),
    # manage supplier
    path('supplier/products/', ProductSupplierViewSet.as_view({'get': 'list'}), name='list-products'),
    path('supplier/products/<int:pk>/', ProductSupplierViewSet.as_view({'get': 'retrieve'}), name='retrieve-product'),
    path('supplier/purchases/', ManagePurchaseViewSet.as_view({'get': 'list'}), name='list-purchases'),
    path('supplier/purchases/<int:pk>/', ManagePurchaseViewSet.as_view({'get': 'retrive'}), name='retrieve-purchase'),
    # Supplier order/history
    path('supplier/orders/', OrderDetailViewSet.as_view({'get': 'list'}), name='list-orders'),
    path('supplier/orders/<int:pk>/', OrderDetailViewSet.as_view({'get': 'retrieve'}), name='retrieve-order'),
    path('supplier/history-stock/', HistoryStockViewSet.as_view({'get': 'list'}), name='list-history-stock'),

    # Customer cart
    path('customer/cart/', CartViewSet.as_view({'get': 'list'}), name='cart-list'),
    path('customer/cart/add/', CartViewSet.as_view({'post': 'add_to_cart'}), name='cart-add'),
    path('customer/cart/remove/<int:pk>/', CartViewSet.as_view({'delete': 'remove_cartitem'}), name='cart-remove'),
    # profile
    path('auth/user/update/', UpdateUserView.as_view(), name='update-user'),
    path('auth/user/change-password/', ChangePasswordView.as_view(), name='change-password'),
    # search
    path('function/search/location/', SearchbyLocationViewSet.as_view({'get': 'list'}), name='search-by-location'),
    path('function/search/combined/', CombinedSearchViewSet.as_view({'get': 'list'}), name='combined-search'),
]