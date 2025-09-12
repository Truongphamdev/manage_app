import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import All_Api from '../../../api/AllApi';

const SupplierProfile = () => {
  const [profile,setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    fetchProfile();
  },[])
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await All_Api.getSupplierProfile();
      setProfile(response);
      setLoading(false);
      console.log("profile", response);
      return response;
    }
    catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  }
if (loading) return <div className="text-center py-10">Đang tải...</div>;
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Thông tin nhà cung cấp</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tên nhà cung cấp</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.full_name}</p>
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
          <p className="w-full p-2 border rounded bg-gray-100">{profile.company_name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Trạng thái</label>
          <p className="w-full p-2 border rounded bg-gray-100">{profile.is_blocked ? "Bị chặn" : "Hoạt động"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ngày tạo</label>
          <p className="w-full p-2 border rounded bg-gray-100">{new Date(profile.created_at).toLocaleDateString()}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ngày cập nhật</label>
          <p className="w-full p-2 border rounded bg-gray-100">{new Date(profile.updated_at).toLocaleDateString()}</p>
        </div>
      </div>
      <Link
        to="/supplier/profile/edit"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sửa thông tin
      </Link>

      <Link
        to="/supplier/profile/changepassword"
        className="mt-4 ml-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Đổi mật khẩu
      </Link>
    </div>
  );
};

export default SupplierProfile;