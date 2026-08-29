# DDD 核心概念详解

## 战略设计

### 限界上下文 (Bounded Context)
- 每个上下文有明确的边界
- 上下文之间通过防腐层通信
- 识别业务职责的自然分界

### 上下文映射
- 共享内核 (Shared Kernel)
- 客户-供应商 (Customer-Supplier)
- 防腐层 (Anti-Corruption Layer)
- 开放主机服务 (Open Host Service)

---

## 战术设计

### 服务端实体 (Server Entity)

```typescript
class Order {
  private _id: OrderId;
  private _items: OrderItem[];
  private _status: OrderStatus;

  constructor(id: OrderId, items: OrderItem[], status: OrderStatus) {
    this._id = id;
    this._items = items;
    this._status = status;
  }

  get id(): OrderId { return this._id; }
  get status(): OrderStatus { return this._status; }

  confirm(): void {
    if (this._status !== OrderStatus.Draft) {
      throw new DomainException('Only draft orders can be confirmed');
    }
    this._status = OrderStatus.Confirmed;
  }
}
```

**特征**：
- 唯一标识符
- 连续性生命周期
- 可变状态
- 实体间引用通过ID

---

### 值对象 (Value Object)

```typescript
class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: Currency
  ) {}

  static create(amount: number, currency: string): Money {
    if (amount < 0) throw new DomainException('Amount cannot be negative');
    return new Money(amount, new Currency(currency));
  }

  add(other: Money): Money {
    if (!this.currency.equals(other.currency)) {
      throw new DomainException('Currency mismatch');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }
}
```

**特征**：
- 无唯一标识
- 不可变
- 可替换
- 拥有完整的属性集
- 可比较

---

### 聚合根 (Aggregate)

```typescript
class OrderAggregate {
  private constructor(
    private _id: OrderId,
    private _customerId: CustomerId,
    private _items: OrderItem[],
    private _status: OrderStatus,
    private _version: number
  ) {}

  static create(customerId: CustomerId, items: OrderItem[]): OrderAggregate {
    const order = new OrderAggregate(
      OrderId.generate(),
      customerId,
      items,
      OrderStatus.Draft,
      0
    );
    order.addDomainEvent(new OrderCreatedEvent(order));
    return order;
  }

  addItem(item: OrderItem): void {
    if (this._status !== OrderStatus.Draft) {
      throw new DomainException('Cannot add items to non-draft order');
    }
    this._items.push(item);
  }

  confirm(): void {
    if (this._items.length === 0) {
      throw new DomainException('Cannot confirm empty order');
    }
    this._status = OrderStatus.Confirmed;
    this.addDomainEvent(new OrderConfirmedEvent(this._id));
  }

  getTotal(): Money {
    return this._items.reduce(
      (sum, item) => sum.add(item.subtotal),
      Money.zero('USD')
    );
  }
}
```

**规则**：
- 聚合内所有一致性规则由聚合根维护
- 外部对象只能通过聚合根引用聚合内对象
- 事务边界不超过聚合边界
- 聚合应尽量小

---

### 领域服务 (Domain Service)

```typescript
interface IPricingService {
  calculatePrice(items: CartItem[], customerTier: CustomerTier): Money;
}

class PricingService implements IPricingService {
  calculatePrice(items: CartItem[], customerTier: CustomerTier): Money {
    const subtotal = items.reduce((sum, item) => sum.add(item.price), Money.zero('USD'));
    
    const discountRate = customerTier === CustomerTier.Premium ? 0.15 : 
                         customerTier === CustomerTier.VIP ? 0.10 : 0;
    
    const discount = subtotal.multiply(discountRate);
    return subtotal.subtract(discount);
  }
}
```

**使用场景**：
- 领域逻辑涉及多个聚合
- 不属于任何单一实体
- 需要保持无状态

---

### 领域事件 (Domain Event)

```typescript
class OrderConfirmedEvent {
  readonly occurredOn: Date;
  
  constructor(
    public readonly orderId: OrderId,
    public readonly customerId: CustomerId,
    public readonly totalAmount: Money
  ) {
    this.occurredOn = new Date();
  }
}

// 在聚合中使用
class OrderAggregate {
  private _domainEvents: DomainEvent[] = [];

  confirm(): void {
    // ...确认逻辑
    this.addDomainEvent(new OrderConfirmedEvent(this._id, this._customerId, this.getTotal()));
  }

  private addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }
}
```

---

### 工厂 (Factory)

```typescript
interface IOrderFactory {
  createDraftOrder(customerId: CustomerId): OrderAggregate;
  createFromQuote(quote: Quote): OrderAggregate;
}

class OrderFactory implements IOrderFactory {
  createDraftOrder(customerId: CustomerId): OrderAggregate {
    return OrderAggregate.create(customerId, []);
  }

  createFromQuote(quote: Quote): OrderAggregate {
    const items = quote.items.map(item => new OrderItem(
      item.productId,
      item.quantity,
      item.unitPrice
    ));
    return OrderAggregate.create(quote.customerId, items);
  }
}
```

---

### 仓库接口 (Repository)

```typescript
// 领域层 - 只定义接口
interface IOrderRepository {
  findById(id: OrderId): Promise<OrderAggregate | null>;
  findByCustomerId(customerId: CustomerId): Promise<OrderAggregate[]>;
  save(order: OrderAggregate): Promise<void>;
  delete(id: OrderId): Promise<void>;
}

// 基础设施层 - 实现
class OrderRepository implements IOrderRepository {
  constructor(private db: DatabaseConnection) {}

  async findById(id: OrderId): Promise<OrderAggregate | null> {
    const row = await this.db.query('SELECT * FROM orders WHERE id = $1', [id.value]);
    if (!row) return null;
    return this.mapToAggregate(row);
  }

  async save(order: OrderAggregate): Promise<void> {
    // 持久化逻辑
  }
}
```

---

## 依赖倒置

```
         应用层
           ↓ 依赖接口
    ┌─────────────┐
    │  领域层      │
    │  (实体/服务)  │
    └─────────────┘
           ↑ 实现
    ┌─────────────┐
    │ 基础设施层   │
    │ (仓库/适配器) │
    └─────────────┘
```

**依赖规则**：领域层定义接口，基础设施层实现接口

---

## 客户端 DDD 实践

### 客户端实体 (Client Entity)
- UI 状态与业务状态分离
- 业务实体在客户端的投影
- 通过 API 同步服务端状态

```typescript
// domain/entities/Order.ts - 可共享的领域模型
class Order {
  constructor(
    public readonly id: OrderId,
    public readonly customer: Customer,
    public readonly items: OrderItem[],
    public readonly status: OrderStatus
  ) {}

  canCancel(): boolean {
    return this.status === OrderStatus.Pending;
  }

  canModify(): boolean {
    return this.status === OrderStatus.Draft || this.status === OrderStatus.Pending;
  }
}

// presentation/hooks/useOrder.ts - 应用层
function useOrder(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await orderApi.findById(orderId);
      return OrderMapper.fromResponse(response);
    },
    select: (order) => ({
      order,
      canCancel: order.canCancel(),
      canModify: order.canModify(),
    }),
  });
}
```

### 客户端值对象 (Client Value Object)
- 表单验证规则
- UI 显示格式化
- 本地计算逻辑

```typescript
// domain/value-objects/PhoneNumber.ts
class PhoneNumber {
  private constructor(public readonly value: string) {}

  static create(value: string): PhoneNumber {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length < 10) {
      throw new ValidationException('Phone number must have at least 10 digits');
    }
    return new PhoneNumber(cleaned);
  }

  format(): string {
    const digits = this.value;
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }

  static isValid(value: string): boolean {
    return /^\d{10,}$/.test(value.replace(/\D/g, ''));
  }
}

// presentation/components/PhoneInput.tsx
function PhoneInput({ value, onChange }: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    if (value && !PhoneNumber.isValid(value)) {
      setError('Invalid phone number');
    }
  };

  return (
    <div>
      <input value={value} onChange={onChange} onBlur={handleBlur} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

### 客户端聚合 (Client Aggregate)
- 本地状态聚合
- 表单状态管理
- 乐观更新

```typescript
// domain/aggregates/CartAggregate.ts
class CartAggregate {
  private constructor(
    private _id: CartId,
    private _items: CartItem[],
    private _couponCode: string | null
  ) {}

  static empty(): CartAggregate {
    return new CartAggregate(CartId.generate(), [], null);
  }

  static fromItems(items: CartItem[]): CartAggregate {
    return new CartAggregate(CartId.generate(), items, null);
  }

  addItem(product: Product, quantity: number): CartAggregate {
    const existing = this._items.find(i => i.productId.equals(product.id));
    if (existing) {
      const updatedItems = this._items.map(i =>
        i.productId.equals(product.id)
          ? i.updateQuantity(i.quantity + quantity)
          : i
      );
      return new CartAggregate(this._id, updatedItems, this._couponCode);
    }
    return new CartAggregate(
      this._id,
      [...this._items, CartItem.create(product, quantity)],
      this._couponCode
    );
  }

  applyCoupon(code: string): CartAggregate {
    return new CartAggregate(this._id, this._items, code);
  }

  get total(): Money {
    const subtotal = this._items.reduce((sum, i) => sum.add(i.subtotal), Money.zero('USD'));
    const discount = this._couponCode ? this.calculateDiscount(subtotal) : Money.zero('USD');
    return subtotal.subtract(discount);
  }

  private calculateDiscount(subtotal: Money): Money {
    // 折扣计算逻辑
    return subtotal.multiply(0.1);
  }
}

// hooks/useCart.ts
function useCart() {
  return useReducer(
    (cart, action) => {
      switch (action.type) {
        case 'ADD_ITEM':
          return cart.addItem(action.product, action.quantity);
        case 'REMOVE_ITEM':
          return cart.removeItem(action.productId);
        case 'APPLY_COUPON':
          return cart.applyCoupon(action.code);
        case 'RESET':
          return CartAggregate.empty();
      }
    },
    null,
    CartAggregate.empty
  );
}
```

### 防抖层 (Anti-Corruption Layer) - 前后端交互
```typescript
// infrastructure/api/ApiClient.ts
class ApiClient {
  constructor(private baseUrl: string) {}

  async request<T>(config: RequestConfig): Promise<T> {
    const response = await fetch(this.baseUrl + config.endpoint, {
      method: config.method,
      headers: { 'Content-Type': 'application/json' },
      body: config.body ? JSON.stringify(config.body) : undefined,
    });

    if (!response.ok) {
      throw ApiException.fromHttpStatus(response.status, response.statusText);
    }

    return response.json() as T;
  }
}

// domain/mappers/OrderMapper.ts
class OrderMapper {
  static toRequest(order: Order): OrderRequest {
    return {
      customerId: order.customer.id.value,
      items: order.items.map(item => ({
        productId: item.productId.value,
        quantity: item.quantity.value,
        price: item.price.value,
      })),
      totalAmount: order.total.value,
    };
  }

  static fromResponse(response: OrderResponse): Order {
    return new Order(
      OrderId.create(response.id),
      new Customer(
        CustomerId.create(response.customer.id),
        response.customer.name
      ),
      response.items.map(OrderItemMapper.fromResponse),
      Money.create(response.totalAmount, response.currency),
      OrderStatus.create(response.status)
    );
  }
}
```
