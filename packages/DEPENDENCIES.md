# Explore dependency catalog (Nx + runtime)

Single-repo view of who depends on whom. Nx `implicitDependencies` and
`packages/` encode the same edges for tooling.

Cross **bounded context** edges use a **Published Language** (OpenAPI), not
shared domain types. Platform packages (eslint, tsconfig, BOM) are not domain
models.

| From | To | Kind |
|------|-----|------|
| explore-chat | shared-types | Shared Kernel (service ids only) |
| explore-chat | contracts-ai | Published Language / OpenAPI (consumer) |
| explore-commerce | shared-types | Shared Kernel (service ids only) |
| explore-lowcode | shared-types | Shared Kernel (service ids only) |
| explore-ai | explore-bom | Java versions (platform) |
| explore-ai | contracts-ai | Published Language owner / publisher |
| explore-iam | explore-bom | Java versions (platform) |

Runtime: explore-chat **Explore AI BFF** (ACL) → explore-ai. Keep
`@explore/contracts-ai` OpenAPI in sync with the provider; consumers must not
import explore-ai domain types.
