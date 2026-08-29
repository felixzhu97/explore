---
name: architecture-review
description: 对软件架构进行 Clean Architecture 分层审核，验证分层合规、依赖方向、依赖注入、防腐层设计，以及 BDD 行为驱动架构验证。当用户提及架构审核、架构评审、分层检查、架构合规、BDD 架构对齐时使用。
disable-model-invocation: true
---

# 架构审核 (Architecture Review + BDD)

作为专业架构审核员，对软件系统进行架构审查，验证 Clean Architecture 分层合规、依赖方向正确性，并提供改进建议。

## 审核流程

```
1. 理解系统结构 → 2. 验证分层结构 → 3. 检查依赖方向 → 4. 检查依赖注入 → 5. 检查防腐层 → 6. 汇总报告
```

## 问题严重等级

| 等级 | 标识 | 说明 |
|------|------|------|
| 严重 | 🔴 | 架构违规，必须重构，可能导致系统难以维护和演进 |
| 警告 | 🟡 | 架构异味，建议优化，影响长期可维护性 |
| 建议 | 🟢 | 可选改进，提升架构质量 |

---

## 1. Clean Architecture 分层检查 🏗️

### 分层职责边界

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│   (Controllers, API Handlers, UI Components)              │
│   职责: 处理请求/响应、参数校验、视图转换                  │
│   依赖: Application Layer                                  │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                        │
│   (Use Cases, Application Services, DTOs, Commands)        │
│   职责: 业务流程编排、事务边界、跨领域协调                │
│   依赖: Domain Layer                                       │
├─────────────────────────────────────────────────────────────┤
│                      Domain Layer                          │
│   (Entities, Business Rules, Domain Services)               │
│   职责: 业务规则、领域逻辑、不依赖任何外部框架             │
│   依赖: 无外部依赖                                        │
├─────────────────────────────────────────────────────────────┤
│                   Infrastructure Layer                      │
│   (Repositories, External Services, Frameworks)             │
│   职责: 技术实现、持久化、外部系统集成                     │
│   依赖: 实现 Domain Layer 定义的接口                       │
└─────────────────────────────────────────────────────────────┘
```

### 分层违规检查

```
🔴 跨层依赖
   风险: 上层直接依赖下层细节，违反依赖倒置原则
   检查: Domain 层是否引用了 Infrastructure、Repository 实现、框架类
   修复: 使用接口抽象，通过依赖注入传递

🔴 业务逻辑泄露
   风险: 业务规则散落在 Application 或 Infrastructure 层
   检查: Controller/Service 中是否有 if-else 判断业务规则
   修复: 将规则移至 Domain 实体或领域服务

🔴 基础设施泄露
   风险: Domain 层依赖数据库、缓存、第三方服务
   检查: 实体中是否使用 @Entity、@Column、@Document 等框架注解
   修复: 使用纯 POJO，与框架解耦

🟡 职责不清
   风险: Use Case 同时处理流程和业务规则
   检查: Application Service 是否包含领域知识
   修复: 区分"流程编排"和"业务规则"，后者归 Domain
```

### 依赖规则检查

```
□ 依赖方向是否从外层指向内层
□ Domain 层是否为最核心、最稳定的层
□ Infrastructure 是否依赖接口而非实现
□ Presentation 是否只调用 Application 层
□ 是否存在反向依赖（Infrastructure → Domain）
```

---

## 2. 依赖注入检查 💉

```
🔴 构造函数注入缺失
   风险: 类内部直接实例化依赖，违反依赖倒置
   检查: Controller/Service 是否直接 new 依赖
   修复: 通过构造函数注入依赖

🔴 基础设施直接注入
   风险: Domain/Application 层直接依赖 Infrastructure 实现
   检查: 依赖类型是否为接口
   修复: 依赖接口，基础设施实现接口

🟡 服务定位器反模式
   风险: 使用全局 ServiceLocator 获取依赖
   检查: 是否有静态 ServiceLocator 或全局变量
   修复: 使用构造函数或方法注入

🟡 循环依赖
   风险: A 依赖 B，B 依赖 A
   检查: 依赖图是否存在循环
   修复: 引入中介接口或事件解耦
```

---

## 3. 防腐层检查 🛡️

```
🟡 防腐层缺失
   风险: 外部系统模型直接渗透到领域
   检查: 是否有 Adapter/Gateway 类进行转换
   修复: 引入防腐层隔离外部模型

🟡 防腐层过度转换
   风险: 防腐层做了过多业务逻辑
   检查: 防腐层是否只做模型转换
   修复: 防腐层只做协议和模型转换

🟡 外部模型泄漏
   风险: Domain 层直接使用外部 DTO/Entity
   检查: 是否有独立的领域表示
   修复: 在防腐层转换为领域模型
```

---

## 4. 仓储抽象检查 📦

```
🔴 仓储实现泄漏
   风险: Application 层直接依赖仓储实现类
   检查: 是否使用接口（IOrderRepository）而非实现（SqlOrderRepository）
   修复: 定义仓储接口在 Domain 层，由 Infrastructure 实现

