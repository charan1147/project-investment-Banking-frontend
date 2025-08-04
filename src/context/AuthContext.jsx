import React, { createContext, useState, useEffect } from "react";
import { login, register, logout, getMe } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getMe();
      setUser(response.data.data);
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/login"; // Force redirect on failure
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Network error",
      };
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await register({ name, email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Network error",
      };
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
