# Public Docs

[![License](https://img.shields.io/badge/license-Public%20Learning-blue.svg)](#license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

Nx workspace root for catalogued **Explore** projects. It publishes living
docs ([C4 Model](https://c4model.com/), Glossaries, User Story Maps), shared
`packages/`, and catalogued app source under `explore-*`.

> **Scope:** Projects in [Projects](#projects). Secrets (`.env`),
> `node_modules`, and build outputs stay ignored. Nested GitHub remotes
> (`felixzhu97/explore-*`) are legacy mirrors — prefer this repo.

## Table of Contents

- [About](#about)
- [Projects](#projects)
- [Repository Layout](#repository-layout)
- [Nx workspace](#nx-workspace)
- [Quick Start](#quick-start)
- [Suggested Learning Path](#suggested-learning-path)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## About

This workspace is the single Git root for Explore. Architecture views live
next to the apps they describe so that:

- Newcomers can build a mental model (C1 → C2 → C3) and then run the app
- Teams can discuss trade-offs against the same source that ships
- Contributors can improve PlantUML models, packages, and app code together

Diagrams are **PlantUML**. Some directories include pre-rendered PNGs. Local
listen ports follow [`@explore/dev-ports`](packages/dev-ports) (UI `42xx`,
API `9xxx`).

## Projects

| Project | Path | Description |
|---------|------|-------------|
| [Explore AI](explore-ai/README.md) | [`explore-ai/`](explore-ai/) | Conversational AI: Chat, RAG, tools, eval (Spring AI + Angular). API **9000**, web **4200** |
| [Explore IAM](explore-iam/README.md) | [`explore-iam/`](explore-iam/) | AWS IAM–style identity, policy, STS, and SSO. API **9100**, web **4210** |
| [Explore Chat](explore-chat/README.md) | [`explore-chat/`](explore-chat/) | Social + messaging: feed, chat/calls, Nest API, optional AI. API **9200**, web **4220** |
| [Explore Commerce](explore-commerce/README.md) | [`explore-commerce/`](explore-commerce/) | Web shop, admin, API, crawler. API **9300**, web **4230**, admin **4240** |
| [Explore Lowcode](explore-lowcode/README.md) | [`explore-lowcode/`](explore-lowcode/) | Visual page builder: canvas, components, themes, export. Web **4250** |

## Repository Layout

```text
public/
├── package.json / nx.json / pnpm-workspace.yaml
├── docs/
│   ├── Glossary.md           # platform ubiquitous language
│   └── developer/c4-model/   # platform C1 / C2 / Code / Dynamic
├── packages/                 # types, eslint, contracts, BOM, ui, dev-ports
├── .github/workflows/ci.yml  # nx affected
├── explore-ai/               # in-place (unchanged internal layout)
├── explore-iam/
├── explore-chat/
├── explore-commerce/
└── explore-lowcode/
```

## Nx workspace

Cross-project dependencies and duplicate declarations are managed with **Nx**
at this repo root (directories under `explore-*` are **not** renamed to
`apps/` / `libs/`).

```bash
pnpm install
pnpm exec nx graph
pnpm exec nx affected -t lint,test,build
```

Shared packages: [`packages/README.md`](packages/README.md).  
Platform glossary: [`docs/Glossary.md`](docs/Glossary.md).  
Platform C4: [`docs/developer/c4-model/`](docs/developer/c4-model/).  
Local Dev Port Map: [`packages/dev-ports`](packages/dev-ports) (UI `42xx`, API `9xxx` — avoid collisions when running several apps).

## Quick Start

### Browse PlantUML sources

1. **Online**: paste a `.puml` file into [PlantUML Online](https://www.plantuml.com/plantuml/uml/)
2. **Editor**: install a PlantUML extension in VS Code / Cursor and open the file
3. **CLI**:

```bash
brew install plantuml   # macOS
plantuml docs/developer/c4-model/C1-Context.puml
plantuml explore-ai/docs/developer/c4-model/C1-Context.puml
```

Useful entry points:

- [Platform system context](docs/developer/c4-model/C1-Context.puml)
- [Platform containers + packages](docs/developer/c4-model/C2-Container.puml)
- [Explore AI system context](explore-ai/docs/developer/c4-model/C1-Context.puml)
- [Explore IAM system context](explore-iam/docs/developer/c4-model/C1-Context.puml)
- [Explore Chat system context](explore-chat/docs/developer/c4-model/C1-Context.puml)
- [Explore Commerce system context](explore-commerce/docs/developer/c4-model/C1-Context.puml)
- [Explore Lowcode system context](explore-lowcode/docs/developer/c4-model/C1-Context.puml)

## Suggested Learning Path

1. Read [Platform Glossary](docs/Glossary.md) and [Platform C4](docs/developer/c4-model/) for catalog topology and Published Language
2. Read [Explore AI C4](explore-ai/docs/developer/c4-model/) for Spring AI + Angular container and deployment boundaries
3. Read [Explore IAM C4](explore-iam/docs/developer/c4-model/) for AWS IAM–style identity, policy, STS, and SSO boundaries
4. Read [Explore Chat C4](explore-chat/docs/developer/c4-model/) for Nest API, clients, and Python service boundaries
5. Read [Explore Commerce C4](explore-commerce/docs/developer/c4-model/) for Web / Admin / API container split
6. Read [Explore Lowcode C4](explore-lowcode/docs/developer/c4-model/) for SPA canvas / domain layout and Vercel deploy
7. Compare how frontend shells, BFF/API containers, and external systems are drawn across these projects

## Contributing

Issues and pull requests are welcome. You can help by adding models, fixing mistakes, improving docs, or extending project coverage.

### Before you contribute

- [ ] Content is for learning and respects project licenses and attribution
- [ ] Diagram layers are clear (C1 → C2 → C3)
- [ ] Include a short README or index (overview, diagram list, how to render)
- [ ] Prefer PlantUML sources; PNGs are optional
- [ ] Stage whitelist paths only (never `git add -A`); no secrets or build artifacts

### Adding a project

1. Add `docs/developer/c4-model/` under the project directory (`C1-`–`C4-` naming)
2. Update the [Projects](#projects) table in this README
3. Open a pull request with a clear description of what you added

### Commit messages

Imperative subject (no type prefix); subject equals the PR title. Fine-grained
Draft PRs via [GitHub Stack](https://docs.github.com/en/pull-requests/get-started/stacked-prs-quickstart).

```text
Align domain model diagram with glossary terms
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
