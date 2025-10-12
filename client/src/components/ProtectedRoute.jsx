import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

   Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("submitted_code_")) {
        localStorage.removeItem(key);
      }
  });

  return children;
};

export default ProtectedRoute;
