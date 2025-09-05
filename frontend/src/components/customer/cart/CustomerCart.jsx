import React from 'react';
import { Link } from 'react-router-dom';

const CustomerCart = () => {
  const mockCartItems = [
    { id: 1, product: 'Xi măng PC40', quantity: 10, price: 80000, supplier: 'Công ty Xi măng Hà Tiên' },
    { id: 2, product: 'Gạch đỏ 4 lỗ', quantity: 100, price: 1200, supplier: 'Nhà máy Gạch Tuynel' },
    { id: 3, product: 'Thép phi 16', quantity: 20, price: 15000, supplier: 'Tập đoàn Hòa Phát' },
    { id: 4, product: 'Xi măng PC50', quantity: 5, price: 85000, supplier: 'Công ty Xi măng Hà Tiên' },
    { id: 5, product: 'Gạch đỏ 6 lỗ', quantity: 50, price: 1500, supplier: 'Nhà máy Gạch Tuynel' },
    { id: 6, product: 'Thép phi 12', quantity: 30, price: 12000, supplier: 'Tập đoàn Hòa Phát' },
    { id: 7, product: 'Cát xây dựng', quantity: 2, price: 200000, supplier: 'Công ty Vật liệu XYZ' },
    { id: 8, product: 'Đá 1x2', quantity: 3, price: 300000, supplier: 'Công ty Vật liệu XYZ' },
    { id: 9, product: 'Sơn nước Dulux', quantity: 1, price: 500000, supplier: 'Công ty Sơn ABC' },
    { id: 10, product: 'Gạch lát nền 60x60', quantity: 20, price: 20000, supplier: 'Nhà máy Gạch Tuynel' },
  ];

  const total = mockCartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Giỏ hàng</h2>
      {mockCartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Sản phẩm</th>
                  <th className="py-2 px-4 border">Số lượng</th>
                  <th className="py-2 px-4 border">Giá (VNĐ)</th>
                  <th className="py-2 px-4 border">Tổng (VNĐ)</th>
                  <th className="py-2 px-4 border">Nhà cung cấp</th>
                  <th className="py-2 px-4 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {mockCartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border">{item.id}</td>
                    <td className="py-2 px-4 border">{item.product}</td>
                    <td className="py-2 px-4 border">{item.quantity.toLocaleString('vi-VN')}</td>
                    <td className="py-2 px-4 border">{item.price.toLocaleString('vi-VN')}</td>
                    <td className="py-2 px-4 border">{(item.quantity * item.price).toLocaleString('vi-VN')}</td>
                    <td className="py-2 px-4 border">{item.supplier}</td>
                    <td className="py-2 px-4 border">
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Tổng tiền: {total.toLocaleString('vi-VN')} VNĐ</p>
            <Link
              to="/customer/payments"
              className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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