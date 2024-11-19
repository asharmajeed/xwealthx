import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = () => {
  const { userInfo } = useUser();

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
