# Cursor config (portable)

This `.cursor/` tree carries the rules, agents, and meta-repo skills for this
repo. General skills live only in `~/.cursor/skills/` on each machine.

| Path | Source | Role |
|------|--------|------|
| [rules/public-docs-meta.mdc](./rules/public-docs-meta.mdc) | Project | Meta-repo whitelist, nested Git, stack delivery |
| [rules/living-docs.mdc](./rules/living-docs.mdc) | Project | Living-docs globs |
| [rules/architecture.mdc](./rules/architecture.mdc) | `~/.cursor/rules` | Java DDD layers, naming, tests |
| [rules/java-standards.mdc](./rules/java-standards.mdc) | Global copy | Java conventions |
| [rules/angular-standards.mdc](./rules/angular-standards.mdc) | Global copy | Angular conventions |
| [agents/](./agents/) | `~/.cursor/agents` | Custom subagents (13 roles: compliance, security-architect, …) |
| [skills/](./skills/) | Project | Meta-repo skills only (`public-docs`, `public-docs-backlog`) |

Indexes:

- [agents/README.md](./agents/README.md)
- [skills/README.md](./skills/README.md)

## Refresh from global (maintainers)

```bash
cp ~/.cursor/rules/{architecture,java-standards,angular-standards}.mdc .cursor/rules/
cp ~/.cursor/agents/*.md .cursor/agents/
```

Not vendored: general skills in `~/.cursor/skills/` and Cursor plugin skills in
`~/.cursor/skills-cursor/` (per machine).
