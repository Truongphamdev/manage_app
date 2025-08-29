import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Giả lập lấy dữ liệu từ API
    const fetchUser = async () => {
      try {
        const mockUsers = [
          { id: 1, username: 'admin1', fullName: 'Nguyễn Văn A', role: 'Admin', email: 'admin1@example.com' },
          { id: 2, username: 'customer1', fullName: 'Trần Thị B', role: 'Customer', email: 'customer1@example.com' },
          { id: 3, username: 'supplier1', fullName: 'Lê Văn C', role: 'Supplier', email: 'supplier1@example.com' },
        ];
        const foundUser = mockUsers.find((u) => u.id === parseInt(id));
        setUser(foundUser);
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
      <h1 className="text-2xl font-bold mb-6">Chi tiết người dùng #{user.id}</h1>
      <p className="text-gray-600"><strong>Tên đăng nhập:</strong> {user.username}</p>
      <p className="text-gray-600"><strong>Họ tên:</strong> {user.fullName}</p>
      <p className="text-gray-600"><strong>Vai trò:</strong> {user.role}</p>
      <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
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