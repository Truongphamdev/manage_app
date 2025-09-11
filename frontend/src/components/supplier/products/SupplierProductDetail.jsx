import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import All_Api from '../../../api/AllApi';
const SupplierProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(()=> {
    getProductbyID();
  }, [id]);
  const getProductbyID = async () => {
    try {
      const response = await All_Api.getSupplierProductById(id);
      setProduct(response);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  console.log("product", product);
return (
  <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
      Chi tiết sản phẩm
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-semibold text-gray-900">ID:</span>{" "}
          {product.ProductID}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-gray-900">Tên sản phẩm:</span>{" "}
          {product.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-gray-900">Danh mục:</span>{" "}
          {product.category}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold text-gray-900">Giá (VNĐ):</span>{" "}
          {product.cost_price
            ? Number(product.cost_price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
                minimumFractionDigits: 0,
              })
            : "0₫"}
        </p>
      </div>

      <div className="space-y-3">
<p className="text-gray-700">
  <span className="font-semibold text-gray-900">Ngày cập nhật:</span>{" "}
  {product.created_at ? new Date(product.created_at).toLocaleDateString('vi-VN') : 'N/A'}
</p>
      </div>
    </div>

    <div className="mt-8">
      <Link
        to="/supplier/products"
        className="inline-block bg-gray-600 text-white px-5 py-2.5 rounded-xl shadow hover:bg-gray-700 transition-colors"
      >
        ← Quay lại danh sách
      </Link>
    </div>
  </div>
);

};

export default SupplierProductDetail;