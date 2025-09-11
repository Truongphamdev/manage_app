import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';

const CustomerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: 'Sản phẩm', path: '/dashboard/customer' },
    { name: 'Giỏ hàng', path: '/customer/cart' },
    { name: 'Đơn hàng', path: '/customer/orders' },
    { name: 'Thanh toán', path: '/customer/payments' },
    { name: 'Thông tin cá nhân', path: '/customer/profile' },
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

export default CustomerLayout;