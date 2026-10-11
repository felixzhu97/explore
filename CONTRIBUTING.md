# Contributing

Thanks for your interest in the Public Docs (explore) meta repository.

This repository publishes architecture diagrams (primarily C4 Model views),
Glossaries, and User Story Maps for learning — not full application source
trees.

## Before you contribute

- Content is for learning and respects project licenses and attribution
- Diagram layers are clear (C1 → C2 → C3)
- Include a short README or index (overview, diagram list, how to render)
- Prefer PlantUML sources; PNGs are optional
- Submit architecture docs only — no full source trees, secrets, or build
  artifacts

## Adding a project

1. Add `docs/developer/c4-model/` under the project directory (`C1-`–`C4-`
   naming)
2. Update the Projects table in the root [README.md](README.md)
3. Open a pull request against `main` with a clear description of what you
   added

## Commit messages

Use clear conventional-style messages, for example:

```text
docs(<project>): refine architecture diagram
docs(<project>): clarify container boundaries
docs(<project>): update deployment view
```

## Code of Conduct

Participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md).
