import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { isAuthenticated } from "./services/authService";

const ProtectedRoute = () => {
//   const { token } = useContext(AuthContext);
  const token = isAuthenticated();
  // console.log(token + " token");
  
  const navigate = useNavigate()

//   useEffect(() => {if (!token) navigate("/login")},[])

  
  return <Outlet />;
};

export default ProtectedRoute;
