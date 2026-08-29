# 整洁架构参考手册

## TypeScript 项目示例结构

### 通用后端结构

```
src/
├── domain/
│   ├── entities/
│   │   ├── user.entity.ts
│   │   └── order.entity.ts
│   ├── value-objects/
│   │   ├── email.vo.ts
│   │   └── money.vo.ts
│   ├── services/
│   │   └── pricing.domain-service.ts
│   ├── repositories/
│   │   ├── user.repository.interface.ts
│   │   └── order.repository.interface.ts
│   └── events/
│       └── order-created.event.ts
│
├── application/
│   ├── use-cases/
│   │   ├── user/
│   │   │   ├── create-user.use-case.ts
│   │   │   └── get-user.use-case.ts
│   │   └── order/
│   │       ├── create-order.use-case.ts
│   │       └── cancel-order.use-case.ts
│   ├── services/
│   │   └── notification.service.ts
│   └── dto/
│       ├── user.dto.ts
│       └── order.dto.ts
│
├── infrastructure/
│   ├── persistence/
│   │   ├── typeorm/
│   │   │   ├── typeorm-config.ts
│   │   │   └── repositories/
│   │   └── repositories/
│   │       ├── user.repository.impl.ts
│   │       └── order.repository.impl.ts
│   ├── external/
│   │   ├── payment/
│   │   │   └── stripe.service.ts
│   │   └── email/
│   │       └── sendgrid.service.ts
│   └── ioc/
│       └── container.ts
│
└── presentation/
    ├── http/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── routes/
    │   └── dto/
    └── websocket/
```

### React 前端结构

```
src/
├── domain/                    # 共享领域模型
│   ├── entities/
│   └── types/
│
├── application/               # 应用层
│   ├── hooks/                # 自定义 Hooks
│   ├── contexts/             # React Context
│   ├── services/             # 应用服务
│   └── store/               # 状态管理 (Redux/Zustand)
│
├── infrastructure/            # 基础设施
│   ├── api/                 # API 客户端
│   ├── storage/             # LocalStorage/IndexedDB
│   └── analytics/           # 埋点服务
│
└── presentation/             # 展示层
    ├── components/           # 通用组件
    ├── pages/               # 页面组件
    ├── layouts/              # 布局组件
    └── styles/              # 样式
```

## 依赖注入容器示例

```typescript
// infrastructure/ioc/container.ts
import { Container } from 'inversify';
import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { PostgresOrderRepository } from '../persistence/repositories/order.repository.impl';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';

const container = new Container();

// Infrastructure
container.bind<IOrderRepository>(TYPES.IOrderRepository)
  .to(PostgresOrderRepository);

// Use Cases
container.bind<CreateOrderUseCase>(TYPES.CreateOrderUseCase)
  .to(CreateOrderUseCase);

export { container };
```

## 实体关系图 (ERD) 示例

```ascii
┌─────────────────┐       ┌─────────────────┐
│     Customer     │       │      Order       │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │──┐    │ id (PK)         │
│ name            │  │    │ customer_id (FK)│←─┘
│ email           │  └───→│ status          │
│ created_at      │       │ total_amount    │
└─────────────────┘       │ created_at      │
                          └────────┬────────┘
                                   │
                          ┌────────┴────────┐
                          │   OrderItem      │
                          ├─────────────────┤
                          │ id (PK)         │
                          │ order_id (FK)   │←─┐
                          │ product_id (FK) │  │
                          │ quantity        │  │
                          │ price           │  │
                          └─────────────────┘  │
                                                 │
                          ┌─────────────────┐   │
                          │    Product      │───┘
                          ├─────────────────┤
                          │ id (PK)         │
                          │ name            │
                          │ description     │
                          │ price           │
                          └─────────────────┘
```

## API 文档模板

### 接口规范

```yaml
openapi: 3.0.3
info:
  title: Order Service API
  version: 1.0.0

paths:
  /orders:
    post:
      summary: 创建订单
      tags: [Orders]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
      responses:
        '201':
          description: 订单创建成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderResponse'

components:
  schemas:
    CreateOrderRequest:
      type: object
      required: [customerId, items]
      properties:
        customerId:
          type: string
          format: uuid
        items:
          type: array
          items:
            $ref: '#/components/schemas/OrderItem'

    OrderResponse:
      type: object
      properties:
        orderId:
          type: string
        status:
          type: string
          enum: [PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED]
        total:
          type: number
        createdAt:
          type: string
          format: date-time
```

## 架构决策记录 (ADR)

### ADR-001: 选择 PostgreSQL 作为主数据库

**状态**: 已接受

**背景**: 需要为订单系统选择数据库

**决策**: 使用 PostgreSQL

**理由**:
- 支持复杂查询和事务
- 良好的 JSON 支持
- 成熟的生态系统

**后果**:
- 需要管理数据库迁移
- 学习 PostgreSQL 特性

### ADR-002: 使用 TypeScript 作为主要语言

**状态**: 已接受

**决策**: 使用 TypeScript 替代 JavaScript

**理由**:
- 编译时类型检查减少运行时错误
- 更好的 IDE 支持
- 便于重构
```

## 测试策略

### 分层测试

```typescript
// Domain 层测试 - 无外部依赖
describe('Order Entity', () => {
  it('should create order with valid items', () => {
    const order = Order.create({
      customerId: 'customer-1',
      items: [{ productId: 'p1', quantity: 2, price: Money.create(10) }],
    });
    expect(order.total).toEqual(Money.create(20));
  });

  it('should throw when confirming empty order', () => {
    const order = Order.create({ customerId: 'c1', items: [] });
    expect(() => order.confirm()).toThrow(DomainException);
  });
});

// Application 层测试 - Mock Repository
describe('CreateOrderUseCase', () => {
  it('should create order and save to repository', async () => {
    const mockRepo = { save: jest.fn() };
    const useCase = new CreateOrderUseCase(mockRepo);

    await useCase.execute({ customerId: 'c1', items: [] });

    expect(mockRepo.save).toHaveBeenCalled();
  });
});
```

## 文档更新检查清单

### 新增功能后

```
Task Progress:
- [ ] 更新 ARCHITECTURE.md（架构图）
- [ ] 更新 DOMAIN.md（实体、值对象）
- [ ] 更新 USE_CASES.md（用例流程）
- [ ] 更新 API.md（接口文档）
- [ ] 更新 README.md（快速开始）
```

### 代码审查时

- [ ] Domain 层是否有框架依赖？
- [ ] 是否遵循依赖倒置原则？
- [ ] Entity 是否有完整的业务规则？
- [ ] 用例是否独立且可测试？
- [ ] 文档是否与代码同步？
