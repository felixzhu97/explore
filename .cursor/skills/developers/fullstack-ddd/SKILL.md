---
name: fullstack-ddd
description: 融合苹果风格整洁架构、TDD测试驱动开发、BDD行为驱动开发、DDD领域驱动设计（充血模型）的全栈开发规范。涵盖分层架构、充血模型设计、单元测试、E2E测试、重构模式。当用户提及 Clean Architecture、DDD、TDD、BDD、充血模型、整洁架构、领域建模、重构时使用此技能。
---

# Clean + TDD + BDD + DDD 充血模型开发规范

> **核心理念**: 将业务逻辑封装在领域对象内部，通过测试驱动确保行为正确，用行为描述沟通业务与技术。

---

## 架构全景图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          全栈分层架构                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────┐      │
│   │                    Presentation Layer (展现层)                      │      │
│   │              Controllers / Pages / Components                     │      │
│   ├─────────────────────────────────────────────────────────────────┤      │
│   │                    Application Layer (应用层)                     │      │
│   │              Use Cases / Commands / Queries                      │      │
│   ├─────────────────────────────────────────────────────────────────┤      │
│   │                      Domain Layer (领域层) ★                     │      │
│   │         Entities / Value Objects / Aggregates / Domain Services   │      │
│   │                         ↑ 充血模型核心 ↑                          │      │
│   ├─────────────────────────────────────────────────────────────────┤      │
│   │                   Infrastructure Layer (基础设施层)                │      │
│   │              Repositories / External Services / Cache              │      │
│   └─────────────────────────────────────────────────────────────────┘      │
│                                                                             │
│   依赖规则: 外层依赖内层，内层无外部依赖                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 核心开发流程

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Clean + TDD + BDD + DDD 开发流程                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Phase 1: 需求理解                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  • 分析业务需求，提取领域概念                                       │       │
│   │  • 识别实体、值对象、聚合根                                         │       │
│   │  • 定义限界上下文                                                   │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                              ↓                                              │
│   Phase 2: BDD 行为建模                                                     │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  • 使用 Gherkin 描述业务场景 (Given-When-Then)                     │       │
│   │  • 与业务人员确认行为                                              │       │
│   │  • 产出 Feature 文件                                               │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                              ↓                                              │
│   Phase 3: TDD 单元测试                                                     │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  Red  → 编写失败的测试                                            │       │
│   │  Green → 编写最小实现通过测试                                      │       │
│   │  Refactor → 重构优化                                              │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                              ↓                                              │
│   Phase 4: 充血模型实现                                                     │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  • 实体封装业务逻辑                                               │       │
│   │  • 值对象封装不可变概念                                           │       │
│   │  • 聚合根维护一致性边界                                           │       │
│   │  • 领域服务处理跨聚合操作                                         │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                              ↓                                              │
│   Phase 5: 应用层编排                                                       │
│   ┌─────────────────────────────────────────────────────────────────┐       │
│   │  • 用例编排领域对象                                               │       │
│   │  • 依赖注入                                                      │       │
│   │  • DTO 转换                                                      │       │
│   └─────────────────────────────────────────────────────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 充血模型设计原则

### 核心概念：贫血 vs 充血

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        贫血模型 vs 充血模型                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  贫血模型 (Anemic) ❌                    充血模型 (Rich) ✅                  │
│  ────────────────────                    ────────────────────               │
│                                                                             │
│  class User {                            class User {                       │
│    id: string;                             private constructor(             │
│    name: string;                              private readonly _id: UserId,  │
│    email: string;                             private _name: string,        │
│    isActive: boolean;                         private _email: Email,         │
│  }                                          private _isActive: boolean,    │
│                                              ) {}                           │
│  class UserService {                          + create(): User      工厂    │
│    create() {...}                             + activate()          行为    │
│    activate() {...}                          + deactivate()        行为    │
│    deactivate() {...}                        + canActivate(): bool  判断    │
│  }                                         }                                │
│                                                                             │
│  问题:                               优势:                                   │
│  • 业务逻辑散落在服务层                 • 业务逻辑内聚在对象内                   │
│  • 对象只是数据容器                     • 对象维护自身不变量                    │
│  • 违反封装原则                         • 状态变更受业务规则约束                 │
│  • 难以测试和维护                       • 更易于测试和理解                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 充血模型设计要点

