import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectRouter from './api/ProtectRouter';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import SupplierPage from './pages/SupplierPage';
import CustomerPage from './pages/CustomerPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectRouter allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route element={<ProtectRouter allowedRoles={['supplier']} />}>
          <Route path="/supplier" element={<SupplierPage />} />
        </Route>
        <Route element={<ProtectRouter allowedRoles={['customer']} />}>
          <Route path="/customer" element={<CustomerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;