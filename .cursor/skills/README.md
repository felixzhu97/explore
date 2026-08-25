# Skills

Project skills for **Public Docs** (`felixzhu97/public`). Thin `SKILL.md`
entry points; details live in each skill's `references/`. Project rules live
in [`.cursor/rules/`](../rules/).

## Skills

| Skill | Use when |
|-------|----------|
| [developer](./developer/) | Nested project Git, living docs, sync architecture docs, update C4, GitHub Stack, branch / commit / PR |
| [product-owner](./product-owner/) | Write stories, acceptance criteria, and DoD for sync-repo or C4 work |

## Rules (always / scoped)

| Rule | Scope |
|------|-------|
| [public-docs-meta](../rules/public-docs-meta.mdc) | Always — meta-repo whitelist, nested Git, stack delivery |
| [living-docs](../rules/living-docs.mdc) | `**/docs/Glossary.md`, `**/docs/product-owner/**`, `**/docs/developer/c4-model/**` |

## References layout

```text
developer/references/
  nested-git.md            # .git ↔ .git.local for project clones
  sync-repo.md             # whitelist, stage commands, onboard project
  living-docs.md           # Glossary → domain model → C4 → stories (phases)
  c4-model.md              # docs/developer/c4-model flat C1–C4 naming
  delivery-github-stack.md # gh stack atomic Draft PRs
  commit-pr.md             # branch / commit / PR title & body

product-owner/references/
  story-template.md
  acceptance-criteria.md
```

## How to use

- Prepare nested project Git → `developer` → [nested-git](./developer/references/nested-git.md)
- Domain or architecture doc change → [living-docs](./developer/references/living-docs.md)
- Sync docs or edit C4 → `developer`
- Stack of Draft PRs → [delivery-github-stack](./developer/references/delivery-github-stack.md)
- Commit or open a PR → [commit-pr](./developer/references/commit-pr.md)
- Shape a sync/C4 ticket → `product-owner`

Global scrum-team skills under `~/.cursor/skills/` are **not** duplicated here;
this tree is the meta-repo source of truth for publishing docs.
