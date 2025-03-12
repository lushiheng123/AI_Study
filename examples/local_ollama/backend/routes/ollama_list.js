import express from "express";
import ollama from "ollama";

const router = express.Router();

router.get("/model_list", async (req, res) => {
  try {
    const response = await ollama.list();
    const models = response.models.map((model) => model.name);
    res.json({ models });
  } catch (error) {
    console.error("Error fetching model list:", error);
    res.status(500).json({ error: "Failed to fetch model list" });
  }
});


// 新增 /generate 接口，用于处理图片描述
router.post("/llava/generate", async (req, res) => {
  try {
    const { prompt, imageBase64 } = req.body; // 接收前端发送的 prompt 和 base64 图片
    const response = await ollama.generate({
      model: "llava:latest",
      prompt: prompt || "describe this image:",
      images: [imageBase64],
      stream: false,
    });
    res.json({ response: response.response });
  } catch (error) {
    console.error("Error generating image description:", error);
    res.status(500).json({ error: "Failed to generate image description" });
  }
});
// 新增 deepseed-coder-v2接口，用于处理代码
router.post("/deepseek-coder/generate", async (req, res) => {
  try {
    const { prompt, suffix } = req.body; // 接收前端发送的 prompt 和 base64 图片
    const response = await ollama.generate({
      model: "deepseek-coder-v2",
      prompt: prompt || "describe this image:",
      suffix: suffix || "fill your suffix"
     
    });
    res.json({ response: response.response });
  } catch (error) {
    console.error("Error generating image description:", error);
    res.status(500).json({ error: "Failed to generate image description" });
  }
});


export default router;
