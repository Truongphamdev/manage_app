import React from 'react';
import { Link } from 'react-router-dom';

const CustomerProfile = () => {
  const profile = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    address: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
    dob: '1990-01-01',
    gender: 'Nam',
    idNumber: '123456789',
    createdAt: '2025-01-01',
    updatedAt: '2025-09-01',
    status: 'Hoạt động',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Họ và tên</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Số điện thoại</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.phone}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Địa chỉ</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.address}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ngày sinh</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.dob}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Giới tính</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.gender}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CMND/CCCD</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.idNumber}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Trạng thái</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.status}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ngày tạo</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.createdAt}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ngày cập nhật</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.updatedAt}</p>
        </div>
      </div>
      <Link
        to="/customer/profile/edit"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sửa thông tin
      </Link>
    </div>
  );
};

export default CustomerProfile;