---
name: market-tech-analysis
description: >-
  Performs business and technical analysis of market trends and recommends
  technology–business strategy. Always starts from Apple, Google, and GitHub
  (product/news + research/OSS hubs). Use when analyzing commercial dynamics,
  market moves, competitive landscape, tech adoption, product strategy, or when
  the user asks for 市场分析、技术分析、商业动向、技术商业建议、竞品、趋势研判.
  Not for Business Analysis / domain modeling (use business-analysis +
  business-analyst).
---

# Market & Tech Analysis

Combine **real-time commercial signal** with **technical feasibility** to recommend what this product (or a named domain) should do next.

Complementary skill: personal `business-model-generator` covers BMC / unit economics; this skill focuses on **trends → tech–business options → actionable bets**.

## When to run

- User asks for 商业动向、行业趋势、竞品、技术选型与商业匹配、Go-to-market vs build
- Planning features, monetization, or platform bets for AI/chat/RAG/agent products
- Need a short strategy memo with evidence and next steps

## Hard rules

1. **Mandatory first scan** of the watchlist in [references/sources.md](references/sources.md): **Apple, Google, GitHub** only for **vendor** industry signals — via real-time web search/fetch. Do not skip. Do not expand to other vendors. **Protocols, standards, papers, Hugging Face, and Qwen** (RFC / NIST / W3C / arXiv / HF cards / Qwen) stay allowed when the topic cites them.
2. **Cite sources** with title + URL + date; prefer primary sources (official blogs, changelogs, developer docs, research pages) from those three orgs, plus primary protocol/standard/paper/HF documents when relevant.
3. Separate **fact** (observed) from **inference** (your read) from **recommendation** (what to do).
4. Tie advice to **this repo’s capabilities** when analyzing Explore products — or state clearly if the analysis is industry-generic.
5. Stay **minimal**: one clear thesis, few options, concrete next actions — no slide-deck fluff.

## Workflow

```
Scope → Mandatory watchlist scan → Lens synthesis → Business read → Tech read → Options → Recommend → Next actions
```

### 1. Scope

Confirm in one line:

- Subject (market / competitor / tech wave / own product)
- Horizon (now / 6–12 months)
- Decision to inform (build, buy, partner, price, kill, invest)

### 2. Mandatory watchlist scan (do this first)

Open [references/sources.md](references/sources.md) and scan **in this order**:

1. Google · Apple · GitHub (product / news)
2. **Each org’s research + open-source hubs** ([sources.md](references/sources.md) § Research & open-source hubs)
3. **Protocols / standards / papers / Hugging Face / Qwen** when the scope needs them ([sources.md](references/sources.md) § Protocols, standards, papers, Hugging Face & Qwen)

For each vendor org: capture **dated** moves (product, pricing, model, **paper+code**, DX) relevant to the scope. If nothing material, write `Org: no material signal (checked)`. For protocols/standards/papers/HF: cite primary docs (RFC / NIST / W3C / arXiv abs / HF model or collection cards) that ground the recommendation.

Then apply lenses:

| Lens | Look for |
|------|----------|
| Demand | Adoption, usage, regulation, buyer pain |
| Supply | New APIs, open-source, infra cost |
| Competition | Positioning, pricing, distribution |
| Capital / policy | Funding, standards, compliance |

Keep a compact signal list (prefer quality over volume; typically 3–9 items spanning the three orgs).

### 3. Business analysis

Summarize:

- Who pays and why now
- Value chain / switching costs
- Moat vs commodity risk
- Monetization patterns that fit the signal

### 4. Technical analysis

For each relevant tech bet:

- Maturity (experiment / early / production-ready)
- Fit with existing stack (Java/Spring, Angular, IAM, RAG, agents)
- Cost / latency / data / ops burden
- Build vs buy vs integrate
- Relevance of Apple / Google / GitHub platform moves to this stack

### 5. Tech–business recommendations

Propose **2–3 options** max, each with:

| Field | Content |
|-------|---------|
| Bet | One sentence |
| Why now | Link to watchlist signals |
| Tech move | Concrete capability to build or adopt |
| Business move | Pricing, packaging, GTM, partnership |
| Risk | Main failure mode |
| Effort | S / M / L |

Pick **one primary recommendation** and say what to defer.

### 6. Next actions (executable)

3–5 bullets the team can do this week (spike, metric, Jira story outline, doc update). Prefer Domain Glossary terms when naming product concepts.

## Output template

```markdown
# [Topic] — Business & Tech Brief
**Date:** YYYY-MM-DD | **Horizon:** … | **Decision:** …

## Thesis
One paragraph.

## Watchlist scan
| Source | Signal (dated) | Link |
|--------|----------------|------|
| Google | … | … |
| Apple | … | … |
| GitHub | … | … |

## Business read
- …
## Technical read
- …

## Options
| Option | Tech move | Business move | Effort | Risk |
|--------|-----------|---------------|--------|------|
| A | | | S/M/L | |
| B | | | | |

## Recommendation
**Primary:** …
**Defer:** …

## Next actions
1. …
2. …

## References
- [Title](URL)
```

## Anti-patterns

| Avoid | Do instead |
|-------|------------|
| Skipping the watchlist | Complete sources.md checklist first |
| Citing vendors outside Apple / Google / GitHub | Stay on the three-org **vendor** whitelist; keep RFC / NIST / W3C / arXiv / Hugging Face / Qwen when relevant |
| Undated hype with no links | Dated signals + citations |
| Feature laundry list | One thesis + ranked options |
| Tech for tech’s sake | Map every tech move to a paying job-to-be-done |
| Ignoring this codebase | Call out reuse vs greenfield |

Scoring: [references/rubric.md](references/rubric.md). Sources: [references/sources.md](references/sources.md).

## Related

| Need | Where |
|------|-------|
| 行业动向（子 Agent） | [market-analyst](../../../agents/market-analyst.md) |
| Business Analysis | [business-analyst](../../../agents/business-analyst.md) + [business-analysis](../business-analysis/SKILL.md) |
| 前沿研究（子 Agent） | [tech-analyst](../../../agents/tech-analyst.md) |
| BMC / LTV / CAC deep dive | `business-model-generator` (personal skill) |
| Implement chosen bet | [developer](../developer/SKILL.md) |
| Product Owner story from recommendation | [Product Owner](../jira-delivery/SKILL.md) |
| Spring AI capabilities | [spring-ai](../spring-ai/SKILL.md) |
