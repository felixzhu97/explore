# C4 model (PlantUML) — standards & style

Canonical layout and style for repo living C4 diagrams, taken from the
explore-portfolio `docs/developer/c4-model/` conventions (generalize product
names to the current repo).

Path when present: `docs/developer/c4-model/`.  
**Source of truth:** `.puml`. PNG is optional; regenerate when PlantUML is available.

Official C4: [c4model.com](https://c4model.com/).  
Library: [C4-PlantUML](https://github.com/plantuml-stdlib/C4-PlantUML).

## Visual tracks (do not mix)

| Track | Files | Style |
|-------|-------|-------|
| **Structural C4** | C1–C3, Deployment | Official **`C4_blue_new`** theme (wireframe; covers components) |
| **Domain + Dynamics** | Code domain model, `C4-Dynamic-*` | Shared zinc look via `style-zinc.puml` |

Rules:

- Do **not** apply `C4_blue_new` to domain/dynamic diagrams.
- Do **not** apply `style-zinc.puml` to structural C1–C3 / Deployment.
- Prefer `C4_blue_new` over bare `!NEW_C4_STYLE=1` so Component keeps the wireframe look.

### When to open which track

- Boundaries / deploy topology → Structural C4 (`C4_blue_new`).
- Ubiquitous language / aggregates → Code domain model (`style-zinc.puml`).
- Runtime request paths (login, proxy, WS subscribe, …) → `C4-Dynamic-*` (`style-zinc.puml`).

## Required file set

| File | Level | Owns |
|------|-------|------|
| `C1-Context.puml` | Context | People, system boundary, external systems |
| `C2-Container.puml` | Container | Apps, APIs, data stores, major tech + ports |
| `C3-Component.puml` | Component | **One** diagram: backend modules **and** UI apps (do **not** split Backend/Frontend siblings) |
| `C4-Code-Domain-Model.puml` | Code | DDD class model (aggregates / entities / VOs + public domain behavior) |
| `C4-Deployment.puml` | Deployment | **One** view: local/dev + production notes |
| `C4-Dynamic-{Flow}.puml` | Dynamic | One sequence diagram per critical runtime flow (as many as needed) |
| `style-zinc.puml` | Shared | Zinc styles for Code + Dynamics only — copy from [style-zinc.puml](./style-zinc.puml) |
| `README.md` | Index | File table, visual tracks, stack/ports, render command |

Keep Component and Deployment **unsplit** unless the repo already has an approved exception.

## Style — Structural C4 (C1–C3 / Deployment)

1. Theme **before** C4 includes:

```plantuml
!theme C4_blue_new from https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/themes
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml
```

   Same pattern for `C4_Container.puml` / `C4_Component.puml` / `C4_Deployment.puml`.
2. Title format: `System Context (C1) — {Product}` / `Container Diagram (C2) — {Product}` / `Component Diagram (C3) — {Product} (backend + frontends)` / `Deployment (C4) — local/dev + production`.
3. Prefer English labels; `Rel(from, to, "label", "protocol")` with concrete protocols (`HTTPS`, `HTTP :port`, `JDBC`, `REST /api/v1`, …).
4. Group with `System_Boundary` / `Container_Boundary` / `Deployment_Node`.
5. Ids in `snake_case`; human names in Title Case; hint tech + path/port when useful.
6. End with `SHOW_LEGEND()` when using C4-PlantUML legends.

## Style — Domain + Dynamics (`style-zinc.puml`)

Canonical file: [style-zinc.puml](./style-zinc.puml) (zinc look, not “domain-only”). New or lagging repos **copy** it to `docs/developer/c4-model/style-zinc.puml`. Code + Dynamic diagrams start with `!include style-zinc.puml`.

If a repo still has `style-domain.puml`, **rename** it to `style-zinc.puml` and update includes in the same change.

Do **not** use C4-PlantUML `Rel` / `C4_Container` dynamic diagrams. Dynamics are **PlantUML sequence** (`actor` / `participant` / `database`).

### Tokens (do not invent a second palette)

Domain (class):

| Stereotype | Fill / border |
| ---------- | ------------- |
| AggregateRoot | emerald `#ECFDF5` / `#10B981` |
| Entity | blue `#EFF6FF` / `#3B82F6` |
| ValueObject | orange `#FFF7ED` / `#FB923C` |
| enum | amber `#FFFBEB` / `#F59E0B` |
| package | zinc white / `#E4E4E7` |

Also: `linetype ortho`; `hide empty members`; no shadow.

Sequence:

| Stereotype | Role | Tint (fill / border) |
| ---------- | ---- | -------------------- |
| (actor) | User / person | emerald `#ECFDF5` / `#10B981` |
| `<<ui>>` | Portal / Admin / Mobile | slate `#F8FAFC` / `#64748B` |
| `<<java>>` | Java API | blue `#EFF6FF` / `#3B82F6` |
| `<<python>>` | Python service | teal `#F0FDFA` / `#14B8A6` |
| `<<db>>` | Database | amber `#FFFBEB` / `#F59E0B` |
| `<<bus>>` | Message bus / cache | orange `#FFF7ED` / `#FB923C` |
| `<<external>>` | External systems | zinc `#F4F4F5` / `#A1A1AA` |

Also: `sequenceMessageAlign center`. `style-zinc.puml` ships both `<style>` and `skinparam` stereotype fallbacks — keep both if you edit tokens.

### Code / domain model

Must be a DDD class model (kernel + types + **public domain behavior** on aggregates/entities). Code: [ddd-rich-model](./ddd-rich-model.md).

Required header:

```plantuml
@startuml C4-Code-Domain-Model
!include style-zinc.puml
title Code diagram (C4) — {Product} domain model (DDD)
hide empty members
```

Hard rules:

1. Package `ddd kernel` shows `AbstractImmutable`, `AbstractEntity`, `AbstractEmbeddable`; `AbstractEntity --|> AbstractImmutable`.
2. Aggregate `--|> AbstractEntity` with `<<AggregateRoot>>`; child entity `--|> AbstractEntity` with `<<Entity>>`; VO `--|> AbstractEmbeddable` with `<<ValueObject>>`. `enum` stays `<<ValueObject>>`.
3. One package per bounded context. `"1" *-- "0..*"` ownership; `o--` optional; `-->` reference.
4. No controller, DTO, or infra types on the diagram.
5. Every `<<AggregateRoot>>` and `<<Entity>>` lists **all public domain methods** as PlantUML `+methodName(params)` — Glossary verbs, camelCase; must match code. Do **not** list `getXxx` / `isXxx` or other accessors. `<<ValueObject>>` shows type + associations only (list VO methods only when they carry domain behavior).

Do **not** draw only stereotypes without kernel inheritance.

Skeleton:

```plantuml
@startuml C4-Code-Domain-Model
!include style-zinc.puml
title Code diagram (C4) — {Product} domain model (DDD)
hide empty members

legend right
  |= Stereotype |= Meaning |
  | <<AggregateRoot>> | Consistency boundary |
  | <<Entity>> | Identity + lifecycle |
  | <<ValueObject>> | Immutable; equality by value |
  | +method | Public domain behavior (Glossary verb) |
endlegend

package "ddd kernel" as pkg_kernel {
  abstract class AbstractImmutable
  abstract class AbstractEntity
  abstract class AbstractEmbeddable
}

AbstractEntity --|> AbstractImmutable

package "sample" as pkg_sample {
  class SampleAggregate <<AggregateRoot>> {
    +rename(name)
  }
  class SampleEntity <<Entity>> {
    +activate()
  }
  class SampleValue <<ValueObject>>
}

SampleAggregate --|> AbstractEntity
SampleEntity --|> AbstractEntity
SampleValue --|> AbstractEmbeddable
SampleAggregate "1" *-- "0..*" SampleEntity : contains
SampleAggregate --> SampleValue

@enduml
```

### Dynamic diagrams (sequence)

Required header (filename = `@startuml` id = `C4-Dynamic-{Flow}`):

```plantuml
@startuml C4-Dynamic-{Flow}
!include style-zinc.puml
title Dynamic — {short flow name}
```

Then:

1. One **critical user/runtime path** per file (happy path + essential notes); not every endpoint in one mega-sequence.
2. `actor` for people; `database` for stores; `participant` for UI / API / bus / external. Every non-actor has a role stereotype from the token table.
3. Participant labels: human name + module/path + port when useful; wrap with `\n`. Aliases lowercase (`ui`, `auth`, `db`).
4. Number messages `1. …`; returns `-->`; optional/config hops labeled `(optional)` / `(if enabled)`.
5. `legend right` Role|Color — **only roles that appear in this file**.
6. One short `note right/left of` for auth header, WS payload, or docs pointer — no essays.
7. Prefer English for titles and technical labels; Glossary Preferred Terms for domain names.

Skeleton:

```plantuml
@startuml C4-Dynamic-Auth-Login
!include style-zinc.puml
title Dynamic — Auth login (Bearer token)

actor User as user
participant "Portal / Admin" as ui <<ui>>
participant "Java API\nauth module :{port}" as auth <<java>>
database "PostgreSQL" as db <<db>>

user -> ui: 1. Submit email + password
ui -> auth: 2. POST /api/v1/auth/login
auth -> db: 3. Lookup credentials
db --> auth: 4. User row
auth --> ui: 5. 200 { token }
ui --> user: 6. Store Bearer token

legend right
  |= Role |= Color |
  | Actor | Emerald |
  | <<ui>> | Slate |
  | <<java>> | Blue |
  | <<db>> | Amber |
endlegend

note right of auth
  Protected APIs require
  Authorization: Bearer <token>
end note

@enduml
```
## Render

```bash
# plantuml on PATH
plantuml -tpng docs/developer/c4-model/*.puml
```

Commit `.puml` (+ README + `style-zinc.puml`). Online: [PlantUML server](https://www.plantuml.com/plantuml/uml/).

## When to edit (cheat sheet)

| File | Update when |
|------|-------------|
| `C1-Context.puml` | New actor/external system, or system purpose change |
| `C2-Container.puml` | New app/API container, subdomain, major store, port change |
| `C3-Component.puml` | New feature module, UI app surface, or cross-app wiring |
| `C4-Code-Domain-Model.puml` | New/changed aggregate, entity, VO, domain association, or public domain method |
| `C4-Deployment.puml` | Local or prod topology, ports, hosting, runtime nodes |
| `C4-Dynamic-{Flow}.puml` | New or changed critical runtime path (auth, proxy, WS, payment, …) |
| `style-zinc.puml` | Shared Code/Dynamic visual tokens change |
| `README.md` | File list, visual tracks, stack/ports, or render notes change |

Living-docs trigger matrix: [living-docs](./living-docs.md).
