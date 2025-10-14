# 数据模型设计

## Post 实体

### 属性
```javascript
{
  id: string,          // UUID格式的唯一标识符
  title: string,       // 文章标题，必填
  summary: string,     // 文章摘要，必填
  content: string,     // 文章内容，必填
  createdAt: number,   // 创建时间戳
  slug: string         // URL友好的标题格式，自动从title生成
}
```

### 验证规则
- title：
  - 必填
  - 长度：2-100字符
  - 不能包含特殊字符（用于生成slug）
- summary：
  - 必填
  - 长度：10-200字符
- content：
  - 必填
  - 长度：50-10000字符
- slug：
  - 自动生成，小写字母、数字和连字符
  - 唯一性检查

### 状态转换
1. 创建：
   - 生成id和createdAt
   - 验证必填字段
   - 生成slug
   - 保存到localStorage

2. 删除：
   - 从localStorage中移除
   - 更新列表状态

### 持久化
```javascript
// localStorage结构
{
  "posts": Post[],
  "lastUpdated": number
}
```