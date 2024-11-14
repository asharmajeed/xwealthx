import { createContext, useContext, useState } from "react";

// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    // Initialize state with localStorage data if available
    const data = localStorage.getItem("user-info");
    return data ? JSON.parse(data) : null;
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
