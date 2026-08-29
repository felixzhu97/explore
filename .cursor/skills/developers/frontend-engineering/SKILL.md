---
name: frontend-engineering
description: 作为苹果公司最专业的前端工程师，严格遵循苹果产品设计理念进行客户端代码编写。注重人文关怀、性能极致、细节完美。遵循 Apple HIG、SwiftUI 设计哲学、Privacy by Design。
---

# Apple Excellence 前端工程开发规范

> "Technology is at its best when it feels invisible." — Apple Design Philosophy

## 核心设计理念

### 苹果五项设计原则（Five Design Principles）

| 原则 | 内涵 | 代码实现 |
|------|------|----------|
| **隐形式技术（Implicit Simplicity）** | 科技应融入生活，减少认知负担 | 智能默认值、直觉式交互、减少操作步骤 |
| **一致性（Consistency）** | 遵循用户已建立的心智模型 | 平台原生模式、标准化手势 |
| **可控性（User Control）** | 用户始终掌控局面 | 可逆操作、明确反馈、优雅降级 |
| **反馈（Feedback）** | 每个操作都有及时响应 | 动效、物理反馈、声效提示 |
| **美学（Aesthetic Integrity）** | 美是功能的延伸 | 精致细节、和谐比例 |

### 苹果人文设计准则

```typescript
// 苹果的设计哲学核心
const appleDesignPhilosophy = {
  // 1. 人文优先于功能
  humanFirst: true,
  
  // 2. 少即是多（Simplicity is the ultimate sophistication）
  minimalism: true,
  
  // 3. 细节决定体验
  attentionToDetail: 'obsessive',
  
  // 4. 动效即语言（Motion as Language）
  motionAsCommunication: true,
  
  // 5. 隐私是基本人权（Privacy is a fundamental human right）
  privacyByDesign: true,
};
```

## Apple HIG 核心规范深度遵循

### SF Pro Typography 精准实现

```typescript
// SF Pro 是苹果系统字体，优先使用系统字体栈
const typography = {
  // 大标题层级 - 内容区域主导
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    weight: 700,
    letterSpacing: 0.37,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text"',
  },
  
  // 标题层级
  title1: { fontSize: 28, lineHeight: 34, weight: 700, letterSpacing: 0.36 },
  title2: { fontSize: 22, lineHeight: 28, weight: 700, letterSpacing: 0.35 },
  title3: { fontSize: 20, lineHeight: 25, weight: 600, letterSpacing: 0.38 },
  
  // 内容层级
  headline: { fontSize: 17, lineHeight: 22, weight: 600, letterSpacing: -0.41 },
  body: { fontSize: 17, lineHeight: 22, weight: 400, letterSpacing: -0.41 },
  
  // 辅助层级
  callout: { fontSize: 16, lineHeight: 21, weight: 400, letterSpacing: -0.32 },
  subhead: { fontSize: 15, lineHeight: 20, weight: 400, letterSpacing: -0.24 },
  
  // 辅助说明
  footnote: { fontSize: 13, lineHeight: 18, weight: 400, letterSpacing: -0.08 },
  caption1: { fontSize: 12, lineHeight: 16, weight: 400, letterSpacing: 0 },
  caption2: { fontSize: 11, lineHeight: 13, weight: 400, letterSpacing: 0.07 },
};
```

### 间距系统（8pt Grid + 4pt 精细调整）

```typescript
const spacing = {
  // 基础单位 8pt
  xxs: 4,   // 极细间距
  xs: 8,    // 元素内部间距
  sm: 12,   // 紧凑间距
  md: 16,   // 标准间距
  lg: 20,   // 宽松间距
  xl: 24,   // 区块间距
  xxl: 32,  // 大区块间距
  xxxl: 40, // 页面级间距
};

// SF Symbols 使用 60x60 的网格系统
const sfSymbolSize = {
  small: 16,
  medium: 20,
  large: 24,
  xlarge: 28,
  xxLarge: 32,
};

// 圆角系统 - 遵循 iOS/macOS 平台规范
const radius = {
  none: 0,
  xs: 4,    // 小按钮、标签
  sm: 8,    // 标准按钮
  md: 12,   // 卡片、面板
  lg: 16,   // 大型卡片
  xl: 20,   // 模态框
  full: 9999, // 胶囊按钮、头像
};
```

### 系统颜色系统（System Colors）

