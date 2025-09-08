import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import All_Api from '../../api/AllApi';

const InventoryDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchInventoryDetail = async () => {
      try {
        const response = await All_Api.getInventoryById(id);
        setItem(response);
        console.log("inventory detail", response);
      } catch (error) {
        console.error('Error fetching inventory detail:', error);
      }
    };
    fetchInventoryDetail();
  }, [id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">📦 Chi tiết tồn kho</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái */}
        <div className="space-y-3">
          <p className="text-gray-600"><strong className="text-gray-800">ID:</strong> {item.id}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Sản phẩm:</strong> {item.product}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Danh mục:</strong> {item.category}</p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Số lượng:</strong> {item.quantity?.toLocaleString('vi-VN')}
          </p>
        </div>

        {/* Cột phải */}
        <div className="space-y-3">
          <p className="text-gray-600"><strong className="text-gray-800">Vị trí:</strong> {item.location}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Nhà cung cấp:</strong> {item.supplier}</p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Giá bán:</strong>{" "}
            {item.price
              ? Number(item.price).toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })
              : "0₫"}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">Giá nhập:</strong>{" "}
            {item.cost_price
              ? Number(item.cost_price).toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })
              : "0₫"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/admin/inventory"
          className="inline-block bg-gray-600 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-700 transition"
        >
          ⬅ Quay lại
        </Link>
      </div>
    </div>
  );
};

export default InventoryDetail;
