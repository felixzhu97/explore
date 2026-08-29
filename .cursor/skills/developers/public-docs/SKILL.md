---
name: public-docs
description: Manage the public Nx workspace (docs whitelist + packages), nested Git legacy, C4/living docs sync, and GitHub Stack branch/commit/PR standards. Use when syncing docs, editing C4, staging whitelist paths, Nx packages, committing, or opening PRs.
---

# Public docs

**Nx workspace root at `public/` → living docs (when needed) → update C4 →
sync whitelist → commit/PR (GitHub Stack).** Prefer shared deps in `packages/`;
do not duplicate versions across `explore-*`.

## Hard constraints

1. Single Git root is `public/` (Nx). Nested remotes are **legacy** — see
   [nested-git](references/nested-git.md)
2. Publish only whitelist paths — see [sync-repo](references/sync-repo.md);
   shared packages under `packages/` are whitelist
3. Architecture / domain language changes follow [living-docs](references/living-docs.md) phased order before sync
4. Architecture boundary changes must update C4 `.puml` in the same PR — see [c4-model](references/c4-model.md)
5. Every commit and PR must follow [commit-pr](references/commit-pr.md)
6. Dependent work ships as fine-grained **Draft PRs via GitHub Stack** — see [delivery-github-stack](references/delivery-github-stack.md)
7. Stage only whitelist paths per [sync-repo](references/sync-repo.md) — never `git add -A`
8. Do **not** rename `explore-*` into `apps/` / `libs/`; share via `packages/`

## Workflow

```
living-docs (Phase 1–3) → c4-model → packages (if shared) → sync-repo → gh stack → commit-pr
(+ nested-git hide only if a legacy nested .git is present)
```

| Step | Reference |
|------|-----------|
| Legacy nested `.git` | [nested-git](references/nested-git.md) |
| Glossary / domain model / story map order | [living-docs](references/living-docs.md) |
| Update C4 layers | [c4-model](references/c4-model.md) |
| Sync whitelist + packages / Nx root | [sync-repo](references/sync-repo.md) |
| Stack of Draft PRs | [delivery-github-stack](references/delivery-github-stack.md) |
| Branch / commit / PR title & body | [commit-pr](references/commit-pr.md) |

Tickets for sync or C4 work follow [public-docs-backlog](../../product-owner/public-docs-backlog/SKILL.md).

## Checklist

- [ ] Nested Git: project `.git` hidden as `.git.local` before stage (or N/A — preferred)
- [ ] Living docs: Phase 1 → implement → Phase 3 sync (or N/A)
- [ ] Sync: whitelist paths staged including `packages/` / Nx root when touched (or N/A)
- [ ] Shared types/config/BOM: prefer `packages/` over copy across apps (or N/A)
- [ ] C4: matching `.puml` updated per trigger matrix (or N/A)
- [ ] Glossary / User Story Map / project README updated when living docs changed (or N/A)
- [ ] README Projects / entry points updated if catalog changed (or N/A)
- [ ] Branch: `<slug>` (no prefix); Commit: subject = PR title + why + References; PR: same title + why + References
- [ ] Stack submitted as Drafts (`gh stack submit --auto`; no `--open` until ready)

## Related

| Need | Where |
|------|-------|
| Nested Git (legacy) | [nested-git](references/nested-git.md) |
| Living docs phases | [living-docs](references/living-docs.md) |
| Sync repo | [sync-repo](references/sync-repo.md) |
| Update C4 | [c4-model](references/c4-model.md) |
| GitHub Stack delivery | [delivery-github-stack](references/delivery-github-stack.md) |
| Commit / PR | [commit-pr](references/commit-pr.md) |
| Stories / AC / DoD | [public-docs-backlog](../../product-owner/public-docs-backlog/SKILL.md) |
| Shared packages | [`packages/README.md`](../../../../packages/README.md) |
