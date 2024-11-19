import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem("user-info");
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem("user-info");
  };

  const token = userInfo?.token;

  useEffect(() => {
    if (token) {
      const { exp } = jwtDecode(token);
      const checkTokenValidity = () => {
        if (exp < Date.now() / 1000) {
          logout();
          alert("Your session has expired! Please login again.");
        }
      };
      const interval = setInterval(checkTokenValidity, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