```typescript
const colors = {
  // Apple 语义化系统色
  system: {
    // 主色调
    blue: '#007AFF',
    green: '#34C759',
    orange: '#FF9500',
    red: '#FF3B30',
    purple: '#AF52DE',
    pink: '#FF2D55',
    yellow: '#FFCC00',
    teal: '#5AC8FA',
    indigo: '#5856D6',
    brown: '#A2845E',
    cyan: '#32ADE6',
    mint: '#00C7BE',
    
    // 灰色系
    gray: '#8E8E93',
    gray2: '#AEAEB2',
    gray3: '#C7C7CC',
    gray4: '#D1D1D6',
    gray5: '#E5E5EA',
    gray6: '#F2F2F7',
  },
  
  // 语义化用途
  semantic: {
    primary: '#007AFF',
    destructive: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    info: '#5AC8FA',
  },
  
  // 文字层级
  label: {
    primary: '#000000',           // 主要文字
    secondary: 'rgba(60, 60, 67, 0.6)',  // 次要文字
    tertiary: 'rgba(60, 60, 67, 0.3)',   // 占位文字
    quaternary: 'rgba(60, 60, 67, 0.18)', // 禁用文字
  },
  
  // 填充层级
  fill: {
    primary: 'rgba(120, 120, 128, 0.2)',
    secondary: 'rgba(120, 120, 128, 0.16)',
    tertiary: 'rgba(118, 118, 128, 0.12)',
    quaternary: 'rgba(116, 116, 128, 0.08)',
  },
  
  // 背景层级（支持深色模式）
  background: {
    system: 'rgb(255, 255, 255)',           // 纯白
    secondary: 'rgb(242, 242, 247)',        // 分组背景
    tertiary: 'rgb(255, 255, 255)',         // 卡片背景
    grouped: 'rgb(242, 242, 247)',          // 分组样式
    secondaryGrouped: 'rgb(255, 255, 255)', // 分组内二级
  },
  
  // 分隔线
  separator: {
    opaque: 'rgba(60, 60, 67, 0.29)',
    adaptive: 'rgba(60, 60, 67, 0.36)',
  },
};
```

## 苹果动效哲学（Spring Physics & Fluid Motion）

### Spring 动画系统

```typescript
// 苹果使用 spring physics 实现自然动效
const springConfig = {
  // 快速响应 - 按钮按下
  quick: {
    damping: 15,
    mass: 0.8,
    stiffness: 400,
    duration: 0.25,
  },
  
  // 标准响应 - 页面切换
  standard: {
    damping: 20,
    mass: 1,
    stiffness: 300,
    duration: 0.35,
  },
  
  // 优雅过渡 - 模态框
  gentle: {
    damping: 25,
    mass: 1.2,
    stiffness: 200,
    duration: 0.45,
  },
  
  // 弹性效果 - 拖拽释放
  bouncy: {
    damping: 12,
    mass: 0.8,
    stiffness: 500,
    duration: 0.2,
  },
};

// 通用过渡时长
const transition = {
  fast: 0.15,    // 微交互
  normal: 0.3,    // 标准过渡
  slow: 0.5,      // 大型动画
};

// 缓动函数 - 使用 cubic-bezier
const easing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',      // 标准
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',           // 进入
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',            // 退出
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // 弹性
};
```

### 动效设计原则

```typescript
// 苹果动效四大原则
const motionPrinciples = {
  // 1. 响应性 - 立即响应用户输入
  responsive: {
    pressScale: 0.97,
    pressDuration: 100,
    releaseDuration: 150,
  },
  
  // 2. 层级清晰 - 动效传达界面层级关系
  spatial: {
    enterFromRight: true,    // 推入新页面
    pushFromBottom: false,   // 不用于页面导航
    fadeOnDismiss: true,     // 消失时渐隐
  },
  
  // 3. 流畅连贯 - 动效连接状态变化
  continuous: {
    morphingEnabled: true,   // 形状渐变
    sharedElementEnabled: true, // 共享元素动画
  },
  
  // 4. 克制优雅 - 动效不喧宾夺主
  restrained: {
    subtleTransforms: true,
    noDecorationMotion: true,
  },
};
```

## 交互设计模式

### 手势系统

```typescript
// 遵循 iOS 手势规范
const gestureSystem = {
  // 点击反馈
  tap: {
    highlightDuration: 100,
    releaseDuration: 150,
  },
  
  // 长按
  longPress: {
    minDuration: 500,
    triggerThreshold: 10,
  },
  
  // 拖拽
  drag: {
    sensitivity: 1,
    boundaryConstraint: true,
    springBack: true,
  },
  
  // 滑动手势
  swipe: {
    velocityThreshold: 0.3,
    distanceThreshold: 50,
    directionLock: true,
  },
  
  // 捏合缩放
  pinch: {
    minScale: 0.5,
    maxScale: 3,
    momentum: true,
  },
};
```

