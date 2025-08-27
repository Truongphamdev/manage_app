import React from 'react';
import ProductList from '../products/ProductList';

const CustomerDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sản phẩm</h1>
      <ProductList />
    </div>
  );
};

export default CustomerDashboard;