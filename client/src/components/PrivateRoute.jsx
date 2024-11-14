import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Adjust the path

const PrivateRoute = () => {
  const { userInfo } = useUser(); // Access global userInfo

  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
