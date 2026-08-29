---
name: enterprise-strategy
description: >-
  CEO/executive enterprise strategy: vision, strategic themes, investment
  portfolio bets, company OKRs, and competitive positioning. Use when the user
  asks for company strategy, CEO-level decisions, board priorities, where to
  invest, multi-product portfolio choices, or enterprise OKRs — not sprint
  backlog or team process.
---

# Enterprise Strategy

高管级策略：决定 **公司往哪走、钱和人投哪里**，不写用户故事细节。

## When to use

- 公司 / 事业部愿景与 3–5 年方向
- 战略主题（Strategic Themes）与投资组合取舍
- 公司级 OKR / 北极星指标
- 进入/退出市场、并购或重大平台赌注
- 向董事会或投资人说明「为什么是这些优先级」

## Do not use for

- Sprint Backlog、验收标准 → Product Owner
- Retro、流程改进 → Scrum Master
- 单产品功能路线图细节 → 可下沉给产品管理，本 skill 只定边界与主题

## Strategy stack (top → down)

```text
Vision（我们要成为什么）
  → Strategic themes（3–5 条可投资的主题）
    → Portfolio bets（投 / 维持 / 削减）
      → Company OKRs（可检验的结果）
        → Guardrails（预算、风险、合规、品牌红线）
          → Handoff to PO / product org（可执行的 Epic 边界）
```

## Output artifacts

Prefer producing these, concise and decision-ready:

1. **Vision statement** — one paragraph; who we serve; what winning looks like.
2. **Strategic themes** — 3–5 themes; each with intent + non-goals.
3. **Portfolio map** — Invest / Sustain / Exit (or Bet / Hold / Kill).
4. **Company OKRs** — few objectives; measurable key results; owner.
5. **Constraints** — capital, talent, regulatory, brand, timeline.
6. **Alignment ask** — what PO/teams must optimize for this quarter.

## Decision filters (CEO lens)

For each bet, answer:

| Question | Fail if unclear |
|----------|-----------------|
| Why us? | No unfair advantage or learning edge |
| Why now? | Timing / window missing |
| What do we stop? | No kill list = fake strategy |
| How do we know in 90 days? | No leading indicator |
| What is the downside? | Unbounded risk |

## Anti-patterns

- Strategy as a slide deck with no stop-doing list
- Too many themes (>5) = no focus
- Confusing team velocity with strategic progress
- Executives rewriting sprint stories (skip the PO layer)
- OKRs that are actually task lists

## Handoff to Agile delivery

When strategy is set, give the delivery system:

```text
Theme: <name>
Outcome: <customer/business result>
In scope / Out of scope: ...
Budget & capacity signal: ...
Success metric (90 days): ...
Decision rights: exec owns theme; PO owns backlog tradeoffs inside the theme
```

## Working style

- Prefer **choices and kills** over analysis volume
- One page > twenty pages
- Name owners and review cadence (e.g. quarterly strategy review)
