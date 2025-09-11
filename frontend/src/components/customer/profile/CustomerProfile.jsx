import React, { useEffect, useState } from 'react';
import All_Api from '../../../api/AllApi';
import { useUser } from '../../../api/context/UserContext';

const CustomerProfile = () => {
  const [profile, setProfile] = useState({
  });
  const {user, setUser, refreshUser} = useUser();
  useEffect(()=> {
    getProfile();
  }, [])
  const getProfile = async () => {
    try {

      const response = await All_Api.getUserProfile();
      setProfile(response);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }

  }
  console.log("profile", profile);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        full_name : profile.full_name,
        phone : profile.phone,
        address : profile.address,
        user_id : profile.CustomerID,
        email : profile.email
      }
      const response = await All_Api.updateUserProfile(updateData);
      setProfile(response);
      getProfile();
      setUser(profile)
      alert('Cập nhật thông tin thành công!');
    }
    catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      alert('Cập nhật thông tin thất bại. Vui lòng thử lại.');
    }
  }




  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Thông tin cá nhân</h2>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input
              type="text"
              name="name"
              value={profile.full_name || ''}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={profile.address  || ''}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
         
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <input
              type="text"
              name="status"
              value={profile.is_blocked ? "Bị khóa" : "Hoạt động" || ''}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ngày tạo</label>
            <input
              type="text"
              name="createdAt"
              value={new Date(profile.created_at).toLocaleDateString('vi-VN') || ''}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ngày cập nhật</label>
            <input
              type="text"
              name="updatedAt"
              value={new Date(profile.updated_at).toLocaleDateString('vi-VN') || ''}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default CustomerProfile;