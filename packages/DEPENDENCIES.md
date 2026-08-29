# Explore dependency catalog (Nx + runtime)

Single-repo view of who depends on whom. Nx `implicitDependencies` and
`packages/` encode the same edges for tooling.

| From | To | Kind |
|------|-----|------|
| explore-chat | shared-types | compile / types |
| explore-chat | contracts-ai | OpenAPI contract |
| explore-commerce | shared-types | compile / types |
| explore-lowcode | shared-types | compile / types |
| explore-ai | explore-bom | Java versions |
| explore-ai | contracts-ai | publishes / owns API contract |
| explore-iam | explore-bom | Java versions |

Runtime: explore-chat BFF → explore-ai (see Story Map E8); keep OpenAPI in
`packages/contracts-ai` in sync with the provider.
