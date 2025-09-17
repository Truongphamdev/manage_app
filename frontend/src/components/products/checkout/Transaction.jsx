import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Transaction = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Đã ghi nhận chuyển khoản
      </h1>

      <p className="text-gray-700 mb-6">
        Cảm ơn bạn đã thanh toán qua chuyển khoản.  
        Đơn hàng của bạn đang <strong>chờ nhà cung cấp xác nhận</strong>.  
        Sau khi xác nhận, chúng tôi sẽ tiến hành xử lý và giao hàng cho bạn.
      </p>

      <button
        onClick={() => navigate('/dashboard/admin')}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        Quay lại trang chủ
      </button>
    </div>
  );
};
