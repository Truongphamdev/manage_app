import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    // Giả lập lấy dữ liệu từ mock data
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
    const foundReport = mockReports.find((r) => r.ReportID === parseInt(id));
    setReport(foundReport);
  }, [id]);

  if (!report) {
    return <div className="text-center p-6">Đang tải...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Chi tiết báo cáo #{report.ReportID}</h1>
      <p className="text-gray-600"><strong>Loại báo cáo:</strong> {report.Type}</p>
      <p className="text-gray-600"><strong>Ngày tạo:</strong> {new Date(report.Created_at).toLocaleDateString()}</p>
      <p className="text-gray-600"><strong>Ngày cập nhật cuối:</strong> {new Date(report.LastUpdated).toLocaleDateString()}</p>
      <p className="text-gray-600"><strong>Người tạo:</strong> {report.Author}</p>
      <p className="text-gray-600"><strong>Mô tả:</strong> {report.Details}</p>
      <p className="text-gray-600"><strong>Ghi chú:</strong> {report.Notes || 'Không có'}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Nội dung báo cáo</h2>
      <p className="text-gray-600 mb-4">{report.Content.summary}</p>
      {report.Content.data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-50">
              <tr>
                {report.Type === 'Doanh thu' && (
                  <>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doanh thu</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng bán</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá mỗi đơn vị</th>
                  </>
                )}
                {(report.Type === 'Tồn kho' || report.Type === 'Nhập kho' || report.Type === 'Xuất kho') && (
                  <>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vị trí</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhà cung cấp</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    {report.Type !== 'Tồn kho' && (
                      <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                    )}
                  </>
                )}
                {report.Type === 'Đơn hàng' && (
                  <>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng sản phẩm</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {report.Content.data.map((item, index) => (
                <tr key={index}>
                  {report.Type === 'Doanh thu' && (
                    <>
                      <td className="py-2 px-4 border">{item.product}</td>
                      <td className="py-2 px-4 border">{item.category}</td>
                      <td className="py-2 px-4 border">{item.revenue.toLocaleString()} VNĐ</td>
                      <td className="py-2 px-4 border">{item.unitsSold.toLocaleString()}</td>
                      <td className="py-2 px-4 border">{item.pricePerUnit.toLocaleString()} VNĐ</td>
                    </>
                  )}
                  {(report.Type === 'Tồn kho' || report.Type === 'Nhập kho' || report.Type === 'Xuất kho') && (
                    <>
                      <td className="py-2 px-4 border">{item.product}</td>
                      <td className="py-2 px-4 border">{item.category}</td>
                      <td className="py-2 px-4 border">{item.quantity}</td>
                      <td className="py-2 px-4 border">{item.location}</td>
                      <td className="py-2 px-4 border">{item.supplier}</td>
                      <td className="py-2 px-4 border">{item.status}</td>
                      {report.Type !== 'Tồn kho' && (
                        <td className="py-2 px-4 border">{item.date}</td>
                      )}
                    </>
                  )}
                  {report.Type === 'Đơn hàng' && (
                    <>
                      <td className="py-2 px-4 border">{item.orderId}</td>
                      <td className="py-2 px-4 border">{item.customer}</td>
                      <td className="py-2 px-4 border">{item.total.toLocaleString()} VNĐ</td>
                      <td className="py-2 px-4 border">{item.status}</td>
                      <td className="py-2 px-4 border">{item.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-4 mb-2">Số liệu bổ sung</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chỉ số</th>
              <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá trị</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {report.Content.additionalMetrics.map((metric, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{metric.key}</td>
                <td className="py-2 px-4 border">{metric.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {report.Type === 'Đơn hàng' && (
        <>
          <h2 className="text-xl font-semibold mt-4 mb-2">Chi tiết sản phẩm trong đơn hàng</h2>
          {report.Content.data.map((order, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-medium">Đơn hàng #{order.orderId}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                      <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                      <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                      <th className="py-2 px-4 border text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng giá</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-4 border">{item.product}</td>
                        <td className="py-2 px-4 border">{item.quantity}</td>
                        <td className="py-2 px-4 border">{item.price.toLocaleString()} VNĐ</td>
                        <td className="py-2 px-4 border">{(item.quantity * item.price).toLocaleString()} VNĐ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}

      <button
        onClick={() => navigate('/admin/reports')}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Quay lại
      </button>
    </div>
  );
};

export default ReportDetail;