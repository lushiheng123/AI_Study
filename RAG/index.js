import { ChatDeepSeek } from "@langchain/deepseek";
import dotenv from "dotenv";
dotenv.config();
const llm = new ChatDeepSeek({
  apiKey: process.env.DEEPSEEK_API,
  model: "deepseek-chat",
  temperature: 0,
  // other params...
});
const aiMsg = await llm.invoke([
  [
    "system",
    "You are a helpful assistant that translates English to French. Translate the user sentence.",
  ],
  ["human", "I love programming."],
]);
aiMsg;
console.log(aiMsg.content);