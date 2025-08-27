import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ menuItems }) => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="block p-2 hover:bg-gray-700 rounded">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;