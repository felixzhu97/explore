# Branches / Commit / PR

**Always** use this format. Do not invent alternate layouts.

## Branch naming

**Prefix = change type** (same set as commit types). Do **not** default every branch to `feat`.

| Type | Pattern | Example |
|------|---------|---------|
| feat | `feat/<slug>` | `feat/onboard-three-explore` |
| fix | `fix/<slug>` | `fix/explore-ai-context` |
| refactor | `refactor/<slug>` | `refactor/c4-folder-layout` |
| docs | `docs/<slug>` | `docs/readme-projects-table` |
| test | `test/<slug>` | `test/plantuml-render` |
| chore | `chore/<slug>` | `chore/gitignore-whitelist` |
| perf | `perf/<slug>` | `perf/diagram-assets` |
| ci | `ci/<slug>` | `ci/docs-checks` |

Allowed types: `feat` | `fix` | `refactor` | `docs` | `test` | `chore` | `perf` | `ci`

Rules:

- Branch prefix **must** match the primary change type
- Always use `<type>/<slug>` with a kebab-case slug
- With a Jira ticket: still use `<type>/<slug>` — put the issue key only in commit/PR body (`Jira: https://…`), not in the branch name
- Do **not** use `feature/` for new branches
- Long-lived line: `main` only (do not push work directly except via PR)

## Branch / PR flow (Chain PRs)

```
main
 └── docs/explore-ai-c4-context        # PR #1 → base: main
      └── fix/explore-ai-context-typo  # PR #2 → base: docs/explore-ai-c4-context
```

1. First branch in a chain: from `main`; PR **base** = `main`
2. Follow-up in the same chain: from the **previous branch**; PR **base** = that branch
3. Standalone work: `<type>/<slug>` from `main`, PR base = `main`

## Commit message

1. One complete change per commit
2. Subject ≤ 50 chars, imperative, no trailing period
3. After the subject, add a **short why** (1–3 sentences)
4. Always add **References** (priority below)
5. Never: `Co-authored-by`, `Made with`, emoji in subject

### References priority (required)

Prefer **specific** pages, not homepages. Search the web in real time when needed.

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
- [Title](URL)
```

Example:

```
docs: refine Explore AI system context C4

Clarify Spring AI and Angular boundaries so newcomers can read C1 before containers.

References:
- [C4 Model](https://c4model.com/)
- [Spring AI Reference](https://docs.spring.io/spring-ai/reference/)
```

## PR body

Plain sections only (no markdown headings):

```
<why this change matters>

References:
- [Title](URL)

Jira:
- https://…/browse/…
```

- PR **References** must match the commit References (same links)
- Include the `Jira:` block only when a ticket exists
