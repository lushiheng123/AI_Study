import { ChatDeepSeek } from '@langchain/deepseek';
import dotenv from "dotenv"

dotenv.config()
const llm= new ChatDeepSeek({
    model: "deepseek-chat",
    //  model: "deepseek-reasoner",
  temperature: 0,
  apiKey : process.env.DEEPSEEK_API
  // other params...
});
const input = `Translate "I love programming" into French.`;
const aiMsgForResponseMetadata = await llm.invoke(input);
console.log(aiMsgForResponseMetadata.response_metadata);