import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SupplierOrderDetail = () => {
  const { id } = useParams();

  const mockOrders = [
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      total: 10000000,
      status: 'Pending',
      date: '2025-09-01',
      items: [
        { product: 'Xi măng PC40', quantity: 10, price: 80000 },
        { product: 'Gạch đỏ 4 lỗ', quantity: 100, price: 1200 },
      ],
    },
    {
      id: 2,
      customer: 'Trần Thị B',
      total: 20000000,
      status: 'Confirmed',
      date: '2025-09-02',
      items: [
        { product: 'Thép phi 16', quantity: 50, price: 15000 },
      ],
    },
    {
      id: 3,
      customer: 'Lê Văn C',
      total: 15000000,
      status: 'Confirmed',
      date: '2025-09-03',
      items: [
        { product: 'Gạch đỏ 4 lỗ', quantity: 200, price: 1200 },
        { product: 'Thép phi 16', quantity: 30, price: 15000 },
      ],
    },
    {
      id: 4,
      customer: 'Phạm Thị D',
      total: 25000000,
      status: 'Delivered',
      date: '2025-09-04',
      items: [
        { product: 'Xi măng PC40', quantity: 20, price: 80000 },
      ],
    },
    {
      id: 5,
      customer: 'Hoàng Văn E',
      total: 30000000,
      status: 'Pending',
      date: '2025-09-05',
      items: [
        { product: 'Cát xây dựng', quantity: 10, price: 200000 },
        { product: 'Đá 1x2', quantity: 5, price: 300000 },
      ],
    },
    {
      id: 6,
      customer: 'Ngô Thị F',
      total: 18000000,
      status: 'Confirmed',
      date: '2025-09-06',
      items: [
        { product: 'Sơn nước Dulux', quantity: 5, price: 500000 },
      ],
    },
    {
      id: 7,
      customer: 'Đinh Văn G',
      total: 22000000,
      status: 'Delivered',
      date: '2025-09-07',
      items: [
        { product: 'Gạch lát nền 60x60', quantity: 100, price: 20000 },
      ],
    },
    {
      id: 8,
      customer: 'Bùi Thị H',
      total: 17000000,
      status: 'Pending',
      date: '2025-09-08',
      items: [
        { product: 'Thép phi 12', quantity: 50, price: 12000 },
        { product: 'Xi măng PC50', quantity: 10, price: 85000 },
      ],
    },
    {
      id: 9,
      customer: 'Vũ Văn I',
      total: 19000000,
      status: 'Confirmed',
      date: '2025-09-09',
      items: [
        { product: 'Gạch đỏ 6 lỗ', quantity: 150, price: 1500 },
      ],
    },
    {
      id: 10,
      customer: 'Trương Thị K',
      total: 24000000,
      status: 'Delivered',
      date: '2025-09-10',
      items: [
        { product: 'Xi măng PC40', quantity: 15, price: 80000 },
        { product: 'Sơn nước Dulux', quantity: 3, price: 500000 },
      ],
    },
  ];

  const order = mockOrders.find((o) => o.id === parseInt(id)) || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Khách hàng:</strong> {order.customer}</p>
          <p><strong>Tổng tiền (VNĐ):</strong> {order.total?.toLocaleString('vi-VN')}</p>
        </div>
        <div>
          <p><strong>Trạng thái:</strong> {order.status}</p>
          <p><strong>Ngày đặt:</strong> {order.date}</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-2">Sản phẩm trong đơn hàng</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Sản phẩm</th>
              <th className="py-2 px-4 border">Số lượng</th>
              <th className="py-2 px-4 border">Giá (VNĐ)</th>
              <th className="py-2 px-4 border">Tổng giá (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{item.product}</td>
                <td className="py-2 px-4 border">{item.quantity?.toLocaleString('vi-VN')}</td>
                <td className="py-2 px-4 border">{item.price?.toLocaleString('vi-VN')}</td>
                <td className="py-2 px-4 border">{(item.quantity * item.price)?.toLocaleString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        to="/supplier/orders"
        className="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Quay lại
      </Link>
    </div>
  );
};

export default SupplierOrderDetail;