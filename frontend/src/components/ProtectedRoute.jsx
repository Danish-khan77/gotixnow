import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

const ProtectedRoute = ({ children }) => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    user = null;
  }

  const { location } = useContext(LocationContext);
  const currentPath = useLocation().pathname;

  // If user not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Block dashboard if location not selected
  if (!location && currentPath === "/dashboard") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
