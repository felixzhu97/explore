# C4 模型 — Explore Platform

平台级架构视图（Nx 工作区根）。各应用限界上下文的详细 C1–C4 见
`explore-*/docs/developer/c4-model/`。

基于 [C4 Model](https://c4model.com/) + [C4-PlantUML](https://github.com/plantuml-stdlib/C4-PlantUML)。

## 布局

```text
docs/developer/c4-model/
├── README.md
├── style-zinc.puml
└── C4-Code-Domain-Model.puml
```

## 图索引

| Path | Kind | Summary |
|------|------|---------|
| [C4-Code-Domain-Model.puml](C4-Code-Domain-Model.puml) | 代码 | Shared Kernel / Published Language / ACL |

后续层补充 C1 / C2 / Dynamic。

## 渲染

```bash
plantuml docs/developer/c4-model/*.puml
```

## 源锚点

- 平台术语：[`docs/Glossary.md`](../../Glossary.md)
- 依赖边：[`packages/DEPENDENCIES.md`](../../../packages/DEPENDENCIES.md)
