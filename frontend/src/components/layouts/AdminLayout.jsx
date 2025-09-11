import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import Header from '../common/Header';

const AdminLayout = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard/admin' },
    { name: 'Quản lý người dùng', path: '/admin/users' },
    { name: 'Quản lý sản phẩm', path: '/admin/products' },
    { name: 'Quản lý đơn hàng', path: '/admin/orders' },
    { name: 'Quản lý tồn kho', path: '/admin/inventory' },
    { name: 'Báo cáo Doanh Thu', path: '/admin/reports' },
    { name: 'In hóa đơn', path: '/admin/invoices' },
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

export default AdminLayout;