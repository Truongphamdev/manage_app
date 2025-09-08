// frontend/src/components/products/AddProduct.jsx
import React, { useState } from 'react';
import All_Api from '../../api/AllApi';

const AddProductForm = ({ show, onClose, onSuccess, categories, suppliers, units }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: '',
    suppliers: [],
    price: 0,
    unit: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }
    data.append("category", formData.category);
    formData.suppliers.forEach(id => data.append("suppliers", id));
    data.append("price", formData.price);
    data.append("unit", formData.unit);

    try {
      await All_Api.createProduct(data);
      onSuccess();
      onClose();
      setFormData({ name: '', image: '', category: '', suppliers: [], price: 0, unit: '' });
      setPreviewImage(null);
      setErrors(null);
    } catch (error) {
      setErrors(error?.response?.data);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 relative max-h-screen sm:max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-600">
          Thêm sản phẩm
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>  {/* Sửa thành handleSubmit */}
          <div>
            <label className="block font-medium mb-1">Tên sản phẩm</label>
            <input
              required
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tên sản phẩm"
            />
            {errors?.name && (
              <p className="text-red-500 text-sm">{errors.name[0]}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Ảnh sản phẩm</label>
            <input
              required
              type="file"
              name="image"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleImageChange}
              placeholder="Ảnh sản phẩm"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-full h-48 object-cover rounded-md"
              />
            )}
            {errors?.image && (
              <p className="text-red-500 text-sm">{errors.image[0]}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Thể loại</label>
            <select
              required
              name="category"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Chọn thể loại</option>
              {categories.map((cat) => (
                <option key={cat?.CategoryID || cat} value={cat?.CategoryID}>
                  {cat?.name || cat}
                </option>
              ))}
            </select>
            {errors?.category && (
              <p className="text-red-500 text-sm">{errors.category[0]}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Nhà cung cấp</label>
            <select
              required
              name="suppliers"
              multiple
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.suppliers || []}
              onChange={e => {
                const selected = Array.from(e.target.selectedOptions, option => Number(option.value));
                setFormData({ ...formData, suppliers: selected });
              }}
            >
              {suppliers.map((sup) => (
                <option key={sup?.SupplierID || sup} value={sup?.SupplierID}>
                  {sup?.full_name + ' (' + sup?.company_name + ')' || sup}
                </option>
              ))}
            </select>
            {errors?.suppliers && (
              <p className="text-red-500 text-sm">{errors.suppliers[0]}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Giá bán</label>
            <input
              required
              type="number"
              name="price"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.price}
              onChange={handleChange}
              placeholder="Giá bán"
            />
            {errors?.price && (
              <p className="text-red-500 text-sm">{errors.price[0]}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">Đơn vị</label>
            <select
              required
              name="unit"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.unit}
              onChange={handleChange}
            >
              <option value="">Chọn đơn vị</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
            {errors?.unit && (
              <p className="text-red-500 text-sm">{errors.unit[0]}</p>
            )}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              Thêm sản phẩm
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 mt-4"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;