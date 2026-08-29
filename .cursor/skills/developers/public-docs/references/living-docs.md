# Living Docs Sync

Features that change architecture, domain language, or product capabilities
must update living docs on the **same feature branch / stack** — in **three
phases**. Pure wording or formatting with no product/architecture meaning
does not.

Do **not** sync new business semantics before Phase 1 is done (or marked N/A).

**Two levels of living docs:**

| Level | Path | Owns |
|-------|------|------|
| **Platform** (this Nx root) | `docs/Glossary.md`, `docs/developer/c4-model/` | Cross-app language, Shared Kernel / Published Language, catalog topology |
| **Bounded context** (each app) | `<project>/docs/…` | App Preferred Terms, rich domain model, per-app C1–C4 |

Platform docs must not duplicate app aggregates; link to project Glossaries / C4 instead.

Paths below under **project** roots (`explore-ai/`, `explore-iam/`,
`explore-chat/`, …) unless marked platform.

## Documents

| Document | Path | Owns |
|----------|------|------|
| Platform Glossary | `docs/Glossary.md` | Platform Preferred Terms (Nx, packages, BC names) |
| Platform C4 | `docs/developer/c4-model/` | Explore catalog C1/C2 + shared-concept Code/Dynamic |
| Domain Glossary | `<project>/docs/Glossary.md` | Preferred Terms, modules, routes, API prefixes |
| C4 model | `<project>/docs/developer/c4-model/` | Structural C4 + Code + Dynamic (`.puml` source of truth) — [c4-model](./c4-model.md) |
| User Story Map | `<project>/docs/product-owner/User-Story-Map.md` | Journey / Backbone / Epic index |
| User stories | `<project>/docs/product-owner/user-stories/` | Per-epic As a / GWT / status |

## Phased workflow

```
Phase 1 (before code)  →  Phase 2 (implement)  →  Phase 3 (after code, green)
Glossary → Domain Model      TDD / BDD / DDD         Other C4 + Story Map
```

### Phase 1 — Before code (must precede business-code commits)

| Step | Document |
|------|----------|
| 1 | **Glossary** — new/changed Preferred Terms, routes, API prefixes, modules |
| 2 | **`C4-Code-Domain-Model.puml`** — aggregates, entities, VOs, associations; `+method` on each aggregate/entity |

Rules:

- **Glossary before domain model** — diagram names and verbs use Preferred Terms.
- No new terms / domain types → Phase 1 **N/A**; proceed to Phase 2.
- Phase 2 happens in the **project repo**; Phase 1–3 doc updates sync here via [sync-repo](./sync-repo.md).

### Phase 2 — Implement

- Implement in the project repository (not staged into meta whitelist as source).

### Phase 3 — After code (same stack; source repo checks green)

| Update | When |
|--------|------|
| `C1-Context.puml` | New actor / external system / system purpose |
| `C2-Container.puml` | New container, subdomain, data store, port |
| `C3-Component.puml` | New feature module, UI surface, cross-app wiring |
| `C4-Deployment.puml` | Deploy topology, ports, hosting |
| `C4-Dynamic-{Flow}.puml` | New/changed critical runtime path |
| **`C4-Code-Domain-Model.puml` (reconcile)** | Implementation drifted from Phase 1 |
| User Story Map + `user-stories/E*.md` | New user-visible capability or delivery status |

Deliver Phase 1–3 meta sync as stacked Draft PRs —
[delivery-github-stack](./delivery-github-stack.md).

## Trigger matrix

| Change | Update | Phase |
|--------|--------|-------|
| New/renamed Preferred Term, module, route, API prefix | Glossary | **1** |
| New/changed aggregate, entity, VO, domain association, public domain method | `C4-Code-Domain-Model.puml` | **1**; **3** if reconcile |
| New actor / external system / system purpose | `C1-Context.puml` | **3** |
| New container, subdomain, data store, port | `C2-Container.puml` | **3** |
| New feature module, UI surface, cross-app wiring | `C3-Component.puml` | **3** |
| Deploy topology, ports, hosting | `C4-Deployment.puml` | **3** |
| New/changed critical runtime path | `C4-Dynamic-{Flow}.puml` (+ `style-zinc.puml` if styles change) | **3** |
| New user-visible capability, nav change, delivery status | User Story Map + matching `E*.md` | **3** |
| Pure tests/formatting/deps with no product/architecture semantics | None (N/A) | — |

Prefer a **single** `C3-Component.puml` and **single** `C4-Deployment.puml`
unless the repo already standardized on split scopes. Do not invent
`C3-Component-Backend.puml` / `C4-Deployment-Production.puml` for new work.

`.puml` first. Regenerate `png/` when PlantUML is available; otherwise note
stale PNGs in the PR.
