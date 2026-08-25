---
name: backlog-value
description: >-
  Product Owner backlog practices: user stories, prioritization, acceptance
  criteria, and maximizing iteration value within executive themes. Use when
  refining backlog, writing stories/AC, ordering work, or sprint planning
  tradeoffs — not CEO-level company strategy.
---

# Backlog & Iteration Value

## When to use

- 用户故事 / Job stories 与验收标准
- Backlog 精炼与排序
- 在既定战略主题内做取舍
- Sprint Planning 范围协商

## Principles

1. **Strategy in, stories out** — 主题与约束来自 Stakeholders / Executive；PO 不重写公司战略。
2. **Value over utilization** — 优化结果，不是填满人天。
3. **Clear AC** — 可测试、可演示；模糊项不进 Sprint。
4. **One ordered backlog** — 单一优先级真相源。

## Story quality bar

```text
As a <user> I want <capability> so that <outcome>.
Acceptance criteria: Given / When / Then (or checklist).
Out of scope: ...
```

## Prioritization (lightweight)

| Signal | Prefer |
|--------|--------|
| Theme alignment | 命中当前战略主题的项 |
| Risk reduction | 早验证高不确定假设 |
| Dependency unlock | 解锁多人阻塞的项 |
| Cost of delay | 延迟代价高的项 |

## Anti-patterns

- PO 直接当 CEO 定公司投资组合
- 无 AC 的大故事进 Sprint
- 多份互相矛盾的优先级列表
- 把任务当故事（无用户结果）

## Output checklist

- [ ] Ordered backlog slice for the next iteration
- [ ] AC for committed items
- [ ] Explicit defer / reject list
- [ ] Trace to executive theme (one line)
