import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import All_Api from '../../../api/AllApi';
const SupplierOrderDetail = () => {
  const { id } = useParams();

  const [purchase, setPurchase] = useState([]);
    
  useEffect(()=> {
    const fetchPurchase = async () => {
      try {
        const response = await All_Api.getPurchaseDetailById(id);
        setPurchase(response);
        console.log("Dữ liệu đơn hàng:", response);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchPurchase();
  }, [id]);

return (
  <div className="bg-white p-6 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
      Chi tiết đơn hàng
    </h2>

    {/* Bảng cho màn hình >= md */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left font-semibold border-b">ID</th>
            <th className="py-3 px-4 text-left font-semibold border-b">Sản phẩm</th>
            <th className="py-3 px-4 text-center font-semibold border-b">Hình ảnh</th>
            <th className="py-3 px-4 text-right font-semibold border-b">Số lượng</th>
            <th className="py-3 px-4 text-right font-semibold border-b">Giá (VNĐ)</th>
            <th className="py-3 px-4 text-right font-semibold border-b">Tổng giá (VNĐ)</th>
            <th className="py-3 px-4 text-center font-semibold border-b">Trạng thái</th>
            <th className="py-3 px-4 text-center font-semibold border-b">Ngày mua</th>
            <th className="py-3 px-4 text-center font-semibold border-b">Thanh toán</th>
          </tr>
        </thead>
        <tbody>
          {purchase.map((item, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="py-3 px-4 border-b">{item.purchaseDetailID}</td>
              <td className="py-3 px-4 border-b">{item.product}</td>
              <td className="py-3 px-4 border-b text-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.product}
                    className="w-16 h-16 object-cover rounded-md shadow-sm mx-auto"
                  />
                ) : (
                  <span className="text-gray-400 italic">N/A</span>
                )}
              </td>
              <td className="py-3 px-4 border-b text-right">
                {item.quantity?.toLocaleString("vi-VN")}
              </td>
              <td className="py-3 px-4 border-b text-right">
                {item.price
                  ? Number(item.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      minimumFractionDigits: 0,
                    })
                  : "0₫"}
              </td>
              <td className="py-3 px-4 border-b text-right font-semibold text-blue-600">
                {item.total_price
                  ? Number(item.total_price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      minimumFractionDigits: 0,
                    })
                  : "0₫"}
              </td>
              <td className="py-3 px-4 border-b text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : item.status === "unpaid"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-3 px-4 border-b text-center">
                {item.purchase_date
                  ? new Date(item.purchase_date).toLocaleDateString("vi-VN")
                  : "N/A"}
              </td>
              <td className="py-3 px-4 border-b text-center">{item.payment_method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Card view cho mobile */}
    <div className="md:hidden space-y-4">
      {purchase.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-sm bg-gray-50"
        >
          <div className="flex items-center space-x-4 mb-3">
            {item.image ? (
              <img
                src={item.image}
                alt={item.product}
                className="w-16 h-16 object-cover rounded-md shadow"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                <span className="text-gray-400 text-sm">N/A</span>
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">{item.product}</p>
              <p className="text-sm text-gray-500">ID: {item.purchaseDetailID}</p>
            </div>
          </div>

          <div className="space-y-1 text-sm text-gray-700">
            <p>
              <span className="font-medium">Số lượng:</span>{" "}
              {item.quantity?.toLocaleString("vi-VN")}
            </p>
            <p>
              <span className="font-medium">Giá:</span>{" "}
              {item.price?.toLocaleString("vi-VN")}
            </p>
            <p>
              <span className="font-medium">Tổng:</span>{" "}
              <span className="font-semibold text-blue-600">
                {item.total_price?.toLocaleString("vi-VN")}
              </span>
            </p>
            <p>
              <span className="font-medium">Trạng thái:</span>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Ngày mua:</span>{" "}
              {item.purchase_date
                ? new Date(item.purchase_date).toLocaleDateString("vi-VN")
                : "N/A"}
            </p>
            <p>
              <span className="font-medium">Thanh toán:</span>{" "}
              {item.payment_method}
            </p>
          </div>
        </div>
      ))}
    </div>

    <Link
      to="/supplier/purchases"
      className="mt-6 inline-block bg-gray-600 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-700 transition-colors"
    >
      Quay lại
    </Link>
  </div>
);

};

export default SupplierOrderDetail;