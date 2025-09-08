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
// inventory
    getInventory: () => axiosClient.get('/admin/inventory/'),
    getInventoryById: (id) => axiosClient.get(`/admin/inventory/${id}/`),
    
    // admin purchase
    createPurchase: (data) => axiosClient.post('/admin/purchase/', data),
    getPurchaseById: (id) => axiosClient.get(`/admin/purchase/${id}/`),
    listPayments: (id) => axiosClient.get(`/admin/purchase/${id}/payments/`),
    generateQRCode: (id) => axiosClient.get(`/admin/purchase/payment/qrcode/${id}/`),
    createPayment: (data) => axiosClient.post('/admin/purchase/payment/', data),
    // profile
    updateUserProfile: (data) => axiosClient.put('/auth/user/update/', data),
    changePassword: (data) => axiosClient.post('/auth/user/change-password/', data),
    // supplier
    getSupplierProducts: () => axiosClient.get('/supplier/products/'),
    getSupplierProductById: (id) => axiosClient.get(`/supplier/products/${id}/`),
    // manage purchase
    getPurchases: () => axiosClient.get('/supplier/purchases/'),
    getPurchaseDetailById: (id) => axiosClient.get(`/supplier/purchases/${id}/`),
    // search
    searchByLocation: (params) => axiosClient.get('/function/search/location/', { params }),
    // kết hợp nhiều tiêu chí tìm kiếm
    combinedSearch: (params) => axiosClient.get('/function/search/combined/', { params }),
}
export default All_Api;