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
<div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
  {user && (user.customer || user.supplier) && (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
          alt="avatar"
          className="w-28 h-28 rounded-full shadow-md object-cover"
        />
      </div>

      {/* User info */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold">
            Chi tiết người dùng #
            {user.customer?.CustomerID || user.supplier?.SupplierID}
          </h1>
          <span
            className={`px-3 py-1 text-sm rounded-full font-semibold ${
              user.user?.role === "supplier"
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {user.user?.role === "supplier" ? "Nhà cung cấp" : "Khách hàng"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <p>
            <strong>Email:</strong>{" "}
            {user.customer?.email || user.supplier?.email}
          </p>
          <p>
            <strong>Họ tên:</strong>{" "}
            {user.customer?.full_name || user.supplier?.full_name}
          </p>

          <p>
            <strong>Địa chỉ:</strong>{" "}
            {user.customer?.address || user.supplier?.address}
          </p>
          <p>
            <strong>Số điện thoại:</strong>{" "}
            {user.customer?.phone || user.supplier?.phone}
          </p>
          {user.supplier?.company_name && (
            <p>
              <strong>Công ty:</strong>{" "}
              {user.supplier?.company_name}
            </p>
          )}
          <p className="col-span-1 sm:col-span-2">
            <strong>Vai trò hệ thống:</strong> {user.user?.role}
          </p>
        </div>
      </div>
    </div>
  )}

  <div className="mt-6 flex justify-center sm:justify-end">
    <button
      onClick={() => navigate("/admin/users")}
      className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Quay lại
    </button>
  </div>
</div>

  );
};

export default UserDetail;