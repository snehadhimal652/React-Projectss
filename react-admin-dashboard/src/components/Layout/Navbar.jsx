import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext"; // ✅ now valid

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center bg-white dark:bg-gray-800 text-black dark:text-white shadow px-6 py-4 transition-colors duration-300">
      <h1 className="text-xl font-bold">React Admin Dashboard</h1>
      <div className="flex gap-4">
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {user && (
          <button
            onClick={logout}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}