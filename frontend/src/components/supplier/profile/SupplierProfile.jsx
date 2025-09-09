import React from 'react';
import { Link } from 'react-router-dom';

const SupplierProfile = () => {
  const profile = {
    fullName: 'Công ty TNHH Xây dựng Minh Anh',
    address: '456 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    phone: '0912345678',
    companyName: 'Minh Anh Construction',
    email: 'minhanh@example.com',
    taxCode: '1234567890',
    createdAt: '2025-01-01',
    updatedAt: '2025-09-01',
    status: 'Hoạt động',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Thông tin nhà cung cấp</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tên nhà cung cấp</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.fullName}</p>
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
          <label className="block text-sm font-medium mb-1">Tên công ty</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.companyName}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mã số thuế</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.taxCode}</p>
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
        to="/supplier/profile/edit"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sửa thông tin
      </Link>
    </div>
  );
};

export default SupplierProfile;