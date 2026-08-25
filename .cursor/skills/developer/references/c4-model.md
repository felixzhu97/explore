# Update C4 Model

Architecture insight in this repo lives under each project's `docs/developer/c4-model/`. Prefer **PlantUML** (`.puml`) as source of truth.

## Paths

| Project | Path |
|---------|------|
| Explore AI | [`explore-ai/docs/developer/c4-model/`](../../../../explore-ai/docs/developer/c4-model/) |
| Explore IAM | [`explore-iam/docs/developer/c4-model/`](../../../../explore-iam/docs/developer/c4-model/) |
| Explore Chat | [`explore-chat/docs/developer/c4-model/`](../../../../explore-chat/docs/developer/c4-model/) |
| Explore Commerce | [`explore-commerce/docs/developer/c4-model/`](../../../../explore-commerce/docs/developer/c4-model/) |
| Explore Lowcode | [`explore-lowcode/docs/developer/c4-model/`](../../../../explore-lowcode/docs/developer/c4-model/) |

New projects use: `<project>/docs/developer/c4-model/`.

## File naming (required)

Follow [c4model.com/diagrams](https://c4model.com/diagrams). Keep the directory **flat** (no nested type folders). **Every** `.puml` file must use a `C1-`–`C4-` level prefix.

Public catalog uses mature-project names (not community’s `C1-SystemContext`):

| Prefix | Diagram kind | Filename pattern | Example |
|--------|--------------|------------------|---------|
| `C1-` | System Context | `C1-Context.puml` | `C1-Context.puml` |
| `C2-` | Container | `C2-Container.puml` | `C2-Container.puml` |
| `C3-` | Component | `C3-Component.puml` or `C3-Component-<Scope>.puml` | `C3-Component.puml` |
| `C4-` | Code | `C4-Code-<Scope>.puml` | `C4-Code-Domain-Model.puml` |
| `C4-` | Dynamic (supporting) | `C4-Dynamic-<Scenario>.puml` | `C4-Dynamic-Rag-Ask.puml` |
| `C4-` | Deployment (supporting) | `C4-Deployment.puml` | `C4-Deployment.puml` |

Rules:

- One diagram per file; multiple views of the same kind use distinct `<Scope>` / `<Scenario>` suffixes
- Prefer PascalCase after the kind token (`Context`, not `system-context`)
- Include a short `README.md` index in the same flat directory
- Filenames stay English; diagram **content** and README follow the Language section below

## Language (required)

All catalog projects use **Chinese** for diagram and README prose. Filenames remain English PascalCase with `C1-`–`C4-` prefixes.

| Field | Pattern | Example |
|-------|---------|---------|
| `title` | `中文 — 项目` | `系统上下文图 — Explore AI` |
| Element name | 中文角色/概念；专业名保留英文 | `终端用户`、`NestJS API`、`Spring AI` |
| Element description | 中文叙述，术语不翻译 | `"通过 BFF 调用对话与 RAG 能力。"` |
| `Rel` label | 中文；协议 / API 名保留英文 | `"HTTPS /api/v1"`、`"SSE"` |
| README | 中文；Kind 列用中文图类型名 | `系统上下文`、`容器`、`组件` |

**Do not** force-translate product names, package IDs, class/API names, or protocols.

Reference layout:

```text
docs/developer/c4-model/
├── README.md
├── style-zinc.puml          # shared by Code + Dynamic tracks (when used)
├── C1-Context.puml
├── C2-Container.puml
├── C3-Component.puml
├── C4-Code-Domain-Model.puml
├── C4-Dynamic-<Scenario>.puml
└── C4-Deployment.puml
```

## README index (required)

Each `docs/developer/c4-model/README.md` should include:

1. Chinese title + C4 / C4-PlantUML note
2. Flat layout tree
3. Diagram table (Path / Kind / Summary)
4. Render command: `plantuml docs/developer/c4-model/*.puml`
5. Source anchors (key packages / directories)

Optional PNG previews and longer tech-stack notes may follow.

## Trigger matrix

If **any** row matches, update the listed artifacts in the **same PR**. If none match, mark N/A.

| Change | Update |
|--------|--------|
| New external actor/system, or system purpose change | `C1-Context.puml` |
| New container, subdomain boundary, major data store | `C2-Container.puml` |
| New/changed module or component structure inside a container | `C3-Component.puml` (prefer single combined diagram) |
| New/changed class-level design worth a Code view | `C4-Code-Domain-Model.puml` or `C4-Code-<Scope>.puml` |
| New/changed critical runtime flow | `C4-Dynamic-<Scenario>.puml` (+ `style-zinc.puml` when styles change) |
| Deploy topology, ports, hosting | `C4-Deployment.puml` |
| Project added to or removed from the catalog | Matching `docs/developer/c4-model/` + root README Projects |
| Pure wording polish with no architecture semantics | None (N/A) |

## Rules

1. Edit `.puml` first
2. If PNG previews exist, refresh them in the same PR when PlantUML is available; otherwise note in the PR that PNGs are pending
3. When diagrams conflict with project docs or source, **project source wins** — cite docs in commit/PR References ([commit-pr](commit-pr.md))
4. Keep diagrams minimal and verifiable (tie claims to real containers/components or source paths)

## Workflow

1. Identify which layer(s) the change affects (matrix above)
2. Update the matching flat `.puml` files under `*/docs/developer/c4-model/`
3. Sync via [sync-repo](sync-repo.md)
4. Commit / open PR per [commit-pr](commit-pr.md)
