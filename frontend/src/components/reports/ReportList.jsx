import React from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

const ReportList = () => {
  const mockReports = [
    {
      ReportID: 1,
      Type: 'Doanh thu',
      Created_at: '2025-08-01',
      LastUpdated: '2025-08-02',
      Author: 'Nguyễn Văn A',
      Details: 'Doanh thu tháng 8/2025',
      Notes: 'Báo cáo tổng hợp doanh thu từ tất cả sản phẩm trong tháng 8.',
      Content: {
        summary: 'Tổng doanh thu tháng 8/2025 đạt 5,000,000,000 VNĐ.',
        data: [
          { product: 'Xi măng PC40', category: 'Xi măng', revenue: 2000000000, unitsSold: 25000, pricePerUnit: 80000 },
          { product: 'Gạch đỏ 4 lỗ', category: 'Gạch', revenue: 1500000000, unitsSold: 1250000, pricePerUnit: 1200 },
          { product: 'Thép phi 16', category: 'Sắt thép', revenue: 1500000000, unitsSold: 100000, pricePerUnit: 15000 },
        ],
        additionalMetrics: [
          { key: 'Doanh thu trung bình mỗi sản phẩm', value: '1,666,666,667 VNĐ' },
          { key: 'Tổng số sản phẩm bán ra', value: '1,375,000' },
          { key: 'Tỷ lệ tăng trưởng so với tháng trước', value: '15%' },
        ],
      },
    },
    {
      ReportID: 2,
      Type: 'Tồn kho',
      Created_at: '2025-08-02',
      LastUpdated: '2025-08-03',
      Author: 'Trần Thị B',
      Details: 'Báo cáo tồn kho cuối tháng 8',
      Notes: 'Kiểm kê tồn kho tại các kho A, B, C.',
      Content: {
        summary: 'Tổng tồn kho: 1,350 sản phẩm.',
        data: [
          { product: 'Xi măng PC40', category: 'Xi măng', quantity: 100, location: 'Kho A', supplier: 'Công ty Xi măng Hà Tiên', status: 'Bình thường' },
          { product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 1000, location: 'Kho B', supplier: 'Nhà máy Gạch Tuynel', status: 'Bình thường' },
          { product: 'Thép phi 16', category: 'Sắt thép', quantity: 250, location: 'Kho C', supplier: 'Tập đoàn Hòa Phát', status: 'Cần bổ sung' },
        ],
        additionalMetrics: [
          { key: 'Tổng số kho', value: '3' },
          { key: 'Tỷ lệ tồn kho thấp', value: '33%' },
          { key: 'Số lượng sản phẩm cần bổ sung', value: '1' },
        ],
      },
    },
    {
      ReportID: 3,
      Type: 'Đơn hàng',
      Created_at: '2025-08-03',
      LastUpdated: '2025-08-04',
      Author: 'Lê Văn C',
      Details: 'Tổng hợp đơn hàng tuần 1 tháng 8',
      Notes: 'Báo cáo đơn hàng từ ngày 1/8 đến 7/8/2025.',
      Content: {
        summary: 'Tổng cộng 150 đơn hàng, giá trị 1,500,000,000 VNĐ.',
        data: [
          {
            orderId: 101,
            customer: 'Nguyễn Văn A',
            total: 10000000,
            status: 'Pending',
            items: [
              { product: 'Xi măng PC40', quantity: 10, price: 80000 },
              { product: 'Gạch đỏ 4 lỗ', quantity: 100, price: 1200 },
            ],
          },
          {
            orderId: 102,
            customer: 'Trần Thị B',
            total: 20000000,
            status: 'Confirmed',
            items: [
              { product: 'Thép phi 16', quantity: 50, price: 15000 },
            ],
          },
        ],
        additionalMetrics: [
          { key: 'Tỷ lệ đơn hàng hoàn thành', value: '60%' },
          { key: 'Số đơn hàng chờ xử lý', value: '45' },
          { key: 'Doanh thu trung bình mỗi đơn', value: '10,000,000 VNĐ' },
        ],
      },
    },
    {
      ReportID: 4,
      Type: 'Doanh thu',
      Created_at: '2025-08-04',
      LastUpdated: '2025-08-05',
      Author: 'Phạm Thị D',
      Details: 'Doanh thu sản phẩm xi măng',
      Notes: 'Tập trung vào doanh thu xi măng PC40 và PC50.',
      Content: {
        summary: 'Doanh thu xi măng tháng 8/2025: 2,000,000,000 VNĐ.',
        data: [
          { product: 'Xi măng PC40', category: 'Xi măng', revenue: 2000000000, unitsSold: 25000, pricePerUnit: 80000 },
        ],
        additionalMetrics: [
          { key: 'Tỷ lệ đóng góp vào tổng doanh thu', value: '40%' },
          { key: 'Số lượng bán trung bình mỗi ngày', value: '833' },
        ],
      },
    },
    {
      ReportID: 5,
      Type: 'Tồn kho',
      Created_at: '2025-08-05',
      LastUpdated: '2025-08-06',
      Author: 'Hoàng Văn E',
      Details: 'Kiểm kê kho A và B',
      Notes: 'Báo cáo tồn kho tại kho A và B, không bao gồm kho C.',
      Content: {
        summary: 'Tổng tồn kho kho A và B: 1,100 sản phẩm.',
        data: [
          { product: 'Xi măng PC40', category: 'Xi măng', quantity: 100, location: 'Kho A', supplier: 'Công ty Xi măng Hà Tiên', status: 'Bình thường' },
          { product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 1000, location: 'Kho B', supplier: 'Nhà máy Gạch Tuynel', status: 'Bình thường' },
        ],
        additionalMetrics: [
          { key: 'Tổng số kho kiểm kê', value: '2' },
          { key: 'Tỷ lệ tồn kho đủ', value: '100%' },
        ],
      },
    },
    {
      ReportID: 6,
      Type: 'Nhập kho',
      Created_at: '2025-08-06',
      LastUpdated: '2025-08-07',
      Author: 'Ngô Thị F',
      Details: 'Báo cáo nhập kho tháng 8',
      Notes: 'Nhập kho từ các nhà cung cấp Hòa Phát và Tuynel.',
      Content: {
        summary: 'Tổng nhập kho: 500 sản phẩm.',
        data: [
          { product: 'Thép phi 16', category: 'Sắt thép', quantity: 300, location: 'Kho C', date: '2025-08-06', supplier: 'Tập đoàn Hòa Phát', status: 'Hoàn tất' },
          { product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 200, location: 'Kho B', date: '2025-08-06', supplier: 'Nhà máy Gạch Tuynel', status: 'Hoàn tất' },
        ],
        additionalMetrics: [
          { key: 'Tổng số nhà cung cấp', value: '2' },
          { key: 'Thời gian nhập kho trung bình', value: '1 ngày' },
        ],
      },
    },
    {
      ReportID: 7,
      Type: 'Xuất kho',
      Created_at: '2025-08-07',
      LastUpdated: '2025-08-08',
      Author: 'Đinh Văn G',
      Details: 'Báo cáo xuất kho cho nhà cung cấp',
      Notes: 'Xuất kho để cung ứng cho các đơn hàng lớn.',
      Content: {
        summary: 'Tổng xuất kho: 400 sản phẩm.',
        data: [
          { product: 'Xi măng PC40', category: 'Xi măng', quantity: 200, location: 'Kho A', date: '2025-08-07', supplier: 'Công ty Xi măng Hà Tiên', status: 'Hoàn tất' },
          { product: 'Thép phi 16', category: 'Sắt thép', quantity: 200, location: 'Kho C', date: '2025-08-07', supplier: 'Tập đoàn Hòa Phát', status: 'Hoàn tất' },
        ],
        additionalMetrics: [
          { key: 'Tổng số đơn hàng liên quan', value: '10' },
          { key: 'Tỷ lệ xuất kho đúng hạn', value: '100%' },
        ],
      },
    },
    {
      ReportID: 8,
      Type: 'Doanh thu',
      Created_at: '2025-08-08',
      LastUpdated: '2025-08-09',
      Author: 'Bùi Thị H',
      Details: 'Doanh thu sản phẩm thép',
      Notes: 'Tập trung vào doanh thu thép phi 12 và phi 16.',
      Content: {
        summary: 'Doanh thu thép tháng 8/2025: 1,500,000,000 VNĐ.',
        data: [
          { product: 'Thép phi 16', category: 'Sắt thép', revenue: 1500000000, unitsSold: 100000, pricePerUnit: 15000 },
        ],
        additionalMetrics: [
          { key: 'Tỷ lệ đóng góp vào tổng doanh thu', value: '30%' },
          { key: 'Số lượng bán trung bình mỗi ngày', value: '3,333' },
        ],
      },
    },
    {
      ReportID: 9,
      Type: 'Đơn hàng',
      Created_at: '2025-08-09',
      LastUpdated: '2025-08-10',
      Author: 'Vũ Văn I',
      Details: 'Tổng hợp đơn hàng tuần 2 tháng 8',
      Notes: 'Báo cáo đơn hàng từ ngày 8/8 đến 14/8/2025.',
      Content: {
        summary: 'Tổng cộng 200 đơn hàng, giá trị 2,000,000,000 VNĐ.',
        data: [
          {
            orderId: 103,
            customer: 'Lê Văn C',
            total: 15000000,
            status: 'Confirmed',
            items: [
              { product: 'Gạch đỏ 4 lỗ', quantity: 200, price: 1200 },
              { product: 'Thép phi 16', quantity: 30, price: 15000 },
            ],
          },
          {
            orderId: 104,
            customer: 'Phạm Thị D',
            total: 25000000,
            status: 'Delivered',
            items: [
              { product: 'Xi măng PC40', quantity: 20, price: 80000 },
            ],
          },
        ],
        additionalMetrics: [
          { key: 'Tỷ lệ đơn hàng hoàn thành', value: '75%' },
          { key: 'Số đơn hàng chờ xử lý', value: '30' },
          { key: 'Doanh thu trung bình mỗi đơn', value: '10,000,000 VNĐ' },
        ],
      },
    },
    {
      ReportID: 10,
      Type: 'Tồn kho',
      Created_at: '2025-08-10',
      LastUpdated: '2025-08-11',
      Author: 'Trương Thị K',
      Details: 'Kiểm kê kho C',
      Notes: 'Chỉ kiểm kê kho C, tập trung vào thép.',
      Content: {
        summary: 'Tổng tồn kho kho C: 250 sản phẩm.',
        data: [
          { product: 'Thép phi 16', category: 'Sắt thép', quantity: 250, location: 'Kho C', supplier: 'Tập đoàn Hòa Phát', status: 'Cần bổ sung' },
        ],
        additionalMetrics: [
          { key: 'Tổng số kho kiểm kê', value: '1' },
          { key: 'Tỷ lệ tồn kho thấp', value: '100%' },
        ],
      },
    },
  ];

  const exportToExcel = (report) => {
    if (!report || !report.Content || !report.Content.data) {
      console.error('Invalid report data:', report);
      return;
    }

    const wb = XLSX.utils.book_new();

    // Sheet 1: Thông tin cơ bản
    const basicInfo = [
      ['Mã báo cáo', report.ReportID],
      ['Loại báo cáo', report.Type],
      ['Ngày tạo', new Date(report.Created_at).toLocaleDateString()],
      ['Ngày cập nhật cuối', new Date(report.LastUpdated).toLocaleDateString()],
      ['Người tạo', report.Author],
      ['Mô tả', report.Details],
      ['Ghi chú', report.Notes || 'Không có'],
      ['Tóm tắt', report.Content.summary],
    ];
    const ws1 = XLSX.utils.aoa_to_sheet(basicInfo);
    XLSX.utils.book_append_sheet(wb, ws1, 'Thông tin cơ bản');

    // Sheet 2: Nội dung báo cáo
    let dataHeaders = [];
    let dataRows = [];
    if (report.Type === 'Doanh thu') {
      dataHeaders = ['Sản phẩm', 'Danh mục', 'Doanh thu (VNĐ)', 'Số lượng bán', 'Giá mỗi đơn vị (VNĐ)'];
      dataRows = report.Content.data.map((item) => [
        item.product,
        item.category,
        item.revenue,
        item.unitsSold,
        item.pricePerUnit,
      ]);
    } else if (report.Type === 'Tồn kho' || report.Type === 'Nhập kho' || report.Type === 'Xuất kho') {
      dataHeaders = ['Sản phẩm', 'Danh mục', 'Số lượng', 'Vị trí', 'Nhà cung cấp', 'Trạng thái'];
      if (report.Type !== 'Tồn kho') dataHeaders.push('Ngày');
      dataRows = report.Content.data.map((item) => {
        const row = [item.product, item.category, item.quantity, item.location, item.supplier, item.status];
        if (report.Type !== 'Tồn kho') row.push(item.date);
        return row;
      });
    } else if (report.Type === 'Đơn hàng') {
      dataHeaders = ['Mã đơn hàng', 'Khách hàng', 'Tổng tiền (VNĐ)', 'Trạng thái', 'Số lượng sản phẩm'];
      dataRows = report.Content.data.map((item) => [
        item.orderId,
        item.customer,
        item.total,
        item.status,
        item.items.reduce((sum, i) => sum + i.quantity, 0),
      ]);
    }
    const ws2 = XLSX.utils.aoa_to_sheet([dataHeaders, ...dataRows]);
    XLSX.utils.book_append_sheet(wb, ws2, 'Nội dung báo cáo');

    // Sheet 3: Số liệu bổ sung
    const metricsHeaders = ['Chỉ số', 'Giá trị'];
    const metricsRows = report.Content.additionalMetrics.map((metric) => [metric.key, metric.value]);
    const ws3 = XLSX.utils.aoa_to_sheet([metricsHeaders, ...metricsRows]);
    XLSX.utils.book_append_sheet(wb, ws3, 'Số liệu bổ sung');

    // Sheet 4: Chi tiết sản phẩm trong đơn hàng (chỉ cho báo cáo Đơn hàng)
    if (report.Type === 'Đơn hàng') {
      report.Content.data.forEach((order, index) => {
        const orderItemsHeaders = ['Sản phẩm', 'Số lượng', 'Giá (VNĐ)', 'Tổng giá (VNĐ)'];
        const orderItemsRows = order.items.map((item) => [
          item.product,
          item.quantity,
          item.price,
          item.quantity * item.price,
        ]);
        const ws4 = XLSX.utils.aoa_to_sheet([[`Đơn hàng #${order.orderId}`], orderItemsHeaders, ...orderItemsRows]);
        XLSX.utils.book_append_sheet(wb, ws4, `Đơn hàng ${order.orderId}`);
      });
    }

    // Tạo và tải file Excel
    const fileName = `Report_${report.ReportID}_${report.Type}_${report.Created_at}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

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
            {mockReports.map((report) => (
              <tr key={report.ReportID}>
                <td className="py-2 px-4 border">{report.ReportID}</td>
                <td className="py-2 px-4 border">{report.Type}</td>
                <td className="py-2 px-4 border">{new Date(report.Created_at).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{report.Details}</td>
                <td className="py-2 px-4 border">
                  <Link
                    to={`/admin/reports/${report.ReportID}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Xem
                  </Link>
                  <button
                    onClick={() => exportToExcel(report)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 ml-2"
                  >
                    Xuất Excel
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