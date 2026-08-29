# Global Skills Index

Path: `~/.cursor/skills/` — layout: `{role}/{skill}/SKILL.md` (no team layer).

## Scrum accountabilities

| Role | Path | Skills |
|------|------|--------|
| **Product Owner** | [`product-owner/`](./product-owner/) | `backlog-value`, `public-docs-backlog` (meta) |
| **Scrum Master** | [`scrum-master/`](./scrum-master/) | `process-improvement` |
| **Developers** | [`developers/`](./developers/) | Engineering + `tdd-unit-testing` / `code-review`; reference hub [`references/`](./developers/references/) |

## Stakeholders (outside Scrum Team)

| Role | Path | Skills |
|------|------|--------|
| **Executive** | [`executive/`](./executive/) | `enterprise-strategy`, `business-model-generator`, `apple-marketing` |
| **Sponsor** | [`sponsor/`](./sponsor/) | `sponsorship` |
| **Customer** | [`customer/`](./customer/) | `customer-outcomes` |
| **User** | [`user/`](./user/) | `user-needs` |
| **Business Owner** | [`business-owner/`](./business-owner/) | `business-outcomes` |
| **Subject Matter Expert** | [`subject-matter-expert/`](./subject-matter-expert/) | `domain-expertise` |
| **Compliance** | [`compliance/`](./compliance/) | `regulatory-constraints` |

Stakeholders are **not** Scrum roles. Direction and feedback enter through the
Product Owner into a single backlog.

## Supporting (enabling, not Scrum accountabilities)

| Role | Path | Skills |
|------|------|--------|
| **UX Designer** | [`ux-designer/`](./ux-designer/) | `apple-design` |
| **Architect** | [`architect/`](./architect/) | `architecture-review`, `clean-architecture` |
| **DevOps** | [`devops/`](./devops/) | `use-railway` |
| **Researcher** | [`researcher/`](./researcher/) | `deepmind-research` |

On small teams these capabilities are often covered by **Developers**.

## Collaboration

```text
Stakeholders
  Executive / Sponsor          strategy, funding, escalation
  Customer / User / BO / SME   outcomes, usage, domain truth
  Compliance                   regulatory red lines
        ↓ (via PO — not direct to Developers)
Scrum Team
  PO → Developers → increment
  Scrum Master                 process & impediments
        ↑
Supporting (optional)          UX / architecture / platform / research
```

Each role has a routing `SKILL.md`; capabilities live in `{role}/{skill}/`.
Cursor built-in skills: `~/.cursor/skills-cursor/` (unchanged).
