import React, { useEffect, useState, useRef } from "react";
import All_Api from "../../api/AllApi";
import Chart from "chart.js/auto";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [statisticalPurchaseData, setStatisticalPurchaseData] = useState({ labels: [], data: [] });
  const [statisticalSalesData, setStatisticalSalesData] = useState({ labels: [], data: [] });
  const purchaseChartRef = useRef(null);
  const salesChartRef = useRef(null);
  const purchaseChartInstance = useRef(null);
  const salesChartInstance = useRef(null);

  // Fetch tổng quan
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await All_Api.getDashboardData();
        setDashboardData(res);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Fetch thống kê theo năm
  useEffect(() => {
    const fetchStatisticalData = async () => {
      try {
        const salesRes = await All_Api.getStatisticalSalesDate({ year });
        setStatisticalSalesData(salesRes);

        const purchaseRes = await All_Api.getStatisticalPurchaseData({ year });
        setStatisticalPurchaseData(purchaseRes);
      } catch (err) {
        console.error("Error fetching statistical data:", err);
      }
    };
    fetchStatisticalData();
  }, [year]);

  // Vẽ Chart
  useEffect(() => {
    if (purchaseChartInstance.current) purchaseChartInstance.current.destroy();
    if (salesChartInstance.current) salesChartInstance.current.destroy();

    if (purchaseChartRef.current && statisticalPurchaseData.labels.length) {
      purchaseChartInstance.current = new Chart(purchaseChartRef.current, {
        type: "bar",
        data: {
          labels: statisticalPurchaseData.labels,
          datasets: [
            {
              label: "Số lượng hàng hóa mua",
              data: statisticalPurchaseData.data,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } },
      });
    }

    if (salesChartRef.current && statisticalSalesData.labels.length) {
      salesChartInstance.current = new Chart(salesChartRef.current, {
        type: "bar",
        data: {
          labels: statisticalSalesData.labels,
          datasets: [
            {
              label: "Số lượng hàng hóa bán",
              data: statisticalSalesData.data,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } },
      });
    }

    return () => {
      if (purchaseChartInstance.current) purchaseChartInstance.current.destroy();
      if (salesChartInstance.current) salesChartInstance.current.destroy();
    };
  }, [statisticalPurchaseData, statisticalSalesData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
        Bảng điều khiển Admin
      </h1>

      {/* Tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Tổng đơn hàng", value: dashboardData.total_orders },
          { title: "Tồn kho", value: dashboardData.total_stock },
          { title: "Doanh thu", value: `${Number(dashboardData.total_revenue || 0).toLocaleString()} VNĐ` },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">{item.title}</h2>
            <p className="text-3xl font-bold text-blue-600">{item.value || 0}</p>
          </div>
        ))}
      </div>

      {/* Bộ lọc năm */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-700">Chọn năm để xem thống kê</h2>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        >
          {[2022, 2023, 2024, 2025, 2026].map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow h-80">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Thống kê hàng mua theo tháng</h3>
          <div className="h-64">
            <canvas ref={purchaseChartRef}></canvas>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow h-80">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Thống kê hàng bán theo tháng</h3>
          <div className="h-64">
            <canvas ref={salesChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Đơn hàng gần đây */}
      <section className="bg-white rounded-2xl shadow p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Đơn hàng gần đây</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                {["Mã đơn hàng", "Khách hàng", "Tổng tiền", "Trạng thái"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-gray-600 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {dashboardData?.recent_orders?.map((o) => (
                <tr key={o.orderID} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{o.orderID}</td>
                  <td className="px-4 py-2">{o.customer.full_name}</td>
                  <td className="px-4 py-2">{Number(o.total_amount).toLocaleString()} VNĐ</td>
                  <td className="px-4 py-2">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sản phẩm tồn kho thấp */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sản phẩm tồn kho thấp</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                {["Sản phẩm", "Danh mục", "Tồn kho", "Kho"].map((h) => (
                  <th key={h} className="px-4 py-2 font-semibold text-gray-600 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {dashboardData?.low_stock_products?.map((p, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{p.product_name}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">{p.quantity}</td>
                  <td className="px-4 py-2">{p.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
