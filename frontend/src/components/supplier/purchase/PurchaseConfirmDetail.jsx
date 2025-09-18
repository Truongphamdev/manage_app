import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import All_Api from "../../../api/AllApi";


const PurchaseConfirmDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        setLoading(true);
        const response = await All_Api.getPurchaseConfirmById(id);
        setPurchase(response);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchase();
  }, [id]);

  const totalAmount = purchase?.purchase_details.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // xử lý approve
  const handleApprove = async (id) => {
    try {
      await All_Api.approvePurchase(id);
      alert('Đã duyệt đơn hàng thành công!');
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };
  // xử lý reject
  const handleReject = async (id) => {
    try {
      await All_Api.rejectPurchase(id);
      alert('Đã từ chối đơn hàng thành công!');
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };


  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (!purchase) return <div className="text-center py-8">Không tìm thấy đơn hàng</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Chi tiết đơn hàng #{purchase.purchaseID}
      </h1>

      {/* Thông tin khách hàng */}
      <div className="mb-6 space-y-1 text-gray-700">
        <p><strong>Khách hàng:</strong> Nguyễn Nhật Trường</p>
        <p><strong>Email:</strong> truongnguyen01653@gmail.com</p>
        <p><strong>Điện thoại:</strong> 0365908714</p>
        <p><strong>Địa chỉ:</strong> Thành phố Fleiku, tỉnh Gia Lai</p>
        <p><strong>Ngày đặt:</strong> {new Date(purchase.purchase_date).toLocaleString("vi-VN")}</p>
      </div>

      {/* Danh sách sản phẩm */}
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Sản phẩm trong đơn</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Sản phẩm</th>
              <th className="px-4 py-2 text-left">Danh mục</th>
              <th className="px-4 py-2 text-center">SL</th>
              <th className="px-4 py-2 text-right">Giá</th>
              <th className="px-4 py-2 text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {purchase.purchase_details.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2">{item.product_name}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2 text-center">{item.quantity}</td>
                <td className="px-4 py-2 text-right">
                  {item.price.toLocaleString("vi-VN")} ₫
                </td>
                <td className="px-4 py-2 text-right">
                  {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold">
              <td colSpan={4} className="px-4 py-2 text-right">Tổng cộng</td>
              <td className="px-4 py-2 text-right text-blue-600">
                {totalAmount.toLocaleString("vi-VN")} ₫
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Nút hành động */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Quay lại
        </button>

        <button
          onClick={() => handleReject(purchase.purchaseID)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          Hủy đơn
        </button>

        <button
          onClick={() => handleApprove(purchase.purchaseID)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default PurchaseConfirmDetail;
