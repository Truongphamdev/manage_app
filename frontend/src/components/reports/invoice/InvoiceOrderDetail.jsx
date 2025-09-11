import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, FileText, User } from "lucide-react";
import All_Api from "../../../api/AllApi";

export const InvoiceOrderDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        const response = await All_Api.getInvoiceOrderById(id);
        setInvoice(response);
        console.log("Chi tiết hóa đơn:", response);
      } catch (err) {
        setError("Lỗi khi tải chi tiết hóa đơn: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchInvoiceDetail();
  }, [id]);
  console.log("invoice", invoice);
  const handleExportInvoice = async (invoiceId) => {
    try {
        const response = await All_Api.exportInvoiceOrder(invoiceId);
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `hoa_don_ban_${invoiceId}.docx`);
        document.body.appendChild(link);
        console.log("Xuất hóa đơn bán:", response);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error exporting invoice:", error);
    }
  }

  if (loading) return <div className="text-center py-10 text-lg">⏳ Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!invoice) return <div className="text-center py-10">Không tìm thấy hóa đơn</div>;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl max-w-5xl mx-auto border border-gray-200">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between mb-8 sm:flex-row flex-col gap-4">
        <h1 className="flex items-center gap-2 text-3xl font-bold mb-8 text-blue-700">
          <FileText className="w-7 h-7" />
          Chi tiết hóa đơn bán
        </h1>
      <button onClick={() => handleExportInvoice(invoice.id)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        Xuất hóa đơn
      </button>
      </div>

      {/* Grid thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800">
            <FileText className="w-5 h-5 text-blue-500" /> Thông tin hóa đơn
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Mã:</strong> {invoice.purchase_id}</p>
            <p><strong>Số hóa đơn:</strong> {invoice.invoice_number}</p>
            <p><strong>Ngày mua:</strong> {new Date(invoice.purchase_date).toLocaleDateString()}</p>
            <p><strong className="text-blue-600">Tổng số tiền:</strong> 
              {" "}{invoice.total_amount?.toLocaleString("vi-VN")} ₫
            </p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-800">
            <User className="w-5 h-5 text-green-500" /> Khách hàng
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Tên:</strong> {invoice.customer_name}</p>
            <p><strong>Email:</strong> {invoice.customer_email}</p>
            <p><strong>Điện thoại:</strong> {invoice.customer_phone}</p>
            <p><strong>Địa chỉ:</strong> {invoice.customer_address}</p>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Danh sách sản phẩm</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Tên sản phẩm</th>
                <th className="py-3 px-4 text-center font-semibold">Số lượng</th>
                <th className="py-3 px-4 text-center font-semibold">Giá bán</th>
                <th className="py-3 px-4 text-center font-semibold">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items?.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="py-3 px-4 border-b">{item.product_name}</td>
                  <td className="py-3 px-4 border-b text-center">{item.quantity}</td>
                  <td className="py-3 px-4 border-b text-center text-gray-700">
                    {item.price?.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="py-3 px-4 border-b text-center font-semibold text-blue-600">
                    {item.total?.toLocaleString("vi-VN")} ₫
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-bold text-blue-700">
                <td colSpan="3" className="py-3 px-4 text-right border-t">Tổng cộng</td>
                <td className="py-3 px-4 text-center border-t">
                  {invoice.total_amount?.toLocaleString("vi-VN")} ₫
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Button back */}
      <div className="mt-8 text-center">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          <ArrowLeft className="w-5 h-5" /> Quay lại
        </button>
      </div>
    </div>
  );
};
