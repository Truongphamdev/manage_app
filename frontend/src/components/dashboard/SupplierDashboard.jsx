import React, { useEffect, useState } from 'react';
import All_Api from '../../api/AllApi';

const SupplierDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await All_Api.getDashboardDataSupplier();
      setDashboardData(response);
      console.log("Dashboard data:", response);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }}
    fetchDashboardData();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bảng điều khiển Nhà cung cấp</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Sản phẩm cung cấp</h2>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.total_products}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Đơn hàng liên quan</h2>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.total_orders_relevant}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Doanh số</h2>
          <p className="text-3xl font-bold text-blue-600">{Number(dashboardData.total_revenue).toLocaleString()} VNĐ</p>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;