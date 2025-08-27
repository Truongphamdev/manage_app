import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bảng điều khiển Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tổng đơn hàng</h2>
          <p className="text-3xl font-bold text-blue-600">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tồn kho</h2>
          <p className="text-3xl font-bold text-blue-600">1,200</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Doanh thu</h2>
          <p className="text-3xl font-bold text-blue-600">5,000,000,000 VNĐ</p>
        </div>
      </div>
      {/* Thêm biểu đồ hoặc bảng dữ liệu nếu cần */}
    </div>
  );
};

export default AdminDashboard;