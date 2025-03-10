import ollama from "ollama";

const main = async () => {
  try {
    const response = await ollama.generate({
      model: "deepseek-coder-v2",
      prompt: `def add(`,
      suffix: `return c`,
    });
    console.log(response.response);
  } catch (error) {
    console.log(error);
  }
};

main();
