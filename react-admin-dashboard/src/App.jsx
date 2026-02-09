import React from "react";
import { Routes, Route } from "react-router-dom"; 
import ThemeProvider from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Orders from "./pages/Orders/Orders";
import Products from "./pages/Products/Products";
import Events from "./pages/Events/Events";
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Login />; // show login when no user
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            {/* Always accessible */}
            <Route path="/" element={<Dashboard />} />

            {/* Admin only */}
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <Users />
                </ProtectedRoute>
              }
            />

            {/* Admin + Editor */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute roles={["Admin", "Editor"]}>
                  <Orders />
                </ProtectedRoute>
              }
            />

            {/* Admin only */}
            <Route
              path="/products"
              element={
                <ProtectedRoute roles={["Admin"]}>
                  <Products />
                </ProtectedRoute>
              }
            />

            {/* Everyone can access */}
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}