import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SupplierInventoryDetail = () => {
  const { id } = useParams();

  const mockInventory = [
    {
      id: 1,
      product: 'Xi măng PC40',
      category: 'Xi măng',
      quantity: 500,
      location: 'Kho A',
      supplier: 'Công ty Xi măng Hà Tiên',
      status: 'Bình thường',
      lastUpdated: '2025-09-01',
      description: 'Tồn kho xi măng PC40 tại kho A, sẵn sàng cung ứng.',
    },
    {
      id: 2,
      product: 'Gạch đỏ 4 lỗ',
      category: 'Gạch',
      quantity: 10000,
      location: 'Kho B',
      supplier: 'Nhà máy Gạch Tuynel',
      status: 'Bình thường',
      lastUpdated: '2025-09-02',
      description: 'Tồn kho gạch đỏ 4 lỗ tại kho B, đủ cung cấp cho đơn hàng lớn.',
    },
    {
      id: 3,
      product: 'Thép phi 16',
      category: 'Sắt thép',
      quantity: 2000,
      location: 'Kho C',
      supplier: 'Tập đoàn Hòa Phát',
      status: 'Cần bổ sung',
      lastUpdated: '2025-09-03',
      description: 'Tồn kho thép phi 16 thấp, cần bổ sung ngay.',
    },
    {
      id: 4,
      product: 'Xi măng PC50',
      category: 'Xi măng',
      quantity: 300,
      location: 'Kho A',
      supplier: 'Công ty Xi măng Hà Tiên',
      status: 'Bình thường',
      lastUpdated: '2025-09-04',
      description: 'Tồn kho xi măng PC50 tại kho A, đủ cho các công trình nhỏ.',
    },
    {
      id: 5,
      product: 'Gạch đỏ 6 lỗ',
      category: 'Gạch',
      quantity: 8000,
      location: 'Kho B',
      supplier: 'Nhà máy Gạch Tuynel',
      status: 'Bình thường',
      lastUpdated: '2025-09-05',
      description: 'Tồn kho gạch đỏ 6 lỗ tại kho B, chất lượng cao.',
    },
    {
      id: 6,
      product: 'Thép phi 12',
      category: 'Sắt thép',
      quantity: 2500,
      location: 'Kho C',
      supplier: 'Tập đoàn Hòa Phát',
      status: 'Bình thường',
      lastUpdated: '2025-09-06',
      description: 'Tồn kho thép phi 12 tại kho C, sẵn sàng cung ứng.',
    },
    {
      id: 7,
      product: 'Cát xây dựng',
      category: 'Vật liệu thô',
      quantity: 100,
      location: 'Kho D',
      supplier: 'Công ty Vật liệu XYZ',
      status: 'Cần bổ sung',
      lastUpdated: '2025-09-07',
      description: 'Tồn kho cát xây dựng thấp, cần bổ sung ngay.',
    },
    {
      id: 8,
      product: 'Đá 1x2',
      category: 'Vật liệu thô',
      quantity: 150,
      location: 'Kho D',
      supplier: 'Công ty Vật liệu XYZ',
      status: 'Bình thường',
      lastUpdated: '2025-09-08',
      description: 'Tồn kho đá 1x2 tại kho D, đủ cho các công trình vừa.',
    },
    {
      id: 9,
      product: 'Sơn nước Dulux',
      category: 'Sơn',
      quantity: 50,
      location: 'Kho E',
      supplier: 'Công ty Sơn ABC',
      status: 'Cần bổ sung',
      lastUpdated: '2025-09-09',
      description: 'Tồn kho sơn nước Dulux thấp, cần bổ sung ngay.',
    },
    {
      id: 10,
      product: 'Gạch lát nền 60x60',
      category: 'Gạch',
      quantity: 2000,
      location: 'Kho B',
      supplier: 'Nhà máy Gạch Tuynel',
      status: 'Bình thường',
      lastUpdated: '2025-09-10',
      description: 'Tồn kho gạch lát nền tại kho B, chất lượng cao.',
    },
  ];

  const item = mockInventory.find((i) => i.id === parseInt(id)) || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Chi tiết tồn kho</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Sản phẩm:</strong> {item.product}</p>
          <p><strong>Danh mục:</strong> {item.category}</p>
          <p><strong>Số lượng:</strong> {item.quantity?.toLocaleString('vi-VN')}</p>
        </div>
        <div>
          <p><strong>Vị trí:</strong> {item.location}</p>
          <p><strong>Nhà cung cấp:</strong> {item.supplier}</p>
          <p><strong>Trạng thái:</strong> {item.status}</p>
          <p><strong>Ngày cập nhật:</strong> {item.lastUpdated}</p>
          <p><strong>Mô tả:</strong> {item.description}</p>
        </div>
      </div>
      <Link
        to="/supplier/inventory"
        className="mt-4 inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Quay lại
      </Link>
    </div>
  );
};

export default SupplierInventoryDetail;