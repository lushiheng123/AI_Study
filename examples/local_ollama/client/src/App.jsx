// src/App.jsx
import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams, // 引入 useParams 钩子
} from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import ChatArea from "./components/ChatArea/ChatArea";
import Footer from "./components/Footer/Footer";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LogoutPage from "./components/LogoutPage/LogoutPage";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Example from "./test";

import Llava from "./pages/Llava.jsx";
import Llama3 from "./pages/Llama3.jsx";
import Deepseek_Coder_V2 from "./pages/Deepseek_Coder_V2.jsx";
import Mistral from "./pages/Mistral.jsx";
import Deepseek_r1 from "./pages/Deepseek_r1.jsx";

function AppContent() {
  const { user, loading } = useContext(AuthContext);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("ChatGPT");

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    console.log(`Selected model: ${model}`);
  };

  // const toggleSidebar = () => {
  //   setIsSidebarOpen((prev) => !prev);
  // };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  // const sidebarWidth = "240px";

  return (
    <div className="overflow-x-hidden  p-2  dark:text-white duration-300 bg-[#212121] text-[#B4B4B4]">

      {/* <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} /> */}
      <Navbar />
      {/* <motion.div
        className="flex flex-1 overflow-hidden"
        initial={{ marginLeft: 0, width: "100%" }}
        animate={{
          marginLeft: isSidebarOpen ? sidebarWidth : "0px",
          width: isSidebarOpen ? `calc(100% - ${sidebarWidth})` : "100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ minWidth: "300px" }}
      > */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/test" element={<Example />} />
        <Route path="/llava:latest" element={<Llava />} />
        <Route path="/llama3.2:latest" element={<Llama3 />} />
        <Route path="/deepseek-coder-v2:latest" element={<Deepseek_Coder_V2 />} />
        <Route path="/mistral:latest" element={<Mistral />} />
        <Route path="/deepseek-r1:8b" element={<Deepseek_r1 />} />
        <Route
          path="/llava:latest"
          element={
            user ? (
              <div className="flex flex-1 overflow-hidden">
                {/* <Sidebar
                  isOpen={isSidebarOpen}
                  onModelSelect={handleModelSelect}
                  selectedModel={selectedModel}
                /> */}
                <ChatArea />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/logout"
          element={user ? <LogoutPage /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to={user ? "/llava:latest" : "/login"} />}
        />
      </Routes>
      {/* </motion.div> */}
      {/* <Footer /> */}
    </div >


  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;