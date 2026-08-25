---
name: apple-design
description: 遵循 Apple 设计理念进行产品和用户体验设计。严格遵循 Apple HIG（人机界面指南），涵盖 iOS、macOS、visionOS、网页设计。适用于 UI 设计、组件开发、交互设计、原型设计或提及 Apple 设计规范时使用。
disable-model-invocation: true
---

# Apple Design

严格遵循 Apple 设计理念进行产品和用户体验设计。

## 设计原则

### 1. 清晰（Clarity）

内容是核心。文字清晰易懂，图标的语义明确，动画传达意义。高对比度确保可读性，无障碍设计让每个人都能使用。

### 2. 遵从（Deference）

内容填充屏幕，减少视觉侵占。过渡流畅自然，使用户专注于当前任务。

### 3. 深度（Depth）

层级清晰，过渡自然。触摸反馈直接，导航直观。视觉层次和逼真的动效帮助用户理解界面关系。

## 平台适配

### iOS/iPadOS

- 使用 SF Symbols 作为图标系统
- 遵循 SF Symbols 变体（regular/medium/bold）
- 采用系统字体 SF Pro
- 使用安全区域和动态岛屿适配
- 遵循圆角半径规范（小组件 20pt，应用图标 180px）
- 支持深色模式和多色彩模式

### macOS

- 使用 SF Pro 和 SF Compact 字体
- 遵循窗口管理规范
- 实现原生工具栏和菜单栏
- 支持系统级深色/浅色/自动模式
- 遵循窗口圆角和间距规范

### visionOS

- 遵循空间设计原则
- 使用 SwiftUI 进行声明式 UI
- 支持眼动追踪和手势交互
- 遵循 3D 空间布局规范
- 实现沉浸式体验

### 网页设计

- 使用 SF Pro 字体
- 实现响应式布局
- 遵循 Apple 设计语言
- 支持触摸和指针交互
- 实现流畅的动画过渡

## 视觉规范

### 色彩系统

```css
:root {
  /* Primary Colors */
  --apple-blue: #007AFF;
  --apple-green: #34C759;
  --apple-indigo: #5856D6;
  --apple-orange: #FF9500;
  --apple-pink: #FF2D55;
  --apple-purple: #AF52DE;
  --apple-red: #FF3B30;
  --apple-teal: #5AC8FA;
  --apple-yellow: #FFCC00;

  /* Gray Scale */
  --apple-gray: #8E8E93;
  --apple-gray-2: #AEAEB2;
  --apple-gray-3: #C7C7CC;
  --apple-gray-4: #D1D1D6;
  --apple-gray-5: #E5E5EA;
  --apple-gray-6: #F2F2F7;

  /* Text Colors */
  --text-primary: #000000;
  --text-secondary: #3C3C43;
  --text-tertiary: #8E8E93;
  --text-placeholder: #C7C7CC;

  /* Background Colors */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F2F2F7;
  --bg-tertiary: #FFFFFF;
}
```

### 圆角规范

| 元素类型 | 圆角半径 |
|----------|----------|
| 应用图标 | 180px (完全圆形) |
| 小组件 | 20pt |
| 按钮 | 10pt |
| 输入框 | 8pt |
| 卡片 | 12pt |
| 弹窗 | 14pt |

### 间距系统

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
--spacing-3xl: 32px;
--spacing-4xl: 40px;
```

### 阴影系统

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 24px 80px rgba(0, 0, 0, 0.2);
```

## 字体系统

### SF Pro 字体层级

| 样式 | 字号 | 字重 | 行高 |
|------|------|------|------|
| 大标题 | 34pt | Bold | 41pt |
| 标题 1 | 28pt | Bold | 34pt |
| 标题 2 | 22pt | Bold | 28pt |
| 标题 3 | 20pt | Semibold | 25pt |
| Headline | 17pt | Semibold | 22pt |
| Body | 17pt | Regular | 22pt |
| Callout | 16pt | Regular | 21pt |
| Subhead | 15pt | Regular | 20pt |
| Footnote | 13pt | Regular | 18pt |
| Caption 1 | 12pt | Regular | 16pt |
| Caption 2 | 11pt | Regular | 13pt |

## 组件设计

### 按钮

- **主要按钮**: 蓝色背景 (#007AFF)，白色文字，圆角 10pt
- **次要按钮**: 透明背景，蓝色文字
- **危险按钮**: 红色背景 (#FF3B30)，白色文字
- **禁用状态**: 50% 透明度，不可点击

### 导航栏

- 高度: 44pt (iPhone)，48pt (iPad)
- 标题居中，使用标题 3 样式
- 背景模糊效果 (backdrop-filter: blur(20px))
- 底部边框 0.5pt (#000 10%)

### 标签栏

- 高度: 49pt (iPhone)，50pt (iPad)
- 图标尺寸: 28x28pt
- 未选中图标: 颜色 #999
- 选中图标: 颜色 #007AFF

### 列表

- 行高: 44pt (紧凑) / 60pt (标准)
- 分组圆角: 10pt
- 分割线: 左侧 16pt 缩进，0.5pt (#000 20%)
- 右侧附件间距: 12pt

### 卡片

- 背景: #FFFFFF
- 圆角: 12pt
- 阴影: shadow-sm
- 内边距: 16pt

### 弹窗

- 圆角: 14pt
- 标题居中，Body 样式
- 按钮横向排列，均分宽度
- 分割线: 0.5pt (#000 20%)

## 动画原则

### 时长

| 动画类型 | 时长 |
|----------|------|
| 微交互 | 200ms |
| 视图切换 | 350ms |
| 模态弹窗 | 500ms |
| 手势动画 | 持续性 |

### 缓动函数

```css
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### 视图过渡

- 导航推送: 从右滑入
- 模态展示: 从底部滑入
- Alert: 从顶部淡入 + 微幅下滑
- Popover: 从锚点缩放出现

## 设计流程

### 1. 理解需求

- 明确产品目标和用户需求
- 定义核心使用场景
- 识别关键用户流程

### 2. 构思布局

- 使用网格系统规划布局
- 确定视觉层级
- 定义信息架构

### 3. 设计组件

- 从原子组件开始
- 构建组件库
- 确保一致性

### 4. 交互设计

- 定义手势和过渡
- 考虑无障碍需求
- 优化触觉反馈

### 5. 视觉打磨

- 调整间距和圆角
- 优化色彩对比
- 测试多设备和模式

## 无障碍设计

- 支持 VoiceOver/TalkBack
- 最小触摸区域 44x44pt
- 色彩对比度 ≥ 4.5:1
- 支持动态字体大小
- 支持减弱动效偏好

## 参考资源

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [SwiftUI 文档](https://developer.apple.com/documentation/swiftui)
