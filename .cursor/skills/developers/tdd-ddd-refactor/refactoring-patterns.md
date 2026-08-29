# 常见重构模式

## 1. 贫血模型 → 充血模型

### 识别特征
- 类只有getter/setter
- 业务逻辑散落在Service或Manager类中
- 对象之间的关系被忽视

### 重构步骤

**Before:**
```typescript
class User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

class UserService {
  deactivateUser(userId: string): void {
    const user = this.userRepo.findById(userId);
    user.isActive = false;
    this.userRepo.save(user);
    this.notificationService.sendEmail(user.email, 'Account deactivated');
  }
}
```

**After:**
```typescript
class User {
  private constructor(
    private readonly _id: UserId,
    public readonly name: string,
    public readonly email: Email,
    private _isActive: boolean
  ) {}

  static create(name: string, email: string): User {
    return new User(UserId.generate(), name, Email.create(email), true);
  }

  deactivate(): void {
    if (!this._isActive) {
      throw new DomainException('User already inactive');
    }
    this._isActive = false;
  }

  get isActive(): boolean { return this._isActive; }
}

class UserService {
  deactivateUser(userId: string): void {
    const user = this.userRepo.findById(userId);
    user.deactivate();
    this.userRepo.save(user);
    this.notificationService.sendEmail(user.email.value, 'Account deactivated');
  }
}
```

---

## 2. 提取值对象

### 识别特征
- 原语类型（string, number）表示特定概念
- 参数列表中出现重复的字段组
- 缺乏验证逻辑

### 示例

**Before:**
```typescript
function createOrder(customerId: string, address: string, city: string, 
                     state: string, zip: string, country: string): Order {
  // ...
}
```

**After:**
```typescript
class Address {
  private constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string,
    public readonly country: Country
  ) {}

  static create(street: string, city: string, state: string, 
                zipCode: string, countryCode: string): Address {
    return new Address(
      street,
      city,
      state,
      ZipCode.create(zipCode),
      Country.create(countryCode)
    );
  }

  toString(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}, ${this.country.name}`;
  }
}

function createOrder(customerId: CustomerId, address: Address): Order {
  // ...
}
```

---

## 3. 提取聚合

### 识别特征
- 多个实体紧密耦合
- 跨实体的业务规则
- 事务边界不清晰

### 示例

**Before:**
```typescript
class Order {
  id: string;
  customerId: string;
  items: { productId: string; quantity: number; price: number }[];
  shippingAddress: Address;
}

class Payment {
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}
```

**After:**
```typescript
class OrderAggregate {
  private constructor(
    private _id: OrderId,
    private _customerId: CustomerId,
    private _items: OrderItem[],
    private _shippingAddress: Address,
    private _payment: Payment?
  ) {}

  get totalAmount(): Money {
    return this._items.reduce(
      (sum, item) => sum.add(item.subtotal),
      Money.zero('USD')
    );
  }

  pay(paymentMethod: PaymentMethod): void {
    if (this._payment) {
      throw new DomainException('Order already paid');
    }
    this._payment = new Payment(
      PaymentId.generate(),
      this._id,
      this.totalAmount,
      paymentMethod,
      PaymentStatus.Pending
    );
  }
}
```

---

## 4. 消除上帝类

### 识别特征
- 类超过500行
- 超过10个以上的方法
- 多个不相关的职责

### 重构策略

**Before:**
```typescript
class OrderManager {
  // 订单处理
  createOrder() {}
  updateOrder() {}
  cancelOrder() {}
  confirmOrder() {}
  
  // 支付处理
  processPayment() {}
  refundPayment() {}
  handlePaymentCallback() {}
  
  // 物流处理
  calculateShipping() {}
  createShipment() {}
  trackShipment() {}
  
  // 通知处理
  sendConfirmationEmail() {}
  sendShippingNotification() {}
  sendDeliveryNotification() {}
}
```

**After:**
```typescript
// 领域层
class OrderAggregate {
  create() { /* 订单生命周期 */ }
  confirm() { /* 确认逻辑 */ }
  cancel() { /* 取消逻辑 */ }
}

class PaymentService {
  process(order: OrderAggregate, method: PaymentMethod) {}
  refund(paymentId: PaymentId) {}
}

class ShippingService {
  calculate(order: OrderAggregate): ShippingOption[] {}
  createShipment(order: OrderAggregate) {}
}

class NotificationService {
  notifyOrderConfirmed(order: OrderAggregate) {}
  notifyShipped(shipment: Shipment) {}
}
```

---

## 5. 条件表达式 → 策略模式

### Before:
```typescript
class DiscountCalculator {
  calculateDiscount(customer: Customer, order: Order): number {
    if (customer.type === 'PREMIUM' && order.total > 1000) {
      return 0.2;
    } else if (customer.type === 'VIP' && order.total > 500) {
      return 0.15;
    } else if (customer.type === 'REGULAR' && customer.years > 5) {
      return 0.1;
    }
    return 0;
  }
}
```

### After:
```typescript
interface DiscountStrategy {
  calculate(customer: Customer, order: Order): Discount;
}

class PremiumDiscountStrategy implements DiscountStrategy {
  calculate(customer: Customer, order: Order): Discount {
    if (order.total.value > 1000) {
      return new PercentageDiscount(20);
    }
    return new NoDiscount();
  }
}

class DiscountCalculator {
  constructor(private strategies: DiscountStrategy[]) {}

  calculateDiscount(customer: Customer, order: Order): Discount {
    return this.strategies
      .map(s => s.calculate(customer, order))
      .reduce((best, current) => current.amount > best.amount ? current : best);
  }
}
```

---

## 6. 链式调用 → 领域事件

### Before:
```typescript
class OrderService {
  confirmOrder(orderId: string): void {
    const order = this.repo.findById(orderId);
    order.status = 'CONFIRMED';
    this.sendEmail(order);
    this.updateInventory(order);
    this.notifyWarehouse(order);
    this.createInvoice(order);
  }
}
```

### After:
```typescript
class OrderAggregate {
  confirm(): void {
    if (this._status !== OrderStatus.Pending) {
      throw new DomainException('Invalid order status');
    }
    this._status = OrderStatus.Confirmed;
    
    this.addDomainEvent(new OrderConfirmedEvent(this.id));
    this.addDomainEvent(new InventoryReservedEvent(this.items));
    this.addDomainEvent(new InvoiceCreatedEvent(this.id, this.total));
  }
}

// 应用层处理事件
class OrderEventHandler {
  @EventHandler(OrderConfirmedEvent)
  handleConfirmed(event: OrderConfirmedEvent): void {
    this.emailService.sendConfirmation(event.orderId);
    this.warehouseService.notify(event.orderId);
  }
}
```

---

## 7. 长参数列表 → 参数对象

### Before:
```typescript
function createMeeting(
  title: string,
  startTime: Date,
  endTime: Date,
  organizerId: string,
  attendeeIds: string[],
  location: string,
  description: string,
  recurrence: string,
  reminders: number[]
): Meeting {
  // ...
}
```

### After:
```typescript
class MeetingScheduler {
  static create(params: CreateMeetingParams): Meeting {
    if (params.startTime >= params.endTime) {
      throw new DomainException('Start time must be before end time');
    }
    return new Meeting(
      MeetingId.generate(),
      params.title,
      TimeSlot.create(params.startTime, params.endTime),
      params.organizerId,
      params.attendees,
      params.location,
      params.description,
      Recurrence.create(params.recurrence),
      ReminderSettings.create(params.reminders)
    );
  }
}

interface CreateMeetingParams {
  title: string;
  startTime: Date;
  endTime: Date;
  organizerId: string;
  attendeeIds: string[];
  location?: string;
  description?: string;
  recurrence?: RecurrencePattern;
  reminders?: number[];
}
```

---

## 8. 客户端：消除上帝组件

### 识别特征
- React/Vue组件超过300行
- 多个不相关的useEffect/useState
- 业务逻辑与UI渲染混杂

### 重构步骤

**Before (React):**
```tsx
// UserProfile.tsx - 上帝组件
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUser(userId).then(setUser).catch(setError);
    fetchPosts(userId).then(setPosts);
    setLoading(false);
  }, [userId]);

  const handleEdit = () => setEditing(true);
  const handleSave = async () => {
    setSaving(true);
    await updateUser(userId, formData);
    setSaving(false);
    setEditing(false);
  };

  // ... 300+ 行渲染逻辑
}
```

**After (拆分后):**
```tsx
// hooks/useUserProfile.ts
function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
}

// hooks/useUserPosts.ts
function useUserPosts(userId: string) {
  return useQuery({
    queryKey: ['user-posts', userId],
    queryFn: () => fetchPosts(userId),
  });
}

// components/UserProfileView.tsx
function UserProfileView({ user }: { user: User }) {
  return <div className="profile">{/* 只负责展示 */}</div>;
}

// components/UserProfileEditor.tsx
function UserProfileEditor({ user, onSave }: Props) {
  return <form>{/* 只负责编辑 */}</form>;
}

// pages/UserProfilePage.tsx
function UserProfilePage({ userId }: { userId: string }) {
  const { data: user, isLoading } = useUserProfile(userId);
  const { data: posts } = useUserPosts(userId);

  if (isLoading) return <Skeleton />;
  if (!user) return <NotFound />;

  return (
    <>
      <UserProfileView user={user} />
      <UserPosts posts={posts} />
    </>
  );
}
```

---

## 9. 客户端：提取共享领域模型

### 识别特征
- 前后端重复的类型定义
- API响应与UI状态混用
- 缺乏统一的领域概念

### 重构策略

**Before:**
```tsx
// 在组件中直接使用API响应
function OrderList() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  useEffect(() => {
    api.get('/orders').then(setOrders);
  }, []);

  return orders.map(order => (
    <div key={order.id}>
      <span>{order.customer_name}</span>  // 不一致的命名
      <span>{order.total_price}</span>
    </div>
  ));
}
```

**After:**
```tsx
// domain/Order.ts - 共享领域模型
class Order {
  constructor(
    public readonly id: OrderId,
    public readonly customer: Customer,
    public readonly items: OrderItem[],
    public readonly total: Money,
    public readonly status: OrderStatus
  ) {}

  get isPending(): boolean {
    return this.status === OrderStatus.Pending;
  }
}

// domain/mappers/OrderMapper.ts - 数据映射
class OrderMapper {
  static fromResponse(response: OrderResponse): Order {
    return new Order(
      OrderId.create(response.id),
      Customer.create(response.customerId, response.customerName),
      response.items.map(OrderItemMapper.fromResponse),
      Money.create(response.totalPrice, response.currency),
      OrderStatus.create(response.status)
    );
  }
}

// hooks/useOrders.ts
function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get<OrderResponse[]>('/orders');
      return response.map(OrderMapper.fromResponse);
    },
  });
}

// components/OrderList.tsx
function OrderList() {
  const { data: orders } = useOrders();

  return orders?.map(order => (
    <OrderCard key={order.id.value} order={order} />
  ));
}
```

---

## 10. 客户端：表单状态 → 领域实体

### 识别特征
- 表单状态与业务规则混在一起
- 缺乏输入验证的领域规则
- 提交时才做业务校验

### 重构策略

**Before:**
```tsx
function CreateOrderForm() {
  const [form, setForm] = useState({
    customerId: '',
    items: [] as { productId: string; quantity: number }[],
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    if (!form.customerId) errors.customerId = 'Required';
    if (form.items.length === 0) errors.items = 'At least one item';
    if (form.items.some(i => i.quantity <= 0)) errors.items = 'Invalid quantity';
    if (Object.keys(errors).length > 0) return;

    api.post('/orders', form);
  };

  return <Form />;
}
```

**After:**
```tsx
// domain/OrderCreation.ts - 领域层
class OrderCreation {
  private constructor(
    private _customerId: CustomerId | null,
    private _items: OrderItem[]
  ) {}

  static empty(): OrderCreation {
    return new OrderCreation(null, []);
  }

  setCustomer(customerId: string): OrderCreation {
    return new OrderCreation(CustomerId.create(customerId), this._items);
  }

  addItem(productId: string, quantity: number): OrderCreation {
    const item = OrderItem.create(productId, quantity);
    return new OrderCreation(this._customerId, [...this._items, item]);
  }

  validate(): ValidationResult {
    const errors: string[] = [];
    if (!this._customerId) errors.push('Customer is required');
    if (this._items.length === 0) errors.push('At least one item is required');
    return ValidationResult.create(errors);
  }

  toOrder(): Order {
    if (!this.isValid) throw new DomainException('Cannot create invalid order');
    return Order.create(this._customerId!, this._items);
  }

  get isValid(): boolean {
    return this.validate().isValid;
  }
}

// hooks/useOrderCreation.ts
function useOrderCreation() {
  return useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_CUSTOMER':
          return state.setCustomer(action.customerId);
        case 'ADD_ITEM':
          return state.addItem(action.productId, action.quantity);
        case 'RESET':
          return OrderCreation.empty();
      }
    },
    null,
    OrderCreation.empty
  );
}

// components/CreateOrderForm.tsx
function CreateOrderForm() {
  const [creation, dispatch] = useOrderCreation();
  const errors = creation.validate();

  const handleSubmit = () => {
    if (!creation.isValid) return;
    const order = creation.toOrder();
    createOrder(order);
  };

  return <Form errors={errors.messages} onSubmit={handleSubmit} />;
}
```

---

## 11. 客户端：状态管理 → 领域事件

### 识别特征
- 多个组件监听同一状态变化
- 状态更新逻辑分散
- 难以追踪状态变更历史

### 重构策略

**Before:**
```tsx
// 状态分散在各处
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setNotifications([...notifications, `Added ${product.name}`]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    api.post('/orders', { items: cart });
    setCart([]);
    setNotifications([...notifications, 'Order placed!']);
    setUser({ ...user, points: user.points + calculatePoints(cart) });
  };
}
```

**After:**
```tsx
// domain events
type AppEvent =
  | { type: 'ITEM_ADDED'; product: Product }
  | { type: 'CHECKOUT_COMPLETED'; order: Order }
  | { type: 'NOTIFICATION_SENT'; message: string };

// event store
class EventStore {
  private handlers: Map<string, Function[]> = new Map();

  subscribe(eventType: string, handler: Function): () => void {
    const handlers = this.handlers.get(eventType) || [];
    this.handlers.set(eventType, [...handlers, handler]);
    return () => {
      const current = this.handlers.get(eventType) || [];
      this.handlers.set(eventType, current.filter(h => h !== handler));
    };
  }

  dispatch(event: AppEvent): void {
    const handlers = this.handlers.get(event.type) || [];
    handlers.forEach(h => h(event));
  }
}

// domain actions
class CartService {
  constructor(private eventStore: EventStore) {}

  addItem(product: Product): void {
    this.eventStore.dispatch({ type: 'ITEM_ADDED', product });
  }

  checkout(): void {
    this.eventStore.dispatch({ type: 'CHECKOUT_COMPLETED', order: this.buildOrder() });
  }
}

// React integration
function useAppEvents() {
  const [notifications, setNotifications] = useState([]);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const unsub = eventStore.subscribe('ITEM_ADDED', (e) => {
      setNotifications(prev => [...prev, `Added ${e.product.name}`]);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = eventStore.subscribe('CHECKOUT_COMPLETED', () => {
      setNotifications(prev => [...prev, 'Order placed!']);
      setUserPoints(prev => prev + calculatePoints());
    });
    return unsub;
  }, []);

  return { notifications, userPoints };
}
```

---

## 12. 前后端契约：API 层抽取

### 识别特征
- API 调用散落在组件中
- 缺乏类型安全的 API 客户端
- 响应结构变化影响多个组件

### 重构策略

```tsx
// infrastructure/api/client.ts
class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json() as T;
  }

  async post<T, R>(endpoint: string, data: T): Promise<R> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json() as R;
  }
}

// domain/ports/OrderRepository.ts
interface OrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: OrderId): Promise<Order | null>;
  create(order: Order): Promise<Order>;
}

// infrastructure/adapters/OrderApiAdapter.ts
class OrderApiAdapter implements OrderRepository {
  constructor(private client: ApiClient) {}

  async findAll(): Promise<Order[]> {
    const response = await this.client.get<OrderResponse[]>('/orders');
    return response.map(OrderMapper.fromResponse);
  }

  async create(order: Order): Promise<Order> {
    const request = OrderMapper.toRequest(order);
    const response = await this.client.post('/orders', request);
    return OrderMapper.fromResponse(response);
  }
}
```
