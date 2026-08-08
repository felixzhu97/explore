# Nested Project Git

Each application under `public/` is its own Git repository (own `origin`). This meta-repo must not nest those `.git` directories while staging.

## Convention

Local full project trees keep VCS as `.git.local` when the meta-repo is being committed, so they do not collide with this meta-repo.

```bash
# Work inside a project clone (normal day-to-day)
mv explore-ai/.git.local explore-ai/.git

# Before committing this meta-repo, hide nested Git again
mv explore-ai/.git explore-ai/.git.local
```

Replace `explore-ai` with the target project directory name. Repeat for every published project that has a nested Git dir.

## Pull / push project remotes

Projects are **owned** remotes (not third-party upstream mirrors). When you need latest project source before updating C4:

```bash
mv explore-ai/.git.local explore-ai/.git
git -C explore-ai pull --ff-only
mv explore-ai/.git explore-ai/.git.local
```

Never `git push` from a project directory as part of the meta-repo sync workflow unless the ticket explicitly asks for a project-repo PR.

## Rules

1. Before any meta-repo `git add` of `*/docs/developer/c4-model/`, ensure nested `.git` → `.git.local`
2. After meta commit, restore `.git.local` → `.git` if you will continue project work
3. `.gitignore` already ignores `**/.git.local/`