| 要点 | 说明 | 代码模式 |
|------|------|----------|
| **私有构造函数** | 强制通过工厂方法创建 | `private constructor(...)` |
| **私有字段** | 防止外部直接修改状态 | `private _name: string` |
| **工厂方法** | 控制对象创建逻辑，校验输入 | `static create(props): T` |
| **业务方法** | 封装状态变更和规则校验 | `activate(): void` |
| **只读访问器** | 提供受控的状态访问 | `get name(): string` |

### 充血模型代码模板

```typescript
// domain/entities/order.entity.ts

/**
 * 订单聚合根 - 充血模型
 * 
 * 设计原则:
 * - 封装所有订单相关业务逻辑
 * - 维护订单状态不变量
 * - 提供清晰的业务行为接口
 */
export class Order {
  // ============ 私有状态 ============
  
  private constructor(
    private readonly _id: OrderId,
    private _customerId: CustomerId,
    private _items: OrderItem[],
    private _status: OrderStatus,
    private _shippingAddress: Address,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  // ============ 工厂方法 ============

  static create(props: CreateOrderProps): Order {
    if (!props.items?.length) {
      throw OrderError.empty();
    }

    return new Order(
      OrderId.generate(),
      CustomerId.create(props.customerId),
      props.items.map(OrderItem.create),
      OrderStatus.Draft,
      Address.create(props.shippingAddress),
      new Date(),
      new Date(),
    );
  }

  static reconstitute(props: OrderReconstituteProps): Order {
    return new Order(
      OrderId.create(props.id),
      CustomerId.create(props.customerId),
      props.items.map(OrderItem.reconstitute),
      OrderStatus.fromString(props.status),
      Address.reconstitute(props.shippingAddress),
      props.createdAt,
      props.updatedAt,
    );
  }

  // ============ 业务行为 ============

  addItem(product: Product, quantity: number): void {
    if (!this._status.isDraft()) {
      throw OrderError.cannotModifyAfterConfirmation();
    }

    const existing = this._items.find(item => item.productId.equals(product.id));
    if (existing) {
      existing.increaseQuantity(quantity);
    } else {
      this._items.push(OrderItem.create({
        productId: product.id.value,
        productName: product.name,
        unitPrice: product.price,
        quantity,
      }));
    }
    this._touch();
  }

  confirm(): void {
    if (!this._status.isDraft()) throw OrderError.alreadyConfirmed();
    if (!this._items.length) throw OrderError.empty();
    if (this._shippingAddress.isEmpty()) throw OrderError.missingAddress();
    this._status = OrderStatus.Confirmed;
    this._touch();
  }

  cancel(reason: string): void {
    if (this._status.isShipped()) throw OrderError.cannotCancelAfterShipping();
    if (this._status.isCancelled()) throw OrderError.alreadyCancelled();
    this._status = OrderStatus.Cancelled;
    this._touch();
  }

  // ============ 业务计算 ============

  get totalAmount(): Money {
    return this._items.reduce((sum, item) => sum.add(item.subtotal), Money.zero());
  }

  get totalQuantity(): number {
    return this._items.reduce((sum, item) => sum + item.quantity.value, 0);
  }

  // ============ 业务判断 ============

  canBeModified(): boolean { return this._status.isDraft(); }
  canBeCancelled(): boolean { return !this._status.isShipped() && !this._status.isCancelled(); }

  // ============ 访问器 ============

  get id(): OrderId { return this._id; }
  get status(): OrderStatus { return this._status; }
  get items(): ReadonlyArray<OrderItem> { return [...this._items]; }

  private _touch(): void { this._updatedAt = new Date(); }
}
```

### 值对象充血模型

```typescript
// domain/value-objects/money.value-object.ts

/**
 * 货币值对象 - 不可变的充血模型
 */
export class Money {
  private constructor(
    private readonly _amount: number,
    private readonly _currency: Currency,
  ) {
    if (_amount < 0) throw ValueObjectError.negativeAmount(_amount);
  }

  static of(amount: number, currency: Currency = Currency.USD): Money {
    return new Money(Math.round(amount * 100) / 100, currency);
  }

  static zero(currency: Currency = Currency.USD): Money {
    return new Money(0, currency);
  }

  add(other: Money): Money {
    this._ensureSameCurrency(other);
    return new Money(this._amount + other._amount, this._currency);
  }

  subtract(other: Money): Money {
    this._ensureSameCurrency(other);
    return new Money(Math.max(0, this._amount - other._amount), this._currency);
  }

  multiply(factor: number): Money {
    return new Money(this._amount * factor, this._currency);
  }

  equals(other: Money): boolean {
    return other instanceof Money 
      && this._amount === other._amount 
      && this._currency.equals(other._currency);
  }

  isGreaterThan(other: Money): boolean {
    this._ensureSameCurrency(other);
    return this._amount > other._amount;
  }

  format(locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this._currency.code,
    }).format(this._amount);
  }

  get amount(): number { return this._amount; }
  get currency(): Currency { return this._currency; }

  private _ensureSameCurrency(other: Money): void {
    if (!this._currency.equals(other._currency)) {
      throw ValueObjectError.currencyMismatch(this._currency, other._currency);
    }
  }
}
```

### 领域服务（慎用）

```typescript
// domain/services/pricing.service.ts

/**
 * 领域服务 - 仅用于跨聚合操作
 */
export class PricingService {
  
  calculateFinalPrice(order: Order, promotions: Promotion[]): Money {
    const subtotal = order.totalAmount;
    
    const applicable = promotions
      .filter(p => p.isApplicable(order))
      .sort((a, b) => b.priority - a.priority);

    let discount = Money.zero();
    for (const promo of applicable) {
      discount = discount.add(promo.calculateDiscount(order));
    }

    return discount.isGreaterThan(subtotal) ? subtotal : subtotal.subtract(discount);
  }

  calculateShipping(order: Order, policy: ShippingPolicy): Money {
    if (order.totalAmount.isGreaterThan(policy.freeShippingThreshold)) {
      return Money.zero();
    }
    return policy.baseFee;
  }
}
```

---

## TDD 测试驱动开发

### 红-绿-重构循环

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TDD 红-绿-重构循环                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│      ┌──────────────┐                                                       │
│      │   Red ❌     │   编写一个失败的测试                                    │
│      │  红色指示灯    │   描述期望的行为                                       │
│      └──────┬───────┘                                                       │
│             ↓                                                               │
│      ┌──────────────┐                                                       │
│      │   Green ✅    │   编写最小代码使测试通过                                │
│      │  绿色指示灯    │   不考虑优化，只是通过                                 │
│      └──────┬───────┘                                                       │
│             ↓                                                               │
│      ┌──────────────┐                                                       │
│      │  Refactor 🔄 │   重构代码                                             │
│      │  重构优化     │   改进设计，消除重复                                    │
│      └──────┬───────┘                                                       │
│             ↓                                                               │
│      ┌──────────────┐                                                       │
│      │   继续下一测试 │                                                       │
│      └──────────────┘                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### AAA 模式

```typescript
describe('Order', () => {
  describe('confirm', () => {
    it('should transition to confirmed status', () => {
      // Arrange - 准备
      const order = Order.create({
        customerId: 'cust_123',
        items: [OrderItem.create({ productId: 'prod_1', quantity: 2, unitPrice: Money.of(100) })],
        shippingAddress: Address.create({ street: '123 Main St' }),
      });

      // Act - 执行
      order.confirm();

      // Assert - 断言
      expect(order.status).toBe(OrderStatus.Confirmed);
    });

    it('should reject confirmation when empty', () => {
      const order = Order.create({
        customerId: 'cust_123',
        items: [],
        shippingAddress: Address.create({ street: '123 Main St' }),
      });

      expect(() => order.confirm()).toThrow(OrderError.empty);
    });
  });
});
```

### 测试替身模式

| 类型 | 用途 | 示例 |
|------|------|------|
| **Dummy** | 仅填充参数 | `const emptyCallback = () => {}` |
| **Stub** | 提供预设响应 | `mockFn.mockReturnValue('stubbed')` |
| **Spy** | 记录调用 | `jest.spyOn(obj, 'method')` |
| **Mock** | 预设行为+验证 | `jest.fn().mockImplementation(...)` |
| **Fake** | 简化实现 | `new InMemoryDatabase()` |

### 测试数据工厂

```typescript
const ORDER_DOMAIN = {
  VALID: { id: 'ord_789xyz', amount: 99.99, quantity: 5 },
  BOUNDARY: { minQuantity: 1, maxQuantity: 10000, zeroAmount: 0 },
} as const;

const createOrder = (overrides: Partial<OrderProps> = {}): Order => {
  const defaults = {
    customerId: 'cust_default',
    items: [OrderItem.create({ productId: 'prod_1', quantity: 1, unitPrice: Money.of(10) })],
    shippingAddress: Address.create({ street: 'Default St' }),
  };
  return Order.create({ ...defaults, ...overrides });
};
```

---

## BDD 行为驱动开发

### Given-When-Then 模式

