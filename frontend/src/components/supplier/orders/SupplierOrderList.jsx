import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import All_Api from "../../../api/AllApi";

const SupplierOrderList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await All_Api.getPurchases();
        setPurchases(response);
        console.log("Fetched purchases:", response);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Danh sách đơn hàng
      </h2>

      {/* Table view cho desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold border-b">ID</th>
              <th className="py-3 px-4 text-left font-semibold border-b">Tổng tiền (VNĐ)</th>
              <th className="py-3 px-4 text-left font-semibold border-b">Trạng thái</th>
              <th className="py-3 px-4 text-left font-semibold border-b">Ngày đặt</th>
              <th className="py-3 px-4 text-center font-semibold border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((order, idx) => (
              <tr
                key={order.purchaseID}
                className={`hover:bg-gray-50 transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-4 border-b text-gray-700">{order.purchaseID}</td>
                <td className="py-3 px-4 border-b text-gray-700 font-medium">
                  {order.total_amount
                    ? Number(order.total_amount).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                      })
                    : "0₫"}
                </td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "unpaid"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b text-gray-600">
                  {order.purchase_date
                    ? new Date(order.purchase_date).toLocaleDateString("vi-VN")
                    : "N/A"}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <Link
                    to={`/supplier/purchases/${order.purchaseID}`}
                    className="inline-block bg-blue-500 text-white px-3 py-1.5 rounded-lg shadow hover:bg-blue-600 transition-colors"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view cho mobile */}
      <div className="md:hidden space-y-4">
        {purchases.map((order) => (
          <div
            key={order.purchaseID}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">ID:</span> {order.purchaseID}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Tổng tiền:</span>{" "}
              {order.total_amount
                ? Number(order.total_amount).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                  })
                : "0₫"}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Trạng thái:</span>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Ngày đặt:</span>{" "}
              {order.purchase_date
                ? new Date(order.purchase_date).toLocaleDateString("vi-VN")
                : "N/A"}
            </p>
            <Link
              to={`/supplier/purchases/${order.purchaseID}`}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors w-full text-center"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierOrderList;
