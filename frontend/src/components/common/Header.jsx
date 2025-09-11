import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../api/context/UserContext';

const Header = ({ role }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  console.log("header user", user);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-600">Quản Lý Vật Tư Xây Dựng</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">
          {user?.fullName || 'Người dùng'} ({role})
        </span>
        <button
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate('/login');
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Đăng Xuất
        </button>
      </div>
    </header>
  );
};

export default Header;