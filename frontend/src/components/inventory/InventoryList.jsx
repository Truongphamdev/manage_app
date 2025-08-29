import React from 'react';

const InventoryList = () => {
  const inventories = [
    { InventoryID: 1, ProductID: 'SP001', Quantity: 100, Location: 'Kho A' },
    { InventoryID: 2, ProductID: 'SP002', Quantity: 50, Location: 'Kho B' },
    { InventoryID: 3, ProductID: 'SP003', Quantity: 200, Location: 'Kho C' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Quản Lý Tồn Kho</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Sản Phẩm</th>
              <th className="py-2 px-4 border">Số Lượng</th>
              <th className="py-2 px-4 border">Vị Trí</th>
              <th className="py-2 px-4 border">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {inventories.map((inventory) => (
              <tr key={inventory.InventoryID}>
                <td className="py-2 px-4 border">{inventory.InventoryID}</td>
                <td className="py-2 px-4 border">{inventory.ProductID}</td>
                <td className="py-2 px-4 border">{inventory.Quantity}</td>
                <td className="py-2 px-4 border">{inventory.Location}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                    Sửa
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;