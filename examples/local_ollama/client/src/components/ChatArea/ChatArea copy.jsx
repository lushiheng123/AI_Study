// components/ChatArea/ChatArea.jsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@headlessui/react";

const ChatArea = ({
  modelName = "",
  leftButton: LeftButton = null,
  messages = [],
  onImageUpload, // 接收 handleImageUpload 作为 prop
}) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 处理输入框变化
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // 处理提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      setIsLoading(true);
      // 添加用户消息（假设 messages 是本地状态或通过回调更新）
      const newMessages = [
        ...messages,
        { role: "user", content: inputText, image: null },
      ];
      // 模拟模型回复（实际应用中应调用 API）
      setTimeout(() => {
        const updatedMessages = [
          ...newMessages,
          { role: "assistant", content: "这是一个模拟回复", image: null },
        ];
        // 这里应通过 prop 或 context 更新 messages，例如调用父组件的回调
        console.log("Updated messages:", updatedMessages); // 调试
        setInputText("");
        setIsLoading(false);
      }, 1000);
    }
  };

  // 自动滚动到对话底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 grow basis-auto overflow-hidden @container/thread">
      <div className="flex h-full flex-col items-center text-token-text-primary">
        <div className="h-full w-full">
          <div
            className="text-base my-auto mx-auto px-3 w-full md:px-5 lg:px-4 xl:px-5 h-full"
            style={{ paddingTop: "var(--navbar-height, 60px)" }} // 调整为更合理的 Navbar 高度
          >
            <div className="mx-auto flex h-full w-full flex-col text-base @lg/thread:justify-center @md/thread:max-w-3xl relative">
              <div className="hidden text-center mb-7 @lg/thread:block">
                <div className="relative inline-flex justify-center text-center text-2xl font-semibold leading-9">
                  <h1>😀 我是{modelName ? ` ${modelName}` : ""} ,有什么可以帮忙的？</h1>
                </div>
              </div>
              <div
                className="h-full flex-col text-token-text-primary [display:var(--display-hidden-until-loaded,flex)] mt-[var(--screen-optical-compact-offset-amount)] flex-shrink items-center justify-center overflow-hidden @lg/thread:hidden"
                style={{ opacity: 1, willChange: "auto" }}
              >
                <div className="relative inline-flex justify-center text-center text-2xl font-semibold leading-9">
                  <h1
                    style={{
                      viewTransitionName: "var(--vt-splash-screen-headline)",
                    }}
                  >
                    有什么可以帮忙的？
                  </h1>
                </div>
                <div className="h-[116px]" style={{ opacity: 1, willChange: "auto" }} />
              </div>
              <div className="flex-1 overflow-y-auto mb-4">
                {messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 p-3 rounded-lg max-w-[80%] ${message.role === "user"
                        ? "bg-gray-700 text-white ml-auto"
                        : "bg-gray-600 text-white mr-auto"
                        }`}
                    >
                      <p>{message.content}</p>
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Uploaded"
                          className="mt-2 max-w-[200px] rounded-lg"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400">暂无对话内容</div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="@lg/thread:absolute @lg/thread:bottom-8 @lg/thread:left-0 @lg/thread:w-full">
                <div className="text-base mx-auto px-3 w-full md:px-5 lg:px-4 xl:px-5">
                  <div className="mx-auto flex h-full w-full flex-col text-base @lg/thread:justify-center @md/thread:max-w-3xl relative @lg/thread:pb-0">
                    <div className="block z-20" />
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex justify-center empty:hidden" />
                <form
                  className="w-full"
                  onSubmit={handleSubmit}
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:rpo:"
                  data-state="closed"
                >
                  <div className="relative z-[1] flex h-full max-w-full flex-1 flex-col">
                    <div
                      className="group relative z-[1] flex w-full items-center"
                      style={{ "--force-hide-label": "block" }}
                    >
                      <div className="w-full">
                        <div
                          id="composer-background"
                          className="flex w-full cursor-text flex-col rounded-3xl border border-token-border-light px-3 py-1 duration-150 ease-in-out contain-inline-size motion-safe:transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] dark:border-none dark:shadow-none shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] has-[:focus]:shadow-[0_2px_12px_0px_rgba(0,0,0,0.04),_0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] bg-token-main-surface-primary dark:bg-[#303030]"
                          style={{ viewTransitionName: "var(--vt-composer)" }} // 修正拼写
                        >
                          <div className="flex flex-col justify-start" style={{ minHeight: "0px" }}>
                            <div className="flex min-h-[44px] items-start pl-1">
                              <div className="min-w-0 max-w-full flex-1">
                                <div className="overflow-auto">
                                  <textarea
                                    className="block h-10 w-full resize-none border-0 bg-transparent px-0 py-2 focus:outline-none focus:ring-0 caret-white"
                                    placeholder="询问任何问题"
                                    data-virtualkeyboard="true"
                                    value={inputText}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                  />
                                </div>
                              </div>
                              <div className="w-[32px] pt-1">
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none invisible fixed left-0 top-0 block"
                                >
                                  O
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mb-2 mt-1 flex items-center justify-end sm:mt-5">
                            <div className="flex gap-x-1.5">
                              {LeftButton && (
                                <LeftButton onImageUpload={onImageUpload} />
                              )}
                              <div className="min-w-9">
                                <Button
                                  type="submit"
                                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                  disabled={isLoading}
                                >
                                  {isLoading ? "Submitting..." : "Ask AI"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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