### 状态反馈设计

```typescript
// 所有交互必须有即时反馈
const interactionFeedback = {
  // 按压状态
  pressed: {
    scale: 0.97,
    opacity: 0.7,
    backgroundDarken: 0.05,
  },
  
  // 禁用状态
  disabled: {
    opacity: 0.3,
    interaction: 'none',
  },
  
  // 加载状态
  loading: {
    skeleton: true,
    shimmer: true,
    shimmerDuration: 1500,
    disableInteraction: true,
  },
  
  // 成功反馈
  success: {
    hapticFeedback: 'success',
    animation: 'checkmark',
    duration: 300,
  },
  
  // 错误反馈
  error: {
    hapticFeedback: 'error',
    shake: true,
    shakeDuration: 400,
  },
};
```

## 用户体验设计

### 加载状态（Skeleton + Shimmer）

```typescript
// 骨架屏 - 苹果风格的占位动画
const Skeleton = styled.div`
  background: linear-gradient(
    90deg,
    ${colors.fill.tertiary} 0%,
    ${colors.fill.secondary} 50%,
    ${colors.fill.tertiary} 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
  border-radius: ${radius.sm};
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// 智能加载策略
const loadingStrategies = {
  // 骨架屏优先（内容加载时）
  skeleton: {
    showImmediately: true,
    contentFadeIn: 300,
  },
  
  // 渐进式加载（图片）
  progressive: {
    placeholderBlur: 20,
    transitionDuration: 500,
  },
  
  // 占位符（确保布局稳定）
  placeholder: {
    maintainLayout: true,
    minHeight: 100,
  },
};
```

### 空状态设计

```typescript
// 苹果风格的空状态 - 友好、引导性强
const EmptyState = ({ icon, title, description, action }) => (
  <EmptyStateContainer>
    <IconWrapper>
      <SF.Symbol name={icon} size={64} weight="light" color={colors.label.tertiary} />
    </IconWrapper>
    <Title>{title}</Title>
    <Description>{description}</Description>
    {action && (
      <ActionButton onClick={action.onClick}>
        {action.label}
      </ActionButton>
    )}
  </EmptyStateContainer>
);

// 苹果风格的空状态示例
const emptyStates = {
  inbox: {
    icon: 'tray',
    title: '收件箱为空',
    description: '收到新内容时会显示在这里',
  },
  search: {
    icon: 'magnifyingglass',
    title: '未找到结果',
    description: '尝试其他关键词',
  },
  list: {
    icon: 'list.bullet',
    title: '暂无内容',
    description: '开始创建你的第一个项目',
  },
};
```

### 错误处理

```typescript
// 苹果风格的错误处理 - 不恐慌、可恢复
const ErrorState = ({ error, onRetry, onDismiss }) => (
  <ErrorContainer>
    <IconWrapper>
      <SF.Symbol name="exclamationmark.triangle" size={48} color={colors.system.red} />
    </IconWrapper>
    <Title>出现问题</Title>
    <Description>
      {error.message || '请检查网络连接后重试'}
    </Description>
    <ActionGroup>
      <Button variant="secondary" onClick={onDismiss}>
        关闭
      </Button>
      <Button variant="primary" onClick={onRetry}>
        重试
      </Button>
    </ActionGroup>
  </ErrorContainer>
);

// 乐观更新与回滚
const optimisticUpdate = async ({
  optimisticState,
  serverUpdate,
  onError,
}) => {
  // 1. 立即更新 UI
  setState(optimisticState);
  
  try {
    // 2. 发送服务器请求
    await serverUpdate();
  } catch (error) {
    // 3. 失败时回滚
    setState(previousState);
    onError?.(error);
  }
};
```

## 性能优化

### 渲染优化

```typescript
// React.memo 深度优化
const MemoizedComponent = memo(({ data, onClick }) => {
  return <ExpensiveRender data={data} onClick={onClick} />;
}, (prevProps, nextProps) => {
  // 自定义比较逻辑
  return (
    prevProps.data.id === nextProps.data.id &&
    prevProps.data.version === nextProps.data.version &&
    prevProps.onClick === nextProps.onClick
  );
});

// useMemo 缓存计算
const processedData = useMemo(() => {
  return expensiveOperation(data);
}, [data]);

// useCallback 稳定引用
const handleClick = useCallback((id) => {
  dispatch({ type: 'SELECT', id });
}, [dispatch]);
```

### 图片优化

```typescript
// 响应式图片 - 支持 Retina
const ResponsiveImage = styled.img`
  srcset: `
    ${src} 1x,
    ${src.replace('.jpg', '@2x.jpg')} 2x,
    ${src.replace('.jpg', '@3x.jpg')} 3x
  `;
  loading: lazy;
  decoding: async;
`;

// 渐进式加载
const ProgressiveImage = ({ src, alt, aspectRatio }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <ImageWrapper style={{ aspectRatio }}>
      <BlurHash placeholder={blurhash} />
      <img
        src={src}
        alt={alt}
        style={{ 
          opacity: loaded ? 1 : 0, 
          transition: 'opacity 0.3s ease-out',
        }}
        onLoad={() => setLoaded(true)}
      />
    </ImageWrapper>
  );
};

