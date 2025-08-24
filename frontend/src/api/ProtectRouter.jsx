import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';
export const ProtectRouter = () => {
    const user = localStorage.getItem("access");
    return user ? <Outlet/> : <Navigate to="/login"/>;
}
