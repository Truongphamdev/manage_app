from .auth_serializer import UserRegistrationSerializer, UserLoginSerializer, SupplierSerializer,\
CustomerSerializer,UserUpdateSerializer,ChangePasswordSerializer

# admin
from .admin.manage_serializer import CustomerSupplierUserSerializer,ProductSerializer,CreateProductSerializer,CategorySerializer,UpdateProductSerializer
from .admin.report import StockReportSerializer,ReportRevennueSerializer
# supplier
from .supplier.prosal_product import ProsalProductSerializer,ProsalProductAdminSerializer