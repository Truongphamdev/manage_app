import React from 'react';
import { Link } from 'react-router-dom';

const CustomerProductList = () => {
  const mockProducts = [
    { id: 1, name: 'Xi măng PC40', category: 'Xi măng', price: 80000, stock: 500, supplier: 'Công ty Xi măng Hà Tiên', description: 'Xi măng chất lượng cao dùng cho xây dựng công trình dân dụng.' },
    { id: 2, name: 'Gạch đỏ 4 lỗ', category: 'Gạch', price: 1200, stock: 10000, supplier: 'Nhà máy Gạch Tuynel', description: 'Gạch đỏ chất lượng, dùng cho xây tường.' },
    { id: 3, name: 'Thép phi 16', category: 'Sắt thép', price: 15000, stock: 2000, supplier: 'Tập đoàn Hòa Phát', description: 'Thép xây dựng chất lượng cao.' },
    { id: 4, name: 'Xi măng PC50', category: 'Xi măng', price: 85000, stock: 300, supplier: 'Công ty Xi măng Hà Tiên', description: 'Xi măng chất lượng cao, chịu lực tốt.' },
    { id: 5, name: 'Gạch đỏ 6 lỗ', category: 'Gạch', price: 1500, stock: 8000, supplier: 'Nhà máy Gạch Tuynel', description: 'Gạch đỏ 6 lỗ, bền vững.' },
    { id: 6, name: 'Thép phi 12', category: 'Sắt thép', price: 12000, stock: 2500, supplier: 'Tập đoàn Hòa Phát', description: 'Thép phi 12 cho công trình nhỏ.' },
    { id: 7, name: 'Cát xây dựng', category: 'Vật liệu thô', price: 200000, stock: 100, supplier: 'Công ty Vật liệu XYZ', description: 'Cát sạch, dùng cho trộn bê tông.' },
    { id: 8, name: 'Đá 1x2', category: 'Vật liệu thô', price: 300000, stock: 150, supplier: 'Công ty Vật liệu XYZ', description: 'Đá xây dựng kích thước 1x2.' },
    { id: 9, name: 'Sơn nước Dulux', category: 'Sơn', price: 500000, stock: 50, supplier: 'Công ty Sơn ABC', description: 'Sơn nước cao cấp, chống thấm.' },
    { id: 10, name: 'Gạch lát nền 60x60', category: 'Gạch', price: 20000, stock: 2000, supplier: 'Nhà máy Gạch Tuynel', description: 'Gạch lát nền chất lượng cao.' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p><strong>Danh mục:</strong> {product.category}</p>
            <p><strong>Giá:</strong> {product.price.toLocaleString('vi-VN')} VNĐ</p>
            <p><strong>Tồn kho:</strong> {product.stock.toLocaleString('vi-VN')}</p>
            <p><strong>Nhà cung cấp:</strong> {product.supplier}</p>
            <div className="mt-4 flex space-x-2">
              <Link
                to={`/customer/products/${product.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Xem chi tiết
              </Link>
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProductList;