import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Giả lập lấy dữ liệu từ API
    const fetchOrder = async () => {
      try {
        const mockOrders = [
          {
            id: 1,
            customer: 'Nguyễn Văn A',
            date: '2023-10-01',
            status: 'Pending',
            total: 1000000,
            items: [
              { id: 1, product: 'Xi măng PC40', quantity: 10, price: 80000 },
              { id: 2, product: 'Gạch đỏ 4 lỗ', quantity: 100, price: 1200 },
            ],
          },
          {
            id: 2,
            customer: 'Trần Thị B',
            date: '2023-10-02',
            status: 'Confirmed',
            total: 2000000,
            items: [
              { id: 1, product: 'Thép phi 16', quantity: 50, price: 15000 },
            ],
          },
        ];
        const foundOrder = mockOrders.find((o) => o.id === parseInt(id));
        setOrder(foundOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) {
    return <div className="text-center p-6">Đang tải...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Chi tiết đơn hàng #{order.id}</h1>
      <p className="text-gray-600"><strong>Khách hàng:</strong> {order.customer}</p>
      <p className="text-gray-600"><strong>Ngày đặt:</strong> {order.date}</p>
      <p className="text-gray-600"><strong>Trạng thái:</strong> {order.status}</p>
      <p className="text-gray-600"><strong>Tổng tiền:</strong> {order.total.toLocaleString()} VNĐ</p>
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
      <button
        onClick={() => navigate('/admin/orders')}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Quay lại
      </button>
    </div>
  );
};

export default OrderDetail;