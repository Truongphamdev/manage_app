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
import UserList from './components/users/UserList';
import UserDetail from './components/users/UserDetail';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import OrderList from './components/orders/OrderList';
import OrderDetail from './components/orders/OrderDetail';
import InventoryList from './components/inventory/InventoryList';
import ReportList from './components/reports/ReportList';
import ReportDetail from './components/reports/ReportDetail';
import { UserProvider } from './api/context/UserContext';

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
            </Route>
          </Route>

          {/* Supplier protected route */}
          <Route element={<ProtectRouter allowedRoles={['supplier']} />}>
            <Route path="/supplier" element={<SupplierPage />} />
          </Route>

          {/* Customer protected route */}
          <Route element={<ProtectRouter allowedRoles={['customer']} />}>
            <Route path="/customer" element={<CustomerPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;