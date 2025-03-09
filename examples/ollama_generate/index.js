import ollama from "ollama";

const response = await ollama.generate({
  model: "mistral:latest",
  prompt: "What is the capital of France?",
});

console.log(response.response); // "Paris"
