# Explore

A workspace for cataloguing and running Explore apps from one Git root.
It is an Nx monorepo, and organized around living [C4](https://c4model.com/)
docs and shared packages.

Apps stay under `explore-*` (internal trees are not renamed to `apps/` /
`libs/`). Shared types, ports, contracts, UI, and the Java BOM live in
[`packages/`](packages/README.md). Secrets (`.env`), `node_modules`, and
build outputs stay out of Git.

## Get started

```bash
pnpm install
pnpm exec nx graph
pnpm exec nx affected -t lint,test,build
```

Local listen ports are in [`packages/dev-ports`](packages/dev-ports)
(UI `42xx`, API `9xxx`) so several apps can run at once.

```bash
brew install plantuml   # macOS, optional
plantuml docs/developer/c4-model/C1-Context.puml
```

## Apps

| App | README | Ports |
|-----|--------|-------|
| [Explore AI](explore-ai/README.md) | Chat, RAG, tools, eval | API 9000, web 4200 |
| [Explore IAM](explore-iam/README.md) | Identity, policy, STS, SSO | API 9100, web 4210 |
| [Explore Chat](explore-chat/README.md) | Feed, messaging, calls | API 9200, web 4220 |
| [Explore Commerce](explore-commerce/README.md) | Shop, admin, API | API 9300, web 4230, admin 4240 |
| [Explore Lowcode](explore-lowcode/README.md) | Visual page builder | web 4250 |

## Next steps

- [Platform C4](docs/developer/c4-model/) and [Glossary](docs/Glossary.md)
- [Shared packages](packages/README.md)
- [C4 Model](https://c4model.com/) and [Nx](https://nx.dev/getting-started/intro)

## Contributing

Issues and pull requests are welcome. Stage whitelist paths only (never
`git add -A`). Submit fine-grained Draft PRs via
[GitHub Stack](https://docs.github.com/en/pull-requests/get-started/stacked-prs-quickstart).
Commit subject is the PR title (imperative, no type prefix).

## License

Docs and cataloging in this repository are for learning. App source remains
under each project `LICENSE`.
