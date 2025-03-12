<h1 align = "center">ollama笔记</h1>

# 可以先看具体的项目
### [ollama本地后端](/examples/local_ollama/README.md)

```sh
git init
git checkout -b ollama
git remote add origin git@github.com:lushiheng123/AI_Study.git
git add .
git commit -m "first commit"
git status
git push -u origin ollama
```

# 目录

- [ollama.list()遍历模型](#1-环境配一下npm-install-ollama必须要的)
- [ollama.generate()](#3-ollamarequest和ollamagenerate的区别)
- [deepseek-coder-v2 生成代码](#4-ollamagenerate使用deepseek-coder-v2模型提供-api-可以补全代码)
- [llava 处理图片](#5-llava-模型可以处理图片因为他是多模态-multimodal-和视觉模型可以处理图片)
- [ollama.chat](#6-ollamachat提供参数和格式输出特定格式的结果)
  </br>

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

# 4. `ollama.generate`使用`deepseek-coder-v2`模型提供 API 可以补全代码

### prompt: "def add(" 提供了函数定义的开头。suffix: "return c" 暗示函数应该以 return c 结束（c 可能是函数的返回值，比如两个数的和）。模型会尝试生成中间部分，比如函数参数和逻辑，使整个代码从 def add( 到 return c 连贯。

```js
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
```

![alt text](README_Images/README/image-3.png)

# 5. llava 模型可以处理图片，因为他是多模态 Multimodal 和视觉模型，可以处理图片

```js
import ollama from "ollama";
const main = async () => {
  try {
    const imagePath = "cat.jpg";
    const response = await ollama.generate({
      model: "llava:latest",
      prompt: "describe this image:",
      images: [imagePath],
      stream: true,
    });
    for await (const part of response) {
      process.stdout.write(part.response);
    }
  } catch (err) {
    console.log(err);
  }
};

main();
```

![alt text](README_Images/README/image-5.png)
![alt text](README_Images/README/image-4.png)

# 6. `ollama.chat`提供参数和格式输出特定格式的结果

[ollama.chat](./examples/zod_to_schema/index.js)
![alt text](README_Images/README/image-6.png)
