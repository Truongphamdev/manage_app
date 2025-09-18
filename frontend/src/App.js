import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectRouter from './api/ProtectRouter';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import SupplierPage from './pages/SupplierPage';
import CustomerPage from './pages/CustomerPage';
import HomePage from './pages/HomePage';

import AdminLayout from './components/layouts/AdminLayout';
import SupplierLayout from './components/layouts/SupplierLayout';
import CustomerLayout from './components/layouts/CustomerLayout';
import UserList from './components/users/UserList';
import UserDetail from './components/users/UserDetail';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import OrderList from './components/orders/OrderList';
import OrderDetail from './components/orders/OrderDetail';
import InventoryList from './components/inventory/InventoryList';
import InventoryDetail from './components/inventory/InventoryDetail';
import ReportList from './components/reports/ReportList';
import SupplierProductList from './components/supplier/products/SupplierProductList';
import SupplierProductDetail from './components/supplier/products/SupplierProductDetail';
import SupplierOrderList from './components/supplier/orders/SupplierOrderList';
import SupplierOrderDetail from './components/supplier/orders/SupplierOrderDetail';
import CustomerProductList from './components/customer/products/CustomerProductList';
import CustomerProductDetail from './components/customer/products/CustomerProductDetail';
import CustomerCart from './components/customer/cart/CustomerCart';
import CustomerOrderList from './components/customer/orders/CustomerOrderList';
import CustomerOrderDetail from './components/customer/orders/CustomerOrderDetail';
import CustomerPaymentList from './components/customer/payments/CustomerPaymentList';
import CustomerProfile from './components/customer/profile/CustomerProfile';
import CustomerProfileEdit from './components/customer/profile/CustomerProfileEdit';
import SupplierProfile from './components/supplier/profile/SupplierProfile';
import SupplierProfileEdit from './components/supplier/profile/SupplierProfileEdit';
import { UserProvider } from './api/context/UserContext';
import PurchaseForm from './components/products/purchase/AddPurchase';
import  InventoryReport  from './components/reports/InventoryReport';
import { Invoice } from './components/reports/invoice/Invoice';
import { InvoicePurchase } from './components/reports/invoice/InvoicePurchase';
import { InvoiceOrder } from './components/reports/invoice/InvoiceOrder';
import { InvoicePurchaseDetail } from './components/reports/invoice/InvoicePurchaseDetail';
import { InvoiceOrderDetail } from './components/reports/invoice/InvoiceOrderDetail';
import { Password } from './components/password/Password';
import CheckoutPage from './components/customer/checkout/CheckoutPage';
import { Qrcode } from './components/customer/checkout/Qrcode';
import { ConfirmTransaction } from './components/customer/checkout/ConfirmTransaction';
import { AdminQrcode } from './components/products/checkout/AdminQrcode';
import { Transaction } from './components/products/checkout/Transaction';
import OrderConfirm from './components/orders/OrderConfirm';
import OrderConfirmDetail from './components/orders/OrderConfirmDetail';
import Category from './components/category/Category';
import AllPurchase from './components/supplier/purchase/AllPurchase';
import PurchaseConfirmDetail from './components/supplier/purchase/PurchaseConfirmDetail';
// import SupplierProfile from './components/supplier/profile/SupplierProfile';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />

          {/* Admin protected routes */}
          <Route element={<ProtectRouter allowedRoles={['admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard/admin" element={<AdminPage />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/users/:id" element={<UserDetail />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/products/:id" element={<ProductDetail />} />
              <Route path="/admin/orders" element={<OrderList />} />
              <Route path="/admin/orders/:id" element={<OrderDetail />} />
              <Route path="/admin/inventory" element={<InventoryList />} />
              <Route path="/admin/inventory/:id" element={<InventoryDetail />} />
              <Route path="/admin/inventory/:id/report" element={<InventoryReport />} />
              <Route path="/admin/reports" element={<ReportList />} />
              <Route path="/admin/purchase" element={<PurchaseForm />} />
              <Route path="/admin/invoices" element={<Invoice />} />
              <Route path='/admin/invoices/purchase' element={<InvoicePurchase/>}/>
              <Route path='/admin/invoices/purchase/:id' element={<InvoicePurchaseDetail/>}/>
              <Route path='/admin/invoices/order/:id' element={<InvoiceOrderDetail/>}/>
              <Route path='/admin/invoices/order' element={<InvoiceOrder/>}/>
              <Route path='/admin/purchases/payment/qrcode' element={<AdminQrcode/>} />
              <Route path='/admin/purchases/confirm-transaction' element={<Transaction/>} />
              <Route path='/admin/orders/confirm' element={<OrderConfirm />} />
              <Route path='/admin/orders/confirm/:id' element={<OrderConfirmDetail />} />
              <Route path='/admin/categories/' element={<Category />} />
            </Route>
          </Route>

          {/* Supplier protected routes */}
          <Route element={<ProtectRouter allowedRoles={['supplier']} />}>
            <Route element={<SupplierLayout />}>
              <Route path="/dashboard/supplier" element={<SupplierPage />} />
              <Route path="/supplier/products" element={<SupplierProductList />} />
              <Route path="/supplier/products/:id" element={<SupplierProductDetail />} />
              <Route path="/supplier/purchases" element={<SupplierOrderList />} />
              <Route path="/supplier/purchases/:id" element={<SupplierOrderDetail />} />
              {/* <Route path="/supplier/reports" element={<SupplierRE />} />
              <Route path="/supplier/reports/:id" element={<SupplierReportDetail />} /> */}
              <Route path="/supplier/profile" element={<SupplierProfile />} />
              <Route path="/supplier/profile/edit" element={<SupplierProfileEdit />} />
              <Route path='/supplier/profile/changepassword' element={<Password />} />
              <Route path='/supplier/purchases/confirm' element={<AllPurchase/>} />
              <Route path='/supplier/purchase/confirm/:id' element={<PurchaseConfirmDetail/>} />
            </Route>
          </Route>

          {/* Customer protected routes */}
          <Route element={<ProtectRouter allowedRoles={['customer']} />}>
            <Route element={<CustomerLayout />}>
              <Route path="/dashboard/customer" element={<CustomerPage />} />
              <Route path="/customer/products" element={<CustomerProductList />} />
              <Route path="/customer/products/:id" element={<CustomerProductDetail />} />
              <Route path="/customer/cart" element={<CustomerCart />} />
              <Route path="/customer/orders" element={<CustomerOrderList />} />
              <Route path='customer/orders/checkout' element={<CheckoutPage />} />
              <Route path="/customer/orders/:id" element={<CustomerOrderDetail />} />
              <Route path="/customer/payments" element={<CustomerPaymentList />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/profile/edit" element={<CustomerProfileEdit />} />
              <Route path='/customer/profile/changepassword' element={<Password />} />
              {/* payment */}
              <Route path='/customer/orders/payment/qrcode' element={<Qrcode/>} />
              <Route path='/customer/orders/confirm-transaction' element={<ConfirmTransaction/>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;