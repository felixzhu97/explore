---
name: stakeholders
description: >-
  Agile stakeholders outside the Scrum Team: Executive, Sponsor, Customer,
  User, Business Owner, Subject Matter Expert, and Compliance. Use when
  gathering direction, funding, feedback, domain truth, or regulatory
  constraints — not for owning the Sprint backlog (Product Owner) or process
  (Scrum Master).
---

# Stakeholders（干系人）

**不属于** Scrum Team。Scrum Guide：由 Product Owner 邀请参与 Sprint Review 等活动，提供反馈与约束；**不**直接改 Sprint Backlog。

| 角色 | 目录 | 职责 |
|------|------|------|
| **Executive（CEO / 高管）** | [`executive/`](./executive/) | 企业愿景、战略主题、投资组合 |
| **Sponsor（赞助人）** | [`sponsor/`](./sponsor/) | 立项授权、预算、关键升级 |
| **Customer（客户）** | [`customer/`](./customer/) | 买单方 / 关键客户诉求与成功标准 |
| **User（用户）** | [`user/`](./user/) | 实际使用者需求、可用性与场景 |
| **Business Owner** | [`business-owner/`](./business-owner/) | 业务结果与价值验收（业务侧） |
| **Subject Matter Expert** | [`subject-matter-expert/`](./subject-matter-expert/) | 领域真相、规则与术语 |
| **Compliance** | [`compliance/`](./compliance/) | 合规、法律、风险与审计约束 |

```text
Stakeholders（方向 / 资金 / 反馈 / 约束）
  → Product Owner（译成唯一有序 Backlog）
    → Developers（交付 Done 增量）
Scrum Master（保护团队流程，协助干系人协作）
```

## 协作规则（标准）

1. **单一产品意愿入口** — 需求进 PO，不绕过 PO 直接命令 Developers。
2. **Review 给反馈，Planning 不指挥** — Sprint 进行中变更走 PO 重排序。
3. **区分 Customer 与 User** — 付钱的不一定是天天用的人。
4. **Compliance 是约束不是可选建议** — 红线必须进 DoD / AC。
