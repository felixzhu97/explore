# Acceptance Criteria

Use **numbered scenarios** with **Scenario / GIVEN / WHEN / THEN** (and optional **AND**). Each scenario is independently testable.

Scope for this repo: **syncing architecture docs** and **updating C4 models** — not application feature UX, and not publishing user-story markdown trees.

## Format

```
1.
   **Scenario** [short outcome name]
   **GIVEN** [precondition / repo state]
   **WHEN** [maintainer or contributor action]
   **THEN** [observable result]
   **AND** [additional observable result]   ← optional
```

## Rules

- Each AC item includes **Scenario**, **GIVEN**, **WHEN**, **THEN** (and optional **AND**)
- One scenario = one behavior; name it in learning/maintainer language
- At least **3** scenarios per ticket (happy path + edge cases)
- **GIVEN** = state only; **WHEN** = single trigger; **THEN/AND** = observable outcomes only
- No low-level implementation noise (class names, internal APIs) unless verifying a cited source path
- Present tense

## Good examples (sync / C4)

```
1.
   **Scenario** Publish C4 docs via whitelist
   **GIVEN** a project has an updated docs/developer/c4-model tree locally
   **WHEN** the maintainer stages whitelist paths and opens a PR
   **THEN** only whitelist paths appear in the PR diff
   **AND** full application source trees are not included

2.
   **Scenario** Context diagram matches project boundaries
   **GIVEN** the Explore AI system context PlantUML is open for edit
   **WHEN** a contributor updates actors and external systems from project docs
   **THEN** the C1 diagram reflects those boundaries
   **AND** the commit References cite the project documentation page

3.
   **Scenario** Catalog lists the new project
   **GIVEN** a new project's C4 folder is ready to publish
   **WHEN** the maintainer adds the Title Case name and kebab-case path to the README Projects table
   **THEN** learners can find the docs path from the README
```

## Bad examples (avoid)

```
1.
   **Scenario** Run git add
   **WHEN** files are added
   **THEN** git works

2.
   **Scenario** Diagram updated
   **GIVEN** someone wants better docs
   **WHEN** they edit something
   **THEN** it is better
```
