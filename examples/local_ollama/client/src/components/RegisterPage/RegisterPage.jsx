// src/components/RegisterPage/RegisterPage.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-center">注册</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="用户名"
            className="w-full p-2 rounded bg-gray-700 text-white border-none focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="邮箱"
            className="w-full p-2 rounded bg-gray-700 text-white border-none focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密码"
            className="w-full p-2 rounded bg-gray-700 text-white border-none focus:outline-none"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500"
          >
            注册
          </button>
        </form>
        <p className="mt-4 text-center">
          已有账号？
          <a href="/login" className="text-blue-400 hover:underline">
            登录
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
