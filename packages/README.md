# Cross-project packages (Nx workspace)

Shared configs, types, contracts, and the Java BOM live here so Explore
apps under `explore-*` do **not** re-declare the same versions or copy DTOs.

| Package | Role |
|---------|------|
| `@explore/eslint-config` | Shared ESLint baseline (platform) |
| `@explore/tsconfig-baselines` | Shared TypeScript baselines (platform) |
| `@explore/shared-types` | Thin Shared Kernel: service ids / refs only |
| `@explore/contracts-ai` | Published Language (OpenAPI) for chat → ai |
| `@explore/explore-bom` | Java/Spring version BOM (`build.gradle.kts`) |

## Rules

1. JS/TS runtime dependency versions belong in the **workspace root**
   `package.json` when hoisted; do not pin conflicting majors per app.
2. Cross **bounded context** integration uses a **Published Language**
   (OpenAPI under `contracts-*`), not shared domain DTOs.
3. `@explore/shared-types` stays a thin Shared Kernel (service identity).
   Do **not** dump Explore AI / IAM domain models into it.
4. Java versions go in `explore-bom` only.
5. Do **not** rename or flatten `explore-*` internal trees to `apps/libs`.

Wire graph edges with Nx `implicitDependencies` in `explore-*/project.json`.
Use `workspace:` / `file:../packages/...` only for platform packages or
in-context libs — not as a substitute for Published Language across BCs.
