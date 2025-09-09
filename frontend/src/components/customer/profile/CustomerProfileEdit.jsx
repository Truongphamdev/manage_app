import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
    dob: '1990-01-01',
    gender: 'Nam',
    idNumber: '123456789',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mô phỏng lưu thông tin (chưa có API)
    alert('Thông tin đã được cập nhật!');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin cá nhân</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ngày sinh</label>
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Giới tính</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CMND/CCCD</label>
            <input
              type="text"
              name="idNumber"
              value={profile.idNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <Link
            to="/customer/profile"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Quay lại
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerProfileEdit;