# Global Skills — 按敏捷聚合

路径：`~/.cursor/skills/`

按 **Scrum / 现代敏捷** 分成三层，避免把干系人、支撑专长和 Scrum Team 混成一张平铺表。

## 1. Scrum Team（框架内职责）

目录：[`scrum-team/`](./scrum-team/)

| Accountability | 路径 | Skills |
|----------------|------|--------|
| **Product Owner** | [`scrum-team/product-owner/`](./scrum-team/product-owner/) | `backlog-value` |
| **Scrum Master** | [`scrum-team/scrum-master/`](./scrum-team/scrum-master/) | `process-improvement` |
| **Developers** | [`scrum-team/developers/`](./scrum-team/developers/) | 工程实现 + `tdd-unit-testing` / `code-review`；大厂参考索引 [`references/`](./scrum-team/developers/references/)（工程 + 产品领域 + 解决方案） |

## 2. Stakeholders（团队外干系人）

目录：[`stakeholders/`](./stakeholders/)

| 角色 | 路径 | Skills |
|------|------|--------|
| **Executive（CEO / 高管）** | [`executive/`](./stakeholders/executive/) | `enterprise-strategy`, `business-model-generator`, `apple-marketing` |
| **Sponsor（赞助人）** | [`sponsor/`](./stakeholders/sponsor/) | `sponsorship` |
| **Customer（客户）** | [`customer/`](./stakeholders/customer/) | `customer-outcomes` |
| **User（用户）** | [`user/`](./stakeholders/user/) | `user-needs` |
| **Business Owner** | [`business-owner/`](./stakeholders/business-owner/) | `business-outcomes` |
| **Subject Matter Expert** | [`subject-matter-expert/`](./stakeholders/subject-matter-expert/) | `domain-expertise` |
| **Compliance** | [`compliance/`](./stakeholders/compliance/) | `regulatory-constraints` |

> 干系人 **不是** Scrum 角色；需求与反馈经 **Product Owner** 进入唯一 Backlog。

## 3. Supporting（支撑 / 赋能，非 Scrum 三人组）

目录：[`supporting/`](./supporting/)

| 角色 | 路径 | Skills |
|------|------|--------|
| **UX Designer** | [`supporting/ux-designer/`](./supporting/ux-designer/) | `apple-design` |
| **Architect** | [`supporting/architect/`](./supporting/architect/) | `architecture-review`, `clean-architecture` |
| **DevOps** | [`supporting/devops/`](./supporting/devops/) | `use-railway` |
| **Researcher** | [`supporting/researcher/`](./supporting/researcher/) | `deepmind-research` |

小团队中这些能力常由 **Developers** 交叉承担。

## 协作关系

```text
Stakeholders
  Executive / Sponsor          战略、授权、预算
  Customer / User / BO / SME   商业、使用、业务结果、领域真相
  Compliance                   红线与审计
        ↓（经 PO，不直派 Developers）
Scrum Team
  PO → Developers → 增量
  Scrum Master                 流程与障碍升级
        ↑
Supporting（可选）             UX / 架构 / 平台 / 研究
```

每层有路由 `SKILL.md`；具体能力在角色子目录。  
Cursor 内置 skills：`~/.cursor/skills-cursor/`（未改动）。
