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
    // get invoices
    getInvoicesPurchase: () => axiosClient.get('/admin/invoices/purchase'),
    getInvoicePurchaseById: (id) => axiosClient.get(`/admin/invoices/purchase/${id}/`),
    deleteInvoicePurchase: (id) => axiosClient.delete(`/admin/invoices/purchase/${id}/delete/`),
    exportInvoicePurchase: (id) => axiosClient.get(`/admin/invoices/purchase/${id}/export/`, {responseType: 'blob'}),
    // order
    getInvoicesOrder: () => axiosClient.get('/admin/invoices/order'),
    getInvoiceOrderById: (id) => axiosClient.get(`/admin/invoices/order/${id}/`),
    deleteInvoiceOrder: (id) => axiosClient.delete(`/admin/invoices/order/${id}/delete/`),
    exportInvoiceOrder: (id) => axiosClient.get(`/admin/invoices/order/${id}/export/`, {responseType: 'blob'}),
// inventory
    getInventory: () => axiosClient.get('/admin/inventory/'),
    getInventoryById: (id) => axiosClient.get(`/admin/inventory/${id}/`),
    // report
    getReportInventory: (params) => axiosClient.get('/admin/report/', { params }),
    exportReportInventory: (params) => axiosClient.get('/admin/report/export/', { params,responseType: 'blob' }),
    getReportRevenue: (params) => axiosClient.get('/admin/report/revenue/', { params }),
    exportReportRevenue: (params) => axiosClient.get('/admin/report/revenue/export/', { params,responseType: 'blob' }),
    // order
    // admin purchase
    createPurchase: (data) => axiosClient.post('/admin/purchase/', data),
    getPurchaseById: (id) => axiosClient.get(`/admin/purchase/${id}/`),
    listPayments: (id) => axiosClient.get(`/admin/purchase/${id}/payments/`),
    generateQRCode: (id) => axiosClient.get(`/admin/purchase/payment/qrcode/${id}/`),
    createPayment: (data) => axiosClient.post('/admin/purchase/payment/', data),
    // profile
    getUserProfile: () => axiosClient.get('/auth/user/customer/'),
    updateUserProfile: (data) => axiosClient.put('/auth/user/update/customer/', data),
    getSupplierProfile: () => axiosClient.get('/auth/user/supplier/'),
    updateSupplierProfile: (data) => axiosClient.put('/auth/user/update/supplier/', data),
    // đổi mật khẩu
    changePassword: (data) => axiosClient.post('/auth/user/change-password/', data),
    // supplier
    getSupplierProducts: () => axiosClient.get('/supplier/products/'),
    getSupplierProductById: (id) => axiosClient.get(`/supplier/products/${id}/`),
    // manage purchase
    getPurchases: () => axiosClient.get('/supplier/purchases/'),
    getPurchaseDetailById: (id) => axiosClient.get(`/supplier/purchases/${id}/`),
    // customer
    // customer product
    getCustomerProducts: () => axiosClient.get('/customer/products/'),
    getCustomerProductById: (id) => axiosClient.get(`/customer/products/${id}/`),
    // cart
    getCart: () => axiosClient.get('/customer/cart/'),
    addToCart: (data) => axiosClient.post('/customer/cart/add/', data),
    removeCartItem: (id) => axiosClient.delete(`/customer/cart/remove/${id}/`),
    updateCartItemQuantity: (id, data) => axiosClient.put(`/customer/cart/update/${id}/`, data),
    // search
    searchByLocation: (params) => axiosClient.get('/function/search/location/', { params }),
    // search by product name
    searchByProductName: (params) => axiosClient.get('/function/search/productname/', { params }),
    // kết hợp nhiều tiêu chí tìm kiếm
    combinedSearch: (params) => axiosClient.get('/function/search/combined/', { params }),
}
export default All_Api;