---
name: developer
description: Manage nested project Git, sync architecture docs into this meta-repo, update C4 models, and follow branch/commit/PR standards. Use when preparing nested Git, syncing the repo, editing C4 PlantUML, staging docs, committing, or opening PRs.
---

# Developer

**Nested Git → update C4 (when needed) → sync repo → commit/PR.** Architecture docs only — never publish full source trees.

## Hard constraints

1. Project clones keep their own remotes — see [nested-git](references/nested-git.md); never stage full application source into this meta-repo
2. Publish only whitelist paths — see [sync-repo](references/sync-repo.md)
3. Architecture boundary changes must update C4 `.puml` in the same PR — see [c4-model](references/c4-model.md)
4. Every commit and PR must follow [commit-pr](references/commit-pr.md)
5. Stage only whitelist paths per [sync-repo](references/sync-repo.md) — never `git add -A`
6. Do **not** publish user-story document trees (`docs/product-owner/User-Story-Map.md`, `user-stories/`)

## Workflow

```
nested-git → c4-model (if architecture touched) → sync-repo → commit-pr
```

| Step | Reference |
|------|-----------|
| Hide/restore nested project `.git` | [nested-git](references/nested-git.md) |
| Update C4 layers | [c4-model](references/c4-model.md) |
| Sync architecture docs into this repo | [sync-repo](references/sync-repo.md) |
| Branch / commit / PR | [commit-pr](references/commit-pr.md) |

Tickets for sync or C4 work follow [Product Owner](../product-owner/SKILL.md).

## Checklist

- [ ] Nested Git: project `.git` hidden as `.git.local` before meta stage (or N/A)
- [ ] Sync: whitelist paths staged (or N/A)
- [ ] C4: matching `.puml` updated per trigger matrix (or N/A)
- [ ] README Projects / entry points updated if catalog changed (or N/A)
- [ ] Branch: `<type>/<slug>`; Commit: subject + why + References; PR: same References

## Related

| Need | Where |
|------|-------|
| Nested Git | [nested-git](references/nested-git.md) |
| Sync repo | [sync-repo](references/sync-repo.md) |
| Update C4 | [c4-model](references/c4-model.md) |
| Commit / PR | [commit-pr](references/commit-pr.md) |
| Stories / AC / DoD | [Product Owner](../product-owner/SKILL.md) |
