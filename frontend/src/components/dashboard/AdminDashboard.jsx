import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalStock: 0,
    topProduct: { product: '', unitsSold: 0 },
    recentOrders: [],
    lowStockProducts: [],
  });

  useEffect(() => {
    // Dữ liệu từ OrderDetail.jsx
    const mockOrders = [
      {
        id: 1,
        customer: 'Nguyễn Văn A',
        date: '2025-08-01',
        status: 'Pending',
        total: 1000000,
        items: [
          { product: 'Xi măng PC40', quantity: 10 },
          { product: 'Gạch đỏ 4 lỗ', quantity: 100 },
        ],
      },
      {
        id: 2,
        customer: 'Trần Thị B',
        date: '2025-08-02',
        status: 'Confirmed',
        total: 2000000,
        items: [
          { product: 'Thép phi 16', quantity: 50 },
          { product: 'Xi măng PC40', quantity: 15 },
        ],
      },
      {
        id: 3,
        customer: 'Lê Văn C',
        date: '2025-08-03',
        status: 'Delivered',
        total: 1500000,
        items: [
          { product: 'Gạch đỏ 4 lỗ', quantity: 200 },
          { product: 'Thép phi 16', quantity: 30 },
        ],
      },
      {
        id: 4,
        customer: 'Phạm Thị D',
        date: '2025-08-04',
        status: 'Pending',
        total: 800000,
        items: [{ product: 'Xi măng PC40', quantity: 8 }],
      },
      {
        id: 5,
        customer: 'Hoàng Văn E',
        date: '2025-08-05',
        status: 'Confirmed',
        total: 2500000,
        items: [
          { product: 'Thép phi 16', quantity: 100 },
          { product: 'Gạch đỏ 4 lỗ', quantity: 150 },
        ],
      },
      {
        id: 6,
        customer: 'Ngô Thị F',
        date: '2025-08-06',
        status: 'Cancelled',
        total: 1200000,
        items: [
          { product: 'Xi măng PC40', quantity: 12 },
          { product: 'Gạch đỏ 4 lỗ', quantity: 80 },
        ],
      },
      {
        id: 7,
        customer: 'Đinh Văn G',
        date: '2025-08-07',
        status: 'Delivered',
        total: 1800000,
        items: [
          { product: 'Thép phi 16', quantity: 60 },
          { product: 'Xi măng PC40', quantity: 10 },
        ],
      },
      {
        id: 8,
        customer: 'Bùi Thị H',
        date: '2025-08-08',
        status: 'Pending',
        total: 900000,
        items: [{ product: 'Gạch đỏ 4 lỗ', quantity: 300 }],
      },
      {
        id: 9,
        customer: 'Vũ Văn I',
        date: '2025-08-09',
        status: 'Confirmed',
        total: 3000000,
        items: [
          { product: 'Xi măng PC40', quantity: 20 },
          { product: 'Thép phi 16', quantity: 80 },
        ],
      },
      {
        id: 10,
        customer: 'Trương Thị K',
        date: '2025-08-10',
        status: 'Delivered',
        total: 2200000,
        items: [
          { product: 'Gạch đỏ 4 lỗ', quantity: 100 },
          { product: 'Thép phi 16', quantity: 50 },
        ],
      },
    ];

    // Dữ liệu từ ProductDetail.jsx
    const mockProducts = [
      { id: 1, name: 'Xi măng PC40', category: 'Xi măng', stock: 100 },
      { id: 2, name: 'Gạch đỏ 4 lỗ', category: 'Gạch', stock: 5000 },
      { id: 3, name: 'Thép phi 16', category: 'Sắt thép', stock: 200 },
      { id: 4, name: 'Xi măng PC50', category: 'Xi măng', stock: 80 },
      { id: 5, name: 'Gạch men 60x60', category: 'Gạch', stock: 2000 },
      { id: 6, name: 'Thép phi 12', category: 'Sắt thép', stock: 300 },
      { id: 7, name: 'Cát xây dựng', category: 'Vật liệu thô', stock: 150 },
      { id: 8, name: 'Đá 1x2', category: 'Vật liệu thô', stock: 120 },
      { id: 9, name: 'Sơn nước nội thất', category: 'Sơn', stock: 50 },
      { id: 10, name: 'Gạch đỏ 6 lỗ', category: 'Gạch', stock: 4000 },
    ];

    // Dữ liệu từ ReportDetail.jsx (chỉ lấy báo cáo Doanh thu)
    const mockReports = [
      {
        ReportID: 1,
        Type: 'Doanh thu',
        Content: {
          data: [
            { product: 'Xi măng PC40', revenue: 2000000000, unitsSold: 25000 },
            { product: 'Gạch đỏ 4 lỗ', revenue: 1500000000, unitsSold: 1250000 },
            { product: 'Thép phi 16', revenue: 1500000000, unitsSold: 100000 },
          ],
        },
      },
      {
        ReportID: 4,
        Type: 'Doanh thu',
        Content: {
          data: [{ product: 'Xi măng PC40', revenue: 2000000000, unitsSold: 25000 }],
        },
      },
      {
        ReportID: 8,
        Type: 'Doanh thu',
        Content: {
          data: [{ product: 'Thép phi 16', revenue: 1500000000, unitsSold: 100000 }],
        },
      },
    ];

    // Tính toán số liệu cho dashboard
    const totalOrders = mockOrders.length;
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
    const totalStock = mockProducts.reduce((sum, product) => sum + product.stock, 0);

    // Tìm sản phẩm bán chạy nhất
    const productSales = {};
    mockReports
      .filter((report) => report.Type === 'Doanh thu')
      .forEach((report) => {
        report.Content.data.forEach((item) => {
          productSales[item.product] = (productSales[item.product] || 0) + item.unitsSold;
        });
      });
    const topProduct = Object.entries(productSales).reduce(
      (max, [product, unitsSold]) => (unitsSold > max.unitsSold ? { product, unitsSold } : max),
      { product: '', unitsSold: 0 }
    );

    // Lấy 3 đơn hàng gần đây nhất
    const recentOrders = mockOrders
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3)
      .map((order) => ({
        id: order.id,
        customer: order.customer,
        total: order.total,
        status: order.status,
      }));

    // Lấy sản phẩm tồn kho thấp (stock < 100)
    const lowStockProducts = mockProducts
      .filter((product) => product.stock < 100)
      .map((product) => ({
        name: product.name,
        category: product.category,
        stock: product.stock,
      }));

    setDashboardData({
      totalOrders,
      totalRevenue,
      totalStock,
      topProduct,
      recentOrders,
      lowStockProducts,
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bảng điều khiển Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tổng đơn hàng</h2>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.totalOrders.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tồn kho</h2>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.totalStock.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Doanh thu</h2>
          <p className="text-3xl font-bold text-blue-600">{dashboardData.totalRevenue.toLocaleString()} VNĐ</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Sản phẩm bán chạy</h2>
          <p className="text-lg text-gray-600">Sản phẩm: {dashboardData.topProduct.product}</p>
          <p className="text-2xl font-bold text-blue-600">{dashboardData.topProduct.unitsSold.toLocaleString()} đơn vị</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Đơn hàng gần đây</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dashboardData.recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border">{order.id}</td>
                <td className="py-2 px-4 border">{order.customer}</td>
                <td className="py-2 px-4 border">{order.total.toLocaleString()} VNĐ</td>
                <td className="py-2 px-4 border">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Sản phẩm tồn kho thấp</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dashboardData.lowStockProducts.map((product, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">{product.category}</td>
                <td className="py-2 px-4 border">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;