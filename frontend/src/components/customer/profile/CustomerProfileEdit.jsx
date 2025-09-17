import React, { use, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import All_Api from '../../../api/AllApi';
import { useUser } from '../../../api/context/UserContext';


const CustomerProfileEdit = () => {
  const { setUser } = useUser();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
    useEffect(()=> {
    fetchProfile();
  },[])
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await All_Api.getUserProfile();
      setProfile(response);
      return response;
    }
    catch (error) {
      console.error("Error fetching profile:", error);
    }
    finally {
      setLoading(false);  
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const data = {
      full_name: profile.full_name,
      phone: profile.phone,
      address: profile.address,
      email: profile.email 

    };
      await All_Api.updateUserProfile(data);
      const updatedProfile = await fetchProfile();
      setProfile(updatedProfile);
      setUser(updatedProfile);
      alert('Thông tin đã được cập nhật!');
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  if (loading) return <div className="text-center py-10">Đang tải...</div>;

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
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
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