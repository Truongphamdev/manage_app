import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../api/context/UserContext';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.clear() || sessionStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
      {/* Hamburger button for mobile with enhanced hover effect */}
      <button
        className="md:hidden p-2 bg-white text-black border border-black rounded-md hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none mr-4 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
      </button>

      {/* Title */}
      <Link to="/" className="text-xl md:text-xl text-base font-bold flex-1 text-center md:text-left truncate">
        Quản lý vật tư
      </Link>

      {/* User info and logout button */}
      <div className="flex items-center space-x-4">
        <span className="text-base hidden md:block">Xin chào, {user?.full_name || 'Khách'} {"("+user?.role+")"}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 py-1 px-3 rounded-md hover:bg-red-700 transition-colors"
        >
          Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default Navbar;