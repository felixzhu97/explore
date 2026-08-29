# 整洁架构示例

## 示例 1: 用户管理模块

### 目录结构

```
src/
├── domain/
│   ├── entities/
│   │   └── user.entity.ts
│   ├── value-objects/
│   │   └── email.vo.ts
│   ├── repositories/
│   │   └── user.repository.interface.ts
│   └── services/
│       └── user.domain-service.ts
│
├── application/
│   ├── use-cases/
│   │   ├── create-user.use-case.ts
│   │   ├── update-user.use-case.ts
│   │   └── delete-user.use-case.ts
│   └── dto/
│       └── user.dto.ts
│
├── infrastructure/
│   ├── persistence/
│   │   └── user.repository.impl.ts
│   └── services/
│       └── email.service.ts
│
└── presentation/
    └── controllers/
        └── user.controller.ts
```

### Domain 实体

```typescript
// domain/entities/user.entity.ts
export type UserRole = 'admin' | 'user' | 'guest';

export class User {
  private constructor(
    private readonly _id: string,
    private _email: Email,
    private _name: string,
    private readonly _role: UserRole,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
    private _deletedAt: Date | null,
  ) {}

  static create(props: { email: string; name: string; role?: UserRole }): User {
    const now = new Date();
    return new User(
      crypto.randomUUID(),
      Email.create(props.email),
      props.name,
      props.role ?? 'user',
      now,
      now,
      null,
    );
  }

  static reconstitute(data: ReconstituteData): User {
    return new User(
      data.id,
      Email.create(data.email),
      data.name,
      data.role,
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  updateEmail(newEmail: string): void {
    if (this._deletedAt) {
      throw new DomainException('Cannot update deleted user');
    }
    this._email = Email.create(newEmail);
    this._updatedAt = new Date();
  }

  delete(): void {
    if (this._deletedAt) {
      throw new DomainException('User already deleted');
    }
    this._deletedAt = new Date();
  }

  isDeleted(): boolean {
    return this._deletedAt !== null;
  }

  // Getters
  get id(): string { return this._id; }
  get email(): Email { return this._email; }
  get name(): string { return this._name; }
  get role(): UserRole { return this._role; }
}
```

### 用例

```typescript
// application/use-cases/create-user.use-case.ts
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly emailService: IEmailService,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    // 检查邮箱是否已存在
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new ApplicationException('Email already registered');
    }

    // 创建用户
    const user = User.create({
      email: input.email,
      name: input.name,
      role: input.role,
    });

    // 保存
    await this.userRepository.save(user);

    // 发送欢迎邮件（异步，不阻塞）
    this.emailService.sendWelcome(user.email.value, user.name).catch(console.error);

    return new CreateUserOutput({
      id: user.id,
      email: user.email.value,
      name: user.name,
      role: user.role,
      createdAt: user['_createdAt'],
    });
  }
}
```

---

## 示例 2: 订单处理流程

### 完整流程

```ascii
┌─────────────────────────────────────────────────────────────────┐
│                      订单创建流程                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Controller ──→ CreateOrderUseCase ──→ Order Domain Service     │
│       │                │                      │                  │
│       │                │                      ↓                  │
│       │                │              [验证业务规则]             │
│       │                │                      │                  │
│       │                ↓                      ↓                  │
│       │         [保存 Order]           [计算总价]                │
│       │                │                      │                  │
│       │                ↓                      │                  │
│       │         [发布领域事件]                │                  │
│       │                │                      │                  │
│       │                ↓                      │                  │
│       │    ┌───────────────────────┐        │                  │
│       │    │ OrderCreatedEvent      │        │                  │
│       │    │ - orderId              │        │                  │
│       │    │ - customerId          │        │                  │
│       │    │ - totalAmount         │        │                  │
│       │    └───────────────────────┘        │                  │
│       │                │                      │                  │
│       │                ↓                      │                  │
│       │    ┌───────────────────────┐        │                  │
│       │    │ Event Handlers        │        │                  │
│       │    │ - SendEmailHandler   │        │                  │
│       │    │ - UpdateInventory    │        │                  │
│       │    │ - NotifyWarehouse    │        │                  │
│       │    └───────────────────────┘        │                  │
│       │                                                       │
│       ↓                                                       │
│  Response                                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 领域服务

```typescript
// domain/services/pricing.domain-service.ts
export class PricingService {
  calculateOrderTotal(items: OrderItem[]): Money {
    const subtotals = items.map(item => item.subtotal);
    return subtotals.reduce((sum, current) => sum.add(current), Money.ZERO);
  }

