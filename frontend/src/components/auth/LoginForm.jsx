import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import All_Api from '../../api/AllApi';
import { useUser } from '../../api/context/UserContext';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await All_Api.login({ email, password });
    if (rememberMe) {
      localStorage.setItem('access', response.access);
      localStorage.setItem('refresh', response.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));
    } else {
      sessionStorage.setItem('access', response.access);
      sessionStorage.setItem('refresh', response.refresh);
      sessionStorage.setItem('user', JSON.stringify(response.user));
    }
    setUser(response.user);
    if(response.user.role === 'admin' && response.user.is_block === false){
      navigate('/dashboard/admin');
    } else if(response.user.role === 'supplier' && response.user.is_block === false){
      navigate('/dashboard/supplier');
    } else if(response.user.role === 'customer' && response.user.is_block === false){
      navigate('/dashboard/customer');
    } else if (response.user.is_block === true) {
      window.alert("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
      navigate('/');
      return;
    }
    window.alert("Đăng nhập thành công");
    console.log(response);
    
    } catch (error) {
      setErrors(error.response?.data);
    }
  };
      
  console.log(errors);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.non_field_errors && (
  <p className="text-red-500 text-sm">{errors.non_field_errors[0]}</p>
)}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Ghi nhớ đăng nhập</label>
          </div>
          <Link to="/register" className="text-sm text-blue-600 hover:underline">
            Đăng ký
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;