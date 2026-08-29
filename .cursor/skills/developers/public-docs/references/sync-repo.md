# Sync Repo

Sync **architecture and living product docs** (and Nx workspace metadata) in
this repository. Catalogued Explore apps live under `explore-*`; shared code
and configs live under `packages/`. Full trees may exist locally; publish
staging still prefers the whitelist below unless a ticket expands it.

Nested Git is **legacy** — see [nested-git](nested-git.md). Prefer a single
Git root at `public/` (Nx workspace).

Agent-driven workflow: follow this skill (and [c4-model](c4-model.md) /
[commit-pr](commit-pr.md)). Do not rely on helper shell scripts.

## Publish whitelist

Allowed to stage and commit:

| Path | Role |
|------|------|
| `docs/Glossary.md` | **Platform** ubiquitous language (Explore Nx workspace) |
| `docs/developer/c4-model/` | **Platform** C4 (cross-app context / containers / shared concepts) |
| `*/docs/developer/c4-model/` | Per-app flat C1–C4 PlantUML (and optional PNG) |
| `*/docs/Glossary.md` | Per-app (bounded context) ubiquitous language |
| `*/docs/product-owner/` | User Story Map + epic story files |
| `*/README.md` | Project README (un-ignored via `!*/README.md`) |
| `*/project.json` | Nx project registration (in-place apps) |
| `packages/` | Shared eslint/tsconfig/types/contracts/BOM |
| `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `nx.json`, `.npmrc`, `renovate.json` | Nx / pnpm workspace root |
| `.github/workflows/` | CI (`nx affected`) |
| `README.md` | Projects catalog and entry points |
| `.gitignore` | Default-deny root + docs / packages whitelist |
| `.cursor/skills/` | Maintainer workflow skills |

**Not** published by default: project `.cursor/skills/`, secrets, `node_modules`,
build outputs. Application source under `explore-*` remains gitignored except
README, docs, and `project.json` until a ticket un-ignores more paths.

Root `.gitignore` uses `/*` default-deny, un-ignores published project roots,
packages, Nx root files, then allows C4, Glossary, product-owner trees, and
project READMEs.

Current published project roots:

- `explore-ai/`
- `explore-iam/`
- `explore-chat/`
- `explore-commerce/`
- `explore-lowcode/`

## Stage (required)

Stage **only** whitelist paths. Do **not** use `git add -A`.

```bash
git add .gitignore README.md package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json .npmrc renovate.json
git add packages/ .github/workflows/
git add docs/Glossary.md docs/developer/c4-model/
git add .cursor/skills/
git add explore-ai/README.md explore-ai/docs/Glossary.md explore-ai/docs/product-owner/ explore-ai/docs/developer/c4-model/ explore-ai/project.json
git add explore-iam/README.md explore-iam/docs/Glossary.md explore-iam/docs/product-owner/ explore-iam/docs/developer/c4-model/ explore-iam/project.json
git add explore-chat/README.md explore-chat/docs/Glossary.md explore-chat/docs/product-owner/ explore-chat/docs/developer/c4-model/ explore-chat/project.json
git add explore-commerce/README.md explore-commerce/docs/Glossary.md explore-commerce/docs/product-owner/ explore-commerce/docs/developer/c4-model/ explore-commerce/project.json
git add explore-lowcode/README.md explore-lowcode/docs/Glossary.md explore-lowcode/docs/product-owner/ explore-lowcode/docs/developer/c4-model/ explore-lowcode/project.json
git status --short
```

When onboarding a new project, extend the `git add` list with that project's whitelist paths.

## Onboard a new project

1. Add flat `docs/developer/c4-model/` files using `C1-`–`C4-` naming (see [c4-model](c4-model.md))
2. Add `docs/Glossary.md` and `docs/product-owner/` (User Story Map + stories) when ready
3. Add project `README.md` and `project.json` (Nx registration; keep internal layout)
4. Add a row to the Projects table in root `README.md` (Title Case display name + kebab-case path)
5. Whitelist the project root in `.gitignore` (`!<name>/`)
6. Stage whitelist paths, then follow [commit-pr](commit-pr.md)
7. Prefer shared types/config in `packages/` instead of duplicating across apps
