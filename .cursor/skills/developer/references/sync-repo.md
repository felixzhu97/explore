# Sync Repo

Sync **architecture docs only** from the local workspace into this meta-repo. Full application source trees stay local and must not be published.

Prepare nested Git first — see [nested-git](nested-git.md). This document only covers staging docs into the meta-repo.

Agent-driven workflow: follow this skill (and [c4-model](c4-model.md) / [commit-pr](commit-pr.md)). Do not rely on helper shell scripts.

## Publish whitelist

Allowed to stage and commit:

| Path | Role |
|------|------|
| `*/docs/developer/c4-model/` | Flat C1–C4 PlantUML (and optional PNG) |
| `README.md` | Projects catalog and entry points |
| `.gitignore` | Default-deny root + docs whitelist |
| `.cursor/skills/` | Maintainer workflow skills |

**Not** published: `docs/product-owner/` user-story trees, `docs/Glossary.md`, project `.cursor/skills/`, or application source.

Meta-repo maintainers sync **existing** `docs/developer/c4-model/` trees. Do not use this meta-repo workflow to rewrite project-local skills, Glossary, or user-story docs.

Root `.gitignore` uses `/*` default-deny, un-ignores published project roots, then allows only `*/docs/developer/c4-model/`. New local projects are ignored automatically; onboarding only needs `!<name>/` plus that shared docs rule.

Current published C4 trees:

- `explore-ai/docs/developer/c4-model/`
- `whatsfeed/docs/developer/c4-model/`
- `low-code-platform/docs/developer/c4-model/`

## Stage (required)

Stage **only** whitelist paths. Do **not** use `git add -A`.

```bash
git add .gitignore README.md
git add .cursor/skills/
git add explore-ai/docs/developer/c4-model/
git add whatsfeed/docs/developer/c4-model/
git add low-code-platform/docs/developer/c4-model/
git status --short
```

When onboarding a new project, extend the `git add` list with that project's `docs/developer/c4-model/` path.

## Onboard a new project

1. Add flat `docs/developer/c4-model/` files using `C1-`–`C4-` naming (see [c4-model](c4-model.md))
2. Add a row to the Projects table in root `README.md` (Title Case display name + kebab-case path)
3. Whitelist the project root in `.gitignore` (`!<name>/`)
4. Add that C4 path to the stage commands above
5. Stage whitelist paths, then follow [commit-pr](commit-pr.md)
6. (Optional, outside meta) project-repo skills live only in that project’s Git remote
