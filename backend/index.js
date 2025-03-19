// import { ChatOllama,Ollama } from '@langchain/ollama';
import Ollama from "ollama"
const ollama = new Ollama({
  baseUrl: "http://api.example.com",
  model: "llama3.2:latest ",
});

// Streaming translation from English to German
const stream = await ollama.stream(
  `Translate "I love programming" into German.`
);

const chunks = [];
for await (const chunk of stream) {
  chunks.push(chunk);
}

console.log(chunks.join(""));