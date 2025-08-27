import React from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = [
    { id: 1, product: 'Xi măng PC40', quantity: 10, price: 80000 },
    { id: 2, product: 'Gạch đỏ 4 lỗ', quantity: 100, price: 1200 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
        <div className="mt-4 flex justify-between">
          <p className="text-xl font-semibold">Tổng cộng: {total.toLocaleString()} VNĐ</p>
          <Link to="/orders/new" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Đặt hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;