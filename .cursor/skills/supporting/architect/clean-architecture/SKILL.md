---
name: clean-architecture
description: 苹果风格整洁架构开发规范。融合苹果产品设计理念（简洁、优雅、人性化）进行服务端代码编写，包含分层架构、依赖倒置、领域驱动设计（充血模型）。自动生成和维护架构文档、C4 模型 PUML 图。当用户要求使用整洁架构、分层架构、DDD、依赖注入、领域建模，或要求更新 API 文档、架构图、C4 模型、PUML 图时使用此技能。
---

> **完整规范**: 核心架构、充血模型、TDD、BDD 请查看 [fullstack-ddd](../fullstack-ddd/SKILL.md)

---

# 苹果风格整洁架构开发规范

> **核心理念**: "简单是终极的复杂。" — Steve Jobs

---

## 苹果设计理念

| 苹果设计原则 | 服务端实现 |
|-------------|-----------|
| 简洁 Simplicity | 最小接口设计，无冗余代码 |
| 优雅 Elegance | 流畅代码流程，统一命名风格 |
| 人性化 Humanity | 代码自解释，降低认知负担 |
| 专注 Focus | 单一职责，模块边界清晰 |
| 深度 Depth | 简单接口，强大内部实现 |

---

## 分层架构

```
┌─────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                       │
│              (Controllers, DTOs, API Contracts)                 │
├─────────────────────────────────────────────────────────────────┤
│                        Application Layer                         │
│                   (Use Cases, Orchestration)                     │
├─────────────────────────────────────────────────────────────────┤
│                          Domain Layer                            │
│              (Entities, Value Objects, Domain Logic)            │
├─────────────────────────────────────────────────────────────────┤
│                      Infrastructure Layer                        │
│              (Repositories, External Services, Cache)           │
└─────────────────────────────────────────────────────────────────┘

依赖规则: 外层依赖内层，内层无外部依赖
```

---

## 目录结构

```
src/
├── domain/                          # 领域层
│   ├── entities/                    # 实体
│   ├── value-objects/              # 值对象
│   ├── services/                   # 领域服务
│   ├── repositories/               # 仓储接口
│   └── events/                     # 领域事件
│
├── application/                     # 应用层
│   ├── use-cases/                 # 用例
│   ├── services/                   # 应用服务
│   └── dto/                        # 数据传输对象
│
├── infrastructure/                  # 基础设施层
│   ├── repositories/               # 仓储实现
│   ├── persistence/                # 持久化
│   └── cache/                      # 缓存层
│
└── presentation/                    # 展现层
    ├── controllers/                # 控制器
    ├── routes/                     # 路由
    ├── middleware/                 # 中间件
    └── dto/                        # 请求/响应 DTO
```

---

## 编码规范

### 命名艺术

```typescript
// ❌ 冗长且重复
class OrderManagementService {
  async getOrderByOrderId(orderId: string): Promise<OrderEntity | null> {
    const orderRepository = new OrderRepository();
    const order = await orderRepository.findOrderByOrderId(orderId);
    return order;
  }
}

// ✅ 简洁、专注、自解释
class OrderService {
  async get(orderId: OrderId): Promise<Order | null> {
    return this.orders.find(orderId);
  }
}
```

### 最小接口设计

```typescript
// ❌ 过度的接口抽象
interface IOrderRepositoryFinderSelector {
  findById(id: OrderId): Promise<Order | null>;
  findByCustomerId(customerId: CustomerId): Promise<Order[]>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
}

// ✅ 最小接口，按需扩展
interface OrderRepository {
  find(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
}
```

### 错误处理

```typescript
// ✅ 人类化的错误信息
class OrderError extends Error {
  static empty(): OrderError {
    return new OrderError('订单不能为空', 'ORDER_EMPTY');
  }

  static notFound(id: string): OrderError {
    return new OrderError(`找不到订单 ${id}`, 'ORDER_NOT_FOUND');
  }

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
  }
  readonly code: string;
}
```

---

## 应用层用例

```typescript
// application/use-cases/create-order.use-case.ts

export class CreateOrderUseCase {
  constructor(
    private orders: OrderRepository,
    private eventBus: EventBus,
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    // 1. 创建订单
    const order = Order.create({
      customerId: input.customerId,
      items: input.items,
    });

    // 2. 持久化
    await this.orders.save(order);

    // 3. 发布事件
    await this.eventBus.publish(OrderCreated.with(order));

    // 4. 返回结果
    return CreateOrderOutput.from(order);
  }
}
```

---

## 控制器

```typescript
// presentation/controllers/order.controller.ts

export class OrderController {
  constructor(private createOrder: CreateOrderUseCase) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const input = CreateOrderInput.fromRequest(req);
      const output = await this.createOrder.execute(input);

      res.status(201).json(ApiResponse.success(output));
    } catch (error) {
      res.status(error instanceof OrderError ? 400 : 500).json(
        ApiResponse.error(error),
      );
    }
  }
}
```

---

## C4 模型

### 容器架构图

```plantuml
@startuml System Architecture
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

title 容器架构图

Person(customer, "用户", "使用应用的客户")
System(api, "API 网关", "请求入口")
Container(orders, "订单服务", "Node.js", "处理订单业务逻辑")
ContainerDb(db, "主数据库", "PostgreSQL", "订单数据存储")

Rel(customer, api, "HTTPS")
Rel(api, orders, "REST")
Rel(orders, db, "SQL")

SHOW_LEGEND()
@enduml
```

---

## 文档更新触发器

| 触发场景 | 更新内容 | 优先级 |
|---------|---------|--------|
| 创建新用例 | 用例列表、流程图 | 高 |
| 新增 API | OpenAPI 文档 | 高 |
| 修改领域模型 | 实体图、状态机 | 高 |
| 新增外部依赖 | C1 上下文图 | 中 |

---

## 质量标准

### 代码审查清单

- [ ] **简洁性**: 每个函数不超过 20 行
- [ ] **单一职责**: 每个类只有一个改变的理由
- [ ] **命名**: 变量名自解释，无需注释
- [ ] **错误处理**: 错误信息人类可读
- [ ] **测试覆盖**: 核心业务逻辑 100% 覆盖

### 性能基准

| 操作 | 目标响应时间 | 告警阈值 |
|------|-------------|---------|
| 单一实体查询 | < 50ms | 100ms |
| 列表查询 (100条) | < 100ms | 200ms |
| 创建操作 | < 100ms | 200ms |
| 复杂聚合查询 | < 200ms | 500ms |

---

## 参考

- 完整规范: [fullstack-ddd](../fullstack-ddd/SKILL.md)
- DDD 概念: [ddd-concepts](./ddd-concepts.md)
