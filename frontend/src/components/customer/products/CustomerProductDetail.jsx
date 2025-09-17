import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import All_Api from "../../../api/AllApi";

const CustomerProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [product_id, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await All_Api.getCustomerProductById(id);
        setProduct(response);
        console.log("Product detail:", response);
      } catch (err) {
        setError(err.response?.data || "Không tìm thấy sản phẩm");
      }
    };
    fetchProduct();
  }, [id]);
  console.log("product detail", product);
// add to cart
  const handleAddToCart = async () => {
    if (quantity < 1) {
      setMessage("Số lượng phải lớn hơn 0");
      return;
    }
    if (quantity > product.stock) {
      setMessage("Số lượng vượt quá tồn kho");
      return;
    }
    if (!location) {
      setMessage("Vui lòng chọn vị trí");
      return;
    }
    if (quantity> product.location_info.find(loc => loc.location === location)?.quantity) {
      setMessage("Số lượng vượt quá tồn kho tại vị trí đã chọn");
      return;
    }
    try {
      const data = { product_id, quantity ,location: parseInt(location)};
      await All_Api.addToCart(data);
      alert("Thêm vào giỏ hàng thành công");
      setAddModalOpen(false);
      setMessage("");
      setQuantity(1);
    } catch (error) {
      setErrors(error.response?.data || "Lỗi khi thêm vào giỏ hàng");
    }
  };
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-6 text-center">Đang tải...</div>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto">
      <Link to="/customer/products" className="text-white hover:bg-sky-600 rounded p-3 bg-sky-500 mb-4 inline-block">← Quay lại</Link>
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
                {product.location_info.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.location} - {loc.quantity}
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
      <div className="flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow" />

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p><span className="font-medium">Danh mục:</span> {product.category_name}</p>
          <p><span className="font-medium">Giá:</span> {Number(product.price).toLocaleString("vi-VN")} ₫</p>
          <p><span className="font-medium">Tồn kho:</span> {product.stock} {product.unit}</p>
          <p><span className="font-medium">Nhà cung cấp:</span> {Array.isArray(product.supplier_name) ? product.supplier_name.join(", ") : "N/A"}</p>

          <button
            onClick={() => {
              setAddModalOpen(true);
              setProductId(product.ProductID);
            }}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProductDetail;
