# Public Docs

[![License](https://img.shields.io/badge/license-Public%20Learning-blue.svg)](#license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

A collection of **architecture diagrams** for public projects — primarily [C4 Model](https://c4model.com/) views — to help developers understand system boundaries, containers, and core components.

> **Scope:** Catalogued projects listed in [Projects](#projects) below.  
> This repository publishes C4 models, project READMEs, Glossaries, and User Story Maps — not full application source trees.

## Table of Contents

- [About](#about)
- [Projects](#projects)
- [Repository Layout](#repository-layout)
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

## Projects

| Project | Type | Path | Description |
|---------|------|------|-------------|
| [Explore AI](https://github.com/felixzhu97/explore-ai) | C4 | [`explore-ai/docs/developer/c4-model/`](explore-ai/docs/developer/c4-model/) | Conversational AI platform: Chat, RAG, tools, eval (Spring AI + Angular) |
| [Explore IAM](explore-iam/README.md) | C4 | [`explore-iam/docs/developer/c4-model/`](explore-iam/docs/developer/c4-model/) | AWS IAM–style identity, policy, STS, and SSO for sibling apps |
| [WhatsFeed](https://github.com/felixzhu97/whatsfeed) | C4 | [`whatsfeed/docs/developer/c4-model/`](whatsfeed/docs/developer/c4-model/) | Social + messaging: feed, chat/calls, Nest API, optional AI |
| [Low Code Platform](https://github.com/felixzhu97/low-code-platform) | C4 | [`low-code-platform/docs/developer/c4-model/`](low-code-platform/docs/developer/c4-model/) | Visual page builder: canvas, components, themes, export |
| [Shopping System](https://github.com/felixzhu97/shopping-system) | C4 | [`shopping-system/docs/developer/c4-model/`](shopping-system/docs/developer/c4-model/) | E-commerce monorepo: Web shop, admin, API |

## Repository Layout

```text
public-docs/
├── README.md
├── explore-ai/
│   ├── README.md
│   └── docs/{Glossary.md,product-owner/,developer/c4-model/}
├── explore-iam/
│   ├── README.md
│   └── docs/{Glossary.md,product-owner/,developer/c4-model/}
├── whatsfeed/
│   ├── README.md
│   └── docs/{Glossary.md,product-owner/,developer/c4-model/}
├── low-code-platform/
│   ├── README.md
│   └── docs/{Glossary.md,product-owner/,developer/c4-model/}
└── shopping-system/
    ├── README.md
    └── docs/{Glossary.md,product-owner/,developer/c4-model/}
```

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
- [Explore IAM system context](explore-iam/docs/developer/c4-model/C1-Context.puml)
- [WhatsFeed system context](whatsfeed/docs/developer/c4-model/C1-Context.puml)
- [Low Code Platform system context](low-code-platform/docs/developer/c4-model/C1-Context.puml)
- [Shopping System system context](shopping-system/docs/developer/c4-model/C1-Context.puml)

## Suggested Learning Path

1. Read [Explore AI C4](explore-ai/docs/developer/c4-model/) for Spring AI + Angular container and deployment boundaries
2. Read [Explore IAM C4](explore-iam/docs/developer/c4-model/) for AWS IAM–style identity, policy, STS, and SSO boundaries
3. Read [WhatsFeed C4](whatsfeed/docs/developer/c4-model/) for Nest API, clients, and Python service boundaries
4. Read [Low Code Platform C4](low-code-platform/docs/developer/c4-model/) for SPA canvas / domain layout and Vercel deploy
5. Read [Shopping System C4](shopping-system/docs/developer/c4-model/) for Web / Admin / API container split
6. Compare how frontend shells, BFF/API containers, and external systems are drawn across these projects

## Contributing

Issues and pull requests are welcome. You can help by adding models, fixing mistakes, improving docs, or extending project coverage.

### Before you contribute

- [ ] Content is for learning and respects project licenses and attribution
- [ ] Diagram layers are clear (C1 → C2 → C3)
- [ ] Include a short README or index (overview, diagram list, how to render)
- [ ] Prefer PlantUML sources; PNGs are optional
- [ ] Submit architecture docs only — no full source trees, secrets, or build artifacts

### Adding a project

1. Add `docs/developer/c4-model/` under the project directory (`C1-`–`C4-` naming)
2. Update the [Projects](#projects) table in this README
3. Open a pull request with a clear description of what you added

### Commit messages

Use clear conventional-style messages, for example:

```text
docs(<project>): refine architecture diagram
docs(<project>): clarify container boundaries
docs(<project>): update deployment view
```

## Code of Conduct

- Be kind and keep discussion focused on architecture and technology
- Cite sources: link project design docs when you reuse ideas
- Stay verifiable: tie claims to containers / components in the diagrams or to source paths

When in doubt, open an Issue for discussion before merging.

## Acknowledgments

Thanks to the authors and contributors of the listed public projects. Architecture notes in this repository are for learning and are **not** a substitute for each project’s primary documentation. If anything conflicts with a project README or docs site, that project wins.

## License

- Cataloging, learning paths, and docs in this repository are shared for learning and collaboration
- Architecture models that include project copyrighted material remain under the corresponding project licenses
- Review each project’s `LICENSE` before reuse or redistribution

---

If this project helps you, a Star is appreciated. Ideas and improvements are welcome via Issues and PRs.
