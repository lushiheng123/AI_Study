import React, { useState, useRef } from "react";
import ChatArea from "../components/ChatArea/ChatArea";
import axios from "axios";

export default function Llava() {
    const [messages, setMessages] = useState([]);
    const fileInputRef = useRef(null);
    const [uploadedImage, setUploadedImage] = useState(null); // 存储上传的图片

    // 处理图片上传
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            console.log("File read as base64:", reader.result);
            const base64Image = reader.result.split(",")[1]; // 提取 base64 数据
            setUploadedImage(`data:image/jpeg;base64,${base64Image}`); // 存储图片
        };
        reader.readAsDataURL(file);
    };

    // 处理用户点击 "Ask AI"
    const handleSubmit = async (inputText) => {
        console.log("用户输入的文本:", inputText);
        console.log("上传的图片:", uploadedImage);

        if (!inputText.trim() && !uploadedImage) return;

        // 添加用户消息
        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: inputText || "上传了一张图片",
                image: uploadedImage || null,
            },
        ]);

        try {
            const response = await axios.post("http://localhost:5051/ollama/llava/generate", {
                prompt: inputText || "describe this image:",
                imageBase64: uploadedImage ? uploadedImage.split(",")[1] : null,
            });

            console.log("后端返回的数据:", response.data);

            // 添加 AI 回复
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: response.data.response, image: null },
            ]);
        } catch (err) {
            console.error("生成描述出错:", err);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "生成图片描述时出错，请重试。", image: null },
            ]);
        }

        setUploadedImage(null); // 清除已上传的图片
    };

    return (
        <>
            <ChatArea
                modelName="Llava"
                messages={messages}
                uploadedImage={uploadedImage}
                onSubmit={handleSubmit}
            />

            {/* 绝对定位的 + 按钮 */}
            <div className="absolute bottom-26 right-3 z-50 ">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                />
                <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white text-2xl shadow-lg hover:bg-gray-600 focus:outline-none"
                    title="插入图片"
                    onClick={() => fileInputRef.current.click()}
                >
                    +
                </button>
            </div>
        </>
    );
}
