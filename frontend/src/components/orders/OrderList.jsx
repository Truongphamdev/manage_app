import React from 'react';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const orders = [
    { id: 1, customer: 'Nguyễn Văn A', date: '2025-08-01', status: 'Pending', total: 1000000 },
    { id: 2, customer: 'Trần Thị B', date: '2025-08-02', status: 'Confirmed', total: 2000000 },
    { id: 3, customer: 'Lê Văn C', date: '2025-08-03', status: 'Delivered', total: 1500000 },
    { id: 4, customer: 'Phạm Thị D', date: '2025-08-04', status: 'Pending', total: 800000 },
    { id: 5, customer: 'Hoàng Văn E', date: '2025-08-05', status: 'Confirmed', total: 2500000 },
    { id: 6, customer: 'Ngô Thị F', date: '2025-08-06', status: 'Cancelled', total: 1200000 },
    { id: 7, customer: 'Đinh Văn G', date: '2025-08-07', status: 'Delivered', total: 1800000 },
    { id: 8, customer: 'Bùi Thị H', date: '2025-08-08', status: 'Pending', total: 900000 },
    { id: 9, customer: 'Vũ Văn I', date: '2025-08-09', status: 'Confirmed', total: 3000000 },
    { id: 10, customer: 'Trương Thị K', date: '2025-08-10', status: 'Delivered', total: 2200000 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Danh sách đơn hàng</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.total.toLocaleString()} VNĐ</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/admin/orders/${order.id}`} className="text-blue-600 hover:underline">Chi tiết</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;