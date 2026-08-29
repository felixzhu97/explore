# C4 模型 — Explore Platform

平台级架构视图（Nx 工作区根）。各应用限界上下文的详细 C1–C4 见
`explore-*/docs/developer/c4-model/`。

基于 [C4 Model](https://c4model.com/) + [C4-PlantUML](https://github.com/plantuml-stdlib/C4-PlantUML)。

## 布局

```text
docs/developer/c4-model/
├── README.md
├── style-zinc.puml
├── C1-Context.puml
├── C2-Container.puml
├── C4-Code-Domain-Model.puml
└── C4-Dynamic-Explore-Ai-Bff.puml
```

## 图索引

| Path | Kind | Summary |
|------|------|---------|
| [C1-Context.puml](C1-Context.puml) | 系统上下文 | Explore 目录五系统与用户 / 外部依赖 |
| [C2-Container.puml](C2-Container.puml) | 容器 | 各 app 主容器 + `packages/*` |
| [C4-Code-Domain-Model.puml](C4-Code-Domain-Model.puml) | 代码 | Shared Kernel / Published Language / ACL |
| [C4-Dynamic-Explore-Ai-Bff.puml](C4-Dynamic-Explore-Ai-Bff.puml) | 动态 | Chat BFF → contracts-ai → Explore AI |

不建根级 C3：组件细节留在各 project C3。

## 渲染

```bash
plantuml docs/developer/c4-model/*.puml
```

`style-zinc.puml` 仅用于 Code / Dynamic；C1–C2 使用 C4-PlantUML 主题。

## 源锚点

- 平台术语：[`docs/Glossary.md`](../../Glossary.md)
- 依赖边：[`packages/DEPENDENCIES.md`](../../../packages/DEPENDENCIES.md)
- 契约：[`packages/contracts-ai/`](../../../packages/contracts-ai/)
- Chat ACL：`explore-chat` Explore AI BFF（E8 / US-11）