🔴 仓储接口定义位置错误
   风险: 仓储接口定义在 Infrastructure 层
   检查: 仓储接口是否在 Domain 层
   修复: 接口属于领域，由基础设施实现

🟡 缺少仓储抽象
   风险: 直接在应用层使用 ORM 或 SQL
   检查: 是否有独立的 Repository 接口
   修复: 引入仓储抽象层
```

---

## 5. BDD 行为驱动架构审核 🔍

### BDD 与架构对齐检查

```
┌─────────────────────────────────────────────────────────────┐
│           BDD Feature ↔ 架构组件 映射关系                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Gherkin Feature     →    Architecture Layer               │
│  ─────────────────────────────────────────────────────────  │
│  登录功能           →    AuthModule / AuthService           │
│  购物车功能         →    CartAggregate / CartService        │
│  订单管理           →    OrderAggregate / OrderService      │
│  支付流程           →    PaymentService                    │
│  商品目录           →    ProductModule / CatalogService     │
│                                                             │
│  Step Definition     →    Use Case / Application Service    │
│  ─────────────────────────────────────────────────────────  │
│  Given (准备状态)     →    Repository 查询                 │
│  When (执行操作)      →    Application Service             │
│  Then (验证结果)      →    Domain Event + Assert           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### BDD 场景 → DDD 聚合审核

```
🟡 Feature 与 Aggregate 边界不一致
   风险: 一个 Feature 跨越多个 Aggregate，增加耦合
   检查: 每个 Feature 是否对应单一 Aggregate
   修复: 拆分 Feature 或重新设计 Aggregate 边界

🟡 Step 实现绕过领域逻辑
   风险: Step Definition 直接操作数据库/基础设施
   检查: When 步骤是否通过 Application Service 执行
   修复: 遵循分层架构，通过用例执行

🟡 Scenario 状态泄露到步骤
   风险: Given 中直接设置 Aggregate 内部状态
   检查: Given 是否使用公开的领域行为而非直接修改
   修复: 使用 Factory/Builder 或领域服务创建实体
```

### BDD 架构分层检查

```
┌─────────────────────────────────────────────────────────────┐
│           BDD + Clean Architecture 分层映射                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Presentation Layer                                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  UI Components    API Controllers    BDD Step Impl │  │
│  └─────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  Application Layer (Use Cases)                              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  BDD Step 调用 → Use Case 执行 → 领域行为           │  │
│  └─────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  Domain Layer (Entities, Services, Events)                 │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  业务规则    领域事件    聚合根行为                 │  │
│  └─────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  Infrastructure Layer (Repositories, External Services)     │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Repository 实现    防腐层    外部服务适配          │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Step Definition 架构合规检查

```typescript
// ❌ 不合规: Step 直接操作基础设施
defineStep('用户登录', async function (this: World) {
  // 直接访问数据库 - 违反分层
  const db = new DatabaseConnection();
  const user = await db.query('SELECT * FROM users WHERE ...');
  // ...
});

// ✅ 合规: Step 通过 Application Service
defineStep('用户登录', async function (this: World) {
  // 通过用例执行 - 遵循分层
  const authUseCase = new AuthenticateUserUseCase(
    this.userRepository,
    this.passwordHasher
  );
  this.authResult = await authUseCase.execute({
    username: this.context.username,
    password: this.context.password,
  });
});
```

### BDD 领域事件审核

```
🟡 领域事件未在 Step 中发布
   风险: BDD 场景无法验证领域事件触发
   检查: When 步骤后是否验证领域事件
   修复: 在 Then 中添加事件验证

🟡 事件与 Scenario 脱节
   风险: 领域事件改变了聚合状态，但 Scenario 未覆盖
   检查: 每个修改状态的事件是否有对应验证
   修复: 为事件触发的状态变更添加 Then 步骤

示例 - 合规的领域事件场景:
```gherkin
Scenario: 订单确认后发送通知
  Given 订单 "ORD-001" 状态为 "待支付"
  When 用户完成支付
  Then 订单状态应为 "已支付"
  And 应发布 "OrderPaid" 领域事件
  And 用户应收到支付确认邮件
```
```

### BDD 集成测试与架构

```
🟡 BDD 测试跨越太多层次
   风险: 端到端测试耦合过紧，难以定位问题
   检查: 是否有分层测试策略
   修复: 区分组件测试、集成测试、端到端测试

