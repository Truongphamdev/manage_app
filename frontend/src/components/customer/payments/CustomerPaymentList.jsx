import React from 'react';

const CustomerPaymentList = () => {
  const mockPayments = [
    { id: 1, orderId: 1, amount: 10000000, method: 'Thẻ tín dụng', status: 'Hoàn tất', date: '2025-09-01' },
    { id: 2, orderId: 2, amount: 20000000, method: 'Chuyển khoản', status: 'Hoàn tất', date: '2025-09-02' },
    { id: 3, orderId: 3, amount: 15000000, method: 'Tiền mặt', status: 'Hoàn tất', date: '2025-09-03' },
    { id: 4, orderId: 4, amount: 25000000, method: 'Thẻ tín dụng', status: 'Hoàn tất', date: '2025-09-04' },
    { id: 5, orderId: 5, amount: 30000000, method: 'Chuyển khoản', status: 'Đang xử lý', date: '2025-09-05' },
    { id: 6, orderId: 6, amount: 18000000, method: 'Thẻ tín dụng', status: 'Hoàn tất', date: '2025-09-06' },
    { id: 7, orderId: 7, amount: 22000000, method: 'Tiền mặt', status: 'Hoàn tất', date: '2025-09-07' },
    { id: 8, orderId: 8, amount: 17000000, method: 'Chuyển khoản', status: 'Đang xử lý', date: '2025-09-08' },
    { id: 9, orderId: 9, amount: 19000000, method: 'Thẻ tín dụng', status: 'Hoàn tất', date: '2025-09-09' },
    { id: 10, orderId: 10, amount: 24000000, method: 'Tiền mặt', status: 'Hoàn tất', date: '2025-09-10' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Lịch sử thanh toán</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Mã đơn hàng</th>
              <th className="py-2 px-4 border">Số tiền (VNĐ)</th>
              <th className="py-2 px-4 border">Phương thức</th>
              <th className="py-2 px-4 border">Trạng thái</th>
              <th className="py-2 px-4 border">Ngày thanh toán</th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((payment) => (
              <tr key={payment.id}>
                <td className="py-2 px-4 border">{payment.id}</td>
                <td className="py-2 px-4 border">{payment.orderId}</td>
                <td className="py-2 px-4 border">{payment.amount.toLocaleString('vi-VN')}</td>
                <td className="py-2 px-4 border">{payment.method}</td>
                <td className="py-2 px-4 border">{payment.status}</td>
                <td className="py-2 px-4 border">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPaymentList;