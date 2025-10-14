# Postly Constitution

<!--
# Sync Impact Report
Version change: None → 1.0.0
Modified principles: Initial creation
Added sections: All sections
Removed sections: None
Templates requiring updates: None (initial setup)
Follow-up TODOs: None
-->

## Core Principles

### I. Simplicity First
保持代码和功能的简单性是最高优先级。每个组件、函数和特性都必须具有明确的单一职责。避免过度工程和不必要的抽象。如果一个实现方案看起来太复杂，那么很可能存在更简单的解决方案。

### II. Modular Architecture
所有功能必须被组织成独立的、可重用的模块。组件之间应该通过明确定义的接口进行通信。避免组件之间的紧耦合，保持清晰的关注点分离。路由、状态管理和UI组件应该保持独立且易于维护。

### III. Readability Over Cleverness
代码的可读性高于简洁性。明确的命名优于简短的命名，清晰的结构优于过度优化。注释应该解释"为什么"而不是"是什么"。避免使用复杂的单行代码，优先选择清晰易读的多行实现。

### IV. Minimal Dependencies
仅引入绝对必要的依赖。每个新依赖都必须经过严格评估，考虑其维护负担、包大小和潜在的安全风险。优先使用React和TailwindCSS的内置功能，避免引入专门的工具库。

### V. Consistent Styling
使用TailwindCSS时必须遵循一致的样式模式。避免内联样式，将常用样式组合提取为可重用的类。保持颜色、间距和排版的一致性。组件样式应该是可预测和统一的。

## Development Standards

### 代码组织
- 所有组件必须放在`src/components`目录下
- 路由相关逻辑集中在`src/routes`目录
- 共享hooks放在`src/hooks`目录
- 工具函数放在`src/utils`目录
- 常量和配置放在`src/config`目录

### 性能考虑
- 组件应该适当使用React.memo()以避免不必要的重渲染
- 大型列表必须实现分页或虚拟滚动
- 图片资源必须经过优化并使用适当的加载策略
- 避免在渲染期间进行复杂计算

## Quality Assurance

### 代码审查标准
- 所有功能更改必须经过代码审查
- 遵循ESLint规则，不允许有警告或错误
- 提交消息必须清晰描述更改内容
- 文档更新必须与代码更改同步

## Governance

本章程作为项目开发的最高指导原则。任何修改都必须：
1. 提供明确的理由和影响分析
2. 获得团队成员的一致同意
3. 更新相关文档和实践指南
4. 遵循语义化版本规则进行版本更新

**Version**: 1.0.0 | **Ratified**: 2025-10-14 | **Last Amended**: 2025-10-14