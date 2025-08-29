import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Lấy user từ localStorage/sessionStorage khi load app
  const getUser = () => {
    return (
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user")) ||
      null
    );
  };

  const [user, setUser] = useState(getUser());

  // Khi user thay đổi, cập nhật vào storage
  useEffect(() => {
    if (user) {
      // Ưu tiên lưu lại đúng nơi user từng đăng nhập
      if (localStorage.getItem("access")) {
        localStorage.setItem("user", JSON.stringify(user));
      } else if (sessionStorage.getItem("access")) {
        sessionStorage.setItem("user", JSON.stringify(user));
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook tiện dùng ở mọi component
export const useUser = () => useContext(UserContext);