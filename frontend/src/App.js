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
import ReportList from './components/reports/ReportList';
import ReportDetail from './components/reports/ReportDetail';
import SupplierProductList from './components/supplier/products/SupplierProductList';
import SupplierProductDetail from './components/supplier/products/SupplierProductDetail';
import SupplierOrderList from './components/supplier/orders/SupplierOrderList';
import SupplierOrderDetail from './components/supplier/orders/SupplierOrderDetail';
import SupplierInventoryList from './components/supplier/inventory/SupplierInventoryList';
import SupplierInventoryDetail from './components/supplier/inventory/SupplierInventoryDetail';
import SupplierReportList from './components/supplier/reports/SupplierReportList';
import SupplierReportDetail from './components/supplier/reports/SupplierReportDetail';
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
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/users/:id" element={<UserDetail />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/products/:id" element={<ProductDetail />} />
              <Route path="/admin/orders" element={<OrderList />} />
              <Route path="/admin/orders/:id" element={<OrderDetail />} />
              <Route path="/admin/inventory" element={<InventoryList />} />
              <Route path="/admin/reports" element={<ReportList />} />
              <Route path="/admin/reports/:id" element={<ReportDetail />} />
              <Route path="/admin/purchase" element={<PurchaseForm />} />
            </Route>
          </Route>

          {/* Supplier protected routes */}
          <Route element={<ProtectRouter allowedRoles={['supplier']} />}>
            <Route element={<SupplierLayout />}>
              <Route path="/supplier" element={<SupplierPage />} />
              <Route path="/supplier/products" element={<SupplierProductList />} />
              <Route path="/supplier/products/:id" element={<SupplierProductDetail />} />
              <Route path="/supplier/orders" element={<SupplierOrderList />} />
              <Route path="/supplier/orders/:id" element={<SupplierOrderDetail />} />
              <Route path="/supplier/inventory" element={<SupplierInventoryList />} />
              <Route path="/supplier/inventory/:id" element={<SupplierInventoryDetail />} />
              <Route path="/supplier/reports" element={<SupplierReportList />} />
              <Route path="/supplier/reports/:id" element={<SupplierReportDetail />} />
              <Route path="/supplier/profile" element={<SupplierProfile />} />
              <Route path="/supplier/profile/edit" element={<SupplierProfileEdit />} />
            </Route>
          </Route>

          {/* Customer protected routes */}
          <Route element={<ProtectRouter allowedRoles={['customer']} />}>
            <Route element={<CustomerLayout />}>
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/customer/products" element={<CustomerProductList />} />
              <Route path="/customer/products/:id" element={<CustomerProductDetail />} />
              <Route path="/customer/cart" element={<CustomerCart />} />
              <Route path="/customer/orders" element={<CustomerOrderList />} />
              <Route path="/customer/orders/:id" element={<CustomerOrderDetail />} />
              <Route path="/customer/payments" element={<CustomerPaymentList />} />
              <Route path="/customer/profile" element={<CustomerProfile />} />
              <Route path="/customer/profile/edit" element={<CustomerProfileEdit />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;