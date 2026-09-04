# Sync Repo

Sync **architecture and living product docs** from the local workspace into this meta-repo. Full application source trees stay local and must not be published.

Prepare nested Git first — see [nested-git](nested-git.md). This document only covers staging docs into the meta-repo.

Agent-driven workflow: follow this skill (and [c4-model](c4-model.md) / [commit-pr](commit-pr.md)). Do not rely on helper shell scripts.

## Publish whitelist

Allowed to stage and commit:

| Path | Role |
|------|------|
| `docs/` | Workspace map (evolution / integration / migration) |
| `*/docs/developer/c4-model/` | Flat C1–C4 PlantUML (and optional PNG) |
| `*/docs/Glossary.md` | Domain ubiquitous language |
| `*/docs/product-owner/` | User Story Map + epic story files |
| `*/README.md` | Project README (un-ignored via `!*/README.md`) |
| `README.md` | Projects catalog and entry points |
| `.gitignore` | Default-deny root + docs whitelist |
| `.cursor/skills/` | Maintainer workflow skills |

**Not** published: project `.cursor/skills/`, application source, secrets, or build artifacts.

Root `.gitignore` uses `/*` default-deny, un-ignores published project roots, then allows C4, Glossary, product-owner trees, and project READMEs. New local projects are ignored automatically; onboarding needs `!<name>/` plus those shared rules.

Current published project roots:

- `explore-ai/`
- `explore-iam/`
- `explore-chat/`
- `explore-commerce/`
- `explore-lowcode/`

## Stage (required)

Stage **only** whitelist paths. Do **not** use `git add -A`.

```bash
git add .gitignore README.md
git add docs/
git add .cursor/skills/
git add explore-ai/README.md explore-ai/docs/Glossary.md explore-ai/docs/product-owner/ explore-ai/docs/developer/c4-model/
git add explore-iam/README.md explore-iam/docs/Glossary.md explore-iam/docs/product-owner/ explore-iam/docs/developer/c4-model/
git add explore-chat/README.md explore-chat/docs/Glossary.md explore-chat/docs/product-owner/ explore-chat/docs/developer/c4-model/
git add explore-commerce/README.md explore-commerce/docs/Glossary.md explore-commerce/docs/product-owner/ explore-commerce/docs/developer/c4-model/
git add explore-lowcode/README.md explore-lowcode/docs/Glossary.md explore-lowcode/docs/product-owner/ explore-lowcode/docs/developer/c4-model/
git status --short
```

When onboarding a new project, extend the `git add` list with that project's whitelist paths.

## Onboard a new project

1. Add flat `docs/developer/c4-model/` files using `C1-`–`C4-` naming (see [c4-model](c4-model.md))
2. Add `docs/Glossary.md` and `docs/product-owner/` (User Story Map + stories) when ready
3. Add project `README.md`
4. Add a row to the Projects table in root `README.md` (Title Case display name + kebab-case path)
5. Whitelist the project root in `.gitignore` (`!<name>/`)
6. Stage whitelist paths, then follow [commit-pr](commit-pr.md)
7. (Optional, outside meta) project-repo skills live only in that project’s Git remote
