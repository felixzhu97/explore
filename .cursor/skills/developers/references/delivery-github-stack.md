# Delivery policy: Atomic Draft PRs via GitHub Stack (required)

When shipping work under the Developers role, do **not** open one large catch-all PR (draft or ready). Submit a **GitHub Stack of atomic Draft PRs**.

1. **Atomic Draft PR**: one reviewable concern per PR (e.g. types/contracts → domain → API → UI → tests/docs). Each layer is a **Draft** until explicitly marked ready. Prefer self-contained layers that can land once lower layers merge.
2. **Plan the stack before coding** when the change spans multiple concerns: list ordered layers (foundation → consumers). Ask for approval of the slice plan when the split is non-obvious or the user has not already approved stacking.
   - **Living docs order** (when the feature changes domain language or architecture): `docs/glossary-and-domain-model` (Phase 1) → implementation layers (Phase 2) → `docs/c4-and-story-map` (Phase 3 — must not precede implementation commits). See [living-docs](../developer/references/living-docs.md).
3. **Pre-submit validation (fail closed)** — before commit/push/`gh stack submit`:
   - Detect project check commands from CI/build files (e.g. `./gradlew checkstyleMain checkstyleTest`, `spotlessCheck`, `api-linter` if configured)
   - Run those validators on touched scope when possible; otherwise the project’s standard check targets
   - **Do not** push or `gh stack submit` while Checkstyle/AIP lint (or documented equivalents) fail — fix, re-run, then submit
   - Report what was run and the result in the delivery summary
4. **Submit with GitHub Stack** ([Stacked pull requests](https://docs.github.com/en/pull-requests/get-started/stacked-prs-quickstart)):
   - Ensure `gh extension install github/gh-stack` is available when using the CLI
   - Typical flow: `gh stack init` → commit layer → `gh stack add` (next layer) → … → `gh stack submit`
   - Prefer **Draft** PRs on submit: use `gh stack submit --auto` for non-interactive draft stacks; in the interactive editor keep PRs as draft. Do **not** pass `--open` until the user asks to mark the stack (or a layer) ready for review
   - Keep the stack linear; after feedback or trunk updates use `gh stack rebase` / `gh stack sync` as needed — avoid ad-hoc force-push rewriting unless the user explicitly allows it
5. **Independent PRs only when there is no real dependency** (parallel work off trunk). If layers depend on each other, stack them as atomic Drafts — do not fake independence with duplicate commits.
6. **Commit / PR body**: follow [`developer`](../developer/SKILL.md) §6 (branch naming, business PR title, why → References → JIRA, ≤72 cols). Story templates / Jira MCP: [`../product-owner/`](../product-owner/) (nested under Developers). Scrum PO role router remains [`../../product-owner/`](../../product-owner/).
7. **Still follow normal git safety**: no commit/push/PR until the user asked (or clearly authorized delivery); no destructive history rewrite without explicit approval.
