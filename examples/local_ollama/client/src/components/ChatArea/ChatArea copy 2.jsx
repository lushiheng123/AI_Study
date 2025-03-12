import React, { useState } from "react";

const ChatArea = ({ modelName, messages, uploadedImage, onSubmit }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputText); // 触发提交
    setInputText(""); // 清空输入框
  };

  return (
    <div className="flex-1 grow basis-auto overflow-hidden">
      <div className="flex h-full flex-col items-center">
        <div className="h-full w-full">
          <div className="text-base my-auto mx-auto px-3 w-full">
            <div className="mx-auto flex h-full w-full flex-col text-base">
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div key={index} className={`mb-4 p-3 rounded-lg max-w-[80%] ${message.role === "user" ? "bg-gray-700 text-white ml-auto" : "bg-gray-600 text-white mr-auto"}`}>
                      <p>{message.content}</p>
                      {message.image && <img src={message.image} alt="Uploaded" className="mt-2 max-w-[200px] rounded-lg" />}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400">暂无对话内容</div>
                )}
              </div>

              {/* 预览上传的图片 */}
              {uploadedImage && (
                <div className="mb-2 p-2 border border-gray-500 rounded-lg">
                  <p className="text-sm text-gray-400">即将发送的图片：</p>
                  <img src={uploadedImage} alt="Preview" className="max-w-[200px] rounded-lg" />
                </div>
              )}

              {/* 输入框 */}
              <div className="w-full">
                <form className="w-full" onSubmit={handleFormSubmit}>
                  <div className="relative flex items-center">
                    <textarea
                      className="block h-10 w-full resize-none border border-gray-500 px-3 py-2 rounded-md focus:outline-none"
                      placeholder="输入问题或描述图片..."
                      value={inputText}
                      onChange={handleInputChange}
                    />
                    <button
                      type="submit"
                      className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Ask AI
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
