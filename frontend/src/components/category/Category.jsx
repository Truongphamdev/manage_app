import React, { useEffect, useState } from "react";
import All_Api from "../../api/AllApi";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editingCat, setEditingCat] = useState(null);     // cat đang sửa
  const [form, setForm] = useState({ name: "", description: "" });

  // ===== Lấy danh mục =====
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await All_Api.getCategories();
      setCategories(res);
    } catch (err) {
      console.error("Lỗi tải danh mục:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  // ===== Thêm hoặc Cập nhật =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCat) {
        await All_Api.updateCategory(editingCat.CategoryID, form);
      } else {
        await All_Api.addCategory(form);
      }
      setForm({ name: "", description: "" });
      setEditingCat(null);
      fetchCategories();
    } catch (err) {
      console.error("Lỗi lưu danh mục:", err);
    }
  };

  // ===== Xóa =====
  const handleDelete = async (CategoryID) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa danh mục này?")) return;
    try {
      await All_Api.deleteCategory(CategoryID);
      setCategories(categories.filter((c) => c.CategoryID !== CategoryID));
    } catch (err) {
      console.error("Lỗi xóa danh mục:", err);
    }
  };

  // Lọc tìm kiếm
  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      <h1 className="text-2xl font-bold">Quản lý danh mục</h1>

      {/* Form thêm / sửa */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-4 space-y-4"
      >
        <h2 className="text-lg font-semibold">
          {editingCat ? "Cập nhật danh mục" : "Thêm danh mục mới"}
        </h2>
        <input
          type="text"
          placeholder="Tên danh mục"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingCat ? "Cập nhật" : "Thêm"}
          </button>
          {editingCat && (
            <button
              type="button"
              onClick={() => {
                setEditingCat(null);
                setForm({ name: "", description: "" });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      {/* Tìm kiếm */}
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm danh mục..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full sm:w-1/2"
        />
      </div>

      {/* Bảng danh mục */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">CategoryID</th>
              <th className="p-3 border">Tên danh mục</th>
              <th className="p-3 border text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((cat) => (
                <tr key={cat.CategoryID} className="hover:bg-gray-50">
                  <td className="p-3 border">{cat.CategoryID}</td>
                  <td className="p-3 border font-medium">{cat.name}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingCat(cat);
                        setForm({ name: cat.name, description: cat.description });
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(cat.CategoryID)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  Không có danh mục
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
