import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import All_Api from "../../api/AllApi";

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);
  const [locations, setLocations] = useState(["kho HCM", "kho HN", "kho DN"]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [search, setSearch] = useState("");

  const getinventories = async () => {
  try {
    const response = await All_Api.getInventory();
    setInventories(response);
    console.log("inventories", response);
  } catch (error) {
    console.error("Error fetching inventory data:", error);
  }
};
  useEffect(() => {
    getinventories();
  }, []);
  console.log("search", search);

    const handleFilter = async () => {
      try {
        const params = {};
        if (selectedLocation) {
          params.location = selectedLocation;
        }
        console.log("Filter params:", params);
        const response = await All_Api.searchByLocation(params);
        setInventories(response);
        console.log("Filtered inventories:", response);
      } catch (error) {
        console.error("Error filtering inventory data:", error);
      }
    };
  useEffect(() => {
    const fetchData = async () => {
      const params = {};
      if (search) {
        params.search = search;
      }
      try {
        const response = await All_Api.searchByProductName(params);
        setInventories(response);
        console.log("Search results:", response);
      } catch (error) {
        console.error("Error searching inventory data:", error);
      }
    };
    if (search === "") {
      getinventories();
      return;
    }
      const timeoutId = setTimeout(() => {
        fetchData();
      }, 400);
      return () => clearTimeout(timeoutId);
  }, [search]);
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h2 className="text-2xl font-bold text-gray-800">📦 Danh sách tồn kho</h2>
      <div className="flex items-center gap-3">
        <div className="flex-1">
    <input
      type="text"
      placeholder="Tìm kiếm sản phẩm..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-4 py-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
        <label className="text-gray-700 font-medium">Lọc theo kho:</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <button onClick={()=>{handleFilter()}} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Lọc</button>
      </div>
    </div>
    {inventories.length === 0 ? (
      <p className="text-gray-600">Không có dữ liệu tồn kho.</p>
    ) : (
      <div></div>
    )}

    {/* Table view cho md+ */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left font-semibold border-b">ID</th>
            <th className="py-3 px-4 text-left font-semibold border-b">Sản phẩm</th>
            <th className="py-3 px-4 text-right font-semibold border-b">Số lượng</th>
            <th className="py-3 px-4 text-left font-semibold border-b">Vị trí</th>
            <th className="py-3 px-4 text-center font-semibold border-b">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((item, index) => (
            <tr
              key={item.id}
              className={`hover:bg-blue-50 transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="py-3 px-4 border-b text-gray-700">{item.id}</td>
              <td className="py-3 px-4 border-b text-gray-800 font-medium">
                {item.product_name}
              </td>
              <td className="py-3 px-4 border-b text-right font-semibold text-blue-600">
                {item.quantity?.toLocaleString("vi-VN")}
              </td>
              <td className="py-3 px-4 border-b text-gray-600">{item.location}</td>
              <td className="py-3 px-4 border-b text-center">
                <Link
                  to={`/admin/inventory/${item.id}`}
                  className="bg-blue-500 mr-4 text-white px-3 py-1.5 rounded-lg shadow hover:bg-blue-600 transition-colors"
                >
                  Xem chi tiết
                </Link>
                <Link
                  to={`/admin/inventory/${item.ProductID}/report`}
                  className="bg-green-500 text-white px-3 py-1.5 rounded-lg shadow hover:bg-green-600 transition-colors"
                >
                Xem báo cáo
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Card view cho mobile */}
    <div className="md:hidden space-y-4">
      {inventories.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl p-4 shadow-sm bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition"
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">ID: {item.id}</p>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">
              {item.location}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {item.product_name}
          </h3>
          <p className="text-sm mt-1 text-gray-700">
            <span className="font-medium">Số lượng:</span>{" "}
            <span className="text-blue-600 font-semibold">
              {item.quantity?.toLocaleString("vi-VN")}
            </span>
          </p>
          <div className="mt-4">
            <Link
              to={`/admin/inventory/${item.id}`}
              className="inline-block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors text-sm"
            >
              Xem chi tiết
            </Link>
                <Link
                  to={`/admin/inventory/${item.ProductID}/report`}
                  className="inline-block mt-3 w-full text-center bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors text-sm"
                >
                Xem báo cáo
                </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default InventoryList;
