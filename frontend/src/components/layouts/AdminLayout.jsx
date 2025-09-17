import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard/admin' },
    { name: 'Quản lý người dùng', path: '/admin/users' },
    { name: 'Quản lý sản phẩm', path: '/admin/products' },
    { name: 'Quản lý đơn hàng', path: '/admin/orders' },
    { name: 'Quản lý tồn kho', path: '/admin/inventory' },
    { name: 'Báo cáo Doanh Thu', path: '/admin/reports' },
    { name: 'In hóa đơn', path: '/admin/invoices' },
    { name: 'Quản lý danh mục', path: '/admin/categories' },
    { name: 'Xác nhận đơn hàng', path: '/admin/orders/confirm' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <Sidebar menuItems={menuItems} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;