import React from 'react';
import CustomerLayout from '../components/layouts/CustomerLayout';
import CustomerDashboard from '../components/dashboard/CustomerDashboard';

const CustomerPage = () => {
  return (
    <CustomerLayout>
      <CustomerDashboard />
    </CustomerLayout>
  );
};

export default CustomerPage;