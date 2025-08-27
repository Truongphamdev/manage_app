import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  // Giả sử lấy dữ liệu từ API
  const product = {
    id,
    name: 'Xi măng PC40',
    category: 'Xi măng',
    price: 80000,
    stock: 100,
    image: 'cement.jpg',
    unit: 'Bao',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Chi tiết sản phẩm</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="text-gray-600">Danh mục: {product.category}</p>
        <p className="text-gray-600">Giá: {product.price.toLocaleString()} VNĐ</p>
        <p className="text-gray-600">Tồn kho: {product.stock}</p>
        <p className="text-gray-600">Đơn vị: {product.unit}</p>
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;