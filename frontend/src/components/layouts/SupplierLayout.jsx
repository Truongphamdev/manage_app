import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import Header from '../common/Header';

const SupplierLayout = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/supplier' },
    { name: 'Quản lý sản phẩm', path: '/supplier/products' },
    { name: 'Đơn hàng', path: '/supplier/orders' },
    { name: 'Tồn kho', path: '/supplier/inventory' },
    { name: 'Báo cáo doanh số', path: '/supplier/reports' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SupplierLayout;