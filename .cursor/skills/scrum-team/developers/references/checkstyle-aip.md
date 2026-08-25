# Quality policy: Google Checkstyle + AIP (required)

When designing APIs or writing code under the Developers role:

1. **Code style (Java)**: Follow the [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html) via the repo’s Checkstyle config (prefer existing `config/checkstyle/*` / `google_checks.xml`). Non-Java: use the repo’s equivalent formatter/linter; do not invent a parallel style stack.
2. **API design**: Follow [API Improvement Proposals](https://google.aip.dev/) and the [Google Cloud API Design Guide](https://cloud.google.com/apis/design) for networked APIs (resource orientation, naming, errors, versioning, pagination, etc.). Cite specific AIP numbers when proposing or changing API shape.
3. **Proto/OpenAPI**: When `api-linter` (or project AIP lint) exists, treat it as the AIP machine check; otherwise still design to AIP and note the tooling gap in the PR.
