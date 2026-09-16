# Root README — tone and structure

Canonical voice for repo root `README.md` (and similar top-level project READMEs).

Also see: [About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes).

## Tone

- Calm, direct, second person (“you can”, “you need”).
- Short paragraphs; prefer verbs over slogans.
- Technical and concrete — what it is, what you run, where to go next.
- Match the repo’s established README language (do not invent a second language).
- Prefer backticks around the product or CLI name on first mention.

## Do / don’t

| Do | Don’t |
|----|--------|
| Open with 1–2 paragraphs: what it is + stack / boundary | Mission manifesto, badge walls, long TOC |
| **Get started** → requirements → install → first run | Dump every feature as a bullet wall up front |
| One short sentence after the first command explaining what happened | Duplicate deeper guides into the README |
| **Next steps** as links into project docs | Embed large architecture galleries or essays |
| Keep install / config / ports aligned with the default local path | Leave obsolete defaults after the stack changes |
| One compact media row (optional) | Multi-section screenshot grids that dominate the page |

## Required skeleton

```markdown
# {Product}

`{Product}` is a … You can use it to …. It is built with ….

{One short paragraph: boundaries, defaults, notable constraints.}

**Live:** {url}   # omit if none

## Get started

### Requirements
…

### Initial setup
```bash
…
```

### Run your first …
```bash
…
```

{One sentence: what that command does.}

{Optional small ports / credentials table.}

### Configuration
{Pointers to example env files — not a full copy of every secret.}

### Checks
```bash
{project typecheck}
{project lint}
{project test}
{project build}
```

## Screenshots   # optional, compact

## Next steps
- Link to deeper docs that exist in the repo

## Repository layout   # short tree + one sentence on structure

## Contributing
{One short paragraph: how to contribute at a high level.}

## License
…
```

Adapt section titles when there is no install path (library-only → package add instead of Initial setup). Keep the same calm Get started → Next steps flow.

## Depth rules

- Root README = on-ramp. Detail belongs in project docs under `docs/` (or the repo’s equivalent).
- When default boot, ports, or datastore change, update README **Get started** / **Configuration** in the same change (or immediately after).
- One tone only — do not split a marketing landing voice from an engineering README voice.

## When to edit

| Trigger | Update |
|---------|--------|
| New default boot command, port, datastore, or local-stack rule | Get started / Configuration |
| New primary client or entry surface | Opening pitch + layout tree |
| New public Live URL | Live line |
| Docs-only churn that does not change the on-ramp | Prefer the deeper doc; root README only if Next steps links break |
