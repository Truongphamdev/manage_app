from django.urls import path


from .views import RegisterView, LoginView,UserManagementViewSet,ManageProductViewSet,\
ReportViewSet,ReportRevennueViewSet
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # admin
    # admin_user
    path('admin/users', UserManagementViewSet.as_view({'get': 'list_users'})),
    path('admin/users/<int:pk>/', UserManagementViewSet.as_view({'get': 'detail_user'})),
    path('admin/users/<int:pk>/block', UserManagementViewSet.as_view({'put': 'block_user'})),
    path('admin/users/<int:pk>/unblock', UserManagementViewSet.as_view({'put': 'unblock_user'})),
    path('admin/users/<int:pk>/', UserManagementViewSet.as_view({'delete': 'destroy'})),
    # admin_product
    path('admin/products',ManageProductViewSet.as_view({'get':'list'})),
    path('admin/products/<int:pk>/',ManageProductViewSet.as_view({'get':'retrieve'})),
    path('admin/products/form-data/',ManageProductViewSet.as_view({'get':'form_data'})),
    path('admin/products/',ManageProductViewSet.as_view({'post':'create'})),
    path('admin/products/<int:pk>/',ManageProductViewSet.as_view({'put':'update'})),
    path('admin/products/<int:pk>/',ManageProductViewSet.as_view({'delete':'destroy'})),
    # admin_report
    path('admin/report/<int:product_id>/<str:start_date>/<str:end_date>/', ReportViewSet.as_view(), name='stock-report'),
    path('admin/report/revenue/<str:start_date>/<str:end_date>/', ReportRevennueViewSet.as_view(), name='revenue-report'),
]
