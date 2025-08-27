import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center py-4 border-b">
      <div>
        <h3 className="text-lg font-semibold">{item.product}</h3>
        <p className="text-gray-600">Số lượng: {item.quantity}</p>
        <p className="text-gray-600">Giá: {item.price.toLocaleString()} VNĐ</p>
      </div>
      <div>
        <button className="text-blue-600 hover:underline mr-4">Sửa</button>
        <button className="text-red-600 hover:underline">Xóa</button>
      </div>
    </div>
  );
};

export default CartItem;