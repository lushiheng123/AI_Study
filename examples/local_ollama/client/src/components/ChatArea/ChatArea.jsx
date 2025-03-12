// components/ChatArea/ChatArea.jsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@headlessui/react";

const ChatArea = ({
  modelName = "Llava",
  messages = [],
  onSubmit,
  uploadedImage,
  tips = "请先导入图片,再写提示词",
}) => {
  const [inputText, setInputText] = useState("");
  const [prompt, setPrompt] = useState(""); // 已有的代码
  const [suffix, setSuffix] = useState(""); // 期待的代码结果
  const messagesEndRef = useRef(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 处理输入框变化
  const handleInputChange = (e) => setInputText(e.target.value);

  // 处理提交
  const handleSubmit = (e) => {
    e.preventDefault();
    const textToSubmit = inputText.trim();

    // 如果是 Deepseek-Coder-V2，提交 prompt 和 suffix
    if (modelName === "Deepseek-Coder-V2" && prompt && suffix) {
      if (!prompt.trim() || !suffix.trim()) {
        alert("请填写已有的代码和期待的代码结果。");
        return;
      }
      onSubmit({ prompt: prompt.trim(), suffix: suffix.trim(), inputText: textToSubmit });
      setPrompt("");
      setSuffix("");
    } else {
      // 其他模型（例如 Llava），只提交 inputText 和 uploadedImage
      if (!textToSubmit && !uploadedImage) return;
      onSubmit(textToSubmit || (uploadedImage ? "上传了一张图片" : ""));
    }

    setInputText(""); // 清空输入框
  };

  return (
    <div className="min-h-[800px] flex justify-center flex-col">
      {/* 欢迎消息居中 */}
      {messages.length === 0 ? (
        <div className="flex justify-center items-center h-full text-2xl">
          😀 我是 {modelName}，有什么可以帮忙的？
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg max-w-[80%] max-h-[300px] ${message.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-700 text-white mr-auto"
                }`}
            >
              <p>{message.content}</p>
              {message.image && (
                <div className="flex justify-center items-center mt-2">
                  <img
                    src={message.image}
                    alt="Uploaded"
                    className="max-w-[150px] rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* 预览上传的图片 */}
      {uploadedImage && (
        <div className="w-full p-4  bg-gray-700 absolute bottom-20">
          <div className="p-2 border border-gray-500 rounded-lg mx-4 mb-5 min-h-full">
            <p className="text-sm text-gray-400">即将发送的图片：</p>
            <img
              src={uploadedImage}
              alt="Preview"
              className="max-w-[140px] rounded-lg"
            />
          </div>
        </div>
      )}

      {/* 输入框和按钮区域 */}
      <div className="w-full p-4 bg-gray-800 fixed bottom-0 left-0">
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          {/* 代码补全的额外输入框，仅在 Deepseek-Coder-V2 页面显示 */}
          {modelName === "Deepseek-Coder-V2" && (
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col">

                <textarea
                  className="resize-none border border-gray-600 bg-gray-900 px-3 py-2 rounded-md focus:outline-none h-8 overflow-y-hidden"
                  placeholder="请写出你已有的代码：例如：def add("
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={1}
                />
              </div>
              <div className="flex flex-col">

                <textarea
                  className="resize-none border border-gray-600 bg-gray-900 px-3 py-2 rounded-md focus:outline-none h-8 overflow-y-hidden"
                  placeholder="请写出你期待代码的结果：例如：return c"
                  value={suffix}
                  onChange={(e) => setSuffix(e.target.value)}
                  rows={1}
                />
              </div>
            </div>
          )}
          {/* 原来的输入框 */}
          <div className="flex items-center space-x-2">
            <textarea
              className="flex-1 resize-none border border-gray-600 bg-gray-900 px-3 py-2 rounded-md focus:outline-none"
              placeholder={tips}
              value={inputText}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Ask AI
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;