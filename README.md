# Public Docs

[![License](https://img.shields.io/badge/license-Learning-blue.svg)](#license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

A collection of **architecture diagrams** for application projects — primarily [C4 Model](https://c4model.com/) views — to help developers understand system boundaries, containers, and core components.

> **Scope:** Application projects under this workspace (`explore-ai`, `whatsfeed`, `low-code-platform`, …).  
> This repository publishes architecture models and **meta** maintainer skills only — not full application source trees.  
> Application project repos keep their own Git history; this meta-repo only stages whitelist C4 paths (plus root README / skills).

## Table of Contents

- [About](#about)
- [Projects](#projects)
- [Repository Layout](#repository-layout)
- [Skills](#skills)
- [Quick Start](#quick-start)
- [Suggested Learning Path](#suggested-learning-path)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## About

Architecture insight in application codebases is often scattered across source and ad-hoc docs. This repository brings reusable architecture views together so that:

- Newcomers can build a clear mental model (C1 → C2 → C3)
- Teams can discuss trade-offs against real projects
- Contributors can improve PlantUML models and explanations

Diagrams are written in **PlantUML**. Some directories also include pre-rendered PNGs for quick browsing.

**User story documents** (`docs/product-owner/User-Story-Map.md`, `user-stories/`) are **not** published here. They may remain in each project’s own Git repository for local use.

## Projects

| Project | Type | Path | Description |
|---------|------|------|-------------|
| [Explore AI](https://github.com/felixzhu97/explore-ai) | C4 | [`explore-ai/docs/developer/c4-model/`](explore-ai/docs/developer/c4-model/) | Conversational AI platform: Chat, RAG, tools, eval (Spring AI + Angular) |
| [WhatsFeed](https://github.com/felixzhu97/whatsfeed) | C4 | [`whatsfeed/docs/developer/c4-model/`](whatsfeed/docs/developer/c4-model/) | Social + messaging: feed, chat/calls, Nest API, optional AI |
| [Low Code Platform](https://github.com/felixzhu97/low-code-platform) | C4 | [`low-code-platform/docs/developer/c4-model/`](low-code-platform/docs/developer/c4-model/) | Visual page builder: canvas, components, themes, export |

## Repository Layout

```text
public-docs/
├── README.md
├── .cursor/skills/                         # meta maintainer skills
├── explore-ai/docs/developer/c4-model/     # C1–C4 flat
├── whatsfeed/docs/developer/c4-model/
└── low-code-platform/docs/developer/c4-model/
```

C4 path convention (public, not community’s `docs/c4-model/`):

```text
<project>/docs/developer/c4-model/
├── README.md
├── C1-Context.puml
├── C2-Container.puml
├── C3-Component-<Scope>.puml
└── C4-Deployment*.puml
```

## Skills

Maintainer workflows live under [`.cursor/skills/`](.cursor/skills/):

| Skill | Use when |
|-------|----------|
| [developer](.cursor/skills/developer/) | Nested Git, sync whitelist, update C4, branch / commit / PR |
| [product-owner](.cursor/skills/product-owner/) | Shape sync/C4 tickets (no user-story markdown tree required) |

Each application project should also keep its own `.cursor/skills/` (living-docs + product-owner) in **its** Git repo; those paths are not published in this meta-repo.

## Quick Start

### Browse PlantUML sources

1. **Online**: paste a `.puml` file into [PlantUML Online](https://www.plantuml.com/plantuml/uml/)
2. **Editor**: install a PlantUML extension in VS Code / Cursor and open the file
3. **CLI**:

```bash
brew install plantuml   # macOS
plantuml explore-ai/docs/developer/c4-model/C1-Context.puml
```

Useful entry points:

- [Explore AI system context](explore-ai/docs/developer/c4-model/C1-Context.puml)
- [WhatsFeed system context](whatsfeed/docs/developer/c4-model/C1-Context.puml)
- [Low Code Platform system context](low-code-platform/docs/developer/c4-model/C1-Context.puml)

## Suggested Learning Path

1. Read [Explore AI C4](explore-ai/docs/developer/c4-model/) for Spring AI + Angular container and deployment boundaries
2. Read [WhatsFeed C4](whatsfeed/docs/developer/c4-model/) for Nest API, clients, and Python service boundaries
3. Read [Low Code Platform C4](low-code-platform/docs/developer/c4-model/) for SPA canvas / domain layout and Vercel deploy
4. Compare how frontend shells, BFF/API containers, and external systems are drawn across projects

## Contributing

Issues and pull requests are welcome. You can help by adding models, fixing mistakes, improving docs, or extending project coverage.

### Before you contribute

- [ ] Content is for learning and respects project licenses and attribution
- [ ] Diagram layers are clear (C1 → C2 → C3)
- [ ] Include a short README or index (overview, diagram list, how to render)
- [ ] Prefer PlantUML sources; PNGs are optional
- [ ] Submit architecture docs only — no full source trees, secrets, or build artifacts
- [ ] Do **not** add user-story document trees to this meta-repo

### Adding a project

1. Ensure the project already has flat `docs/developer/c4-model/` (`C1-`–`C4-` naming) in its own tree
2. Update the [Projects](#projects) table (Title Case display name + kebab-case path)
3. Whitelist `!<name>/` in `.gitignore` (same pattern as existing projects)
4. Stage only whitelist paths (see [sync-repo](.cursor/skills/developer/references/sync-repo.md)); open a PR
5. Project-local `.cursor/skills/` (if any) stay in the **project** Git repo — not in this meta whitelist

### Commit messages

Use clear conventional-style messages, for example:

```text
docs(explore-ai): refine backend component diagram
docs(whatsfeed): clarify Nest API container boundaries
docs(low-code-platform): update deployment production view
```

## Code of Conduct

- Be kind and keep discussion focused on architecture and technology
- Cite sources: link project design docs when you reuse ideas
- Stay verifiable: tie claims to containers / components in the diagrams or to source paths

When in doubt, open an Issue for discussion before merging.

## Acknowledgments

Thanks to the authors and contributors of the listed public projects. Architecture notes in this repository are for learning and are **not** a substitute for each project’s primary documentation. If anything conflicts with a project README or docs site, that project wins.

## License

- Cataloging, learning paths, and community-style docs in this repository are shared for learning and collaboration
- Architecture models that include project copyrighted material remain under the corresponding project licenses
- Review each project’s `LICENSE` before reuse or redistribution

---

If this project helps you, a Star is appreciated. Ideas and improvements are welcome via Issues and PRs.
