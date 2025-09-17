import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import All_Api from '../../api/AllApi';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [searchMode, setSearchMode] = useState(false);

  // 1. Hàm lấy tất cả order
  const fetchAllOrders = async (page = 1) => {
    try {
      setLoading(true);
      const response = await All_Api.getOrdersAdmin({ params: { page } });
      setOrders(response.results || []);
      setCount(response.count || 0);
      setNext(response.next || null);
      setPrevious(response.previous || null);
      setPage(page);
      setSearchMode(false);
      console.log('Fetched all orders:', response.results);
    } catch (error) {
      console.error('Error fetching all orders:', error);
    } finally {
      setLoading(false);
    }
  };


  // Khi vừa vào trang, load tất cả order
  useEffect(() => {
    fetchAllOrders(1);
  }, []);


  // 4. Handler chuyển trang
  const handlePageChange = (newPage) => {

      fetchAllOrders(newPage);
    
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Danh sách đơn hàng
      </h1>
      {orders.length === 0 && !loading && (
        <div className="text-center text-gray-600">Không có đơn hàng nào.</div>
      )}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto " >
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Khách hàng</th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Ngày đặt</th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Trạng thái</th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Tổng tiền</th>
              <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => {
              const status = order.invoice?.status || 'N/A';
              const statusColor =
                status === 'paid'
                  ? 'bg-green-100 text-green-700'
                  : status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : status === 'cancelled'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700';
              return (
                <tr key={order.orderID} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium">{order.orderID}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{order.customer?.full_name}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusColor}`}>{status}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{Number(order.total_amount).toLocaleString()} VNĐ</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <Link to={`/admin/orders/${order.orderID}`} className="text-blue-600 hover:text-blue-800 font-medium">Chi tiết</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4 gap-2">
       <button
  disabled={!previous || orders.length === 0}
  onClick={() => handlePageChange(page - 1)}
  className={`px-4 py-2 rounded ${(!previous || orders.length === 0) ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
>
  Trang trước
</button>
<span className="mx-2 text-gray-700">Trang {page}</span>
<button
  disabled={!next || orders.length === 0}
  onClick={() => handlePageChange(page + 1)}
  className={`px-4 py-2 rounded ${(!next || orders.length === 0) ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
>
  Trang sau
</button>
      </div>
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600 text-lg">Đang tải...</div>
        </div>
      )}
    </div>
  );
};

export default OrderList;