---
name: tdd-unit-testing
description: 测试驱动开发（TDD）+ 行为驱动开发（BDD）+ 测试框架规范综合指南。覆盖 Jest/Vitest/Angular Testing/React Testing Library/Playwright/Cypress/E2E测试，涵盖 Mock/Spy/Stub/Fake/异步测试、数据工厂与Fixtures、最佳实践与覆盖率要求。
---

# 测试工程规范

## 核心原则

1. **红-绿-重构**: Red（失败测试）→ Green（最小实现）→ Refactor（重构）
2. **测试先行**: 在编写实现代码之前，先编写测试
3. **AAA 模式**: Arrange（准备）→ Act（执行）→ Assert（断言）
4. **单一职责**: 每个测试只验证一个行为
5. **可复用性**: 使用 Fixture 和 Factory 构建可维护的测试数据
6. **先审查再修复**: 测试失败时，必须先判断是测试错了还是代码错了，再决定修改对象

> **永远不要为了使测试通过而直接修改测试断言。**

---

## 官方推荐测试栈

| 技术栈 | 推荐框架 | 状态 | 备注 |
|--------|----------|------|------|
| **Java/Spring Boot** | JUnit 5 + AssertJ + Mockito | 稳定 | `spring-boot-starter-test` 内置 |
| **Angular 20+** | Vitest + jsdom | **官方推荐** | 取代废弃的 Karma+Jasmine |
| **React** | Jest + React Testing Library | 稳定 | - |
| **Node.js** | Vitest | 官方推荐 | Vite 生态 |

### 测试分层

```
        ▲
       ╱ ╲      Integration (@SpringBootTest) - 10%
      ╱───╲     最慢：完整应用上下文
     ╱ Slice╲    Slice (@WebMvcTest, @DataJpaTest) - 20%
    ╱────────╲   中速：部分上下文
   ╱  Unit   ╲   Unit (@ExtendWith(MockitoExtension.class)) - 70%
  ╱───────────╲  最快：无 Spring 上下文
```

---

## 测试失败修复决策

```
测试失败
    │
    ▼
┌────────────────────────────────────────────────────────────────┐
│ 步骤 1：理解测试意图                                            │
│ - 这个测试想验证什么业务行为？                                   │
│ - 测试期望的结果是否有业务需求支撑？                             │
└────────────────────────────────────────────────────────────────┘
    │
    ▼
┌────────────────────────────────────────────────────────────────┐
│ 步骤 2：审查测试本身的正确性                                    │
│ - 测试期望的行为是否符合真实需求？                               │
│ - 测试是否硬编码了不必要的实现细节？                             │
└────────────────────────────────────────────────────────────────┘
    │
    ▼
    ├─── 测试正确（符合真实需求）────────────────────────────────► 修改实现代码
    │                                                              │
    └─── 测试错误（不符合真实需求）──────────────────────────────► 修改测试
```

### 禁止行为

- ❌ **禁止**：为了使测试通过而修改测试断言
- ❌ **禁止**：添加 `test.skip()` 或 `pending` 来掩盖真实的测试失败
- ❌ **禁止**：修改测试的期望值以匹配错误的实现

### 强制检查点

在修改任何测试之前，必须回答：

1. **这个测试覆盖了什么需求？**
2. **测试期望的行为是产品应该有的行为吗？**
3. **如果我不改测试，产品行为会变成什么样？**
4. **修改测试是否会降低测试的保护作用？**

如果无法明确回答以上问题，**停止修改，先进行需求确认**。

---

## 测试替身模式

| 类型 | 用途 | 示例 |
|------|------|------|
| **Dummy** | 仅填充参数 | `const emptyCallback = () => {}` |
| **Stub** | 提供预设响应 | `mockFn.mockReturnValue('stubbed')` |
| **Spy** | 记录调用 | `jest.spyOn(obj, 'method')` |
| **Mock** | 预设行为+验证 | `jest.fn().mockImplementation(...)` |
| **Fake** | 简化实现 | `new InMemoryDatabase()` |

---

## 测试数据工厂

