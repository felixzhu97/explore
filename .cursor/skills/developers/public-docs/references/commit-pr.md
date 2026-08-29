# Branches / Commit / PR

**Always** use this format. Do not invent alternate layouts.

## Branch naming

**Prefix = change type** (same set as commit types). Do **not** default every branch to `feat`.

| Type | Pattern | Example |
|------|---------|---------|
| feat | `feat/<slug>` | `feat/onboard-explore-chat` |
| fix | `fix/<slug>` | `fix/explore-ai-context` |
| refactor | `refactor/<slug>` | `refactor/c4-folder-layout` |
| docs | `docs/<slug>` | `docs/readme-projects-table` |
| test | `test/<slug>` | `test/plantuml-render` |
| chore | `chore/<slug>` | `chore/cursor-project-config` |
| perf | `perf/<slug>` | `perf/diagram-assets` |
| ci | `ci/<slug>` | `ci/docs-checks` |

Allowed types: `feat` | `fix` | `refactor` | `docs` | `test` | `chore` | `perf` | `ci`

Rules:

- Branch prefix **must** match the primary change type
- Always use `<type>/<slug>` with a kebab-case slug
- With a Jira ticket: still use `<type>/<slug>` — put the issue key only in the PR body (`JIRA: https://…`), not in the branch name
- Do **not** use `feature/` for new branches
- Long-lived line: `main` only (do not push work directly except via PR)

## Branch / PR flow (GitHub Stack)

Use [`gh stack`](https://docs.github.com/en/pull-requests/get-started/stacked-prs-quickstart) for dependent work. Full policy: [delivery-github-stack](./delivery-github-stack.md).

```
main
 └── docs/explore-ai-glossary           # Draft PR #1 → base: main
      └── docs/explore-ai-c4-model      # Draft PR #2 → base: previous branch
```

1. First layer: `gh stack init` from `main`; one atomic concern per branch
2. Next layers: `gh stack add`; PR **base** = previous branch
3. Submit: `gh stack submit --auto` (Draft); no `--open` until ready for review
4. Standalone work with no dependency: one branch from `main`, one Draft PR

Manual chain PRs (same base/head rules) are acceptable when `gh stack` is unavailable.

## Commit message

1. One complete change per commit
2. Subject ≤ 50 chars, imperative, no trailing period
3. After the subject, add a **short why** (1–3 sentences)
4. Always add **References** (priority below)
5. Never: `Co-authored-by`, `Made with`, emoji in subject

### References priority (required)

Prefer **specific** pages, not homepages.

| Priority | Source |
|----------|--------|
| 1 | Project official docs / README architecture sections |
| 2 | C4 / PlantUML docs when the change is about modeling or rendering |
| 3 | **arXiv** abs pages when citing a method or paper |
| 4 | Research / OSS release notes or GitHub implementation docs |

Avoid: random blogs, undated tweets, marketing landing pages (unless no primary source exists — then note why).

```
<type>: <short description>

<why: brief motivation for this change>

References:

- https://…
```

Example:

```
docs: refine Explore AI system context C4

Clarify Spring AI and Angular boundaries so newcomers can read C1 before containers.

References:

- https://c4model.com/
- https://docs.spring.io/spring-ai/reference/
```

Commit References use **raw URLs** (no markdown link titles).

## PR title (required)

Business summary line only — **no** Conventional Commits prefix (`docs:`, `feat:`, …).

Rules:

1. Short English line naming the user/product outcome or problem fixed
2. **Imperative verb** (*Rename*, *Refresh*, *Align*, *Update*, *Add*, …)
3. No trailing period; no Jira key in the title

Examples:

- Bad: `docs: align Explore AI C4 model`
- Good: `Align Explore AI C4 model with domain flows`

Branch still uses `<type>/<slug>`.

## PR body (required)

Do **not** repeat the PR title in the body. Plain sections only (no markdown headings). Wrap prose to **≤72 characters per line**. Do not break URLs mid-token.

```
{why: 1–3 sentences}

References:

- https://…

JIRA: https://…/browse/…
```

Order (fixed):

1. Why
2. `References:` + blank line + flat raw URL bullets (same URLs as commit)
3. `JIRA: <url>` on one line at the **bottom** — only when a ticket exists

Example:

```
Refresh the story map and E1 chat session epic to match
the revised glossary and C4 boundaries.

References:

- https://c4model.com/
- https://docs.spring.io/spring-ai/reference/
```
