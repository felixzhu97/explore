# Nested Project Git (legacy)

**Preferred model:** `public/` is the **Nx workspace Git root**. Catalogued
Explore apps (`explore-ai`, `explore-iam`, `explore-chat`, …) are developed
in-tree. Shared deps live under [`packages/`](../../../../../packages/README.md).
Do **not** rely on nested remotes for day-to-day dependency versions.

Sibling GitHub remotes (`felixzhu97/explore-*`) may remain as **read-only
mirrors** of historical history. Prefer opening PRs against `public`.

## Legacy nested `.git` (optional / migration only)

If a local tree still has a nested Git dir from before the Nx root:

```bash
# Hide nested Git before staging the meta/Nx repo
mv explore-ai/.git explore-ai/.git.local

# Restore only when pulling an old mirror (not for new feature work)
mv explore-ai/.git.local explore-ai/.git
git -C explore-ai pull --ff-only
mv explore-ai/.git explore-ai/.git.local
```

## Rules

1. Before meta/Nx `git add`, ensure nested `.git` is renamed to `.git.local`
   if present
2. `.gitignore` ignores `**/.git.local/`
3. Do not `git push` from a nested project dir as part of the public workspace
   workflow unless explicitly mirroring