  applyDiscount(total: Money, discountCode?: string): Money {
    if (!discountCode) return total;

    const discounts: Record<string, number> = {
      'SAVE10': 0.10,
      'SAVE20': 0.20,
      'VIP': 0.15,
    };

    const rate = discounts[discountCode] ?? 0;
    return total.multiply(1 - rate);
  }

  calculateTax(subtotal: Money, taxRate: number = 0.08): Money {
    return subtotal.multiply(taxRate);
  }
}
```

---

## 示例 3: 电商系统完整架构

```
whatsfeed/
├── src/
│   ├── domain/                           # 核心业务（无依赖）
│   │   ├── entities/
│   │   │   ├── user.entity.ts
│   │   │   ├── product.entity.ts
│   │   │   ├── order.entity.ts
│   │   │   └── cart.entity.ts
│   │   ├── value-objects/
│   │   │   ├── email.vo.ts
│   │   │   ├── money.vo.ts
│   │   │   ├── address.vo.ts
│   │   │   └── phone.vo.ts
│   │   ├── services/
│   │   │   ├── pricing.domain-service.ts
│   │   │   └── inventory.domain-service.ts
│   │   ├── repositories/                 # 接口定义
│   │   │   ├── user.repository.interface.ts
│   │   │   ├── product.repository.interface.ts
│   │   │   └── order.repository.interface.ts
│   │   └── events/
│   │       ├── order-created.event.ts
│   │       └── payment-completed.event.ts
│   │
│   ├── application/                      # 用例编排
│   │   ├── use-cases/
│   │   │   ├── auth/
│   │   │   │   ├── login.use-case.ts
│   │   │   │   └── register.use-case.ts
│   │   │   ├── product/
│   │   │   │   ├── create-product.use-case.ts
│   │   │   │   └── search-products.use-case.ts
│   │   │   └── order/
│   │   │       ├── create-order.use-case.ts
│   │   │       ├── cancel-order.use-case.ts
│   │   │       └── track-order.use-case.ts
│   │   ├── services/
│   │   │   └── notification.service.ts
│   │   ├── dto/
│   │   │   ├── auth.dto.ts
│   │   │   ├── product.dto.ts
│   │   │   └── order.dto.ts
│   │   └── interfaces/
│   │       ├── email.interface.ts
│   │       └── payment.interface.ts
│   │
│   ├── infrastructure/                    # 技术实现
│   │   ├── persistence/
│   │   │   ├── typeorm/
│   │   │   │   ├── entities/
│   │   │   │   └── migrations/
│   │   │   └── repositories/
│   │   │       ├── user.repository.impl.ts
│   │   │       ├── product.repository.impl.ts
│   │   │       └── order.repository.impl.ts
│   │   ├── external/
│   │   │   ├── payment/
│   │   │   │   └── stripe.service.ts
│   │   │   ├── email/
│   │   │   │   └── sendgrid.service.ts
│   │   │   └── storage/
│   │   │       └── s3.service.ts
│   │   └── ioc/
│   │       └── container.ts
│   │
│   └── presentation/                     # 接口适配
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       └── dto/
│
├── tests/
│   ├── domain/                           # 领域层测试
│   ├── application/                      # 用例测试
│   └── integration/                      # 集成测试
│
├── docs/                                 # 文档
│   ├── architecture/
│   │   ├── ARCHITECTURE.md
│   │   ├── DOMAIN.md
│   │   └── USE_CASES.md
│   └── api/
│       └── OPENAPI.yaml
│
└── README.md
```

---

## 示例 4: 文档自动更新脚本

```bash
#!/bin/bash
# scripts/update-docs.sh

echo "🔄 Updating architecture documentation..."

# 提取实体
echo "## 实体" > docs/architecture/DOMAIN.md
echo "" >> docs/architecture/DOMAIN.md
for entity in src/domain/entities/*.ts; do
  name=$(basename "$entity" .entity.ts)
  echo "### $name" >> docs/architecture/DOMAIN.md
  echo '```' >> docs/architecture/DOMAIN.md
  head -30 "$entity" >> docs/architecture/DOMAIN.md
  echo '```' >> docs/architecture/DOMAIN.md
  echo "" >> docs/architecture/DOMAIN.md
done

# 提取用例
echo "## 用例" > docs/architecture/USE_CASES.md
echo "" >> docs/architecture/USE_CASES.md
for usecase in src/application/use-cases/**/*.ts; do
  name=$(basename "$usecase" .use-case.ts)
  echo "### $name" >> docs/architecture/USE_CASES.md
  grep -A5 "execute" "$usecase" | head -10 >> docs/architecture/USE_CASES.md
  echo "" >> docs/architecture/USE_CASES.md
done

echo "✅ Documentation updated!"
```
