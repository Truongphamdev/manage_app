import React from 'react';

const SupplierDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bảng điều khiển Nhà cung cấp</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Sản phẩm cung cấp</h2>
          <p className="text-3xl font-bold text-blue-600">50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Đơn hàng liên quan</h2>
          <p className="text-3xl font-bold text-blue-600">80</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Doanh số</h2>
          <p className="text-3xl font-bold text-blue-600">2,000,000,000 VNĐ</p>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;