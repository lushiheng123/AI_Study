import {Ollama } from "@langchain/ollama";

const ollama = new Ollama({
  baseUrl: "http://localhost:11434",
  model: "gemma3:4b",
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