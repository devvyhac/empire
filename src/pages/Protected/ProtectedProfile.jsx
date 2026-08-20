import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ClipLoader } from "react-spinners";

const ProfileProtected = () => {
  const { isLoggedIn, authLoading } = useContext(AuthContext) || {};

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500">
        <ClipLoader color="#6366F1" size={36} />
      </div>
    );
  }

  return !isLoggedIn ? (
    <Navigate to="/login?redirect=/profile" replace />
  ) : (
    <Outlet />
  );
};

export default ProfileProtected;
