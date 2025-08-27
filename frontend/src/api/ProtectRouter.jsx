import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRouter = ({ allowedRoles }) => {
  const token = localStorage.getItem('access');
  const userRole = localStorage.getItem('role'); // Giả sử API trả về role và lưu vào localStorage

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectRouter;