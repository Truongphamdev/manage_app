import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import All_Api from "../../api/AllApi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await All_Api.getProductById(id);
        setProduct(response);
        console.log("Dữ liệu sản phẩm:", response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center p-6 text-gray-500">Đang tải...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Chi tiết sản phẩm #{product.ProductID}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ảnh sản phẩm */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Tên:</span> {product.name}
          </p>
          <p>
            <span className="font-semibold">Danh mục:</span>{" "}
            {product.category.name}
          </p>
          <p>
            <span className="font-semibold">Giá:</span>{" "}
             {product.price
              ? Number(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 })
              : '0₫'}
          </p>
          <p>
            <span className="font-semibold">Tồn kho:</span> {product.quantity_stock}
          </p>
          <p>
            <span className="font-semibold">Nhà cung cấp:</span>{" "}
            {Array.isArray(product.suppliers)
              ? product.suppliers.map(sup => sup.full_name).join(", ")
              : ""}
          </p>
          <p>
            <span className="font-semibold">Tên công ty:</span>{" "}
            {product.company_name
}
          </p>
        </div>
      </div>

      {/* Nút quay lại */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
