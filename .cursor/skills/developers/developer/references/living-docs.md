# Living Docs Sync

Features that change architecture, domain language, or product capabilities must
update living docs on the **same feature branch** — in **three phases** (see
below). Pure test/style/chore with no product or architecture meaning does not.

Do **not** commit new business code with new domain types or Preferred Terms
before Phase 1 is done (or marked N/A).

## Documents

| Document | Path | Owns |
|----------|------|------|
| Domain Glossary | repo `docs/Glossary.md` (when present) | Preferred Terms, modules, routes, API prefixes |
| C4 model | repo `docs/developer/c4-model/` (when present) | Structural C4 + Code + **Dynamic** sequences (`.puml` source of truth) — standards: [c4-model](./c4-model.md) |
| Root README | repo `README.md` | On-ramp: pitch + Get started + Next steps — tone: [readme](./readme.md) |
| User Story Map | repo `docs/product-owner/User-Story-Map.md` (when present) | Journey / Backbone / Epic index (status) |
| User stories (Epics) | repo `docs/product-owner/user-stories/` (when present) | Per-US As a / GWT acceptance criteria / status |

## Phased workflow

```
Phase 1 (before code)  →  Phase 2 (implement)  →  Phase 3 (after code, CI green)
Glossary → Domain Model      TDD / BDD / DDD         Other C4 + Story Map
```

### Phase 1 — Before code (must precede business-code commits)

| Step | Document |
|------|----------|
| 1 | **Glossary** — new/changed Preferred Terms, routes, API prefixes, modules |
| 2 | **`C4-Code-Domain-Model.puml`** — new/changed aggregates, entities, VOs, associations; `+method` on each aggregate/entity (public domain API; no getters) |

Rules:

- **Glossary before domain model** — diagram class names and `+method` verbs use Preferred Terms.
- No new terms and no domain type changes → Phase 1 **N/A**; proceed to Phase 2.
- Do **not** skip Phase 1 and commit code that introduces new domain vocabulary or types.

### Phase 2 — Implement

- XP → BDD → TDD → DDD; names match Glossary and domain model.
- Jira / AC upstream: [jira-delivery](../../jira-delivery/SKILL.md).

### Phase 3 — After code (same branch / stack; after implementation is green)

| Update | When |
|--------|------|
| `C1-Context.puml` | New actor / external system / system purpose |
| `C2-Container.puml` | New container, subdomain, data store, port (+ C1 if actors change) |
| `C3-Component.puml` | New feature module, UI surface, cross-app wiring |
| `C4-Deployment.puml` | Deploy topology, ports, hosting |
| `C4-Dynamic-{Flow}.puml` | New/changed critical runtime path |
| **`C4-Code-Domain-Model.puml` (reconcile)** | Implementation drifted from Phase 1 sketch |
| User Story Map + `user-stories/E*.md` | New user-visible capability, nav change, delivery status |

All Phase 1–3 doc updates stay on the **same feature branch** (stacked Draft PRs
recommended — see [delivery-github-stack](../../references/delivery-github-stack.md)).

## Trigger matrix

If **any** row matches, update the listed doc(s) in the **phase** shown. If none
match, mark N/A on the checklist.

| Change | Update | Phase |
|--------|--------|-------|
| New or renamed Preferred Term, business concept, package module, frontend route, API prefix | Glossary | **1** (before code) |
| Planned domain delta (review before as-built merge) | `C4-Code-Domain-Model-Plan.puml` (GitHub diff colors) | **1** (optional) |
| New/changed aggregate, entity, VO, domain association, or public domain method on aggregate/entity | `C4-Code-Domain-Model.puml` | **1** (before code); **3** if reconcile after implementation |
| New actor / external system / system purpose | `C1-Context.puml` | **3** |
| New app/API container, subdomain, major data store, public port | `C2-Container.puml` (+ C1 if actors/systems change) | **3** |
| New feature module, UI app surface, or cross-app wiring | `C3-Component.puml` (single combined diagram) | **3** |
| Local or production deploy topology, ports, hosting | `C4-Deployment.puml` (single combined view) | **3** |
| New or changed critical runtime path (auth, proxy, WS, payment, …) | `C4-Dynamic-{Flow}.puml` (+ `style.puml` if structural tokens change) | **3** |
| New user-visible capability, nav/module add/remove, delivery status change | User Story Map index **and** the matching `user-stories/E*.md` | **3** |
| Default boot command, ports, datastore, or public Live URL change | Root `README.md` Get started / Configuration — [readme](./readme.md) | **3** |
| Pure unit/integration tests, formatting, dependency bump with no product/architecture semantics | None (N/A) | — |

Do **not** invent split files such as `C3-Component-Backend.puml` /
`C3-Component-Frontend.puml` or a separate production-only deployment diagram
unless the repo already standardized on them. Follow [c4-model](./c4-model.md).
Domain / Dynamic diagrams must use the IAM white/black skeletons in [c4-model](./c4-model.md) (`!theme plain` + black borders; UML `+` members; not C4-PlantUML dynamic `Rel`). Structural C4 inlines [`style.puml`](./style.puml) (no `C4_blue_new` / `style-zinc`).

`.puml` first. Regenerate `png/` when PlantUML is available; otherwise note in
the PR that PNGs are stale.

## Example — new Metrics module

Adding a Metrics feature module + `/metrics` route + `/api/metrics`:

**Phase 1 (before code)**

1. **Glossary** — Preferred Term *Metrics*, route `/metrics`, API prefix `/api/metrics`.
2. **`C4-Code-Domain-Model.puml`** — `MetricSnapshot` aggregate with `+capture(metricId, value)`, `MetricId` VO, associations.

**Phase 2**

3. Implement domain → service → controller → tests (names from Glossary / domain model).

**Phase 3 (after code, CI green)**

4. **`C2-Container.puml`** and **`C3-Component.puml`** — new module and wiring.
5. **`C4-Dynamic-{Flow}.puml`** — if a new critical request path (e.g. metrics ingest).
6. Reconcile **`C4-Code-Domain-Model.puml`** if implementation diverged.
7. **User Story Map** — add US to Backbone / Epic index with status.
8. **`user-stories/E*.md`** — As a / I want / So that, GWT AC, status.
