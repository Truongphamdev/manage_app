import React from 'react';
import { ProtectRouter } from '../../api/ProtectRouter'; // Import từ api

const ProtectedRoute = ({ children, allowedRoles }) => {
  return <ProtectRouter allowedRoles={allowedRoles}>{children}</ProtectRouter>;
};

export default ProtectedRoute;