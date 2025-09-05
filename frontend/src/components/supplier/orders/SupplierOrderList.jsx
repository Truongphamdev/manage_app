import React from 'react';
import { Link } from 'react-router-dom';

const SupplierOrderList = () => {
  const mockOrders = [
    { id: 1, customer: 'Nguyễn Văn A', total: 10000000, status: 'Pending', date: '2025-09-01', items: [{ product: 'Xi măng PC40', quantity: 10 }, { product: 'Gạch đỏ 4 lỗ', quantity: 100 }] },
    { id: 2, customer: 'Trần Thị B', total: 20000000, status: 'Confirmed', date: '2025-09-02', items: [{ product: 'Thép phi 16', quantity: 50 }] },
    { id: 3, customer: 'Lê Văn C', total: 15000000, status: 'Confirmed', date: '2025-09-03', items: [{ product: 'Gạch đỏ 4 lỗ', quantity: 200 }, { product: 'Thép phi 16', quantity: 30 }] },
    { id: 4, customer: 'Phạm Thị D', total: 25000000, status: 'Delivered', date: '2025-09-04', items: [{ product: 'Xi măng PC40', quantity: 20 }] },
    { id: 5, customer: 'Hoàng Văn E', total: 30000000, status: 'Pending', date: '2025-09-05', items: [{ product: 'Cát xây dựng', quantity: 10 }, { product: 'Đá 1x2', quantity: 5 }] },
    { id: 6, customer: 'Ngô Thị F', total: 18000000, status: 'Confirmed', date: '2025-09-06', items: [{ product: 'Sơn nước Dulux', quantity: 5 }] },
    { id: 7, customer: 'Đinh Văn G', total: 22000000, status: 'Delivered', date: '2025-09-07', items: [{ product: 'Gạch lát nền 60x60', quantity: 100 }] },
    { id: 8, customer: 'Bùi Thị H', total: 17000000, status: 'Pending', date: '2025-09-08', items: [{ product: 'Thép phi 12', quantity: 50 }, { product: 'Xi măng PC50', quantity: 10 }] },
    { id: 9, customer: 'Vũ Văn I', total: 19000000, status: 'Confirmed', date: '2025-09-09', items: [{ product: 'Gạch đỏ 6 lỗ', quantity: 150 }] },
    { id: 10, customer: 'Trương Thị K', total: 24000000, status: 'Delivered', date: '2025-09-10', items: [{ product: 'Xi măng PC40', quantity: 15 }, { product: 'Sơn nước Dulux', quantity: 3 }] },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Khách hàng</th>
              <th className="py-2 px-4 border">Tổng tiền (VNĐ)</th>
              <th className="py-2 px-4 border">Trạng thái</th>
              <th className="py-2 px-4 border">Ngày đặt</th>
              <th className="py-2 px-4 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border">{order.id}</td>
                <td className="py-2 px-4 border">{order.customer}</td>
                <td className="py-2 px-4 border">{order.total.toLocaleString('vi-VN')}</td>
                <td className="py-2 px-4 border">{order.status}</td>
                <td className="py-2 px-4 border">{order.date}</td>
                <td className="py-2 px-4 border">
                  <Link
                    to={`/supplier/orders/${order.id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
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
  );
};

export default SupplierOrderList;