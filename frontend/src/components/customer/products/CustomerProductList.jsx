import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import All_Api from "../../../api/AllApi";

const CustomerProductList = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState("");
  const [product_id, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await All_Api.getCustomerProducts();
        setProducts(response);
      } catch (error) {
        setErrors(error.response?.data || "Lỗi khi tải sản phẩm");
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  // add to cart
  const handleAddToCart = async () => {
    if (quantity < 1) {
      setMessage("Số lượng phải lớn hơn 0");
      return;
    }
    if (quantity > products.find((p) => p.ProductID === product_id).stock) {
      setMessage("Số lượng vượt quá tồn kho");
      return;
    }
    if (!location) {
      setMessage("Vui lòng chọn vị trí");
      return;
    }
    if (quantity> products.find((p) => p.ProductID === product_id).location_info.find(loc => loc.location === location)?.quantity) {
      setMessage("Số lượng vượt quá tồn kho tại vị trí đã chọn");
      return;
    }
    try {
      const data = { product_id, quantity, location: parseInt(location) };
      await All_Api.addToCart(data);
      alert("Thêm vào giỏ hàng thành công");
      setAddModalOpen(false);
      setMessage("");
      setQuantity(1);
    } catch (error) {
      setErrors(error.response?.data || "Lỗi khi thêm vào giỏ hàng");
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
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Danh sách sản phẩm
      </h2>

      {/* Modal thêm vào giỏ */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Thêm vào giỏ hàng
            </h3>
            {message && (
              <div className="mb-4 text-red-500 font-medium text-center">
                {message}
              </div>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
              className="space-y-4"
            >
              <label className="block text-gray-700 font-medium">
                Số lượng:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số lượng"
                required
              />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn vị trí</option>
                {products.find((p) => p.ProductID === product_id)?.location_info.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.location} (Tồn: {loc.quantity})
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setAddModalOpen(false);
                    setMessage("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid responsive */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.ProductID}
            className="bg-white rounded-xl border shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            {/* Ảnh */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />

            {/* Thông tin */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-blue-600 font-bold text-lg mt-1">
                  {Number(product.price).toLocaleString("vi-VN")} ₫
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Tồn kho:{" "}
                  <span className="font-medium">
                    {product.stock} 
                  </span>
                </p>
              </div>

              {/* Nút hành động */}
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Link
                  to={`/customer/products/${product.ProductID}`}
                  className="flex-1 text-center bg-blue-500 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Xem chi tiết
                </Link>
                <button
                  onClick={() => {
                    setProductId(product.ProductID);
                    setAddModalOpen(true);
                  }}
                  className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg shadow hover:bg-green-600 transition"
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProductList;
