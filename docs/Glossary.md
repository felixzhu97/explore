# Glossary | 平台术语表

> Explore Platform — Ubiquitous Language（统一语言）  
> Scope: **Nx workspace root** (`felixzhu97/public`). Per-app terms live in
> `explore-*/docs/Glossary.md`.

---

## 1. Purpose | 文档说明

This document defines the **platform** Preferred Terms for the Explore catalog
and shared `packages/`. English terms are canonical for code, commits, and
architecture docs. Chinese labels support communication only.

### Maintenance Principles

1. **Glossary first** for platform concepts before changing `packages/` or
   cross-app contracts
2. **Do not** dump app domain aggregates here — keep those in project Glossaries
3. Align package names and Nx project names with Preferred Terms below

---

## 2. Catalogued apps | 目录应用（限界上下文）

| Preferred Term | 中文 | Path | Responsibility |
| -------------- | ---- | ---- | -------------- |
| Explore AI | Explore AI | `explore-ai/` | Conversational AI: Chat, RAG, tools, eval (Spring AI) |
| Explore IAM | Explore IAM | `explore-iam/` | Identity, policy, STS-style credentials for sibling apps |
| Explore Chat | Explore Chat (WhatsFeed) | `explore-chat/` | Social + messaging; Explore AI BFF |
| Explore Commerce | Explore Commerce | `explore-commerce/` | E-commerce web / admin / API |
| Explore Lowcode | Explore Lowcode | `explore-lowcode/` | Visual page builder |

Each catalogued app is a **Bounded Context**. Rich domain language stays in
that app’s Glossary and C4 Code domain model.

---

## 3. Preferred Terms | 平台术语

| Preferred Term (English) | 中文 | Definition | Type | Code / Path | Notes |
| ------------------------ | ---- | ---------- | ---- | ----------- | ----- |
| Explore Platform | Explore 平台 | Catalogued Explore apps + shared packages under one Nx Git root | Platform | `public/` | Docs meta + workspace |
| Nx Workspace | Nx 工作区 | Root tooling for graph, affected CI, shared packages | Technical | `nx.json`, `pnpm-workspace.yaml` | Keep `explore-*` paths (no `apps/`/`libs/` rename) |
| Catalogued App | 目录应用 | Project listed in root README and whitelisted for docs publish | Catalog | `explore-*/` | README + docs + `project.json` |
| Bounded Context | 限界上下文 | Autonomous model boundary; one catalogued app ≈ one BC | DDD | `explore-*/` | Cross-BC via Published Language, not shared domain DTOs |
| Shared Kernel | 共享内核 | Minimal shared types across BCs (service identity only) | DDD | `@explore/shared-types` | Do not grow into domain DTO dump |
| Published Language | 发布语言 | Cross-context contract owned by the provider BC | DDD | `@explore/contracts-ai` OpenAPI | Consumers adapt via ACL |
| Anti-Corruption Layer | 防腐层 | Consumer-side adapter that maps local model ↔ Published Language | DDD | Explore Chat Explore AI BFF | Isolates upstream types |
| Explore AI BFF | Explore AI 代理 | Nest proxy in Explore Chat for Explore AI (no browser secrets) | Integration | `explore-chat` → explore-ai | Headers: `X-Service-Key`, `X-Client-Id` |
| Client Identity | 客户端身份 | Stable UUID mapped to Explore AI owner scoping | Technical | `X-Client-Id` | See Explore AI Glossary for Owner Key |
| Dependency Catalog | 依赖目录 | Who depends on whom (Nx implicits + runtime) | Catalog | `packages/DEPENDENCIES.md` | Keep in sync with `implicitDependencies` |
| Dev Port Map | 开发端口表 | Canonical local listen ports for all catalogued apps | Technical | `@explore/dev-ports` | Bands: UI `42xx` (+10), API `9xxx` (+100), sidecars `81xx`/`82xx`, infra `85xx` |

---

## 4. Shared packages | 共享包

| Preferred Term / Package | 中文 | Role |
| ------------------------ | ---- | ---- |
| `@explore/shared-types` | 共享类型 | Shared Kernel: `ExploreServiceId`, `ExploreServiceRef` |
| `@explore/contracts-ai` | AI 契约 | Published Language OpenAPI for chat → ai |
| `@explore/dev-ports` | 开发端口 | Dev Port Map: `ports.json` + `getPort` helpers |
| `@explore/explore-bom` | Java BOM | Spring Boot / Spring AI version platform |
| `@explore/eslint-config` | ESLint 基线 | Shared ESLint flat config |
| `@explore/tsconfig-baselines` | TS 基线 | Shared TypeScript baselines |

Rules: see [`packages/README.md`](../packages/README.md). Cross-BC edges:
Published Language; platform packages may use `workspace:` when an app is a
pnpm member.

---

## 5. Living docs

| Level | Glossary | C4 |
| ----- | -------- | --- |
| Platform | This file | [`docs/developer/c4-model/`](developer/c4-model/) |
| App BC | `explore-*/docs/Glossary.md` | `explore-*/docs/developer/c4-model/` |

Change platform terms here **before** changing shared contracts or Nx graph
edges. Sync via [public-docs](../.cursor/skills/developers/public-docs/SKILL.md).
