import React from 'react';
import { Link } from 'react-router-dom';

const SupplierProductList = () => {
  const mockProducts = [
    { id: 1, name: 'Xi măng PC40', category: 'Xi măng', price: 80000, stock: 500, supplier: 'Công ty Xi măng Hà Tiên', lastUpdated: '2025-09-01' },
    { id: 2, name: 'Gạch đỏ 4 lỗ', category: 'Gạch', price: 1200, stock: 10000, supplier: 'Nhà máy Gạch Tuynel', lastUpdated: '2025-09-02' },
    { id: 3, name: 'Thép phi 16', category: 'Sắt thép', price: 15000, stock: 2000, supplier: 'Tập đoàn Hòa Phát', lastUpdated: '2025-09-03' },
    { id: 4, name: 'Xi măng PC50', category: 'Xi măng', price: 85000, stock: 300, supplier: 'Công ty Xi măng Hà Tiên', lastUpdated: '2025-09-04' },
    { id: 5, name: 'Gạch đỏ 6 lỗ', category: 'Gạch', price: 1500, stock: 8000, supplier: 'Nhà máy Gạch Tuynel', lastUpdated: '2025-09-05' },
    { id: 6, name: 'Thép phi 12', category: 'Sắt thép', price: 12000, stock: 2500, supplier: 'Tập đoàn Hòa Phát', lastUpdated: '2025-09-06' },
    { id: 7, name: 'Cát xây dựng', category: 'Vật liệu thô', price: 200000, stock: 100, supplier: 'Công ty Vật liệu XYZ', lastUpdated: '2025-09-07' },
    { id: 8, name: 'Đá 1x2', category: 'Vật liệu thô', price: 300000, stock: 150, supplier: 'Công ty Vật liệu XYZ', lastUpdated: '2025-09-08' },
    { id: 9, name: 'Sơn nước Dulux', category: 'Sơn', price: 500000, stock: 50, supplier: 'Công ty Sơn ABC', lastUpdated: '2025-09-09' },
    { id: 10, name: 'Gạch lát nền 60x60', category: 'Gạch', price: 20000, stock: 2000, supplier: 'Nhà máy Gạch Tuynel', lastUpdated: '2025-09-10' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm cung cấp</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Tên sản phẩm</th>
              <th className="py-2 px-4 border">Danh mục</th>
              <th className="py-2 px-4 border">Giá (VNĐ)</th>
              <th className="py-2 px-4 border">Tồn kho</th>
              <th className="py-2 px-4 border">Nhà cung cấp</th>
              <th className="py-2 px-4 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border">{product.id}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">{product.category}</td>
                <td className="py-2 px-4 border">{product.price.toLocaleString('vi-VN')}</td>
                <td className="py-2 px-4 border">{product.stock.toLocaleString('vi-VN')}</td>
                <td className="py-2 px-4 border">{product.supplier}</td>
                <td className="py-2 px-4 border">
                  <Link
                    to={`/supplier/products/${product.id}`}
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

export default SupplierProductList;