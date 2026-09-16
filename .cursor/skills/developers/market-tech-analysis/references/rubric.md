# Business & Tech Analysis — Quick Rubric

Use when scoring options before writing the recommendation.

## Watchlist coverage (gate)

Analysis is incomplete until [sources.md](sources.md) is scanned: product/news
**and** research/OSS hubs for **Apple, Google, and GitHub** only (vendor
watchlist). Topic-relevant **protocols, standards, papers, Hugging Face, and Qwen**
are required when the scope cites them — they are not vendor-whitelist
violations.

| Score | Criteria |
|-------|----------|
| Pass | Every vendor row has a dated signal **or** explicit “no material signal (checked)”; protocol/standard/paper/HF cites present when the topic needs them |
| Fail | Any vendor org skipped without checking, or cites **other companies** as industry vendors |

## Signal quality

| Score | Criteria |
|-------|----------|
| High | Primary Apple / Google / GitHub source (official blog/changelog/docs/research), **or** primary protocol/standard/paper/HF (RFC / NIST / W3C / arXiv abs / HF model or collection card), dated ≤ 90 days when recency matters, directly relevant |
| Medium | Older but still structural primary page from the same three orgs, or a stable standard/RFC / established HF card |
| Low | Opinion / undated / marketing only — cite sparingly |

## Fit for this product

| Capability | Prefer when signal says… |
|------------|---------------------------|
| Chat / multi-agent | Conversation UX, orchestration, tool use |
| RAG | Knowledge Q&A, grounding, enterprise docs |
| IAM / identity | Sign-in, tokens, privacy, account lifecycle |
| Structured output / analysis | Reports, eval, compliance packaging |
| Vision / audio | Multimodal demand with clear monetization |
| MCP / tools | Integration marketplace, partner distribution |

## Effort heuristic

| Size | Meaning |
|------|---------|
| S | ≤ 1 week spike or config/docs |
| M | One vertical slice (domain + API + thin UI) |
| L | New bounded context or heavy infra |
