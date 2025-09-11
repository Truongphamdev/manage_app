import React from 'react';
import CustomerProductList from '../customer/products/CustomerProductList';

const CustomerDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sản phẩm</h1>
      <CustomerProductList />
    </div>
  );
};

export default CustomerDashboard;