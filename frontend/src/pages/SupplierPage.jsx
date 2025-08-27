import React from 'react';
import SupplierLayout from '../components/layouts/SupplierLayout';
import SupplierDashboard from '../components/dashboard/SupplierDashboard';

const SupplierPage = () => {
  return (
    <SupplierLayout>
      <SupplierDashboard />
    </SupplierLayout>
  );
};

export default SupplierPage;