```gherkin
Feature: 订单管理

  Scenario: 用户确认订单
    Given 订单状态为"草稿"
    And 订单包含商品 "iPhone 15"
    And 订单有收货地址
    When 用户确认订单
    Then 订单状态应为"已确认"
    And 应发送确认邮件

  Scenario: 已发货订单不可取消
    Given 订单状态为"已发货"
    When 用户尝试取消订单
    Then 应显示错误"已发货订单不可取消"
    And 订单状态保持"已发货"
```

### BDD 与 DDD 映射

| BDD 元素 | DDD 元素 | 说明 |
|----------|----------|------|
| Feature | Aggregate | 业务能力边界 |
| Scenario | Use Case | 具体业务场景 |
| Given | Entity State | 实体状态准备 |
| When | Domain Method | 领域方法调用 |
| Then | Assertion + Event | 断言 + 领域事件 |

---

## 目录结构

```
src/
├── domain/                          # 领域层 - 充血模型核心
│   ├── entities/                    # 实体
│   ├── value-objects/               # 值对象
│   ├── aggregates/                  # 聚合根
│   ├── services/                    # 领域服务
│   ├── repositories/                # 仓储接口
│   └── events/                      # 领域事件
│
├── application/                      # 应用层 - 用例编排
│   ├── use-cases/                  # 用例
│   ├── commands/                    # 命令处理
│   ├── queries/                     # 查询处理
│   └── dto/                         # 数据传输对象
│
├── infrastructure/                  # 基础设施层
│   ├── repositories/               # 仓储实现
│   ├── persistence/                # 持久化
│   └── external/                   # 外部服务
│
└── presentation/                    # 展现层
    ├── controllers/                # 控制器
    ├── pages/                      # 页面组件
    └── dto/                         # 请求/响应 DTO
```

---

## 检查清单

### 充血模型检查
- [ ] 业务逻辑封装在领域对象内部？
- [ ] 领域对象是否有私有构造函数？
- [ ] 状态变更通过业务方法而非直接赋值？
- [ ] 不变量在状态变更时得到维护？
- [ ] 领域服务仅用于跨聚合操作？

### TDD 检查
- [ ] 先编写测试再实现？
- [ ] 核心业务逻辑测试覆盖？
- [ ] 使用 AAA 模式？
- [ ] 测试数据使用工厂函数？

### 架构检查
- [ ] 依赖方向正确（外→内）？
- [ ] 领域层无外部依赖？
- [ ] 仓储接口在领域层？

---

## E2E 测试

### Playwright 配置

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

### Page Object 模式

```typescript
export class LoginPage {
  constructor(private page: Page) {}

  get usernameInput() { return this.page.getByLabel(/username/i); }
  get passwordInput() { return this.page.getByLabel(/password/i); }
  get submitButton() { return this.page.getByRole('button', { name: /sign in/i }); }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

### 测试金字塔

```
        ▲
       ╱ ╲      E2E (10%) - 关键用户路径
      ╱───╲
     ╱ 集成 ╲    集成测试 (20%) - 组件协作
    ╱───────╲
   ╱  单元   ╲    单元测试 (70%) - 核心逻辑
  ╱───────────╲
```

---

## 重构工作流

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           重构工作流                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. 分析现有代码 → 识别DDD元素                                               │
│  2. 编写测试用例 → 捕获现有行为                                              │
│  3. 运行测试确保通过 → 建立基线                                              │
│  4. 小步重构代码 → 每次一个改动                                              │
│  5. 立即运行测试 → 验证行为不变                                              │
│  6. 重复步骤4-5 → 直至完成                                                  │
│  7. 清理代码 → 删除冗余、重命名                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 贫血→充血重构示例

```typescript
// ❌ 贫血模型 - 重构前
class User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

function activateUser(user: User): void {
  if (user.isActive) throw new Error('Already active');
  user.isActive = true;
}

// ✅ 充血模型 - 重构后
class User {
  private constructor(
    private readonly _id: string,
    private _name: string,
    private _email: Email,
    private _isActive: boolean,
  ) {}

  static create(props: { name: string; email: string }): User {
    return new User(generateId(), props.name, Email.create(props.email), false);
  }

  activate(): void {
    if (this._isActive) throw new Error('Already active');
    this._isActive = true;
  }
}
```

---

## 参考文档

| 文档 | 内容 |
|------|------|
| [ddd-concepts.md](./ddd-concepts.md) | DDD 核心概念参考 |
| [refactoring-patterns.md](./refactoring-patterns.md) | 重构模式参考 |
