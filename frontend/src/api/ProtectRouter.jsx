import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
const token =
  localStorage.getItem("access") || sessionStorage.getItem("access");
const user =
  JSON.parse(localStorage.getItem("user")) ||
  JSON.parse(sessionStorage.getItem("user"));

  // if (!token) return <Navigate to="/login" replace />; // Nếu chưa đăng nhập -> chuyển về /login

  // if (!allowedRoles.includes(user?.role)) {
  //   // Nếu role của user không nằm trong allowedRoles (không đúng quyền)
  //   return <Navigate to="/" replace />; // Chuyển về trang chủ hoặc trang khác tùy bạn
  // }

  return <Outlet />; // Nếu đúng quyền, render các route con bên trong
};
export default ProtectedRoute;