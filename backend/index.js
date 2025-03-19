import { ChatOllama } from '@langchain/ollama';

const llm = new ChatOllama({
  model: "mistral:latest",
  temperature: 0,
  // other params...
});
const input = `Translate "I love programming" into French.`;
const aiMsgForMetadata = await llm.invoke(input);
console.log(aiMsgForMetadata.usage_metadata);