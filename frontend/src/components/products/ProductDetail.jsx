import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Giả lập lấy dữ liệu từ API hoặc mock data
    const fetchProduct = async () => {
      try {
        // Thay bằng API call thực tế nếu có
        const mockProducts = [
          { id: 1, name: 'Xi măng PC40', category: 'Xi măng', price: 80000, stock: 100, image: 'cement.jpg' },
          { id: 2, name: 'Gạch đỏ 4 lỗ', category: 'Gạch', price: 1200, stock: 5000, image: 'brick.jpg' },
          { id: 3, name: 'Thép phi 16', category: 'Sắt thép', price: 15000, stock: 200, image: 'steel.jpg' },
        ];
        const foundProduct = mockProducts.find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center p-6">Đang tải...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chi tiết sản phẩm</h2>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <p className="text-gray-600"><strong>Tên:</strong> {product.name}</p>
      <p className="text-gray-600"><strong>Danh mục:</strong> {product.category}</p>
      <p className="text-gray-600"><strong>Giá:</strong> {product.price.toLocaleString()} VNĐ</p>
      <p className="text-gray-600"><strong>Tồn kho:</strong> {product.stock}</p>
      <button
        onClick={() => navigate('/admin/products')}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Quay lại
      </button>
    </div>
  );
};

export default ProductDetail;