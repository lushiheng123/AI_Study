import { ChatDeepSeek } from '@langchain/deepseek';
import dotenv from "dotenv"
import { z } from 'zod';

dotenv.config()
const llmForToolCalling = new ChatDeepSeek({
    model: "deepseek-chat",
    //  model: "deepseek-reasoner",
  temperature: 0,
  apiKey : process.env.DEEPSEEK_API
  // other params...
});
const Joke = z.object({
  setup: z.string().describe("The setup of the joke"),
  punchline: z.string().describe("The punchline to the joke"),
  rating: z.number().optional().describe("How funny the joke is, from 1 to 10")
}).describe('Joke to tell user.');

const structuredLlm = llmForToolCalling.withStructuredOutput(Joke, { name: "Joke" });
const jokeResult = await structuredLlm.invoke("Tell me a joke about cats");
console.log(jokeResult);