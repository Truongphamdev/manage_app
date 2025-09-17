import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import All_Api from '../../api/AllApi';
import PurchaseForm from './purchase/AddPurchase';
import UpdateProductForm from './UpdateProductForm';
import AddProductForm from './AddProduct';
import { Filter } from './Filter';
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
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showUpdateProductForm, setShowUpdateProductForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [errors, setErrors] = useState(null);
  const [filterParams, setFilterParams] = useState({});
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
  "Bao",
  "Viên"
];
const [search, setSearch] = useState('');
useEffect(() => {
  const handleSearch = async () => {
    const params = {...filterParams}
    if (search) params.search = search;
    console.log("Combined params:", params);
    if (Object.keys(params).length === 0) {
      getProducts(); // Nếu không có từ khóa tìm kiếm, lấy tất cả sản phẩm
      return;
    }

    try {
    const response = await All_Api.combinedSearch(params);
    console.log("Kết quả tìm kiếm:", response);
      setProducts(response);
    } catch (error) {
      console.error("Error searching products:", error);
      setErrors(error?.response?.data);
    }
  }
  // debounce search
  const timeoutId = setTimeout(() => {
    handleSearch();
  }, 400);

  return () => clearTimeout(timeoutId);
}, [search, filterParams]);

const handleFilter = (params) => {
  setFilterParams(params);  
};
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
  const handleEditProduct = async (ProductID) => {
    try {
      const response = await All_Api.getProductById(ProductID);
      setEditProductId(response);
      setShowUpdateProductForm(true);
    } catch (error) {
      setErrors(error?.response?.data);
    }
  };
  return (
    <>
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
  {/* Nhóm bên trái */}
  <div className="flex flex-col sm:flex-row gap-4">
    <button
      className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg shadow hover:bg-orange-700 transition"
      onClick={() => setShowAddProductForm(true)}
    >
      + Thêm sản phẩm
    </button>

    <button onClick={() => setShowFilter(true)} className="px-4 py-2 bg-sky-500 text-white font-medium rounded-lg shadow hover:bg-sky-600 transition">
      🔍 Lọc nâng cao
      
    </button>
  </div>

  {/* Ô tìm kiếm */}
  <div className="flex-1">
    <input
      type="text"
      placeholder="Tìm kiếm sản phẩm..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Nhóm bên phải */}
  <div>
    <button
      className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg shadow hover:bg-orange-700 transition w-full sm:w-auto"
      onClick={() =>
        navigate('/admin/purchase', {
          state: { suppliers, DataProducts: products, locations },
        })
      }
    >
      + Nhập Hàng
    </button>
  </div>
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



      <AddProductForm
        show={showAddProductForm}
        onClose={() => setShowAddProductForm(false)}
        onSuccess={getProducts}
        categories={categories}
        suppliers={suppliers}
        units={units}
      />
      
      <UpdateProductForm
        show={showUpdateProductForm}
        onClose={() => setShowUpdateProductForm(false)}
        onSuccess={getProducts}
        product={editProductId}
        categories={categories}
        suppliers={suppliers}
        units={units}
      />
      <Filter
      show={showFilter}
        suppliers={suppliers}
        categories={categories}
        locations={locations}
        onFilter={handleFilter}
        onclose={() => setShowFilter(false)} 
      />
    </div>
        </>
  );
};

                 

export default ProductList;