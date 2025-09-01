import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const ProtectedCheckout = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedCheckout;
