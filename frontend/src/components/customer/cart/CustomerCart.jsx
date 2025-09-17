import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react"; 
import All_Api from "../../../api/AllApi";

const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartItems();
  }, []);
  const fetchCartItems = async () => {
    try {
      const response = await All_Api.getCart();
      setCartItems(response);
      setLoading(false);
    } catch (error) {
      setErrors(error.response?.data || "Lỗi khi lấy giỏ hàng");
      setLoading(false);
    }
  };

  const handleUpdateCart = async (itemId, newQuantity) => {
    try {
      await All_Api.updateCartItemQuantity(itemId, { quantity: newQuantity });
      fetchCartItems();
    } catch (error) {
      console.log(error.response?.data || "Lỗi khi cập nhật giỏ hàng");
    }
  };
// xử lý chọn san phẩm
const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>{
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter(id => id !== itemId);
      }
      return [...prevSelected, itemId];
    });
  };
  console.log('selectedItems', selectedItems);
  // xóa sản phẩm
  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) return;
    try {
      await All_Api.removeCartItem(itemId);
      alert("Xóa sản phẩm thành công");
      fetchCartItems();
    } catch (error) {
      alert(error.response?.data || "Lỗi khi xóa sản phẩm");
    }
  };

  useEffect(() => {
    if (!cartItems.items) return;
    const totalAmount = cartItems.items.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cartItems]);
// navigate state
  const goToPayment = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }
    navigate("/customer/orders/checkout", { state: { selectedItems } });
  };
  if (loading) {
    return <div className="p-6 text-center">Đang tải...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Giỏ hàng</h2>

      {(!cartItems.items || cartItems.items.length === 0) ? (
        <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className={`min-w-full  border rounded-lg bg-white`}>
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 border text-center">ID</th>
                  <th className="py-3 px-4 border text-center">Chọn</th>
                  <th className="py-3 px-4 border text-center">Sản phẩm</th>
                  <th className="py-3 px-4 border text-center">Ảnh</th>
                  <th className="py-3 px-4 border text-center">Số lượng</th>
                  <th className="py-3 px-4 border text-center">Giá</th>
                  <th className="py-3 px-4 border text-center">Tổng</th>
                  <th className="py-3 px-4 border text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 border text-center">{item.id}</td>
                    <td className="py-3 px-4 border text-center">
                      <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} />
                    </td>
                    <td className="py-3 px-4 border text-center font-medium text-gray-800">
                      {item.product_name}
                    </td>
                    <td className="py-3 px-4 border text-center">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded block mx-auto"
                      />
                    </td>
                    <td className="py-3 px-4 border text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleUpdateCart(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center font-medium border rounded"
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateCart(item.id, Number(e.target.value))
                          }
                        />
                        <button
                          onClick={() => handleUpdateCart(item.id, item.quantity + 1)}
                          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 border text-center text-blue-600 font-semibold">
                      {Number(item.product_price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                      })}
                    </td>
                    <td className="py-3 px-4 border text-center font-medium">
                      {Number(item.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                      })}
                    </td>
                    
                    <td className="py-3 px-4 border text-center">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {cartItems.items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-sm flex flex-col gap-3">
                <div>
                  <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)} />
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.product_name}</h3>
                    <p className="text-blue-600 font-medium">
                      {Number(item.product_price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateCart(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      className="w-12 text-center border rounded"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateCart(item.id, Number(e.target.value))
                      }
                    />
                    <button
                      onClick={() => handleUpdateCart(item.id, item.quantity + 1)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>

                <div className="text-right font-semibold text-gray-700">
                  Tổng:{" "}
                  {Number(item.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Tổng tiền */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-lg font-semibold text-gray-800">
              Tổng tiền:{" "}
              <span className="text-red-600">
                {Number(total).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                })}
              </span>
            </p>
            <Link
              onClick={(e) => {
                e.preventDefault();
                goToPayment();
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Thanh toán
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerCart;
