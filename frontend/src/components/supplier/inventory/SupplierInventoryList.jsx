import React from 'react';
import { Link } from 'react-router-dom';

const SupplierInventoryList = () => {
  const mockInventory = [
    { id: 1, product: 'Xi măng PC40', category: 'Xi măng', quantity: 500, location: 'Kho A', supplier: 'Công ty Xi măng Hà Tiên', status: 'Bình thường', lastUpdated: '2025-09-01' },
    { id: 2, product: 'Gạch đỏ 4 lỗ', category: 'Gạch', quantity: 10000, location: 'Kho B', supplier: 'Nhà máy Gạch Tuynel', status: 'Bình thường', lastUpdated: '2025-09-02' },
    { id: 3, product: 'Thép phi 16', category: 'Sắt thép', quantity: 2000, location: 'Kho C', supplier: 'Tập đoàn Hòa Phát', status: 'Cần bổ sung', lastUpdated: '2025-09-03' },
    { id: 4, product: 'Xi măng PC50', category: 'Xi măng', quantity: 300, location: 'Kho A', supplier: 'Công ty Xi măng Hà Tiên', status: 'Bình thường', lastUpdated: '2025-09-04' },
    { id: 5, product: 'Gạch đỏ 6 lỗ', category: 'Gạch', quantity: 8000, location: 'Kho B', supplier: 'Nhà máy Gạch Tuynel', status: 'Bình thường', lastUpdated: '2025-09-05' },
    { id: 6, product: 'Thép phi 12', category: 'Sắt thép', quantity: 2500, location: 'Kho C', supplier: 'Tập đoàn Hòa Phát', status: 'Bình thường', lastUpdated: '2025-09-06' },
    { id: 7, product: 'Cát xây dựng', category: 'Vật liệu thô', quantity: 100, location: 'Kho D', supplier: 'Công ty Vật liệu XYZ', status: 'Cần bổ sung', lastUpdated: '2025-09-07' },
    { id: 8, product: 'Đá 1x2', category: 'Vật liệu thô', quantity: 150, location: 'Kho D', supplier: 'Công ty Vật liệu XYZ', status: 'Bình thường', lastUpdated: '2025-09-08' },
    { id: 9, product: 'Sơn nước Dulux', category: 'Sơn', quantity: 50, location: 'Kho E', supplier: 'Công ty Sơn ABC', status: 'Cần bổ sung', lastUpdated: '2025-09-09' },
    { id: 10, product: 'Gạch lát nền 60x60', category: 'Gạch', quantity: 2000, location: 'Kho B', supplier: 'Nhà máy Gạch Tuynel', status: 'Bình thường', lastUpdated: '2025-09-10' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Danh sách tồn kho</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Sản phẩm</th>
              <th className="py-2 px-4 border">Danh mục</th>
              <th className="py-2 px-4 border">Số lượng</th>
              <th className="py-2 px-4 border">Vị trí</th>
              <th className="py-2 px-4 border">Nhà cung cấp</th>
              <th className="py-2 px-4 border">Trạng thái</th>
              <th className="py-2 px-4 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {mockInventory.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border">{item.id}</td>
                <td className="py-2 px-4 border">{item.product}</td>
                <td className="py-2 px-4 border">{item.category}</td>
                <td className="py-2 px-4 border">{item.quantity.toLocaleString('vi-VN')}</td>
                <td className="py-2 px-4 border">{item.location}</td>
                <td className="py-2 px-4 border">{item.supplier}</td>
                <td className="py-2 px-4 border">{item.status}</td>
                <td className="py-2 px-4 border">
                  <Link
                    to={`/supplier/inventory/${item.id}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierInventoryList;