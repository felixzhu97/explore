---
name: developer
description: Feature development for this repo — XP, DDD, BDD, TDD, Glossary naming, Apple HIG minimal UX, living docs sync (C4 / Glossary / User Story Map), and mandatory commit/PR standards (why body + References from official docs and research). Submit atomic Draft PRs via GitHub Stack (gh stack). Use when implementing features, writing tests, committing, opening PRs, UI work, or DDD/TDD/BDD/XP/clean-code tasks.
---

# Developer

**XP + DDD + BDD + TDD + minimal Clean Code.** Smallest correct change. UI: Apple HIG + minimal.

**Every** commit and PR must follow §6 (project standards). **Every** Jira ticket must follow [Jira delivery](../jira-delivery/SKILL.md). Do not invent alternate formats.

## Hard constraints

1. Layers: [architecture](../../../rules/architecture.mdc) — per feature `controller → service → domain ← infra` (+ `mapper`)
2. No `domain/port`, `adapter/in|out`, `*Port` in new code
3. Tests: `should expected result when condition` (spaces; Java methods: camelCase)
4. Names: Glossary Preferred Term in repo `docs/Glossary.md` (when present) + [clean-code-naming](references/clean-code-naming.md)
5. UI: Apple HIG + [apple-minimal-ux](references/apple-minimal-ux.md)
6. **Commit / PR / Jira / branches**: always reuse §6 + [Jira delivery](../jira-delivery/SKILL.md); branch `<type>/<slug>`; submit **atomic Draft PRs via GitHub Stack** (`gh stack`); PR title = business summary with **imperative** verb (commit-style; no type prefix); body why → References → JIRA; prose ≤72 cols; References = official docs + research
7. **XP**: follow [extreme-programming](references/extreme-programming.md) — Simple Design / YAGNI, CI green, small releases, customer / AC feedback
8. **Living docs (phased)**: **before code** — Glossary → `C4-Code-Domain-Model.puml`; **after code (CI green)** — other C4 + User Story Map; same feature branch — see §4 and [living-docs](references/living-docs.md)

## Workflow

```
Glossary → Domain Model → XP (Customer + Small steps) → BDD → TDD → DDD (+ Clean Code) → C4 + Story Map → Commit/PR (+ Jira via Product Owner skill)
(+ Apple HIG when touching UI)
```

Detail: [extreme-programming](references/extreme-programming.md)

### 1. Testing — BDD then TDD

Detail: [testing](references/testing.md)

**BDD:** one scenario, business language, Given / When / Then (outcomes, not framework calls). Align terms with Glossary.

**TDD:** Red → Green → Refactor; AAA; no private-method tests; no I/O in unit tests.

| | Rule |
|--|------|
| Name | `should expected result when condition` (Java method: camelCase) |
| Pyramid | Unit ~70% / Integration ~20% / E2E ~10% (few critical journeys) |
| Scope | Behavior, not implementation |
| Doubles | Fake/Stub for repos; Mock only when verifying interaction |
| Avoid | Over-mocking, weak asserts, ice-cream-cone E2E, ignored tests |
| JVM Spring | `domain/` no Spring; `controller/` → `@WebMvcTest` + MockMvc — [testing](references/testing.md) |
| Assertions | AssertJ + MockMvc matchers |
| Avoid Spring | Do not use `@SpringBootTest` for domain or every controller test |

### 2. DDD

| Concept | Package |
|---------|---------|
| DDD kernel | `AbstractImmutable` / `AbstractEntity` / `AbstractEmbeddable` — [ddd-rich-model](references/ddd-rich-model.md) + [c4-model](references/c4-model.md) |
| Entity / Aggregate | `domain/model/` — `@Entity` + fine-grained `@Getter` (no class `@Setter`); JPA default table/column names — [ddd-rich-model](references/ddd-rich-model.md) |
| Value Object | `domain/model/` — `@Embeddable` |
| Repository | `domain/repository/` → impl in `infra/` |
| Service | `service/` — orchestration only |
| Controller | `controller/` — no business rules |
| Mapper | `mapper/` — DTO ↔ domain only; no business rules |

**Basic DDD (default):** kernel inheritance (`AbstractEntity` / `AbstractEmbeddable`) + **rich behavior** on aggregates/entities; `service/` orchestrates load → domain API → save. Do **not** introduce independent domain events (`domain/model/event/`, `*Event` types, bus, outbox) unless a ticket explicitly requires async integration — see [ddd-rich-model](references/ddd-rich-model.md).

| | Rule |
|--|------|
| Getter / Setter | Behavior changes state; collections return unmodifiable views; **no** class-level `@Setter` on aggregates |
| JPA names | `@Entity` only — **no** `@Table`, `@Column(name)`, or `@JoinColumn(name)` in domain |

Detail: [ddd-rich-model](references/ddd-rich-model.md)

### 3. Naming

Glossary Preferred Term first → Clean Code form. No synonyms (`Conversation` vs `ChatSession`). New concept → Glossary in Phase 1 **before** business code.

Detail: [clean-code-naming](references/clean-code-naming.md)

### 4. Living docs sync

Living docs follow **three phases** on the same feature branch. Unmatched trigger rows → N/A. Do not skip with “optional” or “later”.

| Phase | When | Documents |
|-------|------|-----------|
| **1 — Before code** | Before business-code commits | Glossary → `C4-Code-Domain-Model.puml` (types + public domain methods) |
| **2 — Implement** | TDD / BDD / DDD | Code matches Glossary + domain model |
| **3 — After code** | After implementation; CI green | Other C4 (C1–C3, Deployment, Dynamic); reconcile domain model if drifted; User Story Map |

| Document | Path |
|----------|------|
| Glossary | repo `docs/Glossary.md` (when present) |
| C4 | repo `docs/developer/c4-model/` (when present) — `.puml` source; style & file set: [c4-model](references/c4-model.md) |
| User Story Map | repo `docs/product-owner/User-Story-Map.md` (when present) (+ `user-stories/E*.md`) |

| Change | Phase | Must update |
|--------|-------|-------------|
| New/changed Preferred Term, module package, route, API prefix, business concept | **1** | Glossary |
| New/changed aggregate, entity, VO, domain association, or public domain method on aggregate/entity | **1** (+ **3** if reconcile) | `C4-Code-Domain-Model.puml` |
| Actor/external system, container, component wiring, deploy topology, **critical runtime path** | **3** | Matching C4 / Dynamic `.puml` per [c4-model](references/c4-model.md) |
| New user-visible capability, delivery status, primary nav add/remove | **3** | User Story Map index + matching `user-stories/E*.md` |
| Pure tests / pure styling / no product or architecture semantics | — | None (N/A) |

Flow: Phase 1 docs → implement → Phase 3 docs → commit/PR (stack recommended).
Prefer editing `.puml` (C4-PlantUML style in [c4-model](references/c4-model.md)); if
PlantUML is unavailable, note in the PR that `png/` is pending render.

Detail + examples: [living-docs](references/living-docs.md) · C4 standards: [c4-model](references/c4-model.md)

### 5. UI — Apple HIG + minimal

Official: [HIG](https://developer.apple.com/design/human-interface-guidelines/). Clarity, deference, one primary action; no decorative noise.

Detail: [apple-minimal-ux](references/apple-minimal-ux.md)

### 6. Branches / Commit / PR (mandatory every time)

#### Language

| Artifact                          | Language                                                                   |
| --------------------------------- | -------------------------------------------------------------------------- |
| Branch name                       | English kebab-case (`feat/minimal-clean-prompts`)                          |
| Commit subject + why + References | English                                                                    |
| PR title + body                   | English                                                                    |
| Jira **summary**                  | English (`As a … I want … so that …`)                                  |
| Jira description                  | English (headings, prefixes, body, Definition of Done)                 |

Jira tickets follow [Jira delivery](../jira-delivery/SKILL.md): business-facing, short descriptions.

#### Branch naming

**Prefix = change type**. Do **not** default every branch to `feat`.

| Type | Pattern | Example |
|------|---------|---------|
| feat | `feat/<slug>` | `feat/minimal-clean-prompts` |
| fix | `fix/<slug>` | `fix/prompt-style-typo` |
| refactor | `refactor/<slug>` | `refactor/chat-session-model` |
| docs | `docs/<slug>` | `docs/branch-naming-slug` |
| test | `test/<slug>` | `test/rag-prompt-builder` |
| chore | `chore/<slug>` | `chore/update-deps` |
| perf | `perf/<slug>` | `perf/vector-search` |
| ci | `ci/<slug>` | `ci/codeql-paths` |

Allowed types: `feat` | `fix` | `refactor` | `docs` | `test` | `chore` | `perf` | `ci`

Rules:

- Always use `<type>/<slug>` with a kebab-case slug that describes the change
- With a Jira ticket: still use `<type>/<slug>` — put the issue key only in commit/PR body (`JIRA: https://…/AI-xxx`), not in the branch name
- Do **not** use `feature/` for new branches (legacy only; CI still accepts it)
- Do **not** embed `AI-<key>` in new branch names
- Long-lived integration lines: `main`, `java-angular` (do not push work directly to these except via PR)

#### Branch / PR flow (GitHub Stack — atomic Draft PRs)

Do **not** open one large Draft PR. Deliver dependent work as a **stack of atomic Draft PRs** with [`gh stack`](https://docs.github.com/en/pull-requests/get-started/stacked-prs-quickstart). Full delivery rules: [`delivery-github-stack`](../references/delivery-github-stack.md).

```
main
 └── feat/resume-chat-session      # Draft PR #1 → base: main
      └── feat/chat-session-api    # Draft PR #2 → base: previous branch
```

1. First layer: `gh stack init` from `main` (or current trunk); one atomic concern
2. Next layers: `gh stack add` on top of the previous branch; one concern each
3. Submit: `gh stack submit` (or `gh stack submit --auto` for non-interactive) — keep PRs as **Draft**; do **not** use `--open` until ready for review
4. Standalone work with no dependency: still prefer a single atomic Draft via the stack workflow (or one Draft PR off trunk)
5. After feedback / trunk updates: `gh stack rebase` / `gh stack sync` — keep the stack linear

#### Commit message

**Always** use this format. No alternate layouts.

1. One complete change per commit  
2. Subject ≤ 50 chars, imperative, no trailing period  
3. After the subject, add a **short why** (1–3 sentences)  
4. Always add **References** (see priority below)  
5. Never: `Co-authored-by`, `Made with`, emoji in subject  

#### References priority (required)

Prefer **specific** pages, not homepages. Search the web in real time when needed.

| Priority | Source | Where to look |
|----------|--------|----------------|
| 1 | Project dependency official docs | [dependency-docs](references/dependency-docs.md) (**claim → URL** catalog; every row corroborates why) |
| 2 | Vendor / lab **research** + open-source | [market-tech-analysis sources](../market-tech-analysis/references/sources.md) (research hubs + GitHub) |
| 3 | **arXiv** papers (abs page) | [arXiv](https://arxiv.org/) — when the change cites a method/paper |
| 4 | Standards / HIG / Google ecosystem | **UI design:** [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) only. **Google ecosystem** (eng practices, style guides, SRE, AI, Cloud Architecture — not Material UI) — [dependency-docs](references/dependency-docs.md) § Google Ecosystem |

**Corroborate the why (required):** each Reference URL must support a **concrete claim** in the commit/PR why paragraph (latency, reliability, cost, naming, review quality, UI system, etc.). Prefer the page that states the practice. Do not paste org/product homepages as decoration. Pick rows from [dependency-docs](references/dependency-docs.md) whose **Claim in why** matches the why text.

- Bad: why says “reduce cold-start latency for chat UX” + link to a marketing landing page with no latency guidance.
- Good: why says “treat latency as a golden signal and avoid idle scale-to-zero for interactive chat” + [SRE Book — Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/).

Avoid: random blogs, undated tweets, marketing landing pages (unless no primary source exists — then note why).

#### AI / model reference set (required when relevant)

For model, benchmark, ASR / TTS / LLM, RAG, agent, or algorithm-related changes, the reference set must be more specific than a generic docs link.

When these source types exist, include all of them in both the commit and the PR:

1. One **academic** source, preferably the arXiv abs page or official paper page
2. One **Hugging Face** model, collection, or paper page
3. One official **vendor blog**, release note, or announcement page
4. The upstream **GitHub repository** or official implementation docs when they are the implementation source

For framework or dependency-only changes, keep using official docs first. For AI / model changes, prefer the full reference set above over a single docs link.

#### PR title (required — Apple / WebKit style)

Fixed format: one business summary line only.

```text
{Business summary}
```

Rules:

1. Short English line naming the user/product outcome or problem fixed
   (same spirit as a Bugzilla / Jira summary).
2. **Imperative verb** (same convention as the git commit subject): present-tense
   command form — *Allow*, *Stop*, *Fix*, *Add*, *Remove*, *Make*… — not
   past tense, gerunds, or descriptive sentences (*Users can…*, *Letting…*,
   *Fixed…*).
3. **No** Conventional Commits prefix (`feat:`, `fix:`, …). Branch still
   uses `<type>/<slug>`.
4. **No** class, package, framework, or API jargon as the headline.
5. No trailing period; no Jira key in the title (`JIRA:` stays in the body).

Examples:

- Bad: `feat: Wire ChatMapper and infra ChatRepository`
- Bad: `Users can resume an interrupted chat session`
- Bad: `Fixed empty-session chat save failures`
- Good: `Allow users to resume interrupted chat sessions`
- Good: `Stop chat save failing when the session is empty`

Reference: [WebKit Pull Requests](https://docs.webkit.org/Deep%20Dive/GitHub/PullRequests.html).

#### References + width (required)

**References formatting:** always put a blank line after the `References:`
label, then only flat `- <URL>` bullets (raw links — **no** `[Title](URL)`
markdown titles). Do **not** use markdown headings (`### …`) or labeled
sub-sections under References.

**Body width:** wrap prose to **≤72 characters per line** (CommonMark-valid
paragraphs; project convention — CommonMark does not define column width).
Do not break URLs mid-token (URLs may exceed 72). No markdown headings in
the PR body — plain sections only.

#### Commit message layout

```
<short description>

<why: brief motivation for this change>

References:

- <URL>
```

Example:

```
Add Qwen3-ASR reference guidance to PR skill

Contributors need a consistent citation set for
model-related changes so commits and PRs point to
the paper, release notes, distribution page, and
upstream implementation.

References:

- https://arxiv.org/abs/2601.21337
- https://huggingface.co/collections/Qwen/qwen3-asr
- https://qwen.ai/blog?id=qwen3asr
- https://github.com/QwenLM/Qwen3-ASR
```

#### PR body layout (required — fixed order)

Do **not** repeat the PR title in the body.

```text
{why: 1–3 sentences, wrap ≤72 cols}

References:

- <URL>

JIRA: https://felixzhu.atlassian.net/browse/AI-XXX
```

Order (fixed):

1. Why
2. `References:` + blank line + flat raw URL bullets
3. `JIRA: <url>` on one line at the **bottom**

Example:

```
Contributors need a consistent citation set for
model-related changes so commits and PRs point to
the paper, release notes, distribution page, and
upstream implementation.

References:

- https://arxiv.org/abs/2601.21337
- https://huggingface.co/collections/Qwen/qwen3-asr
- https://qwen.ai/blog?id=qwen3asr
- https://github.com/QwenLM/Qwen3-ASR

JIRA: https://felixzhu.atlassian.net/browse/AI-XXX
```

PR **References** must match the commit References (same URLs). Use the
same official/research priority.

## Checklist

- [ ] Customer / AC outcome clear (XP Planning Game + On-site Customer)
- [ ] BDD scenario / AC covered
- [ ] TDD; test name `should … when …` (`@DisplayName` with spaces; Java method camelCase); Refactor while green
- [ ] YAGNI / Simple Design — no speculative extras
- [ ] Domain holds rules; `service/` orchestrates
- [ ] Phase 1 living docs: Glossary + `C4-Code-Domain-Model.puml` (incl. public domain methods on aggregates/entities; no getters) **before** business code (or N/A)
- [ ] Phase 3 living docs: other C4 + User Story Map **after** implementation, CI green (or N/A)
- [ ] Domain model reconciled with code if implementation drifted
- [ ] UI (if any): HIG + minimal
- [ ] Branch: `<type>/<slug>`; atomic Draft PRs via `gh stack` (no single mega-Draft)
- [ ] Commit: subject + why + References (official/research)
- [ ] Each References link maps to a claim in the why text (or N/A with note)
- [ ] PR title: business summary, imperative verb (commit-style); no `feat:`/`fix:` prefix
- [ ] PR body: why → References → JIRA (bottom); ≤72 cols; no title echo; CI green
- [ ] Stack submitted as Drafts (`gh stack submit` / `--auto`; no `--open` until ready)
- [ ] Jira (if any): [Jira delivery](../jira-delivery/SKILL.md) template followed

## Related

| Need | Where |
|------|-------|
| Extreme Programming | [extreme-programming](references/extreme-programming.md) |
| Living docs sync | [living-docs](references/living-docs.md) |
| Architecture | [architecture rule](../../../rules/architecture.mdc) |
| Glossary | repo `docs/Glossary.md` (when present) |
| C4 model | repo `docs/developer/c4-model/` (when present) — [c4-model](references/c4-model.md) |
| User Story Map | repo `docs/product-owner/User-Story-Map.md` (when present) |
| Testing core | [testing](references/testing.md) |
| TDD / fixtures / failure triage | [tdd-unit-testing](../tdd-unit-testing/SKILL.md) |
| Angular depth | [angular-developer](../angular-developer/SKILL.md) |
| Spring AI | [spring-ai](../spring-ai/SKILL.md) |
| Business Analysis | [business-analysis](../business-analysis/SKILL.md) |
| Market / tech strategy | [market-tech-analysis](../market-tech-analysis/SKILL.md) |
| Research / OSS watchlist | [sources.md](../market-tech-analysis/references/sources.md) |
| Product Owner | [Jira delivery](../jira-delivery/SKILL.md) |
