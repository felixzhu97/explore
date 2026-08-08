# Story Template

Every ticket must include: **Background**, **User Story**, **Acceptance Criteria**, **Definition of Done**.

This template is for **Jira / ticket text**. It does **not** require adding `docs/product-owner/` files to the meta-repo.

## User Story Format

```
**As a** [role]
**I want** [action/feature]
**So that** [benefit/value]
```

Typical roles: learner, contributor, maintainer.

Typical actions: sync a project's architecture docs into the meta-repo; add or correct a C4 layer; update the README Projects table; onboard a kebab-case project directory.

## Full Template

```
## Background

[Explain why this sync or C4 update is needed]

## User Story

**As a** [role]
**I want** [action/feature]
**So that** [benefit/value]

## Acceptance Criteria

1.
   **Scenario** [name]
   **GIVEN** [precondition]
   **WHEN** [action]
   **THEN** [outcome]

2.
   **Scenario** [name]
   **GIVEN** [precondition]
   **WHEN** [action]
   **THEN** [outcome]
   **AND** [outcome]

3.
   **Scenario** [name]
   **GIVEN** [precondition]
   **WHEN** [action]
   **THEN** [outcome]

## Definition of Done

- [ ] Acceptance Criteria scenarios pass
- [ ] Architecture docs synced via whitelist only (no full source trees)
- [ ] C4 `.puml` updated per trigger matrix (or N/A)
- [ ] Root README Projects / entry points updated (or N/A)
- [ ] Linked commit/PR includes why + References (official / research)
- [ ] Staged via whitelist paths only (see developer sync-repo skill)
- [ ] User-story markdown trees were not added to the meta-repo
```

Add ticket-specific Done items when needed (e.g. PNG render, new `.gitignore` whitelist entry).

## Checklist

- [ ] Contains Background, User Story, Acceptance Criteria, and Definition of Done
- [ ] User story follows As a / I want / So that format
- [ ] At least 3 numbered scenarios with **Scenario** / GIVEN / WHEN / THEN
- [ ] Definition of Done checkboxes are concrete and testable

Detail: [acceptance-criteria.md](acceptance-criteria.md)