// WebP 优先
<picture>
  <source srcSet={webpSrc} type="image/webp" />
  <img src={jpgSrc} alt={alt} />
</picture>
```

### 代码分割与懒加载

```typescript
// 路由级代码分割
const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('./pages/Dashboard')),
    loading: <PageSkeleton />,
  },
];

// 组件级懒加载
const HeavyChart = lazy(() => import('./components/HeavyChart'));

// 预加载策略
const prefetchOnHover = (importFn) => {
  const handleMouseEnter = useCallback(() => {
    importFn();
  }, []);
  
  return { onMouseEnter: handleMouseEnter };
};
```

### 虚拟列表

```typescript
import { FixedSizeList } from 'react-window';

// 长列表虚拟化
const VirtualizedList = ({ items, itemHeight = 60 }) => (
  <FixedSizeList
    height={window.innerHeight - 200}
    itemCount={items.length}
    itemSize={itemHeight}
    width="100%"
    overscanCount={5}
  >
    {({ index, style }) => (
      <div style={style}>
        <ListItem item={items[index]} />
      </div>
    )}
  </FixedSizeList>
);
```

### 防抖与节流

```typescript
// 搜索防抖
const useDebouncedSearch = (callback, delay = 300) => {
  const [query, setQuery] = useState('');
  
  const debouncedCallback = useMemo(
    () => debounce(callback, delay),
    [callback, delay]
  );
  
  useEffect(() => {
    if (query) debouncedCallback(query);
    return () => debouncedCallback.cancel();
  }, [query]);
  
  return [query, setQuery];
};

// 滚动节流
const useThrottledScroll = (callback, limit = 100) => {
  const throttledCallback = useMemo(
    () => throttle(callback, limit),
    [callback, limit]
  );
  
  return throttledCallback;
};
```

## 组件设计模式

### Compound Components（组合组件）

```typescript
// 苹果风格的组合组件
const Tabs = ({ children, defaultValue, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  const handleTabChange = useCallback((value) => {
    setActiveTab(value);
    onChange?.(value);
  }, [onChange]);
  
  return (
    <TabsContext.Provider value={{ activeTab, onTabChange: handleTabChange }}>
      <TabsContainer role="tablist">{children}</TabsContainer>
    </TabsContext.Provider>
  );
};

Tabs.List = ({ children, ...props }) => (
  <TabList {...props} role="tablist">{children}</TabList>
);

Tabs.Tab = ({ value, children, ...props }) => {
  const { activeTab, onTabChange } = useContext(TabsContext);
  const isActive = activeTab === value;
  
  return (
    <Tab
      role="tab"
      aria-selected={isActive}
      isActive={isActive}
      onClick={() => onTabChange(value)}
      {...props}
    >
      {children}
    </Tab>
  );
};

Tabs.Panel = ({ value, children }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <Panel role="tabpanel">{children}</Panel> : null;
};
```

### Headless Components

```typescript
// 分离逻辑与表现
const Select = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find(o => o.value === value);
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} placement="bottom">
      <Trigger asChild>
        <Button>
          {selected?.label || placeholder}
          <SF.Symbol name="chevron.down" size={14} />
        </Button>
      </Trigger>
      <Content>
        <SelectContext.Provider value={{ value, onChange, close: () => setIsOpen(false) }}>
          {options.map(option => (
            <SelectOption key={option.value} {...option} />
          ))}
        </SelectContext.Provider>
      </Content>
    </Popover>
  );
};
```

## 隐私设计（Privacy by Design）

```typescript
// 隐私优先的设计模式
const privacyDesign = {
  // 1. 数据最小化
  dataMinimization: {
    collectOnly: ['essential'],
    anonymizeWherePossible: true,
    autoDelete: true,
  },
  
  // 2. 端到端加密
  encryption: {
    inTransit: 'TLS 1.3',
    atRest: 'AES-256',
  },
  
  // 3. 用户控制
  userControl: {
    exportData: true,
    deleteData: true,
    privacySettings: true,
  },
  
  // 4. 透明度
  transparency: {
    clearPrivacyPolicy: true,
    dataUsageExplanation: true,
  },
};

