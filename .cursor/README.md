# Cursor config (portable)

This `.cursor/` tree is **vendored for cross-machine development**. After
clone, enable project rules/skills in Cursor — no manual copy from
`~/.cursor/` required.

| Path | Source | Role |
|------|--------|------|
| [rules/public-docs-meta.mdc](./rules/public-docs-meta.mdc) | Project | Meta-repo whitelist, nested Git, stack delivery |
| [rules/living-docs.mdc](./rules/living-docs.mdc) | Project | Living-docs globs |
| [rules/architecture.mdc](./rules/architecture.mdc) | `~/.cursor/rules` | Java DDD layers, naming, tests |
| [rules/java-standards.mdc](./rules/java-standards.mdc) | Global copy | Java conventions |
| [rules/angular-standards.mdc](./rules/angular-standards.mdc) | Global copy | Angular conventions |
| [skills/](./skills/) | Mixed | Meta `developer/` + `product-owner/` + global `scrum-team/` / `stakeholders/` / `supporting/` |

Index: [skills/README.md](./skills/README.md)

Refresh commands: see **Refresh from global** in [skills/README.md](./skills/README.md).
