---
name: developer
description: Feature development for this repo — XP, DDD, BDD, TDD, Glossary naming, Apple HIG minimal UX, root README on-ramp tone (Get started → Next steps), living docs sync (C4 / Glossary / User Story Map), and mandatory commit/PR standards (why body + References from official docs and research). Submit fine-grained Draft PRs via GitHub Stack (gh stack). Use when implementing features, writing tests, committing, opening PRs, UI work, README edits, or DDD/TDD/BDD/XP/clean-code tasks.
---

# Developer

**XP + DDD + BDD + TDD + minimal Clean Code.** Smallest correct change. UI: Apple HIG + minimal.

**Every** commit and PR must follow §6 (project standards). **Every** Jira ticket must follow [Product Owner](../jira-delivery/SKILL.md). Do not invent alternate formats.

## Hard constraints

1. Layers: [architecture](../../../../rules/architecture.mdc) — per feature `controller → service → domain ← infra` (+ `mapper`)
2. No `domain/port`, `adapter/in|out`, `*Port` in new code
3. Tests: `should expected result when condition` (spaces; Java methods: camelCase)
4. Names: Glossary Preferred Term in repo `docs/Glossary.md` (when present) + [clean-code-naming](references/clean-code-naming.md)
5. UI: Apple HIG + [apple-minimal-ux](references/apple-minimal-ux.md)
6. **Commit / PR / Jira / branches**: always reuse §6 + [Product Owner](../jira-delivery/SKILL.md); branch `<slug>` (no prefix); submit **fine-grained Draft PRs via GitHub Stack** (`gh stack`); commit subject = PR title (imperative, no type prefix); body why → References → JIRA; prose ≤72 cols; References = official docs + research
7. **XP**: follow [extreme-programming](references/extreme-programming.md) — Simple Design / YAGNI, CI green, small releases, customer / AC feedback
8. **Living docs (phased)**: **before code** — Glossary → `C4-Code-Domain-Model.puml`; **after code (CI green)** — other C4 + User Story Map (+ root README when boot/ports/Live change); same feature branch — see §4 and [living-docs](references/living-docs.md)
9. Root `README.md` tone: short pitch, Get started → Next steps — [readme](references/readme.md)

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
| C4 | repo `docs/developer/c4-model/` (when present) — `.puml` source; IAM white/black (`style.puml` inline + plain domain/dynamic) & UML members: [c4-model](references/c4-model.md) |
| User Story Map | repo `docs/product-owner/User-Story-Map.md` (when present) (+ `user-stories/E*.md`) |

| Change | Phase | Must update |
|--------|-------|-------------|
| New/changed Preferred Term, module package, route, API prefix, business concept | **1** | Glossary |
| New/changed aggregate, entity, VO, domain association, or public domain method on aggregate/entity | **1** (+ **3** if reconcile) | `C4-Code-Domain-Model.puml` |
| Actor/external system, container, component wiring, deploy topology, **critical runtime path** | **3** | Matching C4 / Dynamic `.puml` per [c4-model](references/c4-model.md) |
| New user-visible capability, delivery status, primary nav add/remove | **3** | User Story Map index + matching `user-stories/E*.md` |
| Default boot, ports, datastore, or public Live URL change | **3** | Root `README.md` Get started / Configuration per [readme](references/readme.md) |
| Pure tests / pure styling / no product or architecture semantics | — | None (N/A) |

Flow: Phase 1 docs → implement → Phase 3 docs → commit/PR (stack recommended).
Prefer editing `.puml` (C4-PlantUML style in [c4-model](references/c4-model.md)); if
PlantUML is unavailable, note in the PR that `png/` is pending render.

Detail + examples: [living-docs](references/living-docs.md) · C4 standards: [c4-model](references/c4-model.md) · README: [readme](references/readme.md)

### 5. UI — Apple HIG + minimal

Official: [HIG](https://developer.apple.com/design/human-interface-guidelines/). Clarity, deference, one primary action; no decorative noise.

Detail: [apple-minimal-ux](references/apple-minimal-ux.md)

### 5b. Root README — on-ramp tone

When creating or rewriting the repo root `README.md`, follow [readme](references/readme.md): calm second-person prose, Get started → Next steps, no badge/TOC walls; deep content stays in project docs.

### 6. Branches / Commit / PR (mandatory every time)

#### Language

| Artifact                          | Language                                                                   |
| --------------------------------- | -------------------------------------------------------------------------- |
| Branch name                       | English kebab-case (`glossary-update`)                                     |
| Commit subject + why + References | English                                                                    |
| PR title + body                   | English                                                                    |
| Jira **summary**                  | English (`As a … I want … so that …`)                                  |
| Jira description                  | English (headings, prefixes, body, Definition of Done)                 |

Jira tickets follow [Product Owner](../jira-delivery/SKILL.md): business-facing, short descriptions.

#### Branch naming

Use a single English **kebab-case** slug — **no** directory prefix.

```
<slug>
```

Examples: `glossary-update`, `domain-model-diagram`, `input-validation`.

**Do not** use these branch prefixes: `feat/`, `fix/`, `refactor/`, `docs/`,
`test/`, `chore/`, `perf/`, `ci/`, `eng/`, `dev/`, `feature/`.

Rules:

- Slug describes the change in plain English
- With a Jira ticket: still use `<slug>` only — put the issue key only in
  commit/PR body (`JIRA: https://…/AI-xxx`), not in the branch name
- Do **not** embed `AI-<key>` in new branch names
- Long-lived integration lines: `main`, `java-angular` (do not push work directly to these except via PR)

#### Branch / PR flow (GitHub Stack — fine-grained Draft PRs)

Do **not** open one large Draft PR. Deliver dependent work as a **stack of fine-grained Draft PRs** with [`gh stack`](https://docs.github.com/en/pull-requests/get-started/stacked-prs-quickstart). Full delivery rules: [`delivery-github-stack`](../references/delivery-github-stack.md).

```
main
 └── glossary-update              # Draft PR #1 → base: main
      └── domain-model-diagram    # Draft PR #2 → base: previous branch
```

Optional feature stack:

```
main
 └── input-validation
      └── validation-api
```

1. First layer: `gh stack init` from `main` (or current trunk); one fine-grained concern
2. Next layers: `gh stack add` on top of the previous branch; one concern each
3. Submit: `gh stack submit` (or `gh stack submit --auto` for non-interactive) — keep PRs as **Draft**; do **not** use `--open` until ready for review
4. Standalone work with no dependency: still prefer a single fine-grained Draft via the stack workflow (or one Draft PR off trunk)
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

- Bad: why says “reduce cold-start latency for interactive UX” + link to a marketing landing page with no latency guidance.
- Good: why says “treat latency as a golden signal and avoid idle scale-to-zero for interactive flows” + [SRE Book — Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/).

Avoid: random blogs, undated tweets, marketing landing pages (unless no primary source exists — then note why).

#### AI / model reference set (required when relevant)

For model, benchmark, ASR / TTS / LLM, RAG, agent, or algorithm-related changes, the reference set must be more specific than a generic docs link.

When these source types exist, include all of them in both the commit and the PR:

1. One **academic** source, preferably the arXiv abs page or official paper page
2. One **Hugging Face** model, collection, or paper page
3. One official **vendor blog**, release note, or announcement page
4. The upstream **GitHub repository** or official implementation docs when they are the implementation source

For framework or dependency-only changes, keep using official docs first. For AI / model changes, prefer the full reference set above over a single docs link. Pick URLs from [market-tech-analysis sources](../market-tech-analysis/references/sources.md) — do not paste a fixed long example block in every commit.

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
3. **No** Conventional Commits prefix (`feat:`, `fix:`, …). **Commit subject = PR title** (same line).
4. Branch uses `<slug>` only (no prefix).
5. **No** class, package, framework, or API jargon as the headline.
6. No trailing period; no Jira key in the title (`JIRA:` stays in the body).

| Bad | Good |
|-----|------|
| `docs: align domain model` | `Align domain model diagram with glossary terms` |
| `Updated branch naming rules` | `Update branch naming documentation` |
| `Users can submit valid forms` | `Reject empty input on form submit` |
| `Fixed validation on empty input` | `Add validation for required fields` |

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
Align domain model diagram with glossary terms

Diagram labels must match the glossary before later
layers reference those names.

References:

- https://c4model.com/
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
Diagram labels must match the glossary before later
layers reference those names.

References:

- https://c4model.com/

JIRA: https://example.atlassian.net/browse/PROJ-123
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
- [ ] Root README (if boot/ports/Live changed or rewriting front page): [readme](references/readme.md) tone
- [ ] Branch: `<slug>` (no prefix); fine-grained Draft PRs via `gh stack` (no single mega-Draft)
- [ ] Commit: subject = PR title; why + References (official/research); no type prefix
- [ ] Each References link maps to a claim in the why text (or N/A with note)
- [ ] PR title: business summary, imperative verb (commit-style); no `feat:`/`fix:` prefix
- [ ] PR body: why → References → JIRA (bottom); ≤72 cols; no title echo; CI green
- [ ] Stack submitted as Drafts (`gh stack submit` / `--auto`; no `--open` until ready)
- [ ] Jira (if any): [Product Owner](../jira-delivery/SKILL.md) template followed

## Related

| Need | Where |
|------|-------|
| Extreme Programming | [extreme-programming](references/extreme-programming.md) |
| Living docs sync | [living-docs](references/living-docs.md) |
| Root README tone | [readme](references/readme.md) |
| Architecture | [architecture rule](../../../../rules/architecture.mdc) |
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
| Product Owner | [Product Owner](../jira-delivery/SKILL.md) |
