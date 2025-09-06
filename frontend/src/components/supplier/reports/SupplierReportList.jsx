import React from 'react';
import { Link } from 'react-router-dom';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, TextRun, AlignmentType, ShadingType, Header, Footer, PageNumber } from 'docx';
import { saveAs } from 'file-saver';

const SupplierReportList = () => {
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

  const exportToWord = (report) => {
    if (!report || !report.content || !report.content.data) {
      console.error('Invalid report data:', report);
      return;
    }

    const createTable = (headers, rows) => {
      return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: ['STT', ...headers].map(
              (header, index) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: header,
                          bold: true,
                          size: 24,
                          color: 'FFFFFF',
                          font: 'Arial',
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  shading: { fill: '2B6CB0', type: ShadingType.SOLID },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 2 },
                    bottom: { style: BorderStyle.SINGLE, size: 2 },
                    left: { style: BorderStyle.SINGLE, size: 2 },
                    right: { style: BorderStyle.SINGLE, size: 2 },
                  },
                  width: index === 0 ? { size: 10, type: WidthType.PERCENTAGE } : undefined,
                })
            ),
          }),
          ...rows.map(
            (row, index) =>
              new TableRow({
                children: [index + 1, ...row].map(
                  (cell, cellIndex) =>
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: String(cell),
                              size: 22,
                              font: 'Arial',
                            }),
                          ],
                          alignment: cellIndex === 0 ? AlignmentType.CENTER : AlignmentType.LEFT,
                        }),
                      ],
                      borders: {
                        top: { style: BorderStyle.SINGLE, size: 1 },
                        bottom: { style: BorderStyle.SINGLE, size: 1 },
                        left: { style: BorderStyle.SINGLE, size: 1 },
                        right: { style: BorderStyle.SINGLE, size: 1 },
                      },
                      width: cellIndex === 0 ? { size: 10, type: WidthType.PERCENTAGE } : undefined,
                    })
                ),
              })
          ),
        ],
      });
    };

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: { top: 720, bottom: 720, left: 720, right: 720 },
            },
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'CÔNG TY VẬT TƯ XÂY DỰNG XYZ',
                      bold: true,
                      size: 20,
                      font: 'Arial',
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Trang ',
                      size: 20,
                      font: 'Arial',
                    }),
                    new TextRun({
                      children: [PageNumber.CURRENT],
                      size: 20,
                      font: 'Arial',
                    }),
                    new TextRun({
                      text: ' / ',
                      size: 20,
                      font: 'Arial',
                    }),
                    new TextRun({
                      children: [PageNumber.TOTAL_PAGES],
                      size: 20,
                      font: 'Arial',
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
          },
          children: [
            // Trang bìa
            new Paragraph({
              children: [
                new TextRun({
                  text: '[LOGO CÔNG TY]',
                  bold: true,
                  size: 36,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'CÔNG TY VẬT TƯ XÂY DỰNG XYZ',
                  bold: true,
                  size: 32,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `BÁO CÁO ${report.type.toUpperCase()}`,
                  bold: true,
                  size: 36,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: report.details,
                  bold: true,
                  size: 28,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Ngày xuất báo cáo: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
                  size: 24,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Người lập báo cáo: ' + report.author,
                  size: 24,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 7200 },
            }),
            // Phần giới thiệu
            new Paragraph({
              children: [
                new TextRun({
                  text: 'GIỚI THIỆU',
                  bold: true,
                  size: 28,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { before: 400, after: 200 },
              pageBreakBefore: true,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Báo cáo này cung cấp thông tin chi tiết về doanh thu của nhà cung cấp ${report.author} trong khoảng thời gian được chỉ định. Mục tiêu là tổng hợp và phân tích dữ liệu để hỗ trợ đánh giá hiệu quả cung ứng và lập kế hoạch kinh doanh. Nội dung bao gồm thông tin cơ bản, dữ liệu chi tiết, số liệu bổ sung và các khuyến nghị.`,
                  size: 22,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Báo cáo được lập bởi ${report.author} vào ngày ${new Date(report.created_at).toLocaleDateString('vi-VN')}, cập nhật lần cuối vào ngày ${new Date(report.last_updated).toLocaleDateString('vi-VN')}.`,
                  size: 22,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
              spacing: { after: 400 },
            }),
            // Thông tin cơ bản
            new Paragraph({
              children: [
                new TextRun({
                  text: 'THÔNG TIN CƠ BẢN',
                  bold: true,
                  size: 28,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { before: 400, after: 200 },
            }),
            createTable(
              ['Thông tin', 'Giá trị'],
              [
                ['Mã báo cáo', report.id],
                ['Loại báo cáo', report.type],
                ['Ngày tạo', new Date(report.created_at).toLocaleDateString('vi-VN')],
                ['Ngày cập nhật cuối', new Date(report.last_updated).toLocaleDateString('vi-VN')],
                ['Người lập', report.author],
                ['Mô tả', report.details],
                ['Ghi chú', report.notes || 'Không có'],
                ['Tóm tắt', report.content.summary],
              ]
            ),
            // Nội dung báo cáo
            new Paragraph({
              children: [
                new TextRun({
                  text: 'NỘI DUNG BÁO CÁO',
                  bold: true,
                  size: 28,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { before: 400, after: 200 },
            }),
            createTable(
              ['Sản phẩm', 'Danh mục', 'Doanh thu (VNĐ)', 'Số lượng bán', 'Giá mỗi đơn vị (VNĐ)'],
              report.content.data.map((item) => [
                item.product,
                item.category,
                item.revenue.toLocaleString('vi-VN'),
                item.units_sold.toLocaleString('vi-VN'),
                item.price_per_unit.toLocaleString('vi-VN'),
              ])
            ),
            // Số liệu bổ sung
            new Paragraph({
              children: [
                new TextRun({
                  text: 'SỐ LIỆU BỔ SUNG',
                  bold: true,
                  size: 28,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { before: 400, after: 200 },
            }),
            createTable(
              ['Chỉ số', 'Giá trị'],
              report.content.additional_metrics.map((metric) => [metric.key, metric.value])
            ),
            // Kết luận
            new Paragraph({
              children: [
                new TextRun({
                  text: 'KẾT LUẬN',
                  bold: true,
                  size: 28,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { before: 400, after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Báo cáo doanh thu này cung cấp cái nhìn tổng quan về hiệu quả kinh doanh của nhà cung cấp ${report.author}. Dựa trên dữ liệu, ${report.content.summary.toLowerCase()} Đề xuất tập trung vào các sản phẩm có doanh thu cao và tối ưu hóa quy trình cung ứng để tăng trưởng bền vững.`,
                  size: 22,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
              spacing: { after: 200 },
            }),
            // Ghi công và thông tin liên hệ
            new Paragraph({
              children: [
                new TextRun({
                  text: 'GHI CÔNG VÀ THÔNG TIN LIÊN HỆ',
                  bold: true,
                  size: 28,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { before: 400, after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Chúng tôi xin cảm ơn đội ngũ nhân viên đã cung cấp dữ liệu và hỗ trợ lập báo cáo này. Mọi thắc mắc, vui lòng liên hệ:',
                  size: 22,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Công ty Vật tư Xây dựng XYZ',
                  size: 22,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Địa chỉ: 123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh',
                  size: 22,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Email: contact@xyzconstruction.com',
                  size: 22,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Điện thoại: (028) 1234 5678',
                  size: 22,
                  font: 'Arial',
                }),
              ],
              alignment: AlignmentType.LEFT,
              spacing: { after: 400 },
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Supplier_Report_${report.id}_${report.type}_${report.created_at}.docx`);
    }).catch((err) => {
      console.error('Lỗi khi tạo file Word:', err);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Danh sách báo cáo doanh số</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Loại báo cáo</th>
              <th className="py-2 px-4 border">Ngày tạo</th>
              <th className="py-2 px-4 border">Chi tiết</th>
              <th className="py-2 px-4 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {mockReports.map((report) => (
              <tr key={report.id}>
                <td className="py-2 px-4 border">{report.id}</td>
                <td className="py-2 px-4 border">{report.type}</td>
                <td className="py-2 px-4 border">{new Date(report.created_at).toLocaleDateString('vi-VN')}</td>
                <td className="py-2 px-4 border">{report.details}</td>
                <td className="py-2 px-4 border">
                  <Link
                    to={`/supplier/reports/${report.id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Xem
                  </Link>
                  <button
                    onClick={() => exportToWord(report)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 ml-2"
                  >
                    Xuất Word
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

export default SupplierReportList;