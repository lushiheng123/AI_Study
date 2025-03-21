import { ChatDeepSeek } from '@langchain/deepseek';
import dotenv from "dotenv"
dotenv.config()
const llm = new ChatDeepSeek({
  model: "deepseek-reasoner",
  temperature: 0,
  apiKey : process.env.DEEPSEEK_API
  // other params...
});

const input = `Translate "I love programming" into French.`;

// Models also accept a list of chat messages or a formatted prompt
const result = await llm.invoke(input);
console.log(result);