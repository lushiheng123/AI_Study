import ollama from "ollama";

const response = await ollama.generate({
  model: "gemma3:4b",
  prompt: "What is the capital of France?",
});

console.log(response.response); // "Paris"
