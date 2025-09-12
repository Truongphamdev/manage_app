import React, { useState } from 'react';
import All_Api from '../../api/AllApi';

export const Password = () => {
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new_password !== confirm_password) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }
    try {
      const data = { old_password, new_password };
      const response = await All_Api.changePassword(data);
      alert('Đổi mật khẩu thành công!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.response?.data || 'Đã có lỗi xảy ra');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đổi mật khẩu</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mật khẩu cũ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu cũ</label>
            <input
              type="password"
              value={old_password}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error?.old_password && (
              <p className="text-red-500 text-sm mt-1">{error.old_password[0]}</p>
            )}
          </div>

          {/* Mật khẩu mới */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
            <input
              type="password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error?.new_password && (
              <p className="text-red-500 text-sm mt-1">{error.new_password[0]}</p>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error && typeof error === 'string' && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
            {error?.non_field_errors && (
              <p className="text-red-500 text-sm mt-1">{error.non_field_errors[0]}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};
