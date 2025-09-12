import React, { useEffect, useState } from 'react';
import All_Api from '../../api/AllApi';
import { useNavigate } from 'react-router-dom';
// ... (giữ nguyên phần import, useState, useEffect, các hàm handleX) ...



const TableHeader = ({ columns }) => (
  <thead className="hidden sm:table-header-group bg-gray-100">
    <tr>
      {columns.map((col) => (
        <th
          key={col}
          className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

// Responsive TableRow (desktop = bảng, mobile = card)
const TableRow = ({ data, columns, actionButtons }) => (
  <>
    {/* Desktop (table row) */}
    <tr className="hidden sm:table-row border-b">
      {columns.map((col) => (
        <td key={col} className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
          {data[col]}
        </td>
      ))}
      {actionButtons && <td className="px-4 py-2">{actionButtons}</td>}
    </tr>

    {/* Mobile (card) */}
    <tr className="sm:hidden">
      <td className="w-full px-4 py-3 border rounded-lg mb-3 shadow-sm bg-gray-50">
        <div className="space-y-1">
          {columns.map((col) => (
            <div key={col} className="flex justify-between text-sm">
              <span className="font-medium text-gray-600">{col}:</span>
              <span className="text-gray-800">{data[col]}</span>
            </div>
          ))}
          {actionButtons && <div className="mt-2 flex flex-wrap gap-2">{actionButtons}</div>}
        </div>
      </td>
    </tr>
  </>
);

const UserList = () => {

  const [supplier, setSupplier] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [editUser, setEditUser] = useState(null);       
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate()
    const [formData,setFormData] = useState({
    full_name:'',
    email: '',
    password: '',
    address:'',
    phone:'',
    company_name:'',
  })
  const initialFormData = {
  full_name:'',
  email: '',
  password: '',
  address: '',
  phone: '',
  company_name: '',
};
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const handleFormChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value})
  }
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleEdit = async(user) => {
    const response = await All_Api.getUserById(user);
    console.log("dữ liệu res:", response);
    setEditUser(response);
    setShowEditModal(true);
  }
  console.log("dữ liệu editUser:", editUser);
  console.log("dữ liệu supplier:", supplier);
  console.log("dữ liệu customer:", customer);
  const getUsers = async () => {
    try {
      const response = await All_Api.getUsers();
      setAdmin(response.admins || []);
      setSupplier(response.suppliers || []);
      setCustomer(response.customers || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setAdmin([]);
      setSupplier([]);
      setCustomer([]);
    }
  };
  // delete
  const handleDelete = async(id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (confirmDelete) {
      try {
        await All_Api.deleteUser(id);
        window.alert("Xóa người dùng thành công");
        getUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        window.alert("Xóa người dùng thất bại");
      }
    }
  }
  // lưu
  const handleSave = async () => {
    if (editUser) {
      let payload = {};
    if (editUser.user?.role === "customer" && editUser.customer) {
      // Chỉ truyền dữ liệu customer, KHÔNG gửi user
      const { user, ...customerData } = editUser.customer;
      payload = { ...customerData };
    } else if (editUser.user?.role === "supplier" && editUser.supplier) {
      const { user, ...supplierData } = editUser.supplier;
      payload = { ...supplierData };
    }
      console.log("payload:", payload);
      try {
        const response = await All_Api.updateUser(editUser.user.id, payload);
        setShowEditModal(false);
        getUsers();
        window.alert("Cập nhật thành công");
      } catch (error) {
        console.error("Error updating user:", error);
        setError(error?.response?.data || {});
      }
    }
  };
// chi tiết
const handleDetail = (id) => {
  navigate(`/admin/users/${id}`);
}
// handle block
const handleBlock = async(id)=> {
  try {
    const response = await All_Api.blockUser(id);
    window.alert("Khóa người dùng thành công");
    getUsers();
  } catch (error) {
    console.error("Error blocking user:", error);
    window.alert("Khóa người dùng thất bại");
  }
}
const handleUnblock = async(id)=> {
  try {
    const response = await All_Api.unblockUser(id);
    window.alert("Mở khóa người dùng thành công");
    getUsers();
  } catch (error) {
    console.error("Error unblocking user:", error);
    window.alert("Mở khóa người dùng thất bại");
  }
}
// add supplier
const handleAddSupplier = async (e) => {
   e.preventDefault();
  if(formData.password !== passwordConfirm) {
    setError("Mật khẩu xác nhận không khớp" );
    return;
  }
  try {
    const response = await All_Api.addSupplier(formData);
    window.alert("Thêm supplier thành công");
    setShowAddModal(false);
    setFormData(initialFormData);
    setPasswordConfirm(""); 
    setError(null);
    getUsers(); 
  }
  catch(error) {
    console.error("Error adding supplier:", error);
    setError(error?.response?.data);
    window.alert("Thêm supplier thất bại");
  }
};
  // search
  const handleSearch = async () => {
    const params = {};
    if (!search) {
      getUsers();
      return;
    }
    if (Object.keys(search).length === 0) {
      getUsers();
      return;
    }
    try {
      if (search) {
        params.search = search;
        const response = await All_Api.searchByUsername(params);
        console.log("Kết quả tìm kiếm:", response);
        setAdmin(response.admins || []);
        setSupplier(response.suppliers || []);
        setCustomer(response.customers || []);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);
  const adminColumns = ["ID", "Họ tên", "Email"];
  const supplierColumns = ["ID", "Họ tên", "Email"];
  const customerColumns = ["ID", "Họ tên", "Email"];
return (
  
    <div className="p-2 sm:p-4 max-w-[900px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-4 gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Quản lý người dùng</h1>
        <div className="flex items-center gap-2">
  <div className="relative w-full max-w-xs">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </span>
    <input
      type="text"
      placeholder="Tìm kiếm theo tên..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="pl-10 pr-4 py-2 w-full border border-sky-400 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
    />
  </div>
</div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Thêm Supplier
        </button>
      </div>

      {/* Admin Table */}
<div className="bg-white shadow-md rounded-lg overflow-x-auto mb-4">
  <h3 className="text-lg font-semibold p-4">Admin</h3>
  <table className="min-w-full table-auto">
    <TableHeader columns={adminColumns} />
    <tbody className="divide-y divide-gray-200">
      {admin.length > 0 ? (
        admin.map((user) => (
          <TableRow
            key={user.id}
            data={{
              ID: user.id,
              "Họ tên": user.username || user.full_name,
              Email: user.email,
            }}
            columns={adminColumns}
          />
        ))
      ) : (
        <tr>
          <td
            colSpan={adminColumns.length}
            className="text-center py-4 text-gray-500"
          >
            Không có dữ liệu
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
{/* Supplier Table */}
<div className="bg-white shadow-md rounded-lg overflow-x-auto mb-4">
  <h3 className="text-lg font-semibold p-4">Supplier</h3>
  <table className="min-w-full table-auto">
    <TableHeader columns={[...supplierColumns, "Hành động"]} />
    <tbody className="divide-y divide-gray-200">
      {supplier.length > 0 ? (
        supplier.map((user) => (
          <TableRow
            key={user.user}
            data={{
              ID: user.SupplierID || user.id,
              "Họ tên": user.full_name,
              Email: user.email,
            }}
            columns={supplierColumns}
            actionButtons={
              <div className="flex flex-wrap gap-2">
                {/* Sửa */}
                <button
                  onClick={() => handleEdit(user.user)}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 shadow"
                  title="Sửa"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m6-6v2a2 2 0 002 2h2" />
                  </svg>
                  Sửa
                </button>

                {/* Xóa */}
                <button
                  onClick={() => handleDelete(user.user)}
                  className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 shadow"
                  title="Xóa"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2z" />
                  </svg>
                  Xóa
                </button>

                {/* Chi tiết */}
                <button
                  onClick={() => handleDetail(user.user)}
                  className="inline-flex items-center px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 shadow"
                  title="Chi tiết"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Chi tiết
                </button>

                {/* Khóa/Mở khóa */}
                <button
                  onClick={() =>
                    user.is_block ? handleUnblock(user.user) : handleBlock(user.user)
                  }
                  className={`inline-flex items-center px-3 py-1.5 rounded shadow 
                    ${user.is_block ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"} text-white`}
                  title={user.is_block ? "Mở khóa" : "Khóa"}
                >
                  {user.is_block ? (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h.01" />
                      </svg>
                      Mở khóa
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A4 4 0 116.18 9.302m6.695 9.523A4 4 0 0017.82 9.302M15 7V5a3 3 0 10-6 0v2" />
                      </svg>
                      Khóa
                    </>
                  )}
                </button>
              </div>
            }
          />
        ))
      ) : (
        <tr>
          <td colSpan={supplierColumns.length + 1} className="text-center py-4 text-gray-500">
            Không có kết quả
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

{/* Customer Table */}
<div className="bg-white shadow-md rounded-lg overflow-x-auto mb-4">
  <h3 className="text-lg font-semibold p-4">Customer</h3>
  <table className="min-w-full table-auto">
    <TableHeader columns={[...customerColumns, "Hành động"]} />
    <tbody className="divide-y divide-gray-200">
      {customer.length > 0 ? (
        customer.map((user) => (
          <TableRow
            key={user.user}
            data={{
              ID: user.CustomerID || user.id,
              "Họ tên": user.full_name,
              Email: user.email,
            }}
            columns={customerColumns}
            actionButtons={
              <div className="flex flex-wrap gap-2">
                {/* Sửa */}
                <button
                  onClick={() => handleEdit(user.user)}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 shadow"
                  title="Sửa"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m6-6v2a2 2 0 002 2h2" />
                  </svg>
                  Sửa
                </button>

                {/* Xóa */}
                <button
                  onClick={() => handleDelete(user.user)}
                  className="inline-flex items-center px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 shadow"
                  title="Xóa"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2z" />
                  </svg>
                  Xóa
                </button>

                {/* Chi tiết */}
                <button
                  onClick={() => handleDetail(user.user)}
                  className="inline-flex items-center px-3 py-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 shadow"
                  title="Chi tiết"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Chi tiết
                </button>

                {/* Khóa / Mở khóa */}
                <button
                  onClick={() =>
                    user.is_block ? handleUnblock(user.user) : handleBlock(user.user)
                  }
                  className={`inline-flex items-center px-3 py-1.5 rounded shadow 
                    ${user.is_block ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
                  title={user.is_block ? "Mở khóa" : "Khóa"}
                >
                  {user.is_block ? (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h.01" />
                      </svg>
                      Mở khóa
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A4 4 0 116.18 9.302m6.695 9.523A4 4 0 0017.82 9.302M15 7V5a3 3 0 10-6 0v2" />
                      </svg>
                      Khóa
                    </>
                  )}
                </button>
              </div>
            }
          />
        ))
      ) : (
        <tr>
          <td colSpan={customerColumns.length + 1} className="text-center py-4 text-gray-500">
            Không có kết quả
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

{showEditModal && editUser && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Cập nhật thông tin{" "}
        <span className="text-blue-600">
          {editUser.user?.role === "customer" ? "Khách hàng" : "Nhà cung cấp"}
        </span>
      </h2>
      {/* Nếu là customer */}
      {editUser.user?.role === "customer" && editUser.customer && (
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Họ tên</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editUser.customer.full_name || ""}
              onChange={e =>
                setEditUser({
                  ...editUser,
                  customer: { ...editUser.customer, full_name: e.target.value },
                })
              }
              placeholder="Họ tên"
            />
          {error?.full_name && <p className="text-red-500 text-sm">{error.full_name[0]}</p>}

          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editUser.customer.email || ""}
              onChange={e =>
                setEditUser({
                  ...editUser,
                  customer: { ...editUser.customer, email: e.target.value },
                })
              }
              placeholder="Email"
            />
            {error?.email && <p className="text-red-500 text-sm">{error.email[0]}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Địa chỉ</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editUser.customer.address || ""}
              onChange={e =>
                setEditUser({
                  ...editUser,
                  customer: { ...editUser.customer, address: e.target.value },
                })
              }
              placeholder="Địa chỉ"
            />
            {error?.address && <p className="text-red-500 text-sm">{error.address[0]}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Số điện thoại</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editUser.customer.phone || ""}
              onChange={e =>
                setEditUser({
                  ...editUser,
                  customer: { ...editUser.customer, phone: e.target.value },
                })
              }
              placeholder="Số điện thoại"
            />
            {error?.phone && <p className="text-red-500 text-sm">{error.phone[0]}</p>}
          </div>
        </form>
      )}
      {/* Nếu là supplier */}
      {editUser.user?.role === "supplier" && editUser.supplier && (
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Họ tên</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editUser.supplier.full_name || ""}
              onChange={e =>
                setEditUser({
                  ...editUser,
                  supplier: { ...editUser.supplier, full_name: e.target.value },
                })
              }
              placeholder="Họ tên"
            />
            {error?.full_name && <p className="text-red-500 text-sm">{error.full_name[0]}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editUser.supplier.email || ""}
              onChange={e =>
                setEditUser({
                  ...editUser,
                  supplier: { ...editUser.supplier, email: e.target.value },
                })
              }
              placeholder="Email"
            />
            {error?.email && <p className="text-red-500 text-sm">{error.email[0]}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Địa chỉ</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editUser.supplier.address || ""}
              onChange={e =>
                setEditUser({
                  ...editUser,
                  supplier: { ...editUser.supplier, address: e.target.value },
                })
              }
              placeholder="Địa chỉ"
            />
            {error?.address && <p className="text-red-500 text-sm">{error.address[0]}</p>}
          </div>
          <div>
            <label className="block font-medium mb-1">Số điện thoại</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editUser.supplier.phone || ""}
              onChange={e =>
                setEditUser({
                  ...editUser,
                  supplier: { ...editUser.supplier, phone: e.target.value },
                })
              }
              placeholder="Số điện thoại"
            />
            {error?.phone && <p className="text-red-500 text-sm">{error.phone[0]}</p>}
          </div>
                    <div>
            <label className="block font-medium mb-1">Tên công ty</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editUser.supplier.company_name || ""}
              onChange={e =>
                setEditUser({
                  ...editUser,
                  supplier: { ...editUser.supplier, company_name: e.target.value },
                })
              }
              placeholder="Tên công ty"
            />
            {error?.company_name && <p className="text-red-500 text-sm">{error.company_name[0]}</p>}
          </div>
        </form>
      )}
      <div className="flex justify-end mt-6">
        <button 
        onClick={()=>handleSave()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">Lưu</button>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          onClick={() => setShowEditModal(false)}
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
  
)}
      {/* Modal Thêm Supplier */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 sm:p-6 relative">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-blue-600">
              Thêm nhà cung cấp
            </h2>
            <form className="space-y-4" onSubmit={handleAddSupplier}>
              <div>
                <label className="block font-medium mb-1">Họ tên</label>
                <input
                  required
                  type="text"
                  name="full_name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.full_name}
                  onChange={handleFormChange}
                  placeholder="Họ tên"
                />
                {error?.full_name && (
                  <p className="text-red-500 text-sm">{error.full_name[0]}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                />
                {error?.email && (
                  <p className="text-red-500 text-sm">{Array.isArray(error.email) ? error.email[0] : error.email}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Mật khẩu</label>
                <input
                  required
                  type="password"
                  name="password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder="Mật khẩu"
                />
                {error?.password && (
                  <p className="text-red-500 text-sm">{error.password[0]}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Xác nhận mật khẩu</label>
                <input
                  required
                  type="password"
                  name="confirm_password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  placeholder="Xác nhận mật khẩu"
                />
                {error?.confirm_password && (
                  <p className="text-red-500 text-sm">{error.confirm_password}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Địa chỉ</label>
                <input
                  required
                  type="text"
                  name="address"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="Địa chỉ"
                />
                {error?.address && (
                  <p className="text-red-500 text-sm">{error.address[0]}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Số điện thoại</label>
                <input
                  required
                  type="text"
                  name="phone"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Số điện thoại"
                />
                {error?.phone && (
                  <p className="text-red-500 text-sm">{error.phone[0]}</p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Tên công ty</label>
                <input
                  required
                  type="text"
                  name="company_name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.company_name}
                  onChange={handleFormChange}
                  placeholder="Tên công ty"
                />
                {error?.company_name && (
                  <p className="text-red-500 text-sm">{error.company_name}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row justify-end mt-6 gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Thêm
                </button>
                <button
                  type="button"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  onClick={() => setShowAddModal(false)}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};



export default UserList;