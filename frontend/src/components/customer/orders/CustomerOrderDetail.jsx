import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import All_Api from '../../../api/AllApi';

const CustomerOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await All_Api.getOrderById(id);
        setOrder(response);
        console.log('Fetched customer order detail:', response);
      } catch (error) {
        console.error('Error fetching customer order detail:', error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="text-center p-6 text-blue-700 font-medium">
        Đang tải chi tiết đơn hàng...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        🧾 Chi tiết đơn hàng
      </h2>

      {/* Thông tin đơn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-xl shadow-sm border border-blue-100">
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold text-blue-800">ID:</span> {order.orderID}</p>
          <p>
            <span className="font-semibold text-blue-800">Tổng tiền (VNĐ):</span>{' '}
            {Number(order.total_amount)?.toLocaleString('vi-VN')}
          </p>
        </div>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold text-blue-800">Trạng thái:</span>{' '}
            <span
              className={`font-medium ${
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
            </span>
          </p>
          <p>
            <span className="font-semibold text-blue-800">Ngày đặt:</span>{' '}
            {new Date(order.order_date).toLocaleDateString('vi-VN')}
          </p>
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <h3 className="text-xl font-semibold mt-8 mb-4 text-blue-800">
        🛍 Sản phẩm trong đơn hàng
      </h3>
      <div className="overflow-x-auto rounded-xl shadow border border-blue-100 bg-white">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="py-3 px-4 text-left">Sản phẩm</th>
              <th className="py-3 px-4 text-left">Số lượng</th>
              <th className="py-3 px-4 text-left">Giá (VNĐ)</th>
              <th className="py-3 px-4 text-left">Tổng giá (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {order.order_details?.map((item, idx) => (
              <tr
                key={idx}
                className={
                  idx % 2 === 0
                    ? 'bg-white hover:bg-blue-50 transition'
                    : 'bg-blue-50 hover:bg-blue-100 transition'
                }
              >
                <td className="py-2 px-4 text-gray-700">{item.product_name}</td>
                <td className="py-2 px-4 text-gray-700">
                  {Number(item.quantity)?.toLocaleString('vi-VN')}
                </td>
                <td className="py-2 px-4 text-gray-700">
                  {Number(item.price)?.toLocaleString('vi-VN')}
                </td>
                <td className="py-2 px-4 text-gray-700">
                  {(Number(item.quantity) * Number(item.price))?.toLocaleString(
                    'vi-VN'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Nút quay lại */}
      <div className="mt-6">
        <Link
          to="/customer/orders"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          ⬅ Quay lại danh sách
        </Link>
      </div>
    </div>
  );
};

export default CustomerOrderDetail;
