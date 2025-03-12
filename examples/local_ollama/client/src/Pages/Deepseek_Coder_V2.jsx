// pages/Deepseek_Coder_V2.jsx
import React, { useState } from "react";
import ChatArea from "../components/ChatArea/ChatArea";
import axios from "axios";

export default function Deepseek_Coder_V2() {
    const [messages, setMessages] = useState([]);

    const handleSubmit = async ({ prompt, suffix }) => {
        if (!prompt.trim() || !suffix.trim()) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "请填写已有的代码和期待的代码结果。", image: null },
            ]);
            return;
        }

        // 构造用户消息
        const userMessage = `已有的代码: ${prompt}\n期待的代码结果: ${suffix}`;
        const newMessages = [...messages, { role: "user", content: userMessage, image: null }];
        setMessages(newMessages);

        try {
            // 调用后端 API
            const response = await axios.post("http://localhost:5051/ollama/deepseek-coder/generate", {
                prompt: prompt,
                suffix: suffix,
            });

            // 添加模型回复
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: response.data.response, image: null },
            ]);
        } catch (err) {
            console.error("Error generating code:", err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "生成代码时出错，请重试。", image: null },
            ]);
        }
    };

    return (
        <div className="relative ">
            <ChatArea
                modelName="Deepseek-Coder-V2"
                messages={messages}
                onSubmit={handleSubmit}
                tips="点击 Ask AI 提交代码补全请求"
            />
        </div>
    );
}