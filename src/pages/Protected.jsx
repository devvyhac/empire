import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";

const ProtectedCheckout = () => {
  const { cartItems } = useContext(CartContext);
  const isCartEmpty = !cartItems || cartItems.length === 0;

  return isCartEmpty ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedCheckout;