分层测试策略:
┌─────────────────────────────────────────────────────────────┐
│  端到端测试 (E2E)                                           │
│  - 使用真实数据库、外部服务                                  │
│  - 验证完整的用户旅程                                        │
│  - 场景: 完整购物流程                                        │
├─────────────────────────────────────────────────────────────┤
│  集成测试 (Integration)                                     │
│  - 使用 Testcontainers 模拟数据库                            │
│  - Mock 外部服务                                            │
│  - 验证应用服务 + 仓储 + 领域逻辑                           │
├─────────────────────────────────────────────────────────────┤
│  组件测试 (Component)                                       │
│  - Mock 仓储接口                                            │
│  - 测试单个 Aggregate 的行为                                │
│  - 快速执行                                                 │
└─────────────────────────────────────────────────────────────┘
```

### BDD 测试与架构度量

| 指标 | 描述 | 检查标准 |
|------|------|----------|
| Feature-Aggregate 映射率 | 有对应 Aggregate 的 Feature 比例 | ≥ 80% |
| Step-UseCase 映射率 | 通过 Use Case 执行的 Step 比例 | ≥ 90% |
| 领域事件覆盖率 | 有事件验证的 Scenario 比例 | ≥ 60% |
| 防腐层使用率 | 使用防腐层隔离外部系统的比例 | 100% |

### BDD 架构违规示例

```
🔴 Scenario 直接测试基础设施
   // Step Definition
   defineStep('订单已创建', function(this: World) {
     // 直接插入数据库 - 违反依赖规则
     await this.db.execute(`
       INSERT INTO orders (id, status) VALUES ('ORD-001', 'created')
     `);
   });
   
   修复: 使用领域服务或 Factory 创建订单

🔴 Given 步骤泄露内部状态
   // Step Definition
   defineStep('用户余额为 1000', function(this: World) {
     // 直接修改余额字段 - 违反封装
     this.user._balance = 1000; // 私有属性访问
   });
   
   修复: 使用领域行为 "user.deposit(1000)" 或 Factory

🔴 When 步骤包含业务规则
   // Step Definition
   defineStep('应用折扣码', async function(this: World) {
     // 折扣计算逻辑放在 Step 中 - 违反分层
     const discount = this.cart.total > 100 ? 0.1 : 0;
     this.cart.total *= (1 - discount);
   });
   
   修复: 将逻辑移至领域服务 DiscountService
```

### BDD 架构审核报告扩展

```
## 架构审核报告 - BDD 专项

### BDD 架构对齐情况
□ Feature-Aggregate 映射: [N/N] ([占比])
□ Step-UseCase 遵循率: [N/N] ([占比])
□ 领域事件覆盖: [N/N] ([占比])

### 🔴 BDD 架构问题

1. **[Step 绕过领域逻辑]**
   - 位置: [step-definitions/*.ts]
   - 问题: [描述]
   - 风险: 领域逻辑分散，难以维护
   - 建议: 通过 Application Service 执行

2. **[Given 泄露内部状态]**
   - 位置: [step-definitions/*.ts]
   - 问题: [描述]
   - 风险: 违反封装，测试脆弱
   - 建议: 使用 Factory 或领域行为

### 架构改进建议
1. [第一阶段: 重构 Step Definitions]
2. [第二阶段: 添加领域事件验证]
3. [第三阶段: 完善 Feature-Aggregate 映射]
```

---

## 审核报告格式

```
## 架构审核报告

### 架构概览
□ 分层合规: [合规/部分合规/违规]
□ 依赖方向: [正确/部分正确/错误]
□ 依赖注入: [规范/部分规范/违规]

### 总体评价
[对架构的整体评价]

---

### 🔴 严重问题 (必须重构)

1. **[问题描述]**
   - 位置: [模块/层:文件]
   - 分类: [分层/依赖/防腐层/仓储]
   - 风险: [架构影响说明]
   - 当前状态: [代码如何违反原则]
   - 建议: [重构方案]

---

### 🟡 警告 (建议优化)

1. **[问题描述]**
   - 位置: [模块/层:文件]
   - 分类: [分层/依赖/防腐层/仓储]
   - 风险: [长期影响说明]
   - 建议: [优化方案]

---

### 🟢 建议改进

1. **[改进建议]**
   - 位置: [模块/层:文件]
   - 原因: [为什么值得改进]
   - 建议: [具体方案]

---

### ✅ 架构亮点
- [做得好的地方]

---

### 重构路线图
1. [第一阶段: 解决的问题和改动]
2. [第二阶段: ...]
3. [第三阶段: ...]

### 总结
[总结性建议和后续行动项]
```

---

## Clean Architecture 速查表

```
□ 分层清晰: Presentation → Application → Domain → Infrastructure
□ 依赖倒置: 上层依赖抽象，不依赖具体实现
□ 接口隔离: Domain 层定义接口，Infrastructure 实现
□ 防腐层: 隔离外部系统模型转换
□ 业务逻辑内聚: Domain 层包含核心业务规则
□ 无循环依赖: 依赖图无环
□ 纯 POJO: Domain 层不依赖框架
```

---

## 执行要点

1. **架构视角**: 从整体架构而非具体实现细节评估
2. **原则导向**: 基于 Clean Architecture 原则判断
3. **务实评估**: 考虑项目规模、团队经验、交付压力
4. **渐进改进**: 提供可执行的阶段性重构计划
5. **风险量化**: 说明架构问题对可维护性、测试性的影响
