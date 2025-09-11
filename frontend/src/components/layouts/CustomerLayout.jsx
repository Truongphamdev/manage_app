import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import Header from '../common/Header';

const CustomerLayout = () => {
  const menuItems = [
    { name: 'Sản phẩm', path: '/dashboard/customer' },
    { name: 'Giỏ hàng', path: '/customer/cart' },
    { name: 'Đơn hàng', path: '/customer/orders' },
    { name: 'Thanh toán', path: '/customer/payments' },
    { name: 'Thông tin cá nhân', path: '/customer/profile' },
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

export default CustomerLayout;