import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import All_Api from "../../../api/AllApi";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const selectedItems = location.state?.selectedItems || [];

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (selectedItems.length > 0) {
          const res = await All_Api.getOrders({ selectedItems });
          setCartItems(res);
          if (res[0]?.address) setAddress(res[0].address);
        }
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };
    fetchCartItems();
  }, [selectedItems]);
useEffect(() => {
  console.log("paymentMethod changed:", paymentMethod);
}, [paymentMethod]);


  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Xử lý đặt hàng khi chọn "Tiền mặt"
  // Nếu là tiền mặt thì tạo đơn hàng
  const products = cartItems.map((item) => ({
    product: item.product.ProductID,
    quantity: item.quantity,
    price: item.product.price,
    location: item.location_id || null,
    location_name: item.location || null,
  }));

  const data = {
    products,
    total_amount: total,
    payment_method: paymentMethod,
    address,
    selected_cart_items: selectedItems,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      setLoading(true);
      await All_Api.createOrder(data);
      alert("Đặt hàng thành công!");
      navigate("/customer/orders");
    } catch (err) {
      console.error("Error creating order:", err);
      setErrors(err.response?.data?.error || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Đang tải...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center sm:text-left">
        Xác nhận đơn hàng
      </h1>
{console.log("paymentMethod:", paymentMethod)}

      {/* Bảng sản phẩm */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Giỏ hàng</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100 text-sm sm:text-base">
              <tr>
                <th className="p-2 border">Sản phẩm</th>
                <th className="p-2 border text-center">SL</th>
                <th className="p-2 border text-right">Giá</th>
                <th className="p-2 border text-center">Kho</th>
                <th className="p-2 border text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b text-sm sm:text-base">
                  <td className="p-2 border">{item.product.name}</td>
                  <td className="p-2 border text-center">{item.quantity}</td>
                  <td className="p-2 border text-right">
                    {Number(item.product.price).toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="p-2 border text-center">{item.location}</td>
                  <td className="p-2 border text-right">
                    {Number(item.product.price * item.quantity).toLocaleString("vi-VN")} ₫
                  </td>
                </tr>
              ))}
              <tr>
                <td className="p-2 border font-bold" colSpan={4}>
                  Tổng cộng
                </td>
                <td className="p-2 border text-right font-bold text-blue-600">
                  {Number(total).toLocaleString("vi-VN")} ₫
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Form đặt hàng */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-4 space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Phương thức thanh toán</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="cash">Tiền mặt</option>
            <option value="bank_transfer">Chuyển khoản</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Địa chỉ giao hàng</label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          {paymentMethod === "cash" ? (
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Xác nhận đặt hàng
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/customer/orders/payment/qrcode", { state: { amount: total, data: { ...data } } })}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
            >
              Chuyển khoản &amp; Lấy QR Code
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition w-full sm:w-auto"
          >
            Quay lại
          </button>
        </div>

      </form>
        {errors && <p className="text-red-500 mt-2">{errors}</p>}
    </div>
  );
}
