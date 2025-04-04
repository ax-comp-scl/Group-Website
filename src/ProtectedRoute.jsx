import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "./services/authService";
import { getUser } from "./services/userService";

const ProtectedRoute = ({ isStaffRequired }) => {
  const token = isAuthenticated();

  if (!token) return <Navigate to="/login" />;
  const user = getUser();
  if (isStaffRequired && !user.is_staff) return <Navigate to="/organisms" />

  return <Outlet />;
};

export default ProtectedRoute;