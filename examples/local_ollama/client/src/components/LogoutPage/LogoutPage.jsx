// src/components/LogoutPage/LogoutPage.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function LogoutPage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl mb-4">确认注销</h2>
        <p className="mb-6">你确定要注销吗？这将清除你的登录状态。</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-500"
          >
            确认注销
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-500"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
