# 技术计划：极简帖子管理系统

## 章程符合性检查

### I. 简单性原则
✓ 符合要求：
- 使用内置 React Context 而非复杂状态管理库
- 仅使用必要的依赖（Vite, React, React Router, TailwindCSS）
- 采用函数组件和 Hooks 简化状态管理

### II. 模块化原则
✓ 符合要求：
- 清晰的目录结构划分（components, routes, hooks, utils）
- 组件职责单一，易于测试和维护
- 共享逻辑抽象为自定义 hooks

### III. 可读性原则
✓ 符合要求：
- 采用语义化组件命名
- 使用 ESLint 和 Prettier 保持代码风格一致
- 关键业务逻辑添加注释说明

### IV. 最小依赖原则
✓ 符合要求：
- 核心依赖：Vite, React, React Router, TailwindCSS
- 不使用额外的状态管理库
- 不引入 UI 组件库

### V. 样式一致性
✓ 符合要求：
- 统一使用 TailwindCSS 工具类
- 提取公共样式为组件
- 定义一致的颜色和间距系统

## 技术上下文

### 开发环境
- Node.js 18+
- npm 8+
- VS Code（推荐）

### 核心依赖
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.3.5",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "vite": "^5.0.0"
  }
}
```

## 目录结构

```
src/
├── components/           # 可重用组件
│   ├── layout/          # 布局相关
│   │   ├── Navbar.jsx     # 导航栏
│   │   └── Layout.jsx     # 页面布局
│   ├── posts/           # 文章相关
│   │   ├── PostList.jsx   # 文章列表
│   │   ├── PostCard.jsx   # 文章卡片
│   │   ├── PostForm.jsx   # 文章表单
│   │   └── PostDetail.jsx # 文章详情
│   └── ui/              # UI组件
│       ├── Button.jsx     # 按钮
│       └── Modal.jsx      # 模态框
├── routes/              # 页面组件
│   ├── home.jsx          # 首页
│   ├── post.jsx          # 文章详情页
│   ├── about.jsx         # 关于页面
│   └── faq.jsx           # FAQ页面
├── hooks/               # 自定义Hooks
│   ├── usePosts.js       # 文章数据管理
│   └── useLocalStorage.js # 本地存储
├── lib/                # 工具函数
│   ├── posts.js         # 文章相关
│   └── validation.js    # 表单验证
├── main.jsx            # 入口文件
├── App.jsx             # 根组件
└── index.css           # 全局样式
```

## 路由设计

```jsx
// App.jsx
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'post/:slug', element: <PostPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
```

## 核心组件实现

### PostList 组件
```jsx
function PostList() {
  const { posts, isLoading } = usePosts();
  
  if (isLoading) return <p>加载中...</p>;
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### PostForm 组件
```jsx
function PostForm({ onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(values)) {
      await onSubmit(values);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 表单字段 */}
    </form>
  );
}
```

## 数据管理

### 本地存储
```typescript
// hooks/useLocalStorage.js
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

### 文章数据管理
```typescript
// hooks/usePosts.js
function usePosts() {
  const [posts, setPosts] = useLocalStorage('posts', []);

  const addPost = (newPost) => {
    setPosts(prev => [...prev, { 
      ...newPost, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      slug: slugify(newPost.title)
    }]);
  };

  const deletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  return { posts, addPost, deletePost };
}
```

## 样式指南

### 颜色系统
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        surface: {
          50: '#ffffff',
          100: '#f3f4f6',
        }
      }
    }
  }
}
```

### 常用组件样式
```jsx
// 按钮
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
  按钮
</button>

// 卡片
<div className="p-6 bg-surface-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
  内容
</div>

// 输入框
<input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
```

## 实施计划

### 阶段1：基础设置（1天）
1. 初始化 Vite 项目
2. 安装依赖
3. 配置 TailwindCSS
4. 设置 ESLint 和 Prettier

### 阶段2：项目结构（1天）
1. 创建目录结构
2. 配置路由系统
3. 实现基础布局组件

### 阶段3：数据层（1天）
1. 实现 localStorage hooks
2. 创建文章数据管理 hooks
3. 添加数据验证

### 阶段4：核心功能（2天）
1. 实现文章列表和卡片组件
2. 开发文章表单
3. 完成文章详情页
4. 添加删除功能

### 阶段5：完善（1天）
1. 实现关于和FAQ页面
2. 添加加载状态
3. 优化错误处理
4. 添加响应式样式

## 风险评估

1. **数据持久化**
   - 风险：localStorage 存储限制
   - 解决：实现数据清理机制，仅保留最新的100条

2. **性能优化**
   - 风险：大量文章渲染可能影响性能
   - 解决：实现分页或虚拟滚动

3. **路由状态**
   - 风险：刷新页面可能丢失状态
   - 解决：确保所有状态正确持久化

4. **兼容性**
   - 风险：旧浏览器支持
   - 解决：添加必要的 polyfill