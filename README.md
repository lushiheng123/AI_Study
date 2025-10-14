```sh
git init
git switch -c spec-kit
git remote add origin git@github.com:lushiheng123/AI_Study.git
git add .
git commit -m "first commit"
git status
git push -u origin spec-kit
```

# 初始化安装
## 选择的是https://docs.astral.sh/uv/getting-started/installation/#pypi中的winget的方式
```sh
winget install --id=astral-sh.uv  -e
```
![alt text](README_Images/README/image.png)
![alt text](README_Images/README/image-1.png)

# 必要的步骤
![alt text](README_Images/README/image-2.png)
![alt text](README_Images/README/image-4.png)
## 额外的步骤-辅助指令[额外的步骤](./0-辅助指令.md)


# 0-一次性的项目 `uvx --from git+https://github.com/github/spec-kit.git specify init --here`
# 1-通过 `/speckit.constitution`创建项目的管理原则和开发指南，以指导所有后续开发

![alt text](README_Images/README/image-3.png)

# 2-通过`/sepckit.specify`命令描述你想要构建的内容。重点在于“构建什么”和“为什么构建”，而不是技术栈。

# 3- `/speckit.plan`提供您的技术堆栈和架构选择
```sh 
The application uses Vite with minimal number of libraries. Use vanilla HTML, CSS, and JavaScript as much as possible. Images are not uploaded anywhere and metadata is stored in a local SQLite database.
```
# 4- `/speckit.tasks`根据你的实施计划创建可操作的任务列表
# 5- `/speckit.implement`执行所有任务并根据计划构建您的功能实际执行代码

