import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./services/authService";
import { getUser } from "./services/userService";

const ProtectedRoute = ({ isStaffRequired }) => {
  const { isStaff } = getUser() | null;
  const token = isAuthenticated();

  const navigate = useNavigate()

  useEffect(() => {
    console.log("t " + token);
    console.log("is " + isStaff);


    if (!token) navigate("/login")
    else if (isStaffRequired && !isStaff) navigate("/organisms")
  }, [])

  return <Outlet />;
};

export default ProtectedRoute;