import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Giả lập lấy dữ liệu từ mock data
    const mockOrders = [
      {
        id: 1,
        customer: 'Nguyễn Văn A',
        date: '2025-08-01',
        status: 'Pending',
        total: 1000000,
        address: '123 Đường Láng, Đống Đa, Hà Nội',
        paymentMethod: 'Thanh toán khi nhận hàng',
        notes: 'Giao hàng trước 17h',
        items: [
          { id: 1, product: 'Xi măng PC40', category: 'Xi măng', quantity: 10, price: 80000, totalItemPrice: 800000 },
          { id: 2, product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 100, price: 1200, totalItemPrice: 120000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-01 09:00', status: 'Pending', note: 'Đơn hàng được tạo' },
        ],
      },
      {
        id: 2,
        customer: 'Trần Thị B',
        date: '2025-08-02',
        status: 'Confirmed',
        total: 2000000,
        address: '456 Lê Lợi, TP. Huế',
        paymentMethod: 'Chuyển khoản ngân hàng',
        notes: 'Kiểm tra kỹ sản phẩm trước khi giao',
        items: [
          { id: 1, product: 'Thép phi 16', category: 'Sắt thép', quantity: 50, price: 15000, totalItemPrice: 750000 },
          { id: 2, product: 'Xi măng PC40', category: 'Xi măng', quantity: 15, price: 80000, totalItemPrice: 1200000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-02 10:00', status: 'Pending', note: 'Đơn hàng được tạo' },
          { timestamp: '2025-08-02 12:00', status: 'Confirmed', note: 'Đơn hàng đã xác nhận' },
        ],
      },
      {
        id: 3,
        customer: 'Lê Văn C',
        date: '2025-08-03',
        status: 'Delivered',
        total: 1500000,
        address: '789 Nguyễn Huệ, TP. Đà Nẵng',
        paymentMethod: 'Thanh toán khi nhận hàng',
        notes: 'Giao hàng nhanh chóng',
        items: [
          { id: 1, product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 200, price: 1200, totalItemPrice: 240000 },
          { id: 2, product: 'Thép phi 16', category: 'Sắt thép', quantity: 30, price: 15000, totalItemPrice: 450000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-03 08:00', status: 'Pending', note: 'Đơn hàng được tạo' },
          { timestamp: '2025-08-03 10:00', status: 'Confirmed', note: 'Đơn hàng đã xác nhận' },
          { timestamp: '2025-08-04 14:00', status: 'Delivered', note: 'Đã giao hàng thành công' },
        ],
      },
      {
        id: 4,
        customer: 'Phạm Thị D',
        date: '2025-08-04',
        status: 'Pending',
        total: 800000,
        address: '101 Trần Phú, TP. Nha Trang',
        paymentMethod: 'Chuyển khoản ngân hàng',
        notes: 'Liên hệ trước khi giao',
        items: [
          { id: 1, product: 'Xi măng PC40', category: 'Xi măng', quantity: 8, price: 80000, totalItemPrice: 640000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-04 11:00', status: 'Pending', note: 'Đơn hàng được tạo' },
        ],
      },
      {
        id: 5,
        customer: 'Hoàng Văn E',
        date: '2025-08-05',
        status: 'Confirmed',
        total: 2500000,
        address: '202 Phạm Văn Đồng, TP. HCM',
        paymentMethod: 'Thanh toán khi nhận hàng',
        notes: 'Giao hàng trong ngày',
        items: [
          { id: 1, product: 'Thép phi 16', category: 'Sắt thép', quantity: 100, price: 15000, totalItemPrice: 1500000 },
          { id: 2, product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 150, price: 1200, totalItemPrice: 180000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-05 09:30', status: 'Pending', note: 'Đơn hàng được tạo' },
          { timestamp: '2025-08-05 11:30', status: 'Confirmed', note: 'Đơn hàng đã xác nhận' },
        ],
      },
      {
        id: 6,
        customer: 'Ngô Thị F',
        date: '2025-08-06',
        status: 'Cancelled',
        total: 1200000,
        address: '303 Nguyễn Trãi, Thanh Hóa',
        paymentMethod: 'Chuyển khoản ngân hàng',
        notes: 'Hủy do không cần nữa',
        items: [
          { id: 1, product: 'Xi măng PC40', category: 'Xi măng', quantity: 12, price: 80000, totalItemPrice: 960000 },
          { id: 2, product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 80, price: 1200, totalItemPrice: 96000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-06 10:00', status: 'Pending', note: 'Đơn hàng được tạo' },
          { timestamp: '2025-08-06 15:00', status: 'Cancelled', note: 'Khách hàng hủy đơn' },
        ],
      },
      {
        id: 7,
        customer: 'Đinh Văn G',
        date: '2025-08-07',
        status: 'Delivered',
        total: 1800000,
        address: '404 Lê Văn Sỹ, TP. HCM',
        paymentMethod: 'Thanh toán khi nhận hàng',
        notes: 'Giao đúng giờ',
        items: [
          { id: 1, product: 'Thép phi 16', category: 'Sắt thép', quantity: 60, price: 15000, totalItemPrice: 900000 },
          { id: 2, product: 'Xi măng PC40', category: 'Xi măng', quantity: 10, price: 80000, totalItemPrice: 800000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-07 08:30', status: 'Pending', note: 'Đơn hàng được tạo' },
          { timestamp: '2025-08-07 10:30', status: 'Confirmed', note: 'Đơn hàng đã xác nhận' },
          { timestamp: '2025-08-08 12:00', status: 'Delivered', note: 'Đã giao hàng thành công' },
        ],
      },
      {
        id: 8,
        customer: 'Bùi Thị H',
        date: '2025-08-08',
        status: 'Pending',
        total: 900000,
        address: '505 Hai Bà Trưng, Hà Nội',
        paymentMethod: 'Chuyển khoản ngân hàng',
        notes: 'Kiểm tra số lượng trước khi giao',
        items: [
          { id: 1, product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 300, price: 1200, totalItemPrice: 360000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-08 09:00', status: 'Pending', note: 'Đơn hàng được tạo' },
        ],
      },
      {
        id: 9,
        customer: 'Vũ Văn I',
        date: '2025-08-09',
        status: 'Confirmed',
        total: 3000000,
        address: '606 Nguyễn Văn Cừ, Đà Nẵng',
        paymentMethod: 'Thanh toán khi nhận hàng',
        notes: 'Giao hàng cẩn thận',
        items: [
          { id: 1, product: 'Xi măng PC40', category: 'Xi măng', quantity: 20, price: 80000, totalItemPrice: 1600000 },
          { id: 2, product: 'Thép phi 16', category: 'Sắt thép', quantity: 80, price: 15000, totalItemPrice: 1200000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-09 10:00', status: 'Pending', note: 'Đơn hàng được tạo' },
          { timestamp: '2025-08-09 12:00', status: 'Confirmed', note: 'Đơn hàng đã xác nhận' },
        ],
      },
      {
        id: 10,
        customer: 'Trương Thị K',
        date: '2025-08-10',
        status: 'Delivered',
        total: 2200000,
        address: '707 Lý Thường Kiệt, TP. HCM',
        paymentMethod: 'Chuyển khoản ngân hàng',
        notes: 'Giao hàng đúng địa chỉ',
        items: [
          { id: 1, product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 100, price: 1200, totalItemPrice: 120000 },
          { id: 2, product: 'Thép phi 16', category: 'Sắt thép', quantity: 50, price: 15000, totalItemPrice: 750000 },
        ],
        orderHistory: [
          { timestamp: '2025-08-10 08:00', status: 'Pending', note: 'Đơn hàng được tạo' },
          { timestamp: '2025-08-10 10:00', status: 'Confirmed', note: 'Đơn hàng đã xác nhận' },
          { timestamp: '2025-08-11 14:00', status: 'Delivered', note: 'Đã giao hàng thành công' },
        ],
      },
    ];
    const foundOrder = mockOrders.find((o) => o.id === parseInt(id));
    setOrder(foundOrder);
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
      <p className="text-gray-600"><strong>Địa chỉ giao hàng:</strong> {order.address}</p>
      <p className="text-gray-600"><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
      <p className="text-gray-600"><strong>Ghi chú:</strong> {order.notes || 'Không có'}</p>
      
      <h2 className="text-xl font-semibold mt-4 mb-2">Sản phẩm</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng giá</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price.toLocaleString()} VNĐ</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.totalItemPrice.toLocaleString()} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2">Lịch sử đơn hàng</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.orderHistory.map((history, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{history.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap">{history.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{history.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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