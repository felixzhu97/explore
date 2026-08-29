---
name: public-docs
description: Manage nested project Git, sync architecture docs into this meta-repo, update C4 models, living docs, and follow GitHub Stack branch/commit/PR standards. Use when preparing nested Git, syncing the repo, editing C4 PlantUML, staging docs, committing, or opening PRs.
---

# Public docs

**Nested Git → living docs (when needed) → update C4 → sync repo → commit/PR (GitHub Stack).** Whitelist docs only — never publish full source trees.

## Hard constraints

1. Project clones keep their own remotes — see [nested-git](references/nested-git.md); never stage full application source into this meta-repo
2. Publish only whitelist paths — see [sync-repo](references/sync-repo.md)
3. Architecture / domain language changes follow [living-docs](references/living-docs.md) phased order before sync
4. Architecture boundary changes must update C4 `.puml` in the same PR — see [c4-model](references/c4-model.md)
5. Every commit and PR must follow [commit-pr](references/commit-pr.md)
6. Dependent work ships as atomic **Draft PRs via GitHub Stack** — see [delivery-github-stack](references/delivery-github-stack.md)
7. Stage only whitelist paths per [sync-repo](references/sync-repo.md) — never `git add -A`

## Workflow

```
nested-git → living-docs (Phase 1–3) → c4-model → sync-repo → gh stack → commit-pr
```

| Step | Reference |
|------|-----------|
| Hide/restore nested project `.git` | [nested-git](references/nested-git.md) |
| Glossary / domain model / story map order | [living-docs](references/living-docs.md) |
| Update C4 layers | [c4-model](references/c4-model.md) |
| Sync whitelist docs into this repo | [sync-repo](references/sync-repo.md) |
| Stack of Draft PRs | [delivery-github-stack](references/delivery-github-stack.md) |
| Branch / commit / PR title & body | [commit-pr](references/commit-pr.md) |

Tickets for sync or C4 work follow [public-docs-backlog](../../product-owner/public-docs-backlog/SKILL.md).

## Checklist

- [ ] Nested Git: project `.git` hidden as `.git.local` before meta stage (or N/A)
- [ ] Living docs: Phase 1 → implement in project repo → Phase 3 sync (or N/A)
- [ ] Sync: whitelist paths staged (or N/A)
- [ ] C4: matching `.puml` updated per trigger matrix (or N/A)
- [ ] Glossary / User Story Map / project README updated when living docs changed (or N/A)
- [ ] README Projects / entry points updated if catalog changed (or N/A)
- [ ] Branch: `<type>/<slug>`; Commit: subject + why + References; PR: business title + why + References
- [ ] Stack submitted as Drafts (`gh stack submit --auto`; no `--open` until ready)

## Related

| Need | Where |
|------|-------|
| Nested Git | [nested-git](references/nested-git.md) |
| Living docs phases | [living-docs](references/living-docs.md) |
| Sync repo | [sync-repo](references/sync-repo.md) |
| Update C4 | [c4-model](references/c4-model.md) |
| GitHub Stack delivery | [delivery-github-stack](references/delivery-github-stack.md) |
| Commit / PR | [commit-pr](references/commit-pr.md) |
| Stories / AC / DoD | [public-docs-backlog](../../product-owner/public-docs-backlog/SKILL.md) |
