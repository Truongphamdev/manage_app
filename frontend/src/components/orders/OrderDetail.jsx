import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  // Giả sử lấy dữ liệu từ API
  const order = {
    id,
    customer: 'Nguyễn Văn A',
    date: '2023-10-01',
    status: 'Pending',
    total: 1000000,
    items: [
      { id: 1, product: 'Xi măng PC40', quantity: 10, price: 80000 },
      { id: 2, product: 'Gạch đỏ 4 lỗ', quantity: 100, price: 1200 },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Chi tiết đơn hàng #{order.id}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p><strong>Khách hàng:</strong> {order.customer}</p>
        <p><strong>Ngày đặt:</strong> {order.date}</p>
        <p><strong>Trạng thái:</strong> {order.status}</p>
        <p><strong>Tổng tiền:</strong> {order.total.toLocaleString()} VNĐ</p>
        <h2 className="text-xl font-semibold mt-4">Sản phẩm</h2>
        <table className="min-w-full divide-y divide-gray-200 mt-2">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price.toLocaleString()} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;