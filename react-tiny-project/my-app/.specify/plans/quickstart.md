# Postly 快速开始指南

## 开发环境要求

- Node.js 18+
- npm 8+
- 现代浏览器（Chrome, Firefox, Safari, Edge）

## 项目设置

1. 克隆项目并安装依赖：
```bash
cd my-app
npm install
```

2. 添加必要的依赖：
```bash
npm install react-router-dom @headlessui/react
```

3. 配置TailwindCSS：
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. 启动开发服务器：
```bash
npm run dev
```

## 项目结构

项目遵循模块化结构，主要目录说明：

- `src/components`: 可重用组件
- `src/routes`: 页面组件
- `src/hooks`: 自定义hooks
- `src/utils`: 工具函数

## 开发工作流

1. 创建新组件：
   - 在appropriate文件夹中创建`.jsx`文件
   - 使用函数组件和hooks
   - 遵循组件命名约定

2. 样式开发：
   - 使用TailwindCSS实用类
   - 遵循设计系统中定义的颜色和间距

3. 数据处理：
   - 使用PostContext进行状态管理
   - 通过usePosts hook访问数据
   - 确保正确处理加载状态

## 测试

运行测试：
```bash
npm test
```

## 构建和部署

生产构建：
```bash
npm run build
```

## 代码规范

- 使用ESLint进行代码检查
- 运行检查：`npm run lint`
- 修复问题：`npm run lint:fix`

## 常见问题

1. 如何添加新路由？
   - 在`router.jsx`中添加新路由配置
   - 在`routes/`中创建对应页面组件

2. 数据持久化：
   - 数据自动保存在localStorage
   - 清除数据：`localStorage.clear()`

3. 开发模式刷新问题：
   - 使用Vite的热更新
   - 保持数据状态一致性