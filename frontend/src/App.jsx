import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import SeatGrid from "./components/SeatGrid";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminCreateEvent from "./pages/AdminCreateEvent";
import MyBookings from "./pages/MyBookings";
import MyProfile from "./pages/MyProfile";
import VerifySuccess from "./pages/VerifySuccess";

function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/seats");

  return (
    <>
      {!hideNavbar && user && <Navbar />}

      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={user ? <Navigate to="/home" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/home" replace /> : <Register />}
        />

        {/* Verify Success */}
        <Route path="/verify-success" element={<VerifySuccess />} />

        {/* Protected Pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seats/:id"
          element={
            <ProtectedRoute>
              <SeatGrid />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin-create-event"
          element={
            <AdminRoute>
              <AdminCreateEvent />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
