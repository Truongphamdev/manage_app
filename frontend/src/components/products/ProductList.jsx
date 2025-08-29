import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Xi măng PC40', category: 'Xi măng', price: 80000, stock: 100, image: 'cement.jpg' },
    { id: 2, name: 'Gạch đỏ 4 lỗ', category: 'Gạch', price: 1200, stock: 5000, image: 'brick.jpg' },
    { id: 3, name: 'Thép phi 16', category: 'Sắt thép', price: 15000, stock: 200, image: 'steel.jpg' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Danh sách sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">Danh mục: {product.category}</p>
            <p className="text-gray-600">Giá: {product.price.toLocaleString()} VNĐ</p>
            <p className="text-gray-600">Tồn kho: {product.stock}</p>
            <div className="mt-4 flex space-x-2">
              <Link to={`/admin/products/${product.id}`} className="text-blue-600 hover:underline">
                Chi tiết
              </Link>
              <button className="text-blue-600 hover:underline">Sửa</button>
              <button className="text-red-600 hover:underline">Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;