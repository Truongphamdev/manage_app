import React ,{use, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../api/context/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();


  const handleLogout = () => {
    localStorage.clear() || sessionStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Quản lý vật tư</Link>
      <div className="flex items-center space-x-4">
        <span>Xin chào, {user?.full_name || 'Khách'}</span>
        <button onClick={handleLogout} className="bg-red-600 py-1 px-3 rounded-md hover:bg-red-700">
          Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default Navbar;