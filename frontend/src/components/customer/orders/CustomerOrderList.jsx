import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import All_Api from '../../../api/AllApi';

const CustomerOrderList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await All_Api.getAllOrders();
        setAllOrders(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-blue-700 font-medium">
        Đang tải đơn hàng...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        📦 Danh sách đơn hàng
      </h2>

      {/* Bảng desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border-collapse rounded-lg overflow-hidden text-sm">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Tổng tiền (VNĐ)</th>
              <th className="py-3 px-4 text-left">Trạng thái</th>
              <th className="py-3 px-4 text-left">Ngày đặt</th>
              <th className="py-3 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, idx) => (
              <tr
                key={order.orderID}
                className={
                  idx % 2 === 0
                    ? 'bg-white hover:bg-blue-50 transition'
                    : 'bg-blue-50 hover:bg-blue-100 transition'
                }
              >
                <td className="py-2 px-4 text-gray-700">{order.orderID}</td>
                <td className="py-2 px-4 text-gray-700">
                  {Number(order.total_amount).toLocaleString('vi-VN')} VNĐ
                </td>
                <td
                  className={`py-2 px-4 font-medium ${
                    order.status === 'paid'
                      ? 'text-green-600'
                      : order.status === 'unpaid'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {order.status === 'paid'
                    ? 'Đã thanh toán'
                    : order.status === 'unpaid'
                    ? 'Chưa thanh toán'
                    : 'Hủy'}
                </td>
                <td className="py-2 px-4 text-gray-700">
                  {new Date(order.order_date).toLocaleDateString('vi-VN')}
                </td>
                <td className="py-2 px-4 text-center">
                  <Link
                    to={`/customer/orders/${order.orderID}`}
                    className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 shadow transition"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden space-y-4">
        {allOrders.map((order) => (
          <div
            key={order.orderID}
            className="border border-blue-200 bg-white rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <p className="text-blue-800 font-semibold">ID: {order.orderID}</p>
            <p className="text-gray-700">
              <span className="font-semibold">Tổng tiền:</span>{' '}
              {Number(order.total_amount).toLocaleString('vi-VN')} VNĐ
            </p>
            <p
              className={`font-medium ${
                order.status === 'paid'
                  ? 'text-green-600'
                  : order.status === 'unpaid'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              Trạng thái: {order.status === 'paid' ? 'Đã thanh toán' : order.status === 'unpaid' ? 'Chưa thanh toán' : 'Hủy'}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Ngày đặt:</span>{' '}
              {new Date(order.order_date).toLocaleDateString('vi-VN')}
            </p>
            <Link
              to={`/customer/orders/${order.orderID}`}
              className="mt-3 inline-block bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 shadow transition"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrderList;