// 隐私提示组件
const PrivacyBadge = ({ onClick }) => (
  <button onClick={onClick} style={{ all: 'unset', cursor: 'pointer' }}>
    <SF.Symbol name="lock.shield" size={16} />
    <span>隐私保护</span>
  </button>
);
```

## 辅助功能（Accessibility）

```typescript
// 完整的 ARIA 支持
const AccessibleButton = ({ onClick, children, label, icon }) => (
  <button
    onClick={onClick}
    aria-label={label}
    aria-pressed={false}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  >
    {icon && <Icon>{icon}</Icon>}
    {children}
  </button>
);

// 焦点管理
const FocusTrap = ({ children }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const focusable = ref.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();
  }, []);
  
  return <div ref={ref}>{children}</div>;
};

// 屏幕阅读器专用
const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const SROnly = ({ children }) => (
  <VisuallyHidden aria-live="polite">{children}</VisuallyHidden>
);

// 支持 Dynamic Type
const useDynamicType = (style) => {
  const [fontSize, setFontSize] = useState(
    getComputedStyle(document.documentElement).fontSize
  );
  
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setFontSize(getComputedStyle(document.documentElement).fontSize);
    });
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);
  
  return fontSize;
};
```

## 代码质量检查清单

### 设计原则
- [ ] 遵循苹果五项设计原则
- [ ] 人文优先于功能
- [ ] 少即是多，不过度设计
- [ ] 细节完美，无凑合

### Apple HIG 遵循
- [ ] 使用 SF Pro 字体栈
- [ ] 遵循 8pt 间距系统
- [ ] 使用系统语义化颜色
- [ ] 动效使用 Spring Physics

### 用户体验
- [ ] 所有交互有即时反馈
- [ ] 加载状态使用 Skeleton
- [ ] 错误信息友好可恢复
- [ ] 空状态有引导提示
- [ ] 支持深色模式

### 性能
- [ ] 图片使用懒加载和响应式
- [ ] 长列表使用虚拟化
- [ ] 代码按需分割
- [ ] 关键路径无阻塞

### 隐私与安全
- [ ] 遵循 Privacy by Design
- [ ] 数据最小化原则
- [ ] 用户数据可导出/删除

### 辅助功能
- [ ] 语义化 HTML
- [ ] ARIA 属性正确
- [ ] 键盘导航支持
- [ ] 支持 Dynamic Type
- [ ] 焦点管理正确

## Angular 项目规范

### Angular 架构最佳实践

```typescript
// 1. 组件结构
@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent {
  // 使用 signals (Angular 17+)
  count = signal(0);
  // 或使用 computed
  doubled = computed(() => this.count() * 2);
}

// 2. 路由懒加载
const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () => import('./feature.component').then(m => m.FeatureComponent),
  },
];

// 3. 服务注入
@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  
  getData() {
    return this.http.get('/api/data').pipe(
      catchError(this.handleError)
    );
  }
}

// 4. Angular 动画
export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({ position: 'absolute', width: '100%' })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' })
    ], { optional: true }),
    query(':leave', [
      animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true }),
  ])
]);
```

### Angular 样式规范

```scss
// 使用项目 CSS 变量
.component {
  background: var(--bg-system);
  color: var(--label-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  
  // 深色模式支持
  @media (prefers-color-scheme: dark) {
    background: var(--bg-secondaryGrouped);
    color: var(--label-primary);
  }
}

// 按钮样式
.btn {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-subhead);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:active { transform: scale(0.97); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  
  &--primary {
    background: var(--system-blue);
    color: white;
  }
}
```

### Angular 组件模式

```typescript
// Smart/Dumb 组件分离
// Dumb: 只接收输入，显示数据
@Component({
  selector: 'app-user-card',
  template: `<div class="card">{{ user().name }}</div>`,
})
export class UserCardComponent {
  @Input() user!: User;
}

// Smart: 处理逻辑，连接服务
@Component({
  selector: 'app-user-list',
  template: `<app-user-card *ngFor="let u of users" [user]="u" />`,
})
export class UserListComponent {
  users = signal<User[]>([]);
  
  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(u => this.users.set(u));
  }
}
```

---

> "Details matter, it's worth waiting to get things right." — Steve Jobs
