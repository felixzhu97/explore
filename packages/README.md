# Cross-project packages (Nx workspace)

Shared configs, types, contracts, and the Java BOM live here so Explore
apps under `explore-*` do **not** re-declare the same versions or copy DTOs.

| Package | Role |
|---------|------|
| `@explore/eslint-config` | Shared ESLint baseline |
| `@explore/tsconfig-baselines` | Shared TypeScript baselines |
| `@explore/shared-types` | Shared TS types (`ExploreServiceId`, …) |
| `@explore/contracts-ai` | OpenAPI stub for chat → ai |
| `explore-bom` | Java/Spring version BOM (`build.gradle.kts`) |

## Rules

1. JS/TS runtime dependency versions belong in the **workspace root**
   `package.json` when hoisted; do not pin conflicting majors per app.
2. Shared TypeScript goes in `packages/`, never copy between `explore-*`.
3. Java versions go in `explore-bom` only.
4. Do **not** rename or flatten `explore-*` internal trees to `apps/libs`.

Wire an app with Nx `implicitDependencies` in `explore-*/project.json`,
and/or `workspace:` / `file:../packages/...` deps when ready to install
that app into the root pnpm workspace.
