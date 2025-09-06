import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import All_Api from '../../api/AllApi';
import PurchaseForm from './purchase/AddPurchase';
const ProductList = () => {
  const [formData, setFormData] = React.useState(
    { name:'',
     image:'',
    category:'', 
    suppliers:[],
    price:0,
    unit:'',
    quantity_stock:'',
  } );
  const locations = ['kho HCM', 'kho HN', 'kho DN'];
  const [products, setProducts] = React.useState([]);
  const [suppliers,setSuppliers] = useState([]);
  const [categories,setCategories] = useState([]);
  const [errors,setErrors] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showUpdateProductForm, setShowUpdateProductForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const initFormdata = {
    name: '',
    image: '',
    category: '',
    suppliers: [],
    price: 0,
    unit: '',
    quantity_stock: '',
  };
  const navigate = useNavigate();
  console.log("Dữ liệu sản phẩm:", products);
  useEffect(() => {
    getFormData();
    getProducts();
  }, []);
  const units = [
  "Cái",
  "Chiếc",
  "Hộp",
  "Thùng",
  "Kg",
  "Gram",
  "Lít",
  "Chai",
  "Túi",
  "Bộ",
  "Cuộn",
  "Gói",
  "Mét",
  "Đôi",
  "Cặp",
  "Bao"
];
// lấy dữ liệu cho các trường trong form
  const getFormData  = async() => {
    try {
      const response = await All_Api.getFormdata();
      setCategories(response.categories);
      setSuppliers(response.suppliers);
      console.log("dữ liệu cho form",response)
    } catch (error) {
      console.error("Error fetching form data:", error);
      setErrors(error?.response?.data)
    }
  };
  const handleProductChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }
  // lấy dữ liệu cho các sản phẩm
  const getProducts = async() => {
    try {
      const response = await All_Api.getProducts();
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrors(error?.response?.data);
    }
  }
  // xử lý đường dẫn ảnh
  const handleImageURL = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    if (previewImage) {
        URL.revokeObjectURL(previewImage);
    }
    else {
      setPreviewImage(URL.createObjectURL(file));
    }
    }
  }
  // xử lý thêm sản phẩm
  const handleAddProduct = async (e) => {
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
      const response = await All_Api.createProduct(data);
      getProducts();
      setShowAddProductForm(false);
      setFormData(initFormdata);
      setErrors(null);
      setPreviewImage(null);
      console.log("Thêm sản phẩm thành công:", response);
      window.alert("Thêm sản phẩm thành công")
    } catch (error) {
        console.log("Lỗi chi tiết:", error.response?.data);
      setErrors(error?.response?.data);
    }
  };
  // xử lý xóa sản phẩm
  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

    if (!confirmDelete) return;

    try {
      await All_Api.deleteProduct(productId);
      getProducts();
      window.alert("Xóa sản phẩm thành công");
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrors(error?.response?.data);
    }
  };
  // edit product
  const handleEditProduct = async (ProductID) => {
    const response = await All_Api.getProductById(ProductID);
    console.log("dữ liệu sản phẩm cần sửa",response)
    setEditProductId(response);
    setShowUpdateProductForm(true);
  }
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", editProductId.name);
    if (editProductId.image instanceof File) {
      data.append("image", editProductId.image);
    }
    data.append("category", editProductId.category?.CategoryID);
    editProductId.suppliers.forEach(sup => data.append('suppliers', sup.SupplierID));
    data.append("price", editProductId.price);
    data.append("unit", editProductId.unit);
    data.append("quantity_stock", Number(editProductId.quantity_stock));
    try {
      const response = await All_Api.updateProduct(editProductId.ProductID, data);
      getProducts();
      setShowUpdateProductForm(false);
      setEditProductId(initFormdata);
      setErrors(null);
      setPreviewImage(null);
      console.log("Cập nhật sản phẩm thành công:", response);
      window.alert("Cập nhật sản phẩm thành công");
    } catch (error) {
      console.log("Lỗi chi tiết:", error.response?.data);
      setErrors(error?.response?.data);
    }
  };
  // dữ liệu edit
  console.log("editProductId",editProductId)
  return (
    <>
      <div className="flex justify-between mb-6">
        <button
          className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg shadow hover:bg-orange-700 transition"
          onClick={() => setShowAddProductForm(true)}
        >
          + Thêm sản phẩm
        </button>
            <button
          className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg shadow hover:bg-orange-700 transition"
          onClick={() => navigate('/admin/purchase',{state:{suppliers, DataProducts:products, locations}})}
        >
          + Nhập Hàng
        </button>
      </div>

<div>
{products.length > 0 ? (
  <div>
    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
      Danh sách sản phẩm
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.ProductID}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 sm:h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {product.name}
            </h2>
            <p className="text-sm text-gray-500">
              <strong>Danh mục:</strong>{" "}
              {product.category.name || "Chưa có danh mục"}
            </p>

            <p className="text-sm text-gray-500 truncate">
              <strong>NCC:</strong>{" "}
              {Array.isArray(product.suppliers)
                ? product.suppliers.map(sup => sup.full_name).join(", ")
                : ""}
            </p>

            {product.price
              ? Number(product.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 })
              : '0₫'}

            <div className="mt-3 flex items-center justify-between">
              <Link
                to={`/admin/products/${product.ProductID}`}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Chi tiết
              </Link>
              <div className="flex gap-2">
                <button onClick={() => handleEditProduct(product.ProductID)} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                  Sửa
                </button>
                <button onClick={() => handleDeleteProduct(product.ProductID)} className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <p className="text-gray-600">Không có sản phẩm nào.</p>
)}


      {showAddProductForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 relative max-h-screen sm:max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-600">
              Thêm sản phẩm
            </h2>
            <form className="space-y-4" onSubmit={handleAddProduct}>
              <div>
                <label className="block font-medium mb-1">Tên sản phẩm</label>
                <input
                  required
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleProductChange}
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
                  onChange={handleImageURL}
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
                    onChange={handleProductChange}
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
                  onChange={handleProductChange}
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
                  onChange={handleProductChange}
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
                  onClick={() => setShowAddProductForm(false)}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showUpdateProductForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 relative max-h-screen sm:max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-600">
              Cập nhật sản phẩm
            </h2>
            <form className="space-y-4" onSubmit={handleUpdateProduct}>
              <div>
                <label className="block font-medium mb-1">Tên sản phẩm</label>
                <input
                  required
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editProductId.name}
                  onChange={e => setEditProductId({ ...editProductId, name: e.target.value })}
                  placeholder="Tên sản phẩm"
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm">{errors.name[0]}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Ảnh sản phẩm</label>
                <input
                  type="file"
                  name="image"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreviewImage(URL.createObjectURL(file));
                      setEditProductId({ ...editProductId, image: file });
                    }
                  }}
                  placeholder="Ảnh sản phẩm"
                />
                {editProductId.image && (
                  <img
                    src={editProductId.image instanceof File ? previewImage : editProductId.image}
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
                    value={editProductId.category?.CategoryID}
                    onChange={e => setEditProductId({ ...editProductId, category: { ...editProductId.category, CategoryID: e.target.value } })}>
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
                    value={editProductId.suppliers?.map(sup => sup.SupplierID) || []}
                    onChange={e => {
                      const selected = Array.from(e.target.selectedOptions, option => Number(option.value));
                      setEditProductId({ ...editProductId, suppliers: suppliers.filter(sup => selected.includes(sup.SupplierID))});
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
                  value={editProductId.price}
                  onChange={e => setEditProductId({ ...editProductId, price: e.target.value })}
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
                  value={editProductId.unit}
                  onChange={e => setEditProductId({ ...editProductId, unit: e.target.value })}
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
              <div>
                <label className="block font-medium mb-1">Số lượng tồn kho</label>
                <input
                  required
                  type="number"
                  name="quantity_stock"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editProductId.quantity_stock}
                  onChange={e => setEditProductId({ ...editProductId, quantity_stock: e.target.value })}
                  placeholder="Số lượng tồn kho"
                />
                {errors?.quantity_stock && (
                  <p className="text-red-500 text-sm">{errors.quantity_stock[0]}</p>
                )}
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                >
                  Cập nhật sản phẩm
                </button>
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 mt-4"
                  onClick={() => setShowUpdateProductForm(false)}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
        </>
  );
};

                 

export default ProductList;