```typescript
// 域值常量
const BOUNDARY = {
  EMPTY_STRING: '',
  NULL: null,
  ZERO: 0,
  NEGATIVE: -1,
} as const;

const USER_DOMAIN = {
  ROLES: ['admin', 'user', 'guest'] as const,
  VALID: { id: 'usr_123456', username: 'testuser', email: 'user@example.com' },
  INVALID: { emailNoAt: 'userexample.com', passwordTooShort: 'Ab1!' },
} as const;

// 工厂函数
const createUser = (overrides: Partial<User> = {}): User => ({
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  createdAt: new Date('2024-01-01'),
  ...overrides,
});

const createUsers = (count: number, overrides: Partial<User> = {}) =>
  Array.from({ length: count }, (_, i) =>
    createUser({ id: `user-${i}`, ...overrides })
  );

export const TestFixtures = {
  user: (overrides = {}) => ({
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user' as const,
    createdAt: new Date('2024-01-01'),
    ...overrides,
  }),
  users: (count: number) =>
    Array.from({ length: count }, (_, i) =>
      TestFixtures.user({ id: `user-${i}`, name: `User ${i}` })
    ),
};
```

---

## 测试结构与 BDD 命名

```typescript
describe('UserService', () => {
  describe('when finding user by id', () => {
    it('should return user when user exists', () => { /* ... */ });
    it('should return null when user does not exist', () => { /* ... */ });
  });

  describe('when creating user', () => {
    it('should return created user with generated id', () => { /* ... */ });
    it('should throw when email already exists', () => { /* ... */ });
  });
});
```

---

## 断言风格

### Jest/Vitest 常用匹配器

```typescript
expect(value).toBe(expected);           // 严格相等
expect(value).toEqual(expected);        // 深度相等
expect(value).toBeNull();
expect(value).toContain(item);
expect(value).toHaveLength(n);
expect(() => fn()).toThrow(error);

// 异步测试
it('should resolve', async () => {
  await expect(fetchData()).resolves.toBeDefined();
});

// Mock 函数
const mockFn = jest.fn();
mockFn.mockReturnValue('result');
mockFn.mockResolvedValue('result');
mockFn.mockRejectedValue(new Error('error'));

expect(mockFn).toHaveBeenCalledWith('arg');
expect(mockFn).toHaveBeenCalledTimes(2);
```

### React Testing Library

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should render and interact', async () => {
  const user = userEvent.setup();
  render(<LoginForm onSubmit={mockSubmit} />);

  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));

  expect(mockSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
});
```

### Java AssertJ

```java
// 链式断言 - 推荐
assertThat(result).isPresent()
    .hasValueSatisfying(u -> {
        assertThat(u.name()).isEqualTo("John");
        assertThat(u.email()).isNotBlank();
    });

// 异常断言
assertThatThrownBy(() -> service.delete(userId))
    .isInstanceOf(UserNotFoundException.class)
    .hasMessageContaining(userId.toString());
```

---

## 常见陷阱

### Java

- ❌ 不要混用 JUnit 4 和 JUnit 5
- ❌ 不要在 Unit 测试中使用 `@SpringBootTest`
- ❌ 不要过度 mock，优先测试真实行为
- ✅ 优先使用 `assertThrows` 而不是 try/catch
- ✅ 命名测试：`shouldExpectedBehaviorWhenCondition`

### Angular

- ❌ 不要混用 Jasmine 和 Vitest 全局函数
- ❌ 不要忘记 `fixture.detectChanges()` 触发变更检测
- ❌ 不要测试实现细节，测试行为
- ✅ 使用 `vi.fn()` 而不是 `jest.fn()`
- ✅ 使用 `vi.spyOn()` 而不是 `jasmine.createSpy()`

---

## 测试文件位置

> **Angular 官方推荐**：测试文件必须放在源文件旁边，使用 `.spec.ts` 后缀。

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.ts           # 组件源文件
│   │   └── Button.spec.ts      # 测试文件（紧邻源文件）
│   ├── Card/
│   │   ├── Card.ts
│   │   └── Card.spec.ts
│   └── StatusBadge/
│       ├── StatusBadge.ts
│       └── StatusBadge.spec.ts
├── services/
│   ├── api.service.ts
│   └── api.service.spec.ts
└── i18n/
    ├── i18n.service.ts
    └── i18n.service.spec.ts
```

Angular CLI 默认配置：
- `include`: `['**/*.spec.ts', '**/*.test.ts']`
- 测试文件可以是 `.spec.ts` 或 `.test.ts`
- 测试文件可以放在项目任意位置（与源文件相邻）

---

## E2E 端到端测试

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

---

## 覆盖率要求

| 指标 | 最低要求 |
|------|----------|
| 语句覆盖率 | ≥ 80% |
| 分支覆盖率 | ≥ 75% |
| 函数覆盖率 | ≥ 100% |
| 行覆盖率 | ≥ 80% |

---

## 参考

- 完整规范: [fullstack-ddd](../fullstack-ddd/SKILL.md)
