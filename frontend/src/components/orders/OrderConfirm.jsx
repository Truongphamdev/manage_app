import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import All_Api from '../../api/AllApi';

const OrderConfirm = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      setLoading(true);
      // Lấy toàn bộ đơn hàng rồi lọc pending
      const response = await All_Api.getOrderConfirm();
      const pending = (response || [])
      setOrders(pending);
      console.log('Fetched pending orders:', pending);
    } catch (error) {
      console.error('Error fetching pending orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Đơn hàng chờ xác nhận
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
          Hiện không có đơn hàng nào đang chờ xác nhận.
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Khách hàng</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Ngày đặt</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Tổng tiền</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.orderID} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{order.orderID}</td>
                    <td className="px-4 py-3">{order.customer?.full_name || 'N/A'}</td>
                    <td className="px-4 py-3">
                      {order.order_date
                        ? new Date(order.order_date).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      {Number(order.total_amount)?.toLocaleString()} VNĐ
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/orders/confirm/${order.orderID}`}
                        className="text-blue-600 hover:underline"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirm;
