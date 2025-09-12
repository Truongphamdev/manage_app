import React, { useState } from "react";
import { useParams } from "react-router-dom";
import All_Api from "../../api/AllApi";

const InventoryReport = () => {
  const [report, setReport] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { start_date: startDate, end_date: endDate };
      const response = await All_Api.getReportRevenue(params);
      setReport(response);
      console.log("Báo cáo doanh thu:", response);
    } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "Lỗi không xác định";
    setError("Lỗi khi xuất báo cáo: " + errorMessage);
    console.log("Error exporting report:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = { start_date: startDate, end_date: endDate };
      const response = await All_Api.exportReportRevenue(params);
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bao_cao_doanh_thu.docx");
      document.body.appendChild(link);
    console.log("Xuất báo cáo doanh thu:", response);
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
    } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || "Lỗi không xác định";
    setError("Lỗi khi xuất báo cáo: " + errorMessage);
    console.log("Error exporting report:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">


      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        📊 Báo cáo Doanh Thu
      </h1>

      {/* Bộ lọc ngày + nút */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Ngày bắt đầu:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Ngày kết thúc:
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-end gap-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              fetchReport();
            }}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Tải báo cáo
          </button>

          <button
            onClick={handleExport}
            disabled={!report}
            className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg shadow hover:bg-green-600 disabled:bg-gray-300 transition"
          >
            Xuất Word
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-blue-500">Đang tải báo cáo...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Kết quả báo cáo */}
{report && (
  <div className="mt-6">
    {/* Thông tin thời gian báo cáo */}
    <div className="mb-4 text-sm text-gray-600">
      <p>
        <span className="font-medium">⏱ Thời gian báo cáo:</span>{" "}
        {new Date(report.start_date).toLocaleDateString("vi-VN")} →{" "}
        {new Date(report.end_date).toLocaleDateString("vi-VN")}
      </p>
    </div>

{/* Bảng view cho desktop */}
<div className="hidden md:block overflow-x-auto">
  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        <th className="py-3 px-4 text-center font-semibold border-b">
          Tổng doanh thu
        </th>
        <th className="py-3 px-4 text-center font-semibold border-b">
          Đã thanh toán
        </th>
        <th className="py-3 px-4 text-center font-semibold border-b">
          Chưa thanh toán
        </th>
        <th className="py-3 px-4 text-center font-semibold border-b">
          Doanh Thu Ròng
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-blue-50 transition">
        <td className="py-3 px-4 border-b text-center text-blue-600 font-semibold">
          {report.total_revenue?.toLocaleString("vi-VN")} ₫
        </td>
        <td className="py-3 px-4 border-b text-center text-green-600 font-medium">
          {report.total_paid_purchase ? report.total_paid_purchase?.toLocaleString("vi-VN") : 0} ₫
        </td>
        <td className="py-3 px-4 border-b text-center text-red-600 font-medium">
          {report.total_unpaid_purchases?.toLocaleString("vi-VN")} ₫
        </td>
        <td className="py-3 px-4 border-b text-center text-purple-600 font-semibold">
          {report.total_amount?.toLocaleString("vi-VN")} ₫
        </td>
      </tr>
    </tbody>
  </table>
</div>

{/* Card view cho mobile */}
<div className="md:hidden mt-4 space-y-4">
  <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
    <h3 className="font-semibold text-lg text-gray-900 mb-2">
      Báo cáo doanh thu
    </h3>
    <p className="text-xs text-gray-500 mb-3">
      ⏱ {new Date(report.start_date).toLocaleDateString("vi-VN")} →{" "}
      {new Date(report.end_date).toLocaleDateString("vi-VN")}
    </p>
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div className="p-2 bg-blue-50 rounded">
        <p className="text-gray-500">Tổng doanh thu</p>
        <p className="font-semibold text-blue-600">
          {report.total_revenue?.toLocaleString("vi-VN")} ₫
        </p>
      </div>
      <div className="p-2 bg-green-50 rounded">
        <p className="text-gray-500">Đã thanh toán</p>
        <p className="font-medium text-green-600">
          {report.total_paid_purchase?.toLocaleString("vi-VN")} ₫
        </p>
      </div>
      <div className="p-2 bg-red-50 rounded">
        <p className="text-gray-500">Chưa thanh toán</p>
        <p className="font-medium text-red-600">
          {report.total_unpaid_purchases?.toLocaleString("vi-VN")} ₫
        </p>
      </div>
      <div className="p-2 bg-purple-50 rounded">
        <p className="text-gray-500">Doanh Thu Ròng</p>
        <p className="font-semibold text-purple-600">
          {report.total_amount?.toLocaleString("vi-VN")} ₫
        </p>
      </div>
    </div>
  </div>
</div>
</div>
)}


      {/* Không có dữ liệu */}
      {!loading && !report && !error && startDate && endDate && (
        <p className="text-gray-500 mt-4">
          ⚠️ Không có dữ liệu báo cáo cho khoảng thời gian này.
        </p>
      )}
    </div>
  );
};

export default InventoryReport;
