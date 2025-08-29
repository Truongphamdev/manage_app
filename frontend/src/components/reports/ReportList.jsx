import React from 'react';

const ReportList = () => {
  const reports = [
    { ReportID: 1, Type: 'Doanh thu', Created_at: '2025-08-01', Details: 'Doanh thu tháng 8/2025' },
    { ReportID: 2, Type: 'Tồn kho', Created_at: '2025-08-02', Details: 'Báo cáo tồn kho cuối tháng 8' },
    { ReportID: 3, Type: 'Đơn hàng', Created_at: '2025-08-03', Details: 'Tổng hợp đơn hàng tuần 1 tháng 8' },
    { ReportID: 4, Type: 'Doanh thu', Created_at: '2025-08-04', Details: 'Doanh thu sản phẩm xi măng' },
    { ReportID: 5, Type: 'Tồn kho', Created_at: '2025-08-05', Details: 'Kiểm kê kho A và B' },
    { ReportID: 6, Type: 'Nhập kho', Created_at: '2025-08-06', Details: 'Báo cáo nhập kho tháng 8' },
    { ReportID: 7, Type: 'Xuất kho', Created_at: '2025-08-07', Details: 'Báo cáo xuất kho cho nhà cung cấp' },
    { ReportID: 8, Type: 'Doanh thu', Created_at: '2025-08-08', Details: 'Doanh thu sản phẩm thép' },
    { ReportID: 9, Type: 'Đơn hàng', Created_at: '2025-08-09', Details: 'Tổng hợp đơn hàng tuần 2 tháng 8' },
    { ReportID: 10, Type: 'Tồn kho', Created_at: '2025-08-10', Details: 'Kiểm kê kho C' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Báo Cáo</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID Báo Cáo</th>
              <th className="py-2 px-4 border">Loại Báo Cáo</th>
              <th className="py-2 px-4 border">Ngày Tạo</th>
              <th className="py-2 px-4 border">Chi Tiết</th>
              <th className="py-2 px-4 border">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.ReportID}>
                <td className="py-2 px-4 border">{report.ReportID}</td>
                <td className="py-2 px-4 border">{report.Type}</td>
                <td className="py-2 px-4 border">{new Date(report.Created_at).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{report.Details}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                    Xem
                  </button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 ml-2">
                    Xuất Excel/PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportList;