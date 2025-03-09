<h1 align = "center">ollama笔记</h1>

```sh
git init
git checkout -b ollama
git remote add origin git@github.com:lushiheng123/AI_Study.git
git add .
git commit -m "first commit"
git status
git push -u origin ollama
```

# 1. 环境配一下，`npm install ollama`必须要的

# 2. `ollama.list()`查看本地部署的模型，注意是异步处理

```js
import ollama from "ollama";

ollama
  .list()
  .then((models) => {
    console.log(models); // 打印模型列表
  })
  .catch((error) => {
    console.error("Error fetching model list:", error);
  });
```

### `node index.js`运行

![alt text](README_Images/README/image.png)

# 3. `ollama.request`和`ollama.generate`的区别？

![alt text](README_Images/README/image-1.png)

### `ollama.generate`的例子,用于`文本`，默认`非流式传输`,调参`stream：true`设置为流式传输

```js
import ollama from "ollama";

const response = await ollama.generate({
  model: "mistral:latest",
  prompt: "What is the capital of France?",
});

console.log(response.response); // "Paris"
```

![alt text](README_Images/README/image-2.png)

# 4. 

# 5.

# 6.
