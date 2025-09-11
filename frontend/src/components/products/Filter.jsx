import React, { useState } from 'react';

export const Filter = ({ show, suppliers, categories, locations, onFilter, onclose }) => {
  const [location, setLocation] = useState('');
  const [supplier, setSupplier] = useState('');
  const [category, setCategory] = useState('');
  const [minprice, setMinprice] = useState('');
  const [maxprice, setMaxprice] = useState('');

  const handleApplyFilter = () => {
    const params = {};
    if (location) params.location = location;
    if (supplier) params.supplier = supplier;
    if (category) params.category = category;
    if (minprice) params.min_price = minprice;
    if (maxprice) params.max_price = maxprice;
    onFilter(params);
    onclose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-3xl mx-4 rounded-xl shadow-lg p-6 relative animate-fade-in">
        {/* Nút đóng */}
        <button
          onClick={onclose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✕
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Lọc nâng cao</h3>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Vị trí kho</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Nhà cung cấp</label>
            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              {suppliers.map((sup) => (
                <option key={sup.SupplierID} value={sup.SupplierID}>
                  {sup.full_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Danh mục</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả</option>
              {categories.map((cat) => (
                <option key={cat.CategoryID} value={cat.CategoryID}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Giá tối thiểu</label>
            <input
              type="number"
              value={minprice}
              onChange={(e) => setMinprice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Giá tối đa</label>
            <input
              type="number"
              value={maxprice}
              onChange={(e) => setMaxprice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3 mt-6">
            <button
            onClick={() => {
              setLocation('');
              setSupplier('');
              setCategory('');
              setMinprice('');
              setMaxprice('');
              onFilter({});
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Xóa lọc
          </button>
          <button
            onClick={onclose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Hủy
          </button>
          
          <button
            onClick={handleApplyFilter}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Áp dụng lọc
          </button>
        </div>
      </div>
    </div>
  );
};
