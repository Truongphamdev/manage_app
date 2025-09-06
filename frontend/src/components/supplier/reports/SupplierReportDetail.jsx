import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SupplierReportDetail = () => {
  const { id } = useParams();

  const mockReports = [
    {
      id: 1,
      type: 'Doanh thu',
      created_at: '2025-09-01',
      last_updated: '2025-09-02',
      author: 'Công ty Xi măng Hà Tiên',
      details: 'Doanh thu tháng 9/2025',
      notes: 'Báo cáo doanh thu từ xi măng và gạch.',
      content: {
        summary: 'Tổng doanh thu: 3,000,000,000 VNĐ.',
        data: [
          { product: 'Xi măng PC40', category: 'Xi măng', revenue: 2000000000, units_sold: 25000, price_per_unit: 80000 },
          { product: 'Gạch đỏ 4 lỗ', category: 'Gạch', revenue: 1000000000, units_sold: 833333, price_per_unit: 1200 },
        ],
        additional_metrics: [
          { key: 'Doanh thu trung bình mỗi sản phẩm', value: '1,500,000,000 VNĐ' },
          { key: 'Tổng số sản phẩm bán ra', value: '858,333' },
          { key: 'Tỷ lệ tăng trưởng', value: '10%' },
        ],
      },
    },
    {
      id: 2,
      type: 'Doanh thu',
      created_at: '2025-09-03',
      last_updated: '2025-09-04',
      author: 'Tập đoàn Hòa Phát',
      details: 'Doanh thu thép tháng 9/2025',
      notes: 'Báo cáo doanh thu từ thép phi 12 và phi 16.',
      content: {
        summary: 'Tổng doanh thu: 1,500,000,000 VNĐ.',
        data: [
          { product: 'Thép phi 16', category: 'Sắt thép', revenue: 1500000000, units_sold: 100000, price_per_unit: 15000 },
        ],
        additional_metrics: [
          { key: 'Tỷ lệ đóng góp doanh thu', value: '30%' },
          { key: 'Số lượng bán trung bình mỗi ngày', value: '3,333' },
        ],
      },
    },
    {
      id: 3,
      type: 'Doanh thu',
      created_at: '2025-09-05',
      last_updated: '2025-09-06',
      author: 'Nhà máy Gạch Tuynel',
      details: 'Doanh thu gạch tháng 9/2025',
      notes: 'Báo cáo doanh thu từ gạch đỏ và gạch lát nền.',
      content: {
        summary: 'Tổng doanh thu: 1,200,000,000 VNĐ.',
        data: [
          { product: 'Gạch đỏ 4 lỗ', category: 'Gạch', revenue: 1000000000, units_sold: 833333, price_per_unit: 1200 },
          { product: 'Gạch lát nền 60x60', category: 'Gạch', revenue: 200000000, units_sold: 10000, price_per_unit: 20000 },
        ],
        additional_metrics: [
          { key: 'Doanh thu trung bình mỗi sản phẩm', value: '600,000,000 VNĐ' },
          { key: 'Tổng số sản phẩm bán ra', value: '843,333' },
        ],
      },
    },
    {
      id: 4,
      type: 'Doanh thu',
      created_at: '2025-09-07',
      last_updated: '2025-09-08',
      author: 'Công ty Vật liệu XYZ',
      details: 'Doanh thu vật liệu thô tháng 9/2025',
      notes: 'Báo cáo doanh thu từ cát và đá.',
      content: {
        summary: 'Tổng doanh thu: 500,000,000 VNĐ.',
        data: [
          { product: 'Cát xây dựng', category: 'Vật liệu thô', revenue: 200000000, units_sold: 1000, price_per_unit: 200000 },
          { product: 'Đá 1x2', category: 'Vật liệu thô', revenue: 300000000, units_sold: 1000, price_per_unit: 300000 },
        ],
        additional_metrics: [
          { key: 'Doanh thu trung bình mỗi sản phẩm', value: '250,000,000 VNĐ' },
          { key: 'Tổng số sản phẩm bán ra', value: '2,000' },
        ],
      },
    },
    {
      id: 5,
      type: 'Doanh thu',
      created_at: '2025-09-09',
      last_updated: '2025-09-10',
      author: 'Công ty Sơn ABC',
      details: 'Doanh thu sơn tháng 9/2025',
      notes: 'Báo cáo doanh thu từ sơn nước Dulux.',
      content: {
        summary: 'Tổng doanh thu: 250,000,000 VNĐ.',
        data: [
          { product: 'Sơn nước Dulux', category: 'Sơn', revenue: 250000000, units_sold: 500, price_per_unit: 500000 },
        ],
        additional_metrics: [
          { key: 'Tỷ lệ đóng góp doanh thu', value: '5%' },
          { key: 'Số lượng bán trung bình mỗi ngày', value: '16' },
        ],
      },
    },
    {
      id: 6,
      type: 'Doanh thu',
      created_at: '2025-09-11',
      last_updated: '2025-09-12',
      author: 'Công ty Xi măng Hà Tiên',
      details: 'Doanh thu xi măng tuần 2 tháng 9/2025',
      notes: 'Báo cáo doanh thu từ xi măng PC40 và PC50.',
      content: {
        summary: 'Tổng doanh thu: 1,000,000,000 VNĐ.',
        data: [
          { product: 'Xi măng PC40', category: 'Xi măng', revenue: 800000000, units_sold: 10000, price_per_unit: 80000 },
          { product: 'Xi măng PC50', category: 'Xi măng', revenue: 200000000, units_sold: 2353, price_per_unit: 85000 },
        ],
        additional_metrics: [
          { key: 'Doanh thu trung bình mỗi sản phẩm', value: '500,000,000 VNĐ' },
          { key: 'Tổng số sản phẩm bán ra', value: '12,353' },
        ],
      },
    },
    {
      id: 7,
      type: 'Doanh thu',
      created_at: '2025-09-13',
      last_updated: '2025-09-14',
      author: 'Tập đoàn Hòa Phát',
      details: 'Doanh thu thép tuần 2 tháng 9/2025',
      notes: 'Báo cáo doanh thu từ thép phi 12 và phi 16.',
      content: {
        summary: 'Tổng doanh thu: 1,200,000,000 VNĐ.',
        data: [
          { product: 'Thép phi 12', category: 'Sắt thép', revenue: 600000000, units_sold: 50000, price_per_unit: 12000 },
          { product: 'Thép phi 16', category: 'Sắt thép', revenue: 600000000, units_sold: 40000, price_per_unit: 15000 },
        ],
        additional_metrics: [
          { key: 'Doanh thu trung bình mỗi sản phẩm', value: '600,000,000 VNĐ' },
          { key: 'Tổng số sản phẩm bán ra', value: '90,000' },
        ],
      },
    },
    {
      id: 8,
      type: 'Doanh thu',
      created_at: '2025-09-15',
      last_updated: '2025-09-16',
      author: 'Nhà máy Gạch Tuynel',
      details: 'Doanh thu gạch tuần 2 tháng 9/2025',
      notes: 'Báo cáo doanh thu từ gạch đỏ và gạch lát nền.',
      content: {
        summary: 'Tổng doanh thu: 800,000,000 VNĐ.',
        data: [
          { product: 'Gạch đỏ 6 lỗ', category: 'Gạch', revenue: 600000000, units_sold: 400000, price_per_unit: 1500 },
          { product: 'Gạch lát nền 60x60', category: 'Gạch', revenue: 200000000, units_sold: 10000, price_per_unit: 20000 },
        ],
        additional_metrics: [
          { key: 'Doanh thu trung bình mỗi sản phẩm', value: '400,000,000 VNĐ' },
          { key: 'Tổng số sản phẩm bán ra', value: '410,000' },
        ],
      },
    },
    {
      id: 9,
      type: 'Doanh thu',
      created_at: '2025-09-17',
      last_updated: '2025-09-18',
      author: 'Công ty Vật liệu XYZ',
      details: 'Doanh thu vật liệu thô tuần 2 tháng 9/2025',
      notes: 'Báo cáo doanh thu từ cát và đá.',
      content: {
        summary: 'Tổng doanh thu: 400,000,000 VNĐ.',
        data: [
          { product: 'Cát xây dựng', category: 'Vật liệu thô', revenue: 200000000, units_sold: 1000, price_per_unit: 200000 },
          { product: 'Đá 1x2', category: 'Vật liệu thô', revenue: 200000000, units_sold: 666, price_per_unit: 300000 },
        ],
        additional_metrics: [
          { key: 'Doanh thu trung bình mỗi sản phẩm', value: '200,000,000 VNĐ' },
          { key: 'Tổng số sản phẩm bán ra', value: '1,666' },
        ],
      },
    },
    {
      id: 10,
      type: 'Doanh thu',
      created_at: '2025-09-19',
      last_updated: '2025-09-20',
      author: 'Công ty Sơn ABC',
      details: 'Doanh thu sơn tuần 2 tháng 9/2025',
      notes: 'Báo cáo doanh thu từ sơn nước Dulux.',
      content: {
        summary: 'Tổng doanh thu: 200,000,000 VNĐ.',
        data: [
          { product: 'Sơn nước Dulux', category: 'Sơn', revenue: 200000000, units_sold: 400, price_per_unit: 500000 },
        ],
        additional_metrics: [
          { key: 'Tỷ lệ đóng góp doanh thu', value: '4%' },
          { key: 'Số lượng bán trung bình mỗi ngày', value: '13' },
        ],
      },
    },
  ];

  const report = mockReports.find((r) => r.id === parseInt(id)) || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Chi tiết báo cáo doanh số</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p><strong>ID:</strong> {report.id}</p>
          <p><strong>Loại báo cáo:</strong> {report.type}</p>
          <p><strong>Ngày tạo:</strong> {report.created_at ? new Date(report.created_at).toLocaleDateString('vi-VN') : ''}</p>
          <p><strong>Ngày cập nhật:</strong> {report.last_updated ? new Date(report.last_updated).toLocaleDateString('vi-VN') : ''}</p>
        </div>
        <div>
          <p><strong>Người lập:</strong> {report.author}</p>
          <p><strong>Mô tả:</strong> {report.details}</p>
          <p><strong>Ghi chú:</strong> {report.notes || 'Không có'}</p>
          <p><strong>Tóm tắt:</strong> {report.content?.summary}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-4 mb-2">Nội dung báo cáo</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Sản phẩm</th>
              <th className="py-2 px-4 border">Danh mục</th>
              <th className="py-2 px-4 border">Doanh thu (VNĐ)</th>
              <th className="py-2 px-4 border">Số lượng bán</th>
              <th className="py-2 px-4 border">Giá mỗi đơn vị (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {report.content?.data?.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{item.product}</td>
                <td className="py-2 px-4 border">{item.category}</td>
                <td className="py-2 px-4 border">{item.revenue?.toLocaleString('vi-VN')}</td>
                <td className="py-2 px-4 border">{item.units_sold?.toLocaleString('vi-VN')}</td>
                <td className="py-2 px-4 border">{item.price_per_unit?.toLocaleString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-4 mb-2">Số liệu bổ sung</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Chỉ số</th>
              <th className="py-2 px-4 border">Giá trị</th>
            </tr>
          </thead>
          <tbody>
            {report.content?.additional_metrics?.map((metric, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{metric.key}</td>
                <td className="py-2 px-4 border">{metric.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        to="/supplier/reports"
        className="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Quay lại
      </Link>
    </div>
  );
};

export default SupplierReportDetail;