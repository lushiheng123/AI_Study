import React, { useState, useRef, useEffect } from "react";
import { Button } from "@headlessui/react";

const ChatArea = ({
  modelName = "",
  leftButton: LeftButton = null,
  messages = [],
  onSubmit,
  onImageUpload,
  uploadedImage
}) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 处理输入框变化
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // 处理提交
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !uploadedImage) return;

    setIsLoading(true);
    await onSubmit(inputText);
    setInputText("");
    setIsLoading(false);
  };

  return (
    <div className="flex-1 grow basis-auto overflow-hidden">
      <div className="flex h-full flex-col items-center">
        <div className="h-full w-full px-3 md:px-5 lg:px-4 xl:px-5">
          {/* 顶部欢迎文本（如果没有消息） */}
          {messages.length === 0 && (
            <div className="hidden text-center mb-7 @lg/thread:block">
              <h1 className="text-2xl font-semibold">😀 我是 {modelName}，有什么可以帮忙的？</h1>
            </div>
          )}

          {/* 消息显示区域 */}
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 p-3 rounded-lg max-w-[80%] ${message.role === "user" ? "bg-gray-700 text-white ml-auto" : "bg-gray-600 text-white mr-auto"
                    }`}
                >
                  <p>{message.content}</p>
                  {message.image && <img src={message.image} alt="Uploaded" className="mt-2 max-w-[200px] rounded-lg" />}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400">暂无对话内容</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 预览上传的图片 */}
          {uploadedImage && (
            <div className="mb-2 p-2 border border-gray-500 rounded-lg">
              <p className="text-sm text-gray-400">即将发送的图片：</p>
              <img src={uploadedImage} alt="Preview" className="max-w-[200px] rounded-lg" />
            </div>
          )}

          {/* 输入框区域 */}
          <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="relative flex items-center">
              <textarea
                className="block h-10 w-full resize-none border border-gray-500 px-3 py-2 rounded-md focus:outline-none"
                placeholder="输入问题或描述图片..."
                value={inputText}
                onChange={handleInputChange}
              />
              <button type="submit" className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md" disabled={isLoading}>
                {isLoading ? "处理中..." : "Ask AI"}
              </button>
            </div>
          </form>

          {/* 底部按钮 */}
          <div className="mt-2 flex justify-end">
            {LeftButton && <LeftButton onImageUpload={onImageUpload} />}
            <Button type="submit" className="ml-2 px-3 py-2 bg-gray-700 text-white rounded-md" disabled={isLoading}>
              {isLoading ? "处理中..." : "Ask AI"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
