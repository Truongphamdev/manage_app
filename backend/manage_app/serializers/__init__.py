from .auth_serializer import UserRegistrationSerializer, UserLoginSerializer, SupplierSerializer,\
CustomerSerializer,UserUpdateSerializer,ChangePasswordSerializer,UserSerializer,SupplierCreateSerializer

# admin
from .admin.manage_serializer import CustomerSupplierUserSerializer,ProductSerializer,CreateProductSerializer,CategorySerializer,UpdateProductSerializer
from .admin.report import StockReportSerializer,ReportRevenueSerializer

# supplier
from .supplier.prosal_product import ProposalProductSerializer,ProposalProductAdminSerializer
from .supplier.main import OrderDetailSerializer,HistoryStockSerializer
# customer
from .customer.cart_serializer import CartItemSerializer,CartSerializer