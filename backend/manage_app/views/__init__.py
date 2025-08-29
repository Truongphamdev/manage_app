from .auth.auth_view import RegisterView, LoginView


# admin
from .admin.manage_user import UserManagementViewSet,SupplierCreateViewSet
# adminproduct
from .admin.manage_product import ManageProductViewSet
from .admin.report import ReportViewSet,ReportRevenueViewSet
from .admin.prosal_product import ProposalProductAdminViewSet
from .admin.manage_cate import CategoryViewSet
# supplier
from .supplier.prosal_product import ProposalProductViewSet
from .supplier.main import OrderDetailViewSet,HistoryStockViewSet
# customer
from .customer.cart import CartViewSet