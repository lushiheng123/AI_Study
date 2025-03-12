// components/Sidebar/Sidebar.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, onModelSelect, selectedModel }) => {
  const menuItems = [
    { id: "chatgpt", label: "ChatGPT" },
    { id: "grok", label: "Grok" },
    { id: "custom", label: "Custom Model" },
    { id: "tailwind", label: "Tailwind CSS 使用" },
    { id: "prisma", label: "Prisma 数据库配置" },
    { id: "fineweb", label: "FineWeb 流程概述" },
    { id: "gpu", label: "GPU 启动 Open WebUI" },
    { id: "web", label: "Web 运维" },
    { id: "vba", label: "VBA API 调用" },
    { id: "ubuntu", label: "设置默认 Ubuntu 22.04" },
    { id: "copilot", label: "打开 Copilot 快捷键" },
    { id: "poem", label: "Poem for You 校园区" },
    { id: "resource", label: "资源推荐" },
  ];

  const sidebarVariants = {
    open: { width: "240px", opacity: 1, transition: { duration: 0.3 } },
    closed: { width: "0px", opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          className="fixed top-0 left-0 h-screen bg-[#212121] p-4 border-r border-gray-700 overflow-y-hidden text-white z-10" // 隐藏滚动条
          style={{ minWidth: "0" }}
        >
          {/* 顶部标题或图标 */}
          <div className="mb-6 flex items-center">
           
            <h3 className="text-lg font-semibold">历史记录</h3>
          </div>

          {/* 菜单项列表 */}
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedModel === item.label ? "bg-gray-700 font-bold" : ""
                } hover:bg-gray-600 focus:ring-blue-600 focus-visible:outline-0`}
                onClick={() => onModelSelect(item.label)}
                title={`选择 ${item.label}`}
              >
                {item.label}
              </li>
            ))}
          </ul>

          {/* 底部交互区域（可选） */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="搜索..."
              className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;