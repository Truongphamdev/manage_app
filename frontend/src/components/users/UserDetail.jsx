import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import All_Api from '../../api/AllApi';
const UserDetail = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // Giả lập lấy dữ liệu từ API
    const fetchUser = async () => {
      try {
        const response = await All_Api.getUserById(id);
        setUser(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <div className="text-center p-6">Đang tải...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      {user && user.customer && (
        <>
          <h1 className="text-2xl font-bold mb-6">Chi tiết người dùng #{user.customer.CustomerID}</h1>
          <p className="text-gray-600"><strong>Email:</strong> {user.customer.email}</p>
          <p className="text-gray-600"><strong>Họ tên:</strong> {user.customer.full_name}</p>
          <p className="text-gray-600"><strong>Địa Chỉ:</strong> {user.customer.address}</p>
          <p className="text-gray-600"><strong>Số điện thoại:</strong> {user.customer.phone}</p>
          <p className="text-gray-600"><strong>Vai trò:</strong> {user.user.role}</p>
        </>
      )}
      {user && user.supplier && (
        <>
          <h1 className="text-2xl font-bold mb-6">Chi tiết người dùng #{user.supplier.SupplierID}</h1>
          <p className="text-gray-600"><strong>Email:</strong> {user.supplier.email}</p>
          <p className="text-gray-600"><strong>Họ tên:</strong> {user.supplier.full_name}</p>
          <p className="text-gray-600"><strong>Địa Chỉ:</strong> {user.supplier.address}</p>
          <p className="text-gray-600"><strong>Số điện thoại:</strong> {user.supplier.phone}</p>
          <p className="text-gray-600"><strong>Vai trò:</strong> {user.user.role}</p>
        </>
      )}
      
      <button
        onClick={() => navigate('/admin/users')}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Quay lại
      </button>
    </div>
  );
};

export default UserDetail;