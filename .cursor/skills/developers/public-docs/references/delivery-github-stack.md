# Delivery policy: Fine-grained Draft PRs via GitHub Stack (required)

When shipping work in this meta-repo, do **not** open one large catch-all PR.
Submit a **GitHub Stack of fine-grained Draft PRs**.

1. **Fine-grained Draft PR**: one reviewable concern per PR (catalog → glossary → C4 →
   stories). Each layer stays **Draft** until marked ready.
2. **Plan the stack before coding** when the change spans multiple concerns.
   Living docs order when domain language or architecture changes:
   Glossary → `C4-Code-Domain-Model.puml` → other C4 → User Story Map
   (see [living-docs](./living-docs.md)).
3. **Pre-submit validation** — before commit/push/`gh stack submit`:
   - This meta-repo has no Gradle/Checkstyle; validate PlantUML when tooling
     is available (`plantuml -checkonly` or render changed `.puml`)
   - Do not push while known diagram syntax errors remain
4. **Submit with GitHub Stack**
   ([Stacked pull requests](https://docs.github.com/en/pull-requests/get-started/stacked-prs-quickstart)):
   - `gh stack init` → commit layer → `gh stack add` → … → `gh stack submit`
   - Prefer Draft: `gh stack submit --auto`; do **not** pass `--open` until
     ready for review
   - After trunk updates: `gh stack rebase` / `gh stack sync`
5. **Independent PRs** only when there is no real dependency.
6. **Commit / PR body**: follow [commit-pr](./commit-pr.md).

## Typical flow (existing branches)

```bash
gh stack init branch1 branch2 branch3   # bottom → top
gh stack submit --auto
```

## Typical flow (new stack)

```bash
git checkout main
gh stack init glossary-update
# edit, commit
gh stack add domain-model-diagram
# edit, commit
gh stack submit --auto
```
