import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { FaUsers, FaBox, FaShoppingCart, FaChartLine, FaCalendarAlt, FaUserCircle } from "react-icons/fa";

export default function Layout({ children }) {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3 p-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700"><FaChartLine /> Dashboard</Link>
          <Link to="/users" className="flex items-center gap-3 p-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700"><FaUsers /> Users</Link>
          <Link to="/orders" className="flex items-center gap-3 p-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700"><FaShoppingCart /> Orders</Link>
          <Link to="/products" className="flex items-center gap-3 p-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700"><FaBox /> Products</Link>
          <Link to="/events" className="flex items-center gap-3 p-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700"><FaCalendarAlt /> Events</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-6 py-4">
          <h1 className="text-lg font-bold">React Admin Dashboard</h1>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleDarkMode}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <div className="relative">
              <FaUserCircle className="text-3xl cursor-pointer" onClick={() => setOpen(!open)} />
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow rounded">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-700 overflow-y-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}