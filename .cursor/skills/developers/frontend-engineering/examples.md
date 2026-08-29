# 前端工程示例

## 示例 1: 遵循 Apple HIG 的按钮组件

### 组件设计

```typescript
// Button.tsx - 遵循 Apple HIG
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { Spinner } from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'plain';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles = {
  primary: css`
    background: #007AFF;
    color: white;
    &:hover:not(:disabled) { background: #0056CC; }
  `,
  secondary: css`
    background: #F2F2F7;
    color: #007AFF;
    &:hover:not(:disabled) { background: #E5E5EA; }
  `,
  destructive: css`
    background: #FF3B30;
    color: white;
    &:hover:not(:disabled) { background: #D32F2F; }
  `,
  plain: css`
    background: transparent;
    color: #007AFF;
    &:hover:not(:disabled) { background: rgba(0, 122, 255, 0.1); }
  `,
};

const sizeStyles = {
  small: css`
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
    border-radius: 8px;
  `,
  medium: css`
    height: 44px;
    padding: 0 16px;
    font-size: 17px;
    border-radius: 10px;
  `,
  large: css`
    height: 50px;
    padding: 0 20px;
    font-size: 17px;
    font-weight: 600;
    border-radius: 12px;
  `,
};

const StyledButton = styled.button<{ variant: ButtonVariant; size: ButtonSize; loading?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  transition: all 0.15s ease;
  
  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  ${({ loading }) => loading && css`
    pointer-events: none;
  `}
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  ...props
}) => (
  <StyledButton
    variant={variant}
    size={size}
    loading={loading}
    disabled={disabled || loading}
    {...props}
  >
    {loading && <Spinner size="small" />}
    {!loading && icon && iconPosition === 'left' && icon}
    {children}
    {!loading && icon && iconPosition === 'right' && icon}
  </StyledButton>
);
```

### 使用示例

```tsx
// 使用场景
const ButtonExamples = () => (
  <ButtonWrapper>
    <Button variant="primary" size="large">
      主要操作
    </Button>
    
    <Button variant="secondary" icon={<AddIcon />}>
      带图标
    </Button>
    
    <Button variant="destructive" loading={isDeleting}>
      删除中...
    </Button>
    
    <Button variant="plain" size="small">
      文本按钮
    </Button>
  </ButtonWrapper>
);
```

---

## 示例 2: 骨架屏加载

### 骨架屏组件

```typescript
// Skeleton.tsx
import styled, { keyframes } from '@emotion/styled';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export const Skeleton = styled.div<SkeletonProps>`
  background: linear-gradient(
    90deg,
    #E5E5EA 25%,
    #F2F2F7 50%,
    #E5E5EA 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  
  width: ${({ width = '100%' }) => 
    typeof width === 'number' ? `${width}px` : width};
  height: ${({ height = 20 }) => 
    typeof height === 'number' ? `${height}px` : height};
  border-radius: ${({ borderRadius = 8 }) => 
    typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius};
`;

export const SkeletonText = styled(Skeleton)`
  height: 14px;
  margin-bottom: 8px;
  
  &:last-child {
    width: 60%;
    margin-bottom: 0;
  }
`;

export const SkeletonAvatar = styled(Skeleton)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const SkeletonCard = () => (
  <Card>
    <CardHeader>
      <SkeletonAvatar />
      <div>
        <Skeleton width={120} height={14} />
        <Skeleton width={80} height={12} style={{ marginTop: 4 }} />
      </div>
    </CardHeader>
    <SkeletonText />
    <SkeletonText />
    <SkeletonText width="60%" />
  </Card>
);
```

### 使用示例

```tsx
// FeedItem.tsx
const FeedItem = ({ isLoading }) => {
  if (isLoading) {
    return <SkeletonCard />;
  }
  
  return (
    <Card>
      <CardHeader>
        <Avatar src={user.avatar} />
        <UserInfo>
          <Name>{user.name}</Name>
          <Time>{formatTime(post.createdAt)}</Time>
        </UserInfo>
      </CardHeader>
      <Content>{post.content}</Content>
    </Card>
  );
};
```

---

## 示例 3: 图片渐进式加载

### 图片组件

```typescript
// ProgressiveImage.tsx
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface ProgressiveImageProps {
  src: string;
  srcSet?: string;
  alt: string;
  aspectRatio?: string;
  blurHash?: string;
}

const ImageWrapper = styled.div<{ aspectRatio?: string }>`
  position: relative;
  overflow: hidden;
  background: #F2F2F7;
  aspect-ratio: ${({ aspectRatio }) => aspectRatio || 'auto'};
`;

const BlurPlaceholder = styled.div<{ blurHash?: string }>`
  position: absolute;
  inset: 0;
  background: ${({ blurHash }) => 
    blurHash ? `url(${blurHash}) center/cover` : '#F2F2F7'};
  filter: blur(20px);
  transform: scale(1.1);
`;

const Image = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ loaded }) => loaded ? 1 : 0};
  transition: opacity 0.3s ease;
`;

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  srcSet,
  alt,
  aspectRatio,
  blurHash,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <ImageWrapper aspectRatio={aspectRatio}>
        <FallbackIcon />
      </ImageWrapper>
    );
  }

  return (
    <ImageWrapper aspectRatio={aspectRatio}>
      {blurHash && !loaded && <BlurPlaceholder blurHash={blurHash} />}
      <picture>
        <source srcSet={srcSet} />
        <Image
          src={src}
          alt={alt}
          loaded={loaded}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </ImageWrapper>
  );
};
```

---

## 示例 4: 虚拟列表

### 长列表优化

```typescript
// VirtualizedList.tsx
import { useCallback } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import styled from '@emotion/styled';

interface VirtualizedListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
}: VirtualizedListProps<T>) {
  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => (
      <div style={style}>
        {renderItem(items[index], index)}
      </div>
    ),
    [items, renderItem]
  );

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
      overscanCount={5}
    >
      {Row}
    </List>
  );
}

