import React, { useEffect, useState } from "react";
import All_Api from "../../../api/AllApi";
import { useLocation, useNavigate } from "react-router-dom";

const PurchaseForm = () => {
  const [formData, setFormData] = useState({
    supplier: "",
    purchase_date: "",
    location: "",
    total_amount: "",
    products: [],
    payment_method: ""
  });
  const location = useLocation();
  const {suppliers,DataProducts,locations} = location.state || {};
  const [productRows, setProductRows] = useState([
    { product: "", quantity: "", cost_price: "" }
  ]);
  const [errors, setErrors] = useState("");



  const navigate = useNavigate();
    const handleChange = (e, idx = null) => {
    const { name, value } = e.target;
    if (idx !==null) {
        const updatedRows = [...productRows];
        updatedRows[idx][name] = value;
        setProductRows(updatedRows);
    }
    else {
        setFormData({ ...formData, [name]: value });
    }
  };
    const handleAddRow = () => {
    setProductRows([...productRows, { product: "", quantity: "", cost_price: "" }]);
    }
    const productsData = productRows.map(row => ({
      product: Number(row.product),
      quantity: Number(row.quantity),
      cost_price: Number(row.cost_price)
    }));
    const total_amount = productsData.reduce((sum, item) => sum + item.quantity * item.cost_price, 0);
    const data = {
      ...formData,
      supplier: Number(formData.supplier), 
      products: productsData,
      total_amount
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await All_Api.createPurchase(data);
      if (formData.payment_method === "cash") {
          alert("Tạo phiếu nhập thành công!");
          navigate("/admin/products");
        }
        else if (formData.payment_method === "bank_transfer") {
          alert("Tạo phiếu nhập thành công! Chuyển đến trang thanh toán.");
          navigate("/admin/purchase/payments");
        }
    } catch (err) {
      setErrors(err?.response?.data || "Error creating purchase");
    }
  };
   
  return (
<form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
  {/* Nhà cung cấp */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Nhà cung cấp</label>
    <select
      name="supplier"
      required
      value={formData.supplier}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="">Chọn nhà cung cấp</option>
      {suppliers.map(sup => (
        <option key={sup.id} value={sup.SupplierID}>{sup.full_name +" - "+sup.company_name}</option>
      ))}
    </select>
  </div>

  {/* Vị trí kho */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Vị trí kho</label>
    <select
      name="location"
      required
      value={formData.location}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="">Chọn kho</option>
      {locations.map(loc => (
        <option key={loc} value={loc}>{loc}</option>
      ))}
    </select>
  </div>

  {/* Danh sách sản phẩm */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Danh sách sản phẩm</label>
    <div className="space-y-3">
      {productRows.map((row, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            name="product"
            required
            value={row.product}
            onChange={e => handleChange(e, idx)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Chọn sản phẩm</option>
            {DataProducts.map(prod => (
              <option key={prod.id} value={prod.ProductID}>{prod.name}</option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            required
            min={1}
            value={row.quantity}
            onChange={e => handleChange(e, idx)}
            placeholder="Số lượng"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="number"
            name="cost_price"
            required
            min={1}
            value={row.cost_price}
            onChange={e => handleChange(e, idx)}
            placeholder="Giá nhập"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ))}
    </div>
    <button
      type="button"
      onClick={handleAddRow}
      className="mt-3 text-blue-600 font-medium hover:underline"
    >
      + Thêm sản phẩm
    </button>
  </div>

  {/* Phương thức thanh toán */}
  <div>
    <label className="block text-gray-700 font-medium mb-2">Phương thức thanh toán</label>
    <select
      name="payment_method"
      required
      value={formData.payment_method}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="">Chọn phương thức</option>
      <option value="cash">Tiền mặt</option>
      <option value="bank_transfer">Chuyển khoản</option>
    </select>
  </div>

  {/* Nút submit */}
  <div className="flex justify-end">
  {formData.payment_method === "bank_transfer" ?(
    <button
      type="button"
      onClick={()=>navigate('/admin/purchases/payment/qrcode', {state:{amount: data.total_amount,data: data}})}
      className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
    >
      Thanh toán Qrcode
    </button>
  ):(
     <button
      type="submit"
      className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Tạo phiếu nhập
    </button>
  )}
   
    <button type="button" onClick={() => navigate(-1)} className="ml-3 bg-gray-300 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-400 transition">
      Hủy
    </button>
  </div>

{errors && <p className="text-red-500 text-sm">{typeof errors === "object" ? JSON.stringify(errors) : errors}</p>}
</form>

  );
};

export default PurchaseForm;