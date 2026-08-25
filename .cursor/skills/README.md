# Skills

Cursor skills for **Public Docs** (`felixzhu97/public`). This directory is
**self-contained** — clone the repo on another machine and point Cursor at
`.cursor/` (rules + skills) without copying from `~/.cursor/`.

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
    ├── README.md                   # This file — meta-repo entry points
    ├── GLOBAL-SKILLS-INDEX.md      # ← ~/.cursor/skills/README.md (global copy)
    ├── developer/                  # Meta-repo: sync, C4, gh stack, nested Git
    ├── product-owner/              # Meta-repo: sync/C4 tickets
    ├── scrum-team/                 # ← ~/.cursor/skills/scrum-team (global copy)
    ├── stakeholders/               # ← ~/.cursor/skills/stakeholders
    └── supporting/                 # ← ~/.cursor/skills/supporting
```

Cursor plugin skills stay under `~/.cursor/skills-cursor/` on each machine
(not vendored here).

## Meta-repo skills (this catalog)

| Skill | Use when |
|-------|----------|
| [developer](./developer/) | Nested Git, living docs, sync docs, C4, GitHub Stack, commit/PR |
| [product-owner](./product-owner/) | Stories / AC / DoD for sync or C4 work |

See [developer/SKILL.md](./developer/SKILL.md) and
[product-owner/SKILL.md](./product-owner/SKILL.md).

## Vendored global skills

Full copy of `~/.cursor/skills/` (excluding this repo's top-level
`developer/` / `product-owner/` overlays):

| Tree | Index |
|------|-------|
| Scrum Team | [scrum-team/SKILL.md](./scrum-team/SKILL.md) |
| Stakeholders | [stakeholders/SKILL.md](./stakeholders/SKILL.md) |
| Supporting | [supporting/SKILL.md](./supporting/SKILL.md) |

Overview: [GLOBAL-SKILLS-INDEX.md](./GLOBAL-SKILLS-INDEX.md)

When editing **nested project application source** (not meta whitelist paths),
prefer `scrum-team/developers/` skills. When **syncing docs into this
meta-repo**, prefer `./developer/`.

## Refresh from global (maintainers)

```bash
cp ~/.cursor/rules/{architecture,java-standards,angular-standards}.mdc .cursor/rules/
cp ~/.cursor/agents/*.md .cursor/agents/
rsync -a ~/.cursor/skills/scrum-team/ .cursor/skills/scrum-team/
rsync -a ~/.cursor/skills/stakeholders/ .cursor/skills/stakeholders/
rsync -a ~/.cursor/skills/supporting/ .cursor/skills/supporting/
cp ~/.cursor/skills/README.md .cursor/skills/GLOBAL-SKILLS-INDEX.md
```
