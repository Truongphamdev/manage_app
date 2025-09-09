import React, { useEffect, useState } from 'react'
import All_Api from '../../../api/AllApi';
import { Link } from 'react-router-dom';

export const InvoicePurchase = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchInvoices = async () => {
    try {
      const response = await All_Api.getInvoicesPurchase();
      setInvoices(response);
      console.log("invoices", response);
    }
    catch (error) {
      console.error("Error fetching invoices:", error);
    }
    finally {
        setLoading(false);
      }
  }
  useEffect(()=> {
    fetchInvoices();
  },[])
  const handleDeleteInvoice = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) return;
    setLoading(true);
    try {
      await All_Api.deleteInvoicePurchase(id);
      setInvoices(invoices.filter(invoice => invoice.id !== id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Danh sách hóa đơn mua</h1>

      {/* Table for desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Mã hóa đơn</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Tổng tiền</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Số hóa đơn</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr
                key={invoice.id || index}
                className={`hover:bg-blue-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-4 border-b text-gray-700">{invoice.id}</td>
                <td className="py-3 px-4 border-b text-gray-700">{invoice.purchase}</td>
                <td className="py-3 px-4 border-b text-gray-700">{invoice.total_amount}</td>
                <td className="py-3 px-4 border-b text-gray-700">{invoice.invoice_number}</td>
                <td className="py-3 px-4 border-b">
                  <Link
                    to={`/admin/invoices/purchase/${invoice.id}`}
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    Xem chi tiết
                  </Link>
                  <button className='text-red-500 hover:text-red-700 underline ml-2' onClick={() => handleDeleteInvoice(invoice.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <div className="md:hidden space-y-4">
        {invoices.map((invoice, index) => (
          <div
            key={invoice.id || index}
            className="border rounded-xl p-4 shadow-sm bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">ID: {invoice.id}</span>
              <span className="text-sm text-gray-500">Purchase: {invoice.purchase}</span>
            </div>
            <div className="text-gray-700 mb-2">
              <p>Total: {invoice.total_amount}</p>
              <p>Invoice: {invoice.invoice_number}</p>
            </div>
            <Link
              to={`/admin/invoices/purchase/${invoice.id}`}
              className="text-blue-500 hover:text-blue-700 underline text-sm"
            >
              Xem chi tiết
            </Link>
            <button className='text-red-500 hover:text-red-700 underline ml-2 text-sm' onClick={() => handleDeleteInvoice(invoice.id)}>Xóa</button>
          </div>
        ))}
      </div>
    </div>
  );
};
