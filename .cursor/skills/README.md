# Skills

Cursor skills for **Public Docs** (`felixzhu97/public`). This directory is
**self-contained** — clone the repo on another machine and point Cursor at
`.cursor/` (rules + skills) without copying from `~/.cursor/`.

## Layout

Path formula: `.cursor/skills/{role}/{skill}/SKILL.md`

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
    ├── developers/                 # Scrum Developers accountability
    │   ├── public-docs/            # Meta-repo overlay (not in global rsync)
    │   └── jira-delivery/          # Jira templates / MCP (global sync)
    ├── product-owner/              # Scrum PO accountability
    │   └── public-docs-backlog/    # Meta-repo overlay (not in global rsync)
    ├── scrum-master/
    ├── executive/ … compliance/ …  # Stakeholder roles (flat, no team layer)
    └── architect/ … devops/ …      # Supporting roles (flat, no team layer)
```

Cursor plugin skills stay under `~/.cursor/skills-cursor/` on each machine
(not vendored here).

## Scrum roles

| Role | Index | Notes |
|------|-------|-------|
| Developers | [developers/SKILL.md](./developers/SKILL.md) | Build, quality, analysis skills |
| Product Owner | [product-owner/SKILL.md](./product-owner/SKILL.md) | Backlog, AC, iteration value |
| Scrum Master | [scrum-master/SKILL.md](./scrum-master/SKILL.md) | Process improvement |

Stakeholders (Executive, Customer, Compliance, …) and supporting roles
(Architect, DevOps, UX Designer, Researcher) are **flat** under `skills/` —
see [GLOBAL-SKILLS-INDEX.md](./GLOBAL-SKILLS-INDEX.md).

## Meta-repo skills

| Skill | Path | Use when |
|-------|------|----------|
| public-docs | [developers/public-docs/](./developers/public-docs/) | Nested Git, living docs, sync docs, C4, GitHub Stack, commit/PR |
| public-docs-backlog | [product-owner/public-docs-backlog/](./product-owner/public-docs-backlog/) | Stories / AC / DoD for sync or C4 work |

See [public-docs/SKILL.md](./developers/public-docs/SKILL.md) and
[public-docs-backlog/SKILL.md](./product-owner/public-docs-backlog/SKILL.md).

When editing **nested project application source** (not meta whitelist paths),
prefer `developers/` skills. When **syncing docs into this meta-repo**, prefer
[public-docs](./developers/public-docs/).

## Refresh from global (maintainers)

```bash
cp ~/.cursor/rules/{architecture,java-standards,angular-standards}.mdc .cursor/rules/
cp ~/.cursor/agents/*.md .cursor/agents/
for role in developers product-owner scrum-master \
  executive compliance customer user sponsor business-owner subject-matter-expert \
  architect devops ux-designer researcher; do
  rsync -a ~/.cursor/skills/"$role"/ .cursor/skills/"$role"/
done
cp ~/.cursor/skills/README.md .cursor/skills/GLOBAL-SKILLS-INDEX.md
```

**Note:** `rsync` without `--delete` preserves meta-only overlays
`developers/public-docs/` and `product-owner/public-docs-backlog/`. After global
refresh, verify `jira-delivery/` name matches global if the directory was
renamed there too.
