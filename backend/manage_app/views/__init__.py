from .auth.auth_view import RegisterView, LoginView


# admin
from .admin.manage_user import UserManagementViewSet
# adminproduct
from .admin.manage_product import ManageProductViewSet
from .admin.report import ReportViewSet,ReportRevennueViewSet
from .admin.prosal_product import ProsalProductAdminViewSet
from .admin.manage_cate import CategoryViewSet
# supplier
from .supplier.prosal_product import ProsalProductViewSet
from .supplier.main import OrderDetailViewSet,HistoryStockViewSet
# customer
from .customer.cart import CartViewSet