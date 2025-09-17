import React, { useEffect, useState } from 'react';
import All_Api from '../../api/AllApi';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await All_Api.getDashboardData();
        setDashboardData(response);
        console.log("Dashboard data:", response);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Đang tải...</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bảng điều khiển Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tổng đơn hàng</h2>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.total_orders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tồn kho</h2>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.total_stock}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Doanh thu</h2>
          <p className="text-3xl font-bold text-blue-600">{Number(dashboardData.total_revenue).toLocaleString()} VNĐ</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Đơn hàng gần đây</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dashboardData?.recent_orders?.map((order) => (
              <tr key={order.orderID}>
                <td className="py-2 px-4 border">{order.orderID}</td>
                <td className="py-2 px-4 border">{order.customer.full_name}</td>
                <td className="py-2 px-4 border">{Number(order.total_amount).toLocaleString()} VNĐ</td>
                <td className="py-2 px-4 border">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Sản phẩm tồn kho thấp</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kho</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dashboardData?.low_stock_products?.map((product, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{product.product_name}</td>
                <td className="py-2 px-4 border">{product.category}</td>
                <td className="py-2 px-4 border">{product.quantity}</td>
                <td className="py-2 px-4 border">{product.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;