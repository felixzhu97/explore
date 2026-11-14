# 跨项目方案

这里存放涉及多个 Explore 项目的方案，供后续开发引用。单个项目内部的执行计划仍放在该项目的 `docs/developer/exec-plans/`。

## 索引

| 方案 | 状态 | 涉及仓库 | 最后更新 |
|------|------|----------|----------|
| [Harness Engineering 推广](harness-engineering-rollout.md) | 暂停 | 全部 8 个项目 + 元仓库 | 2026-11-14 |
| [Workspace 助手：一个入口询问所有系统](workspace-assistant.md) | 草案 | explore-ai（入口），其余项目为数据来源 | 2026-11-14 |
| [Explore monorepo：一键启动与跨项目依赖](monorepo-migration.md) | 草案 | 全部 8 个项目 + 元仓库 | 2026-11-14 |
| [命名标准化：按法律法规、国际、国家与行业标准统一术语](naming-standards.md) | 草案 | 全部 8 个项目 + 元仓库 | 2026-11-14 |

状态取值：草案、进行中、暂停、已完成。

## 约定

- 一个方案一个文件，文件名用 kebab-case。
- 文件开头写状态与最后更新日期，状态变化时同步更新上面的索引表。
- 正文固定四部分：目标、现状、方案、推进顺序；最后加一节"经验记录"，写试做或交付中踩过的坑。
- 交付规则不在这里重复，直接遵循：
  - [living-docs](../../.cursor/skills/developers/public-docs/references/living-docs.md)：Glossary、领域模型先于代码；
  - [delivery-github-stack](../../.cursor/skills/developers/public-docs/references/delivery-github-stack.md)：有依赖的工作拆成细粒度 Draft PR。
- 不写本机绝对路径、密钥或个人信息。

## 模板

```markdown
# <方案名>

状态：草案 | 最后更新：YYYY-MM-DD | 涉及仓库：...

## 目标

## 现状

## 方案

## 推进顺序

## 经验记录
```
