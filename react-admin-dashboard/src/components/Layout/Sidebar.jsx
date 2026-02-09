import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaBoxOpen, FaShoppingCart, FaCalendarAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  const baseClasses =
    "flex items-center gap-2 p-2 rounded transition hover:bg-blue-50 dark:hover:bg-gray-700";
  const activeClasses = "bg-blue-600 text-white font-semibold";

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
      <h2 className="text-xl font-bold text-blue-600 mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/" end className={({ isActive }) =>
          isActive ? `${baseClasses} ${activeClasses}` : baseClasses}>
          <FaHome /> Dashboard
        </NavLink>

        {user?.role === "Admin" && (
          <NavLink to="/users" className={({ isActive }) =>
            isActive ? `${baseClasses} ${activeClasses}` : baseClasses}>
            <FaUsers /> Users
          </NavLink>
        )}

        {(user?.role === "Admin" || user?.role === "Editor") && (
          <NavLink to="/orders" className={({ isActive }) =>
            isActive ? `${baseClasses} ${activeClasses}` : baseClasses}>
            <FaShoppingCart /> Orders
          </NavLink>
        )}

        {user?.role === "Admin" && (
          <NavLink to="/products" className={({ isActive }) =>
            isActive ? `${baseClasses} ${activeClasses}` : baseClasses}>
            <FaBoxOpen /> Products
          </NavLink>
        )}

        <NavLink to="/events" className={({ isActive }) =>
          isActive ? `${baseClasses} ${activeClasses}` : baseClasses}>
          <FaCalendarAlt /> Events
        </NavLink>
      </nav>
    </aside>
  );
}