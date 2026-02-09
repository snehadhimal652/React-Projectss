import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext(); // ✅ export the context itself

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // start with null

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    let loggedInUser = null;

    if (username === "admin" && password === "admin123") {
      loggedInUser = { username, role: "Admin" };
    } else if (username === "viewer" && password === "viewer123") {
      loggedInUser = { username, role: "Viewer" };
    }

    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem("auth_user", JSON.stringify(loggedInUser));
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};