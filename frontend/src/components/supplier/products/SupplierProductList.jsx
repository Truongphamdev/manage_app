import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import All_Api from "../../../api/AllApi";

const SupplierProductList = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    getProductlist();
  }, []);

  const getProductlist = async () => {
    try {
      const response = await All_Api.getSupplierProducts();
      setProducts(response);
    } catch (error) {
      setErrors(error.response?.data || error.message);
    }
  };

  if (errors) {
    return (
      <div className="text-center p-6 text-red-500">
        Lỗi: {JSON.stringify(errors)}
      </div>
    );
  }
  if (products.length === 0) {
    return <div className="text-center p-6">Không có sản phẩm nào.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Danh sách sản phẩm cung cấp
      </h2>

      {/* Table view cho desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold border-b">ID</th>
              <th className="py-3 px-4 text-left font-semibold border-b">Tên sản phẩm</th>
              <th className="py-3 px-4 text-left font-semibold border-b">Danh mục</th>
              <th className="py-3 px-4 text-left font-semibold border-b">Giá bán (VNĐ)</th>
              <th className="py-3 px-4 text-center font-semibold border-b">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.ProductID}
                className={`hover:bg-gray-50 transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-4 border-b text-gray-700">{product.ProductID}</td>
                <td className="py-3 px-4 border-b text-gray-700">{product.name}</td>
                <td className="py-3 px-4 border-b text-gray-700">{product.category}</td>
                <td className="py-3 px-4 border-b text-gray-700 font-medium">
                  {product.cost_price
                    ? Number(product.cost_price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                      })
                    : "0₫"}
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <Link
                    to={`/supplier/products/${product.ProductID}`}
                    className="inline-block bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition-colors"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view cho mobile */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div
            key={product.ProductID}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">ID:</span> {product.ProductID}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Danh mục:</span> {product.category}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Giá bán:</span>{" "}
              {product.cost_price
                ? Number(product.cost_price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                  })
                : "0₫"}
            </p>
            <Link
              to={`/supplier/products/${product.ProductID}`}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors w-full text-center"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierProductList;
