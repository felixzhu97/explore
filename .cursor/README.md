# Cursor config (portable)

This `.cursor/` tree is **vendored for cross-machine development**. After
clone, open the repo in Cursor — no manual copy from `~/.cursor/` required.

| Path | Source | Role |
|------|--------|------|
| [rules/public-docs-meta.mdc](./rules/public-docs-meta.mdc) | Project | Meta-repo whitelist, nested Git, stack delivery |
| [rules/living-docs.mdc](./rules/living-docs.mdc) | Project | Living-docs globs |
| [rules/architecture.mdc](./rules/architecture.mdc) | `~/.cursor/rules` | Java DDD layers, naming, tests |
| [rules/java-standards.mdc](./rules/java-standards.mdc) | Global copy | Java conventions |
| [rules/angular-standards.mdc](./rules/angular-standards.mdc) | Global copy | Angular conventions |
| [agents/](./agents/) | `~/.cursor/agents` | Custom subagents (11 roles: marketing, BA, PO, dev, AI, security, …) |
| [skills/](./skills/) | Mixed | Meta `developer/` + `product-owner/` + global scrum-team tree |

Indexes:

- [agents/README.md](./agents/README.md)
- [skills/README.md](./skills/README.md)

## Refresh from global (maintainers)

```bash
cp ~/.cursor/rules/{architecture,java-standards,angular-standards}.mdc .cursor/rules/
cp ~/.cursor/agents/*.md .cursor/agents/
rsync -a ~/.cursor/skills/scrum-team/ .cursor/skills/scrum-team/
rsync -a ~/.cursor/skills/stakeholders/ .cursor/skills/stakeholders/
rsync -a ~/.cursor/skills/supporting/ .cursor/skills/supporting/
cp ~/.cursor/skills/README.md .cursor/skills/GLOBAL-SKILLS-INDEX.md
```

Not vendored: `~/.cursor/skills-cursor/` (Cursor plugin skills, per machine).
