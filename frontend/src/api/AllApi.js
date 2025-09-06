import axiosClient from "./Api";

const All_Api = {
    register:(data)=>axiosClient.post('/register/', data),
    login:(data)=>axiosClient.post('/login/', data),
    // admin
    getUsers: () => axiosClient.get('/admin/users/'),
    updateUser: (id, data) => axiosClient.put(`/admin/users/${id}/`, data),
    getUserById: (id) => axiosClient.get(`/admin/users/${id}/`),
    deleteUser: (id) => axiosClient.delete(`/admin/users/${id}/`),
    // block
    blockUser: (id) => axiosClient.post(`/admin/users/${id}/block/`),
    unblockUser: (id) => axiosClient.post(`/admin/users/${id}/unblock/`),
    // addSupplier
    addSupplier: (data) => axiosClient.post('/admin/supplier/', data),
    // admin product
    getProducts: () => axiosClient.get('/admin/products/'),
    getProductById: (id) => axiosClient.get(`/admin/products/${id}/`),
    createProduct: (data) => axiosClient.post('/admin/products/', data),
    updateProduct: (id, data) => axiosClient.put(`/admin/products/${id}/`, data),
    deleteProduct: (id) => axiosClient.delete(`/admin/products/${id}/`),
    getFormdata: () => axiosClient.get('/admin/products/form-data/'),
    // admin purchase
    createPurchase: (data) => axiosClient.post('/admin/purchase/', data),
    getPurchaseById: (id) => axiosClient.get(`/admin/purchase/${id}/`),
    listPayments: (id) => axiosClient.get(`/admin/purchase/${id}/payments/`),
    generateQRCode: (id) => axiosClient.get(`/admin/purchase/payment/qrcode/${id}/`),
    createPayment: (data) => axiosClient.post('/admin/purchase/payment/', data),

}   
export default All_Api;