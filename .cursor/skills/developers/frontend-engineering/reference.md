# Apple HIG 详细规范参考

## iOS/macOS 设计尺寸

### 设备适配

| 设备 | 屏幕尺寸 | 安全区域 |
|------|----------|----------|
| iPhone SE | 375×667 | 底部 Home 区域 |
| iPhone 14 | 390×844 | Dynamic Island |
| iPhone 14 Pro Max | 430×932 | Dynamic Island |
| iPad | 768×1024 | 多任务分屏 |
| Mac | 可变 | 窗口最小 400×300 |

### 触控区域

```typescript
// 最小触控区域 (44×44 pt)
const touchTarget = {
  minimum: 44,
  recommended: 48,
  maximum: 64,
};

// Apple 按钮高度
const buttonHeight = {
  small: 32,
  medium: 44,
  large: 50,
};
```

## 动画规范

### 交互反馈

```typescript
// Apple 认可的动画时长
const durations = {
  quick: 0.1,      // 微交互反馈
  fast: 0.2,       // 小元素
  normal: 0.3,     // 标准过渡
  slow: 0.5,       // 大型模态框
};

// 缓动曲线
const easings = {
  standard: 'cubic-bezier(0.25, 0.1, 0.25, 1)',      // 默认
  emphasized: 'cubic-bezier(0.33, 1, 0.68, 1)',       // 强调
  decelerated: 'cubic-bezier(0, 0, 0, 1)',            // 进入
  accelerated: 'cubic-bezier(0.32, 0, 0.67, 0)',      // 退出
};

// 手势反馈
const gestures = {
  longPress: { delay: 500, scale: 0.97 },
  drag: { threshold: 10 },
  swipe: { velocity: 0.5 },
};
```

### 转场动画

```typescript
// 页面转场
const transitions = {
  push: 'slideFromRight',
  modal: 'slideFromBottom',
  sheet: 'slideFromBottomPartial',
  tab: 'crossDissolve',
};

// 模态框
const modalPresents = {
  fullScreen: 'slideVertical',
  pageSheet: 'slideVertical(90%)',
  formSheet: 'slideVertical(60%)',
  popover: 'fadeScale',
};
```

## 颜色系统

### 语义化命名

```typescript
// Apple 系统色
const systemColors = {
  // 蓝色系
  systemBlue: '#007AFF',
  systemIndigo: '#5856D6',
  
  // 绿色系
  systemGreen: '#34C759',
  systemMint: '#00C7BE',
  
  // 暖色系
  systemOrange: '#FF9500',
  systemYellow: '#FFCC00',
  systemPink: '#FF2D55',
  
  // 冷色系
  systemPurple: '#AF52DE',
  systemTeal: '#5AC8FA',
  systemCyan: '#32ADE6',
  
  // 中性色
  systemRed: '#FF3B30',
  systemGray: '#8E8E93',
  systemGray2: '#AEAEB2',
  systemGray3: '#C7C7CC',
  systemGray4: '#D1D1D6',
  systemGray5: '#E5E5EA',
  systemGray6: '#F2F2F7',
};

// 填充样式
const fillStyles = {
  solid: '纯色填充',
  tint: '系统色 12% 透明度',
  subtle: '系统色 8% 透明度',
  clear: '透明边框',
};
```

### 深色模式适配

```typescript
// 颜色同时支持亮/暗模式
const AdaptiveColors = () => css`
  color: ${({ theme }) => 
    theme.dark ? colors.white : colors.black};
  background: ${({ theme }) => 
    theme.dark ? '#1C1C1E' : '#FFFFFF'};
  
  // 使用系统语义色
  color: systemLabel;
  background: systemBackground;
  
  // 使用变量
  color: var(--text-primary);
  background: var(--background-primary);
`;

// CSS 变量
:root {
  --text-primary: #000000;
  --text-secondary: rgba(60, 60, 67, 0.6);
  --background-primary: #FFFFFF;
  --background-secondary: #F2F2F7;
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #FFFFFF;
    --text-secondary: rgba(235, 235, 245, 0.6);
    --background-primary: #000000;
    --background-secondary: #1C1C1E;
  }
}
```

## 字体规范

### SF Pro 使用

```typescript
// 字体栈
const fontStack = {
  text: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
  display: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
  mono: "'SF Mono', SFMono-Regular, Consolas, monospace",
};

// SF Symbols
const systemIcons = {
  checkmark: 'checkmark',
  chevronRight: 'chevron.right',
  plus: 'plus',
  xmark: 'xmark',
  ellipsis: 'ellipsis',
  heart: 'heart',
  star: 'star.fill',
};

// 使用 SF Symbols
const Icon = ({ name }) => (
  <FontAwesomeIcon icon={['sf-symbol', name]} />
);

// 或使用 Lucide React (开源替代)
import { Check, ChevronRight, Plus, X } from 'lucide-react';
```

## 组件规范

### 导航栏

```typescript
// iOS 导航栏高度
const navbarHeight = {
  regular: 44,
  large: 96,        // 大标题模式
  withSearch: 108,
};

// macOS 工具栏
const toolbarHeight = {
  standard: 38,
  unified: 28,
};
```

### 列表设计

```typescript
// iOS 列表样式
const ListItem = styled.div`
  display: flex;
  align-items: center;
  min-height: 44px;        // 最小触控高度
  padding: 11px 16px;      // iOS 标准内边距
  background: systemBackground;
  border-bottom: 0.5px solid separatorColor;
  
  &:last-child {
    border-bottom: none;
  }
`;

// 分组圆角
const groupRadius = 10;

// 内边距
const groupPadding = 16;
```

### 表单控件

```typescript
// TextField 样式
const TextInput = styled.input`
  height: 44px;
  padding: 0 16px;
  font-size: 17px;
  background: #F2F2F7;
  border-radius: 10px;
  border: none;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.3);
  }
  
  &::placeholder {
    color: #8E8E93;
  }
`;

// Switch 样式
const Switch = styled.label`
  position: relative;
  width: 51px;
  height: 31px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: #E9E9EB;
    border-radius: 31px;
    transition: 0.3s;
    
    &::before {
      content: '';
      position: absolute;
      width: 27px;
      height: 27px;
      left: 2px;
      bottom: 2px;
      background: white;
      border-radius: 50%;
      transition: 0.3s;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    }
  }
  
  input:checked + span {
    background: #34C759;
    
    &::before {
      transform: translateX(20px);
    }
  }
`;
```

## 性能指标

### Core Web Vitals

| 指标 | 优秀 | 良好 | 需改进 |
|------|------|------|--------|
| LCP | < 2.5s | < 4s | > 4s |
| FID | < 100ms | < 300ms | > 300ms |
| CLS | < 0.1 | < 0.25 | > 0.25 |
| INP | < 200ms | < 500ms | > 500ms |

### 性能优化清单

```typescript
// React 性能
const reactOptimizations = [
  'use React.memo 避免不必要的重渲染',
  'use useMemo 缓存计算结果',
  'use useCallback 稳定回调引用',
  '使用虚拟列表处理长列表',
  '代码分割 + React.lazy',
  '预加载关键路由组件',
];

// 资源优化
const resourceOptimizations = [
  '图片 WebP 格式 + srcset',
  '图片懒加载 + blur placeholder',
  '字体 subset + font-display: swap',
  'CSS/JS gzip/brotli 压缩',
  '关键 CSS 内联',
  '资源预加载/prefetch',
];

// 网络优化
const networkOptimizations = [
  'API 请求去重',
  '请求取消 (AbortController)',
  '乐观更新',
  '请求缓存 (Stale-While-Revalidate)',
  'CDN 加速',
];
```

## 无障碍设计

### 辅助功能指南

```typescript
// 颜色对比度
const contrastRatio = {
  normal: 4.5,   // 普通文本
  large: 3.0,    // 大文本 (18px+ 或 14px+ 粗体)
  ui: 3.0,       // UI 组件
};

// 焦点可见性
const focusIndicator = {
  width: 3,
  style: 'solid',
  color: 'systemBlue',
  offset: 2,
  borderRadius: 4,
};

// 动态类型支持
const DynamicType = () => css`
  font-size: ${({ theme }) => theme.fontSizes.body};
  
  @media (prefers-dynamic-type) {
    font-size: env(-apple-dynamic-type-body);
  }
`;

// 减少动画
const ReducedMotion = styled.div`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;
```

### ARIA 指南

```typescript
// 语义化元素
const semanticElements = {
  navigation: '<nav>',
  main: '<main>',
  article: '<article>',
  section: '<section>',
  aside: '<aside>',
  header: '<header>',
  footer: '<footer>',
};

// 实时区域
const liveRegions = `
  aria-live="polite"    // 礼貌提示
  aria-live="assertive" // 紧急提示
  aria-atomic="true"    // 整体播报
`;

// 角色
const roles = {
  button: '按钮',
  link: '链接',
  menuitem: '菜单项',
  tab: '标签页',
  tablist: '标签列表',
  tabpanel: '标签面板',
  dialog: '对话框',
  alert: '警告',
  status: '状态',
};
```
