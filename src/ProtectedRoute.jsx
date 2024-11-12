import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { isAuthenticated } from "./services/authService";

const ProtectedRoute = () => {
  const token = isAuthenticated();
  
  const navigate = useNavigate()
  
  useEffect(() => {if (!token) navigate("/login")},[])
  
  return <Outlet />;
};

export default ProtectedRoute;
