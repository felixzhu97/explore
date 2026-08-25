---
name: tdd-ddd-refactor
description: 严格按照TDD+DDD+BDD进行代码重构，涵盖服务端和客户端代码。先为原有代码编写测试用例，再小步重构代码，保证重构后行为不变。适用于重构代码、代码优化、遗留系统改造、提取领域模型（充血模型），或用户提及TDD、DDD、BDD、整洁架构、重构时使用此技能。同时包含 E2E 端到端测试（Playwright/Cypress）指南。
---

> **完整规范**: 架构、TDD 循环、BDD 模式、充血模型代码模板请查看 [fullstack-ddd](../fullstack-ddd/SKILL.md)

---

# TDD + DDD + BDD 重构规范

## 核心原则

1. **测试先行**: 每次重构前，先编写测试用例捕获现有行为
2. **小步重构**: 每次只做一个改动，立即验证
3. **DDD建模**: 识别领域实体、值对象、聚合根、领域服务
4. **充血模型**: 将业务逻辑封装在领域对象内部
5. **行为不变**: 重构后所有测试必须通过，保证行为一致

---

## 重构工作流

```
┌─────────────────────────────────────────────────────────────┐
│  1. 分析现有代码 → 识别DDD元素                               │
│  2. 编写测试用例 → 捕获现有行为                              │
│  3. 运行测试确保通过 → 建立基线                              │
│  4. 小步重构代码 → 每次一个改动                              │
│  5. 立即运行测试 → 验证行为不变                              │
│  6. 重复步骤4-5 → 直至完成                                  │
│  7. 清理代码 → 删除冗余、重命名                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 贫血→充血重构步骤

### Step 1: 识别现有代码

```typescript
// 原代码 (Anemic)
class User {
  id: string;
  name: string;
  email: string;
}

function createUser(data: any): User {
  const user = new User();
  user.id = data.id || generateId();
  user.name = data.name;
  user.email = data.email;
  if (!user.email.includes('@')) throw new Error('Invalid email');
  return user;
}
```

### Step 2: 编写测试

```typescript
describe('User creation', () => {
  it('should create user with valid data', () => {
    const user = createUser({ name: 'John', email: 'john@example.com' });
    expect(user.name).toBe('John');
    expect(user.email).toBe('john@example.com');
  });

  it('should reject invalid email', () => {
    expect(() => createUser({ name: 'John', email: 'invalid' }))
      .toThrow('Invalid email');
  });
});
```

### Step 3: 小步重构为充血模型

```typescript
// 重构后 (Rich)
class User {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email
  ) {}

  static create(props: { name: string; email: string }): User {
    const email = Email.create(props.email);
    return new User(generateId(), props.name, email);
  }
}

class Email {
  private constructor(public readonly value: string) {}

  static create(value: string): Email {
    if (!value.includes('@')) throw new Error('Invalid email');
    return new Email(value);
  }
}
```

### Step 4: 验证测试通过

---

## 回滚策略

当测试失败时：

1. 立即停止当前重构
2. 使用 `git stash` 保存当前改动
3. 运行测试确认基线状态
4. 分析失败原因
5. 决定是回滚还是修复

```bash
# 保存当前进度
git stash

# 确认基线通过
npm test

# 恢复改动继续重构
git stash pop
```

---

## DDD 识别清单

### 实体 (Entity)
- 有唯一标识
- 状态可变
- 例如：`User`, `Order`, `Product`

### 值对象 (Value Object)
- 无唯一标识
- 不可变
- 例如：`Money`, `Address`, `Email`

### 聚合根 (Aggregate Root)
- 聚合的入口
- 负责封装聚合内一致性
- 例如：`OrderAggregate`, `CartAggregate`

### 领域服务 (Domain Service)
- 不属于任何实体的领域逻辑
- 跨多个实体/聚合的操作
- 例如：`PricingService`, `InventoryService`

### 仓库接口 (Repository)
- 只定义接口在领域层
- 实现放在基础设施层
- 例如：`IOrderRepository`, `IUserRepository`

---

## 测试策略

### 第一阶段：编写保护性测试

```typescript
describe('OrderService existing behavior', () => {
  it('should calculate total price correctly', () => {
    const order = new Order([
      new OrderItem('PROD-001', 2, 100),
      new OrderItem('PROD-002', 1, 50)
    ]);
    expect(order.getTotalPrice()).toBe(250);
  });

  it('should reject negative quantity', () => {
    expect(() => new OrderItem('PROD-001', -1, 100))
      .toThrow('Quantity must be positive');
  });
});
```

### 第二阶段：验证重构后行为一致

```typescript
describe('Order aggregate refactored', () => {
  it('should maintain total price calculation', () => {
    const order = Order.create([
      { productId: 'PROD-001', quantity: 2, unitPrice: 100 },
      { productId: 'PROD-002', quantity: 1, unitPrice: 50 }
    ]);
    expect(order.calculateTotal().value).toBe(250);
  });
});
```

---

## 分层架构约束

### 服务端分层

```
┌─────────────────────────────────────┐
│  应用层 (Application)               │
│  - 用例/命令/查询处理                │
│  - 依赖领域服务接口                  │
├─────────────────────────────────────┤
│  领域层 (Domain)                    │
│  - 实体、值对象、聚合根              │
│  - 领域服务接口                      │
│  - 领域事件                          │
├─────────────────────────────────────┤
│  基础设施层 (Infrastructure)        │
│  - 仓库实现                          │
│  - 外部服务适配器                    │
│  - 依赖应用层接口                    │
└─────────────────────────────────────┘
```

### 客户端分层

```
┌─────────────────────────────────────┐
│  表现层 (Presentation)               │
│  - React/Vue组件                    │
│  - 页面/路由                        │
├─────────────────────────────────────┤
│  应用层 (Application)               │
│  - Hooks/Composable                │
│  - ViewModel/状态管理               │
│  - 用例编排                        │
├─────────────────────────────────────┤
│  领域层 (Domain)                    │
│  - 实体/值对象（共享）              │
│  - 领域逻辑                         │
├─────────────────────────────────────┤
│  基础设施层 (Infrastructure)        │
│  - API客户端                        │
│  - 本地存储                         │
│  - 外部服务适配                     │
└─────────────────────────────────────┘
```

---

## 重构检查清单

### 通用检查
- [ ] 现有代码已编写测试用例
- [ ] 测试用例全部通过（建立基线）
- [ ] 每次只做一个重构改动
- [ ] 改动后立即运行测试
- [ ] 测试失败则回滚

### 充血模型检查
- [ ] 业务逻辑封装在领域对象内部？
- [ ] 领域对象有私有构造函数？
- [ ] 状态变更通过业务方法？
- [ ] 不变量在状态变更时维护？
- [ ] 领域服务仅用于跨聚合操作？

### 架构检查
- [ ] 依赖方向正确（基础设施依赖领域）？
- [ ] 无上帝类/超级方法？
- [ ] 测试覆盖核心业务逻辑？

---

## 参考

- 完整规范: [fullstack-ddd](../fullstack-ddd/SKILL.md)
- DDD 概念: [ddd-concepts.md](./ddd-concepts.md)
- 重构模式: [refactoring-patterns.md](./refactoring-patterns.md)
