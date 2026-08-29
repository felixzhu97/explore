---
name: developers
description: >-
  Developers accountability in the Scrum Team: implement the increment with
  frontend/fullstack engineering, DDD/TDD/BDD, plus quality practices
  (unit/E2E testing and code review). Prefer the host framework’s built-in
  capabilities over reinventing or unnecessary third-party stacks. API design
  follows AIP; Java style follows Google Checkstyle; validate before submit.
  Deliver via fine-grained **Draft** PRs submitted as a GitHub Stack (gh stack). Use when
  writing code, refactoring, testing, reviewing implementation quality, or
  proposing product-domain / solution designs grounded in big-tech references.
---

# Developers

Scrum Team 中负责 **每个 Sprint 交付 Done 增量** 的人（可多人）。  
Scrum 不单独设 QA：测试与质量是 Developers 的一部分。

Prefer the specific child skill when the task is clear.

## Accountability

| Role | Owns |
|------|------|
| Product Owner | What / why (backlog & AC) |
| Scrum Master | How we work (process) |
| **Developers** | How we build a usable increment (including quality) |

## Required policies

- **Framework-first** → [`references/framework-first.md`](./references/framework-first.md)
- **Checkstyle + AIP** → [`references/checkstyle-aip.md`](./references/checkstyle-aip.md)
- **Delivery (fine-grained Draft PRs + GitHub Stack + validate)** → [`references/delivery-github-stack.md`](./references/delivery-github-stack.md)
  - Commit/PR format: [`developer`](./developer/SKILL.md) §6
- **Living docs order** → [`developer`](./developer/SKILL.md) §4 + [`living-docs`](./developer/references/living-docs.md): Glossary → domain model → implement → C4 + User Story Map

## Skills in this role

### Build
- [`developer`](./developer/) — XP / DDD / BDD / TDD / Commit·PR (primary delivery skill)
- [`public-docs`](./public-docs/) — meta-repo sync, nested Git, C4, GitHub Stack, commit/PR
- [`frontend-engineering`](./frontend-engineering/)
- [`fullstack-ddd`](./fullstack-ddd/)
- [`tdd-ddd-refactor`](./tdd-ddd-refactor/)
- [`angular-developer`](./angular-developer/)
- [`angular-new-app`](./angular-new-app/)
- [`spring-ai`](./spring-ai/)

### Analysis (under Developers hub)
- [`business-analysis`](./business-analysis/)
- [`market-tech-analysis`](./market-tech-analysis/)
- [`jira-delivery`](./jira-delivery/) — story templates / Jira MCP (not the Scrum PO role router)

### Quality (owned by Developers in Scrum)
- [`tdd-unit-testing`](./tdd-unit-testing/)
- [`code-review`](./code-review/)
- [`cybersecurity`](./cybersecurity/) — threat modeling, security architecture, incident/vuln (subagent: `security-architect`)

## Reference policy (required)

When proposing **architecture**, **implementation practice**, **product-domain design**, or **end-to-end solution/platform shape**, cite from the central index:

→ [`references/README.md`](./references/README.md)

Rules:

1. Prefer **Claim + deep URL** from the index — never company name alone.
2. Do **not** invent URLs; do **not** use random Medium/secondary summaries when a whitelist primary source exists.
3. Pick the matching index:
   - implementation / quality / ops practice → [`references/engineering.md`](./references/engineering.md)
   - how a product domain works at scale → [`references/product-domain-design.md`](./references/product-domain-design.md)
   - system / platform / AI solution shape → [`references/solution-design.md`](./references/solution-design.md)
4. Whitelist: Google, Meta, Apple, Microsoft, Amazon, Netflix, Uber, Spotify, LinkedIn, Cloudflare (official eng blogs, design docs, published architectures).
