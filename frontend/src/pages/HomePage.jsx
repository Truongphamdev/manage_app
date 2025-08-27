import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Hệ thống quản lý vật tư xây dựng</h1>
      <p className="text-lg text-gray-600 mb-8">Chào mừng bạn đến với hệ thống quản lý vật tư và thiết bị xây dựng.</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Đăng nhập
        </Link>
        <Link to="/register" className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
          Đăng ký
        </Link>
      </div>
    </div>
  );
};

export default HomePage;