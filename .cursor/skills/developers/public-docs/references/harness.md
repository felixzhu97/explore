# Harness engineering for Explore repos

Every Explore project repo carries the same agent harness so a coding
agent (Cursor, Codex, Claude Code, Copilot) can find its way, change code,
and prove the change without a human relaying context.

Five layers, built bottom-up:

| Layer | Goal | Artifact in each repo |
|-------|------|-----------------------|
| 1 Map | Agent knows where things are and which rules are hard | `AGENTS.md` (short index) + `docs/` as system of record |
| 2 Feedback | One command answers "is this change OK?" — same locally and in CI | `verify` script; Husky and CI both call it |
| 3 Guardrails | Architecture rules fail mechanically, with a fix hint | ArchUnit / dependency-cruiser / import-linter |
| 4 Legibility | Agent can boot the app and inspect it | `scripts/dev-up`, Playwright smoke, local logs |
| 5 Entropy | Plans, debt and doc drift stay visible | `docs/developer/exec-plans/`, `tech-debt.md`, `quality.md`, doc check |

Repos reference this file; do not copy it.

## 1. `AGENTS.md` (map, not manual)

- Lives at repo root; **≤ 120 lines**. It is an index, not an encyclopedia.
- Detail lives in `docs/` and is linked, never pasted.
- `CLAUDE.md` / `.github/copilot-instructions.md`, when present, are one-line
  pointers to `AGENTS.md`.
- Hard rules must also exist as a check (layer 3). A rule only in prose is a
  wish.

Skeleton:

```markdown
# <Project> — agent guide

<One sentence: what the product does and for whom.>

## Map

| Path | What lives there |
|------|------------------|
| `src/main/java/com/<pkg>/<feature>/` | Backend feature modules (controller / service / domain / infra / mapper) |
| `src/app/` | Frontend |
| `docs/Glossary.md` | Ubiquitous language — use these names in code |
| `docs/developer/c4-model/` | C4 views; domain model in `C4-Code-Domain-Model.puml` |
| `docs/product-owner/` | User Story Map and stories |

## Commands

| Need | Command |
|------|---------|
| Verify everything (run before every commit) | `pnpm verify` |
| Start locally | `scripts/dev-up` |
| Backend tests only | `./gradlew test` |

## Hard rules (enforced by `verify`)

1. Domain has no dependency on controller, service, infra or mapper.
2. ...

## Conventions

- Branch `<slug>`, commit subject = PR title, why + References.
- Tests: `should <result> when <condition>`.

## Where to record work

- Multi-step plan: `docs/developer/exec-plans/<date>-<slug>.md`
- Known debt: `docs/developer/tech-debt.md`
```

## 2. `verify` contract

- One entry point at repo root: `pnpm verify` (Node workspaces) or
  `make verify` (Python-only repos).
- Runs, in order, everything CI gates on: format/lint → typecheck → unit
  tests → architecture tests. Fail fast; non-zero exit on any failure.
- `.husky/pre-commit` runs the fast subset (lint-staged + typecheck);
  `.husky/pre-push` or CI runs full `verify`. CI calls `verify` (or the same
  steps) so local green means CI green.
- No network, secrets or running services required. Integration tests that
  need services go behind a separate script.
- CI must also run on stacked PRs: use `pull_request:` without a branch
  filter (or `branches: ["**"]`) so PRs based on another branch get checks.

## 3. Error messages agents can act on

Every mechanical rule states **what was violated, why, and how to fix it**.
Agents read the failure text and act on it; a bare "rule violated" costs a
round trip.

- ArchUnit: always end with `.because("<why>. Fix: <concrete move>")`.
- dependency-cruiser: fill `comment` on every forbidden rule with the fix.
- ESLint / Ruff custom rules: message names the allowed alternative.

Good:

```
Rule 'no classes in ..domain.. should depend on ..infra..' was violated
because domain must stay framework-free so it can be tested in isolation.
Fix: declare an interface in domain/repository and implement it in infra/.
```

## 4. Legibility

- `scripts/dev-up` starts dependencies and the app, waits for health, and
  prints the URLs it serves. `scripts/dev-up --down` stops them.
- Frontends keep a Playwright smoke test (one happy path per app) so an
  agent can check UI changes.
- Local logs go to a file under `logs/` (git-ignored). Never log message
  content, prompts, tokens, emails or IPs — see the privacy guard rule.

## 5. Entropy management

```
docs/developer/
├── exec-plans/README.md   # how to write a plan; one file per plan
├── tech-debt.md           # table: item | impact | proposed fix | owner
└── quality.md             # per module: tests | arch rules | docs | grade
```

- Plans: goal, steps with done-criteria, decision log, progress. Agents
  update progress as they work; finished plans move to `exec-plans/done/`.
- `tech-debt.md` is appended when a shortcut is taken; items are removed by
  the PR that pays them.
- A scheduled doc check (CI cron) fails when links in `AGENTS.md` or
  `docs/**/*.md` point to missing files.

## 6. Shared agent definitions

`.cursor/agents/*.md` are identical across repos. The single source is
[`../agents/`](../agents/); copy with
[`../scripts/sync-agents.sh`](../scripts/sync-agents.sh):

```bash
.cursor/skills/developers/public-docs/scripts/sync-agents.sh --check <repo>  # report drift
.cursor/skills/developers/public-docs/scripts/sync-agents.sh <repo>          # overwrite with canonical
```

Project-specific context belongs in that repo's `AGENTS.md`, not in an
agent definition.

## Checklist (per repo)

- [ ] `AGENTS.md` ≤ 120 lines, links resolve; `CLAUDE.md` points to it
- [ ] `verify` runs lint, types, tests, architecture checks; CI and Husky call it
- [ ] Architecture rules carry `because(... Fix: ...)`
- [ ] `scripts/dev-up` boots the app and prints URLs
- [ ] `exec-plans/`, `tech-debt.md`, `quality.md` present
- [ ] `.cursor/agents/` matches canonical (`sync-agents.sh --check`)

## Background

- [GitHub Docs — Adding repository custom instructions (AGENTS.md)](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [ArchUnit User Guide](https://www.archunit.org/userguide/html/000_Index.html)
- [dependency-cruiser rules reference](https://github.com/sverweij/dependency-cruiser/blob/main/doc/rules-reference.md)
- [Google SRE Book — Eliminating Toil](https://sre.google/sre-book/eliminating-toil/)
