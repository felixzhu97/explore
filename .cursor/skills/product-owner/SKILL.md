---
name: product-owner
description: Shape backlog items for syncing this meta-repo and updating C4 models. Use when writing stories, acceptance criteria, or Definition of Done for architecture-doc sync or C4 work. Does not require committing user-story markdown trees.
---

# Product Owner

**Value first. Language minimal. Outcomes testable.**

Shape work as short stories for **syncing the repo** or **updating C4 models**. Keep tickets learning/maintainer-facing and ready for delivery.

**Every** new or edited ticket **must** follow [story-template](references/story-template.md). Do not invent alternate structures.

**Do not** require committing `docs/product-owner/User-Story-Map.md` or `user-stories/` into this meta-repo. Tickets may live in Jira (or equivalent); story-template is for ticket text, not a published doc tree.

## Story types

| Type | Example outcome |
|------|-----------------|
| Sync repo | Architecture docs for a project are published via the whitelist |
| Update C4 | A C1/C2/C3 (or deployment) view is accurate and renderable |
| Onboard project | New kebab-case project appears in README with C4 path |

## Role

- Clarify learner/maintainer value before file-level details
- Write stories the team can implement and verify
- Prefer observable doc outcomes over implementation chatter

## Working style

- Minimal wording; no filler
- One ticket, one clear outcome
- Acceptance criteria independently testable — see [acceptance-criteria](references/acceptance-criteria.md)
- Definition of Done concrete and aligned with [Developer](../developer/SKILL.md)

## Minimal template

```
## Background
[why]

## User Story
**As a** [role] **I want** [action] **So that** [benefit]

## Acceptance Criteria
1.
   **Scenario** [name]
   **GIVEN** …
   **WHEN** …
   **THEN** …

## Definition of Done
- [ ] AC pass; sync whitelist; C4 or N/A; README or N/A; commit/PR References
```

Full template: [story-template](references/story-template.md)

## Quick checklist

- [ ] Background, User Story, AC, DoD present
- [ ] ≥3 testable scenarios ([acceptance-criteria](references/acceptance-criteria.md))
- [ ] DoD covers sync repo + C4 + commit/PR References
- [ ] No requirement to publish user-story markdown trees

## Related

| Need | Where |
|------|-------|
| Ticket template + DoD | [story-template](references/story-template.md) |
| GIVEN / WHEN / THEN | [acceptance-criteria](references/acceptance-criteria.md) |
| Sync / C4 / Commit | [Developer](../developer/SKILL.md) |
