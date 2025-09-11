import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const getUser = () => {
    return (
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user")) ||
      null
    );
  };

  const [user, setUser] = useState(getUser());

  // Hàm refresh user data từ storage
  const refreshUser = () => {
    const newUser = getUser();
    setUser(newUser);
  };

  // Khi user thay đổi, cập nhật vào storage
  useEffect(() => {
    if (user) {
      if (localStorage.getItem("access")) {
        localStorage.setItem("user", JSON.stringify(user));
      } else if (sessionStorage.getItem("access")) {
        sessionStorage.setItem("access", JSON.stringify(user));
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook tiện dùng ở mọi component
export const useUser = () => useContext(UserContext);