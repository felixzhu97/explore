# Skills

Meta-repo skills for **Public Docs** (`felixzhu97/public`). General skills
(developer, spring-ai, angular-developer, jira-delivery, …) are maintained
only in `~/.cursor/skills/` on each machine and are not copied here.

## Layout

```text
.cursor/
├── rules/                          # Project + vendored global rules
│   ├── public-docs-meta.mdc        # Meta-repo whitelist (always apply)
│   ├── living-docs.mdc             # Scoped living-docs trigger
│   ├── architecture.mdc            # ← ~/.cursor/rules (global copy)
│   ├── java-standards.mdc
│   └── angular-standards.mdc
└── skills/
    ├── README.md                   # This file
    ├── developers/public-docs/     # Meta-repo only
    └── product-owner/public-docs-backlog/  # Meta-repo only
```

Rules link to general skills with `~/.cursor/skills/...` paths.

## Meta-repo skills

| Skill | Path | Use when |
|-------|------|----------|
| public-docs | [developers/public-docs/](./developers/public-docs/) | Nested Git, living docs, sync docs, C4, GitHub Stack, commit/PR |
| public-docs-backlog | [product-owner/public-docs-backlog/](./product-owner/public-docs-backlog/) | Stories / AC / DoD for sync or C4 work |

When editing **nested project application source** (not meta whitelist paths),
use the general skills in `~/.cursor/skills/developers/`. When **syncing docs
into this meta-repo**, use [public-docs](./developers/public-docs/).

## Refresh rules and agents from global (maintainers)

```bash
cp ~/.cursor/rules/{architecture,java-standards,angular-standards}.mdc .cursor/rules/
cp ~/.cursor/agents/*.md .cursor/agents/
```
