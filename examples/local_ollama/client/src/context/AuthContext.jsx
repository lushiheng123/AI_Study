// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 初始化时从 localStorage 或其他地方恢复（可选）
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // 防止内存泄漏

    const verifyUser = async () => {
      if (!isMounted) return; // 组件已卸载，停止执行
      try {
        console.log("Verifying user...");
        const res = await axios.get("http://localhost:5051/api/protected", {
          withCredentials: true,
        });
        console.log("Response from /api/protected:", res.data);
        if (isMounted && res.data.user) {
          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user)); // 持久化
        }
      } catch (err) {
        console.error(
          "Failed to verify user:",
          err.response?.data || err.message
        );
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    verifyUser();

    return () => {
      isMounted = false; // 组件卸载时清理
    };
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post(
        "http://localhost:5051/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      console.log("Login response:", res.data);
      const newUser = { id: res.data.id, username: res.data.username };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser)); // 持久化
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5051/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logout successful");
      setUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {loading ? (
        <div className="flex h-screen items-center justify-center bg-black text-white">
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
