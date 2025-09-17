import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import All_Api from '../../api/AllApi';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await All_Api.getOrderAdminById(id);
        setOrder(response);
        console.log('Fetched order detail:', response);
      } catch (error) {
        console.error('Error fetching order detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading || !order) {
    return <div className="text-center p-6 text-gray-600">Đang tải...</div>;
  }

  const {
    orderID,
    customer = {},
    order_date,
    invoice = {},
    total_amount,
    order_details = [],
  } = order;

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Chi tiết đơn hàng #{orderID}
        </h1>

        <div className="space-y-2 text-gray-700 text-sm sm:text-base">
          <p>
            <strong>Khách hàng:</strong> {customer.full_name || 'N/A'}
          </p>
          <p>
            <strong>Ngày đặt:</strong>{' '}
            {order_date ? new Date(order_date).toLocaleDateString() : 'N/A'}
          </p>
          <p>
            <strong>Trạng thái:</strong>{' '}
            <span
              className={`inline-block px-2 py-1 text-xs rounded-full ${
                order.invoice?.status === 'paid'
                  ? 'bg-green-100 text-green-700'
                  : order.invoice.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {order.invoice?.status || 'N/A'}
            </span>
          </p>
          <p>
            <strong>Tổng tiền:</strong>{' '}
            {total_amount?.toLocaleString() || 0} VNĐ
          </p>
          <p>
            <strong>Địa chỉ giao hàng:</strong>{' '}
            {customer.address || 'Không có địa chỉ'}
          </p>
          <p>
            <strong>Phương thức thanh toán:</strong>{' '}
            {invoice.method === 'cash'
              ? 'Tiền mặt'
              : invoice.method === 'bank_transfer'
              ? 'Chuyển khoản'
              : 'N/A'}
          </p>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-4 text-gray-800">
          Sản phẩm
        </h2>

        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Sản phẩm
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Danh mục
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Số lượng
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Giá
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Tổng giá
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order_details.length > 0 ? (
                order_details.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{item.product_name}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">
                      {item.price?.toLocaleString()} VNĐ
                    </td>
                    <td className="px-4 py-3">
                      {(item.price * item.quantity).toLocaleString()} VNĐ
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    Không có sản phẩm
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
