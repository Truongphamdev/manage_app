import axiosClient from "./Api";

const All_Api = {
    register:(data)=>axiosClient.post('/register/', data),
    login:(data)=>axiosClient.post('/login/', data),
    // admin
    getUsers: () => axiosClient.get('/admin/users/'),
    getUser: (id) => axiosClient.get(`/admin/users/${id}/`),
    deleteUser: (id) => axiosClient.delete(`/admin/users/${id}/`),
}
export default All_Api;