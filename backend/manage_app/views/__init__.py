from .auth.auth_view import RegisterView, LoginView


# admin
from .admin.manage_user import UserManagementViewSet,SupplierCreateViewSet
# adminproduct
from .admin.manage_product import ManageProductViewSet
from .admin.report import ReportRevenueViewSet,ReportViewSet
from .admin.prosal_product import ProposalProductAdminViewSet
from .admin.manage_cate import CategoryViewSet
from .admin.purchase.purchase import PaymentPurchaseCreateView,PurchaseCreateView
from .admin.inventory import InventoryViewSet
# admin invoice
from .admin.invoice.invoice import InvoicePurchaseViewSet,InvoiceOrderViewSet
# supplier
from .supplier.prosal_product import ProposalProductViewSet
from .supplier.main import OrderDetailViewSet,HistoryStockViewSet
from .supplier.mana_product import ProductSupplierViewSet
from .supplier.manage_purchase import ManagePurchaseViewSet
from .supplier.dashboard.dashboard import SupplierDashboardViewSet
# admin order
from .admin.manage_order.order import AllOrderViewSet
from .admin.manage_order.confirm import ConfirmOrderViewSet
from .admin.dashboard.dashboard import DashboardViewSet
# customer
from .customer.cart import CartViewSet
from .auth.auth_view import UpdateCustomerView,UpdateSupplierView,ChangePasswordView
from .customer.product.product import CustomerProductViewSet
from .customer.order.order import OrderCreateViewSet
from .customer.payment.payment import PaymentOrderCreateView
from .customer.order.all_order import AllOrderView
from .customer.payment.history import PaymentHistoryView
# function
from .function.search import SearchbyLocationViewSet,CombinedSearchViewSet,SearchbyProductNameViewSet,SearchbyUsernameViewSet,SearchbyUsernameOrderViewSet
from .function.pagination import StandardResultsSetPagination