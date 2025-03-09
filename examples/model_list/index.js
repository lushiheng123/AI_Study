import ollama from "ollama";

ollama
  .list()
  .then((models) => {
    console.log(models); // 打印模型列表
  })
  .catch((error) => {
    console.error("Error fetching model list:", error);
  });
