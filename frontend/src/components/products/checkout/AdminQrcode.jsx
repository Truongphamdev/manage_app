import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import All_Api from '../../../api/AllApi';

export const AdminQrcode = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { amount } = location.state || { amount: 0 };
    const { data } = location.state || { data: {} };
    console.log("data", data);
    const [qrUrl, setQrUrl] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
        fetchQRCode();
    }, []);
    const fetchQRCode = async () => {
        try {
            setLoading(true);
            const response = await All_Api.generateQRCode(amount);
            setQrUrl(response.qr_url);
            setBankName(response.bank);
            setAccountName(response.account_name);
            console.log("response", response);
        } catch (error) {
            console.error('Error fetching QR code:', error);
        } finally {
            setLoading(false);
        }
    };
    // Xử lý khi người dùng xác nhận đã chuyển khoản
    const handleConfirm = async () => {
        try {
            setLoading(true);
            await All_Api.createPurchase(data);
            
        } catch (error) {
            console.error('Error confirming payment:', error);
        }
        finally {
            setLoading(false);
            navigate('/admin/purchases/confirm-transaction');
        }
    };
    if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="loader">đang tải...</div>
          </div>
        );
    }
    return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Thanh toán bằng QR Code
        </h1>

        {/* Thông tin chuyển khoản */}
        <p className="text-gray-600 mb-2">
          Ngân hàng: <span className="font-semibold">{bankName}</span>
        </p>
        <p className="text-gray-600 mb-2">
          Chủ TK: <span className="font-semibold">{accountName}</span>
        </p>
        <p className="text-gray-600 mb-4">
          Số tiền:{" "}
          <span className="font-semibold text-blue-600">
            {Number(amount).toLocaleString("vi-VN")} ₫
          </span>
        </p>

        {/* Ảnh QR */}
        <div className="flex justify-center mb-4">
          <img
            src={qrUrl}
            alt="QR Code thanh toán"
            className="w-64 h-64 object-contain border rounded-lg shadow"
          />
        </div>

        <p className="text-gray-500 mb-6 text-sm">
          Quét mã QR bằng ứng dụng ngân hàng để thanh toán.
        </p>

        <button
          onClick={() => handleConfirm()}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Tôi đã chuyển khoản
        </button>
        <button onClick={() => navigate(-1)} className='mt-4 w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition'>
            Quay lại trang đơn hàng
        </button>
      </div>
    </div>
  );
}

