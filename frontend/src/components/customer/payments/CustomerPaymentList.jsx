import React, { useEffect, useState } from 'react';
import All_Api from '../../../api/AllApi';

const CustomerPaymentList = () => {
  const [allPayments, setAllPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await All_Api.getPaymentHistory();
        setAllPayments(response);
        console.log('Fetched payment history:', response);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-blue-700 font-medium">
        Đang tải lịch sử thanh toán...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        💳 Lịch sử thanh toán
      </h2>

      {/* Bảng hiển thị cho màn hình >= sm */}
      <div className="hidden sm:block max-h-[60vh] overflow-y-auto  md:overflow-x-auto max-w-full rounded-xl shadow border border-blue-100 bg-white">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Mã đơn hàng</th>
              <th className="py-3 px-4 text-left">Mã giao dịch</th>
              <th className="py-3 px-4 text-left">Số tiền (VNĐ)</th>
              <th className="py-3 px-4 text-left">Phương thức</th>
              <th className="py-3 px-4 text-left">Trạng thái</th>
              <th className="py-3 px-4 text-left">Ngày thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {allPayments.map((payment, idx) => (
              <tr
                key={payment.id}
                className={
                  idx % 2 === 0
                    ? 'bg-white hover:bg-blue-50 transition'
                    : 'bg-blue-50 hover:bg-blue-100 transition'
                }
              >
                <td className="py-2 px-4 text-gray-700">{payment.id}</td>
                <td className="py-2 px-4 text-gray-700">{payment.order}</td>
                <td className="py-2 px-4 text-gray-700">{payment.transaction_id}</td>
                <td className="py-2 px-4 text-gray-700">
                  {Number(payment.amount).toLocaleString('vi-VN')}
                </td>
                <td className="py-2 px-4 text-gray-700">
                  {payment.payment_method === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}
                </td>
                <td
                  className={`py-2 px-4 font-medium ${
                    payment.status === 'completed'
                      ? 'text-green-600'
                      : payment.status === 'pending'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {payment.status}
                </td>
                <td className="py-2 px-4 text-gray-700">
                  {new Date(payment.payment_date).toLocaleDateString('vi-VN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dạng card cho mobile */}
      <div className="sm:hidden space-y-4 max-h-[60vh] overflow-y-auto">
        {allPayments.map((payment) => (
          <div
            key={payment.id}
            className="border border-blue-200 bg-white rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <p className="text-blue-800 font-semibold">ID: {payment.id}</p>
            <p className="text-gray-700">
              <span className="font-semibold">Mã đơn hàng:</span> {payment.order}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Mã giao dịch:</span> {payment.transaction_id}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Số tiền:</span>{' '}
              {Number(payment.amount).toLocaleString('vi-VN')} VNĐ
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phương thức:</span>{' '}
              {payment.payment_method === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}
            </p>
            <p
              className={`font-medium ${
                payment.status === 'completed'
                  ? 'text-green-600'
                  : payment.status === 'pending'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              Trạng thái: {payment.status}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Ngày thanh toán:</span>{' '}
              {new Date(payment.payment_date).toLocaleDateString('vi-VN')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPaymentList;
