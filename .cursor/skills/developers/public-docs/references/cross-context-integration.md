# Cross-context integration (basic)

Use this when one catalogued app **calls or depends on another**
(runtime service edge or shared contract). Prefer the smallest DDD-shaped
path: **Published Language + Anti-Corruption Layer**. Do not start with
shared domain DTOs, GitHub Packages publish, or monorepo domain merges.

Platform terms: [`docs/Glossary.md`](../../../../docs/Glossary.md).  
Edges catalog: [`packages/DEPENDENCIES.md`](../../../../packages/DEPENDENCIES.md).

## Default pattern

```text
Provider BC  --owns-->  packages/contracts-* (OpenAPI)
Consumer BC  --ACL--->  conform to that OpenAPI (no provider domain imports)
```

| Role | Responsibility | Example |
|------|----------------|---------|
| **Provider** | Owns the contract; keep OpenAPI honest | `explore-ai` → `@explore/contracts-ai` |
| **Published Language** | Versioned shape in `packages/contracts-*` | paths, headers, request/response |
| **Consumer ACL** | Map local identity/API ↔ contract; isolate upstream types | Explore Chat Explore AI BFF |
| **Shared Kernel** | Service ids only (`@explore/shared-types`) | Never AI/IAM domain models |

**Do not:** grow Shared Kernel with DTOs; share domain packages across BCs;
use `workspace:` as a substitute for a cross-BC contract.

## Minimal process

1. **Name the edge** in platform or app Glossary (Published Language / ACL /
   BFF) — [living-docs](living-docs.md) Phase 1 if new terms.
2. **Add or update** OpenAPI under `packages/contracts-<provider>/` (provider
   owns it). Add a validate target (JSON parse + required consumer operations).
3. **Wire Nx** `implicitDependencies` (provider + consumer → contracts). Keep
   docs-only CI able to validate the contract file.
4. **Consumer ACL**: path/header constants aligned to the OpenAPI; HTTP client
   in the consumer app. Prefer `file:` / `workspace:` to the contracts package
   when the app can resolve it; otherwise keep constants + a contract test.
5. **Catalog**: update [`packages/DEPENDENCIES.md`](../../../../packages/DEPENDENCIES.md)
   kind = `Published Language / OpenAPI`.
6. **C4 (when the edge is new or critical)**: platform
   `C4-Dynamic-*.puml` and/or consumer C2/C3 — [c4-model](c4-model.md).
7. **Deliver** fine-grained stack: Glossary → contracts package → consumer
   wiring / CI — [delivery-github-stack](delivery-github-stack.md).

## Checklist

- [ ] Edge named (Glossary Preferred Terms)
- [ ] OpenAPI in `packages/contracts-*`; provider is owner
- [ ] Validate script / Nx target green
- [ ] Consumer does not import provider domain types
- [ ] `DEPENDENCIES.md` + `implicitDependencies` updated
- [ ] Platform or app C4 Dynamic updated if runtime path is user-visible
- [ ] Stack Drafts submitted

## Out of scope (this basic flow)

- Publishing `@explore/*` to a registry
- Multi-repo Renovate presets for sibling remotes
- Full OpenAPI codegen clients (optional later)
- Merging two BCs into one domain model