// 使用
const FeedList = ({ posts }) => (
  <VirtualizedList
    items={posts}
    height={window.innerHeight - 200}
    itemHeight={120}
    renderItem={(post) => <FeedItem post={post} />}
  />
);
```

---

## 示例 5: 手势交互

### 下拉刷新

```typescript
// PullToRefresh.tsx
import { useState, useRef } from 'react';
import styled, { keyframes, css } from '@emotion/styled';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const PullContainer = styled.div<{ pulling: boolean; reachThreshold: boolean }>`
  overflow: hidden;
  touch-action: pan-x;
  
  ${({ pulling, reachThreshold }) => pulling && css`
    cursor: grabbing;
  `}
`;

const Indicator = styled.div<{ pulling: boolean; reachThreshold: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ pulling }) => pulling ? 60 : 0}px;
  overflow: hidden;
  transition: height 0.2s;
  
  ${({ reachThreshold }) => reachThreshold && css`
    svg {
      animation: ${rotate} 1s linear infinite;
    }
  `}
`;

export const PullToRefresh: React.FC<{
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}> = ({ onRefresh, children }) => {
  const [pulling, setPulling] = useState(false);
  const [reachThreshold, setReachThreshold] = useState(false);
  const startY = useRef(0);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    setPulling(true);
  };

  const handleTouchMove = (e) => {
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) {
      setReachThreshold(delta > 80);
    }
  };

  const handleTouchEnd = async () => {
    if (reachThreshold) {
      await onRefresh();
    }
    setPulling(false);
    setReachThreshold(false);
  };

  return (
    <PullContainer
      pulling={pulling}
      reachThreshold={reachThreshold}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Indicator pulling={pulling} reachThreshold={reachThreshold}>
        {reachThreshold ? <Spinner /> : <ArrowDown />}
      </Indicator>
      {children}
    </PullContainer>
  );
};
```

---

## 示例 6: 深色模式

### 主题系统

```typescript
// theme.ts
export const lightTheme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: 'rgba(60, 60, 67, 0.6)',
    primary: '#007AFF',
    destructive: '#FF3B30',
    border: 'rgba(60, 60, 67, 0.1)',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 40px rgba(0, 0, 0, 0.15)',
  },
};

export const darkTheme = {
  colors: {
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: 'rgba(235, 235, 245, 0.6)',
    primary: '#0A84FF',
    destructive: '#FF453A',
    border: 'rgba(84, 84, 88, 0.3)',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 40px rgba(0, 0, 0, 0.5)',
  },
};

// 使用
import { ThemeProvider } from '@emotion/react';

const App = () => (
  <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <Component />
  </ThemeProvider>
);
```
