import React, { useEffect, useState } from 'react';
import All_Api from '../../api/AllApi';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [supplier, setSupplier] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [editUser, setEditUser] = useState(null);       
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
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
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý người dùng</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h3 className='text-lg font-semibold p-4'>Admin</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admin.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username || user.full_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h3 className='text-lg font-semibold p-4'>Supplier</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {supplier.map((user) => (
              <tr key={user.SupplierID}>
                <td className="px-6 py-4 whitespace-nowrap">{user.SupplierID}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.full_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(user.user)} className="text-blue-600 hover:underline mr-4">Sửa</button>
                  <button onClick={() => handleDelete(user.user)} className="text-red-600 hover:underline mr-4">Xóa</button>
                  <button onClick={() => handleDetail(user.user)} className="text-red-600 hover:underline">Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h3 className='text-lg font-semibold p-4'>Customer</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customer.map((user) => (
              <tr key={user.customer}>
                <td className="px-6 py-4 whitespace-nowrap">{user.CustomerID}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.full_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(user.user)} className="text-blue-600 hover:underline mr-4">Sửa</button>
                  <button onClick={() => handleDelete(user.user)} className="text-red-600 hover:underline mr-4">Xóa</button>
                  <button onClick={() => handleDetail(user.user)} className="text-red-600 hover:underline">Chi tiết</button>
                </td>
              </tr>
            ))}
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
    </div>
  );
};

export default UserList;