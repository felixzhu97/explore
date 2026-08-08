# Skills

Project skills for **Public Docs**. Thin `SKILL.md` entry points; details live in each skill's `references/`.

## Skills

| Skill | Use when |
|-------|----------|
| [developer](./developer/) | Nested project Git, sync architecture docs, update C4, branch / commit / PR |
| [product-owner](./product-owner/) | Write stories, acceptance criteria, and DoD for sync-repo or C4 work (no user-story markdown tree) |

## References layout

```text
developer/references/
  nested-git.md   # .git ↔ .git.local for project clones
  sync-repo.md    # whitelist, stage commands, onboard project
  c4-model.md     # docs/developer/c4-model flat C1–C4 naming
  commit-pr.md    # branch / commit / PR

product-owner/references/
  story-template.md
  acceptance-criteria.md
```

## How to use

- Prepare nested project Git → `developer` → [nested-git](./developer/references/nested-git.md)
- Sync docs or edit C4 → `developer`
- Commit or open a PR → `developer` → [commit-pr](./developer/references/commit-pr.md)
- Shape a sync/C4 ticket → `product-owner`
