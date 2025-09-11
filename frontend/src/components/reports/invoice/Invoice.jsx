import React from 'react'
import { Link } from 'react-router-dom'

export const Invoice = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <Link to='/admin/invoices/purchase' className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition">
        Hóa Đơn Nhập Hàng
        
      </Link>
      <Link to='/admin/invoices/order' className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition">
        Hóa Đơn Bán Hàng
      </Link>
    </div>
  )
}
