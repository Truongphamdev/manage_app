import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CustomerProductDetail = () => {
  const { id } = useParams();

  const mockProducts = [
    { id: 1, name: 'Xi măng PC40', category: 'Xi măng', price: 80000, stock: 500, supplier: 'Công ty Xi măng Hà Tiên', description: 'Xi măng chất lượng cao dùng cho xây dựng công trình dân dụng.', specs: 'Độ bền cao, phù hợp cho bê tông.' },
    { id: 2, name: 'Gạch đỏ 4 lỗ', category: 'Gạch', price: 1200, stock: 10000, supplier: 'Nhà máy Gạch Tuynel', description: 'Gạch đỏ chất lượng, dùng cho xây tường.', specs: 'Kích thước chuẩn, chịu lực tốt.' },
    { id: 3, name: 'Thép phi 16', category: 'Sắt thép', price: 15000, stock: 2000, supplier: 'Tập đoàn Hòa Phát', description: 'Thép xây dựng chất lượng cao.', specs: 'Đường kính 16mm, độ bền cao.' },
    { id: 4, name: 'Xi măng PC50', category: 'Xi măng', price: 85000, stock: 300, supplier: 'Công ty Xi măng Hà Tiên', description: 'Xi măng chất lượng cao, chịu lực tốt.', specs: 'Độ bền cao, phù hợp cho công trình lớn.' },
    { id: 5, name: 'Gạch đỏ 6 lỗ', category: 'Gạch', price: 1500, stock: 8000, supplier: 'Nhà máy Gạch Tuynel', description: 'Gạch đỏ 6 lỗ, bền vững.', specs: 'Kích thước lớn, cách âm tốt.' },
    { id: 6, name: 'Thép phi 12', category: 'Sắt thép', price: 12000, stock: 2500, supplier: 'Tập đoàn Hòa Phát', description: 'Thép phi 12 cho công trình nhỏ.', specs: 'Đường kính 12mm, dễ gia công.' },
    { id: 7, name: 'Cát xây dựng', category: 'Vật liệu thô', price: 200000, stock: 100, supplier: 'Công ty Vật liệu XYZ', description: 'Cát sạch, dùng cho trộn bê tông.', specs: 'Hạt mịn, không lẫn tạp chất.' },
    { id: 8, name: 'Đá 1x2', category: 'Vật liệu thô', price: 300000, stock: 150, supplier: 'Công ty Vật liệu XYZ', description: 'Đá xây dựng kích thước 1x2.', specs: 'Kích thước 10-20mm, phù hợp cho bê tông.' },
    { id: 9, name: 'Sơn nước Dulux', category: 'Sơn', price: 500000, stock: 50, supplier: 'Công ty Sơn ABC', description: 'Sơn nước cao cấp, chống thấm.', specs: 'Màu sắc bền, dễ lau chùi.' },
    { id: 10, name: 'Gạch lát nền 60x60', category: 'Gạch', price: 20000, stock: 2000, supplier: 'Nhà máy Gạch Tuynel', description: 'Gạch lát nền chất lượng cao.', specs: 'Kích thước 60x60cm, chống trầy xước.' },
  ];

  const product = mockProducts.find((p) => p.id === parseInt(id)) || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Chi tiết sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Tên sản phẩm:</strong> {product.name}</p>
          <p><strong>Danh mục:</strong> {product.category}</p>
          <p><strong>Giá (VNĐ):</strong> {product.price?.toLocaleString('vi-VN')}</p>
        </div>
        <div>
          <p><strong>Tồn kho:</strong> {product.stock?.toLocaleString('vi-VN')}</p>
          <p><strong>Nhà cung cấp:</strong> {product.supplier}</p>
          <p><strong>Mô tả:</strong> {product.description}</p>
          <p><strong>Thông số kỹ thuật:</strong> {product.specs}</p>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <Link
          to="/customer/products"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Quay lại
        </Link>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default CustomerProductDetail;