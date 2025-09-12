import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ menuItems, isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (

    <div>
      {/* Sidebar for desktop */}
      <div className="hidden md:block h-full w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block p-2 rounded ${
                  location.pathname === item.path ? 'bg-white font-bold text-black' : 'hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Dropdown menu for mobile with slide-in from left, full height */}
      <div
        className={`md:hidden fixed top-0 left-0 w-4/5 h-screen bg-gray-800 text-white z-40 p-4 pt-16 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="space-y-2 flex flex-col h-full">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block p-2 rounded ${
                  location.pathname === item.path ? 'bg-white font-bold text-black' : 'hover:bg-gray-700'
                }`}
                onClick={toggleSidebar} // Close menu when item is clicked
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}

    </div>
  );
};

export default Sidebar;