import React from 'react';
import { Link } from 'react-router-dom';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, TextRun, AlignmentType, ShadingType, Header, Footer, PageNumber } from 'docx';
import { saveAs } from 'file-saver';

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

  const exportToWord = (report) => {
    if (!report || !report.Content || !report.Content.data) {
      console.error('Invalid report data:', report);
      return;
    }

    // Tạo bảng với viền, căn chỉnh và số thứ tự
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

    // Tạo nội dung tài liệu Word
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
                  text: `BÁO CÁO ${report.Type.toUpperCase()}`,
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
                  text: report.Details,
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
                  text: 'Người lập báo cáo: ' + report.Author,
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
                  text: `Báo cáo này cung cấp thông tin chi tiết về ${report.Type.toLowerCase()} của Công ty Vật tư Xây dựng XYZ trong khoảng thời gian được chỉ định. Mục tiêu của báo cáo là tổng hợp và phân tích dữ liệu để hỗ trợ việc ra quyết định và đánh giá hiệu quả hoạt động. Nội dung bao gồm thông tin cơ bản, dữ liệu chi tiết, số liệu bổ sung và các khuyến nghị (nếu có).`,
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
                  text: `Báo cáo được lập bởi ${report.Author} vào ngày ${new Date(report.Created_at).toLocaleDateString('vi-VN')}, cập nhật lần cuối vào ngày ${new Date(report.LastUpdated).toLocaleDateString('vi-VN')}.`,
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
                ['Mã báo cáo', report.ReportID],
                ['Loại báo cáo', report.Type],
                ['Ngày tạo', new Date(report.Created_at).toLocaleDateString('vi-VN')],
                ['Ngày cập nhật cuối', new Date(report.LastUpdated).toLocaleDateString('vi-VN')],
                ['Người tạo', report.Author],
                ['Mô tả', report.Details],
                ['Ghi chú', report.Notes || 'Không có'],
                ['Tóm tắt', report.Content.summary],
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
            report.Type === 'Doanh thu'
              ? createTable(
                  ['Sản phẩm', 'Danh mục', 'Doanh thu (VNĐ)', 'Số lượng bán', 'Giá mỗi đơn vị (VNĐ)'],
                  report.Content.data.map((item) => [
                    item.product,
                    item.category,
                    item.revenue.toLocaleString('vi-VN'),
                    item.unitsSold.toLocaleString('vi-VN'),
                    item.pricePerUnit.toLocaleString('vi-VN'),
                  ])
                )
              : report.Type === 'Tồn kho' || report.Type === 'Nhập kho' || report.Type === 'Xuất kho'
              ? createTable(
                  report.Type === 'Tồn kho'
                    ? ['Sản phẩm', 'Danh mục', 'Số lượng', 'Vị trí', 'Nhà cung cấp', 'Trạng thái']
                    : ['Sản phẩm', 'Danh mục', 'Số lượng', 'Vị trí', 'Nhà cung cấp', 'Trạng thái', 'Ngày'],
                  report.Content.data.map((item) => {
                    const row = [
                      item.product,
                      item.category,
                      item.quantity.toLocaleString('vi-VN'),
                      item.location,
                      item.supplier,
                      item.status,
                    ];
                    if (report.Type !== 'Tồn kho') row.push(new Date(item.date).toLocaleDateString('vi-VN'));
                    return row;
                  })
                )
              : createTable(
                  ['Mã đơn hàng', 'Khách hàng', 'Tổng tiền (VNĐ)', 'Trạng thái', 'Số lượng sản phẩm'],
                  report.Content.data.map((item) => [
                    item.orderId,
                    item.customer,
                    item.total.toLocaleString('vi-VN'),
                    item.status,
                    item.items.reduce((sum, i) => sum + i.quantity, 0).toLocaleString('vi-VN'),
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
              report.Content.additionalMetrics.map((metric) => [metric.key, metric.value])
            ),
            // Chi tiết sản phẩm trong đơn hàng (nếu có)
            ...(report.Type === 'Đơn hàng'
              ? report.Content.data.flatMap((order) => [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `CHI TIẾT ĐƠN HÀNG #${order.orderId}`,
                        bold: true,
                        size: 28,
                        font: 'Arial',
                      }),
                    ],
                    alignment: AlignmentType.LEFT,
                    spacing: { before: 400, after: 200 },
                  }),
                  createTable(
                    ['Sản phẩm', 'Số lượng', 'Giá (VNĐ)', 'Tổng giá (VNĐ)'],
                    order.items.map((item) => [
                      item.product,
                      item.quantity.toLocaleString('vi-VN'),
                      item.price.toLocaleString('vi-VN'),
                      (item.quantity * item.price).toLocaleString('vi-VN'),
                    ])
                  ),
                ])
              : []),
            // Phần kết luận
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
                  text: `Báo cáo ${report.Type.toLowerCase()} này cung cấp cái nhìn tổng quan về tình hình ${report.Type.toLowerCase()} của Công ty Vật tư Xây dựng XYZ. Dựa trên dữ liệu, chúng tôi nhận thấy ${report.Content.summary}. Để cải thiện hiệu quả hoạt động, đề xuất tập trung vào các sản phẩm có tỷ lệ tăng trưởng cao (nếu là báo cáo doanh thu) hoặc bổ sung tồn kho kịp thời (nếu là báo cáo tồn kho). Các đơn hàng cần được xử lý nhanh chóng để đảm bảo tỷ lệ hoàn thành cao.`,
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
                  text: 'Chúng tôi xin cảm ơn đội ngũ nhân viên đã cung cấp dữ liệu và hỗ trợ lập báo cáo này. Mọi thắc mắc hoặc yêu cầu bổ sung thông tin, vui lòng liên hệ:',
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

    // Tạo và tải file Word
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Report_${report.ReportID}_${report.Type}_${report.Created_at}.docx`);
    }).catch((err) => {
      console.error('Lỗi khi tạo file Word:', err);
    });
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

export default ReportList;