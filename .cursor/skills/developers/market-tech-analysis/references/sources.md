# Mandatory Watchlist — First Scan Sources

**Always scan these before other ad-hoc sources.** Industry **vendor**
references are **Apple, Google, and GitHub only.** Prefer official blogs,
product changelogs, developer docs, and research pages from those three.
**Protocols, standards, papers, Hugging Face, and Qwen** (RFC / NIST / W3C /
ISO, arXiv abs, HF cards, Qwen technical reports / blogs / weights / code)
stay in scope whenever the topic cites them — they are not vendor watchlist
rows.

Record dated facts with URLs.

## Platform & product (news / docs)

| Org | What to check | Starting points |
|-----|---------------|-----------------|
| **Google** | Full ecosystem: engineering, SRE, AI/research, Android, Cloud. UI design for this repo stays Apple HIG. | [blog.google](https://blog.google/), [cloud.google.com/blog](https://cloud.google.com/blog/), [ai.google.dev](https://ai.google.dev/), [eng-practices](https://google.github.io/eng-practices/), [styleguide](https://google.github.io/styleguide/), [sre.google](https://sre.google/), [Well-Architected Framework](https://docs.cloud.google.com/architecture/framework) |
| **Apple** | Platforms, HIG, on-device ML, identity, security | [apple.com/newsroom](https://www.apple.com/newsroom/), [developer.apple.com/news](https://developer.apple.com/news/), [developer.apple.com/design](https://developer.apple.com/design/), [machinelearning.apple.com](https://machinelearning.apple.com/) |
| **GitHub** | Actions, security, Copilot, DX, open-source platform | [github.blog](https://github.blog/), [docs.github.com](https://docs.github.com/), [GitHub Changelog](https://github.blog/changelog/) |

## Research & open-source hubs (required)

Scan **research pages + GitHub orgs** for new papers, code drops, and releases
(same ~30–90 day window). DeepMind counts under **Google**.

| Org | Research / publications | Open-source / GitHub |
|-----|-------------------------|----------------------|
| **Google** | [research.google](https://research.google/) · [Publications](https://research.google/pubs/) · [deepmind.google/research](https://deepmind.google/research/) | [github.com/google](https://github.com/google) · [github.com/google-research](https://github.com/google-research) · [github.com/google-deepmind](https://github.com/google-deepmind) · [JAX](https://github.com/jax-ml/jax) |
| **Apple** | [machinelearning.apple.com/research](https://machinelearning.apple.com/research) | [github.com/apple](https://github.com/apple) · [ml-* research repos](https://github.com/apple?q=ml-&type=repositories) · [coremltools](https://github.com/apple/coremltools) · [mlx](https://github.com/ml-explore/mlx) |
| **GitHub** | Engineering via [github.blog](https://github.blog/) · [docs.github.com](https://docs.github.com/) | [github.com/github](https://github.com/github) · [actions](https://github.com/actions) · [cli/cli](https://github.com/cli/cli) |

## Protocols, standards, papers, Hugging Face & Qwen (keep — not vendor watchlist)

Cite these whenever the change or analysis depends on a protocol, standard,
method paper, or open model/dataset. Prefer primary documents (RFC text, NIST
SP, W3C TR, arXiv abs, HF model/collection cards, Qwen blog/report).

| Kind | What to check | Starting points |
|------|---------------|-----------------|
| **Protocols** | OAuth, OIDC, WebAuthn, HTTP, TLS, etc. | [RFC Editor](https://www.rfc-editor.org/) · [IETF Datatracker](https://datatracker.ietf.org/) · [W3C TR](https://www.w3.org/TR/) |
| **Standards** | Security, identity, crypto, risk | [NIST Publications](https://csrc.nist.gov/publications) · [ISO](https://www.iso.org/) (when the claim needs the standard) |
| **Papers** | Methods, algorithms, empirical results | [arXiv](https://arxiv.org/) · [cs.AI](https://arxiv.org/list/cs.AI/recent) · [cs.LG](https://arxiv.org/list/cs.LG/recent) · [cs.CL](https://arxiv.org/list/cs.CL/recent) · [cs.CR](https://arxiv.org/list/cs.CR/recent) · [cs.SE](https://arxiv.org/list/cs.SE/recent) |
| **Hugging Face** | Models, collections, datasets, papers, Spaces, trending | [Models](https://huggingface.co/models) · [Trending](https://huggingface.co/models?sort=trending) · [Datasets](https://huggingface.co/datasets) · [Papers](https://huggingface.co/papers) · [API trending](https://huggingface.co/api/trending) |
| **Qwen** | Family papers, blogs, weights, code | [qwen.ai](https://qwen.ai/) · [blog](https://qwen.ai/blog) · [arXiv: Qwen](https://arxiv.org/search/?query=Qwen&searchtype=all) · [HF Qwen](https://huggingface.co/Qwen) · [QwenLM](https://github.com/QwenLM) |

## Scan checklist (minimum)

1. **Each org — product/news**: one check in ~30–90 days (or `no material signal (checked)`).
2. **Each org — research/OSS**: glance research/docs **and** GitHub org activity
   (new repos, major releases, paper+code pairs when published under Google/Apple).
3. **Topic-relevant protocols / standards / papers / HF / Qwen**: when the scope
   cites IAM, security, networking, or a method/model — include primary docs
   (RFC / NIST / W3C / arXiv abs), matching Hugging Face cards, and Qwen
   sources when the work touches Qwen family models.
4. Prefer primary pages from Apple, Google, or GitHub for **vendor** industry
   signals — do not expand the vendor watchlist to other companies.

## Query tips

```
site:research.google OR site:deepmind.google [topic]
site:machinelearning.apple.com/research [topic]
site:developer.apple.com [topic]
site:github.blog OR site:docs.github.com [topic]
site:arxiv.org [topic]
site:huggingface.co [topic]
site:qwen.ai [topic]
site:rfc-editor.org OR site:datatracker.ietf.org [topic]
site:csrc.nist.gov [topic]
org:google OR org:google-deepmind OR org:apple OR org:github OR org:QwenLM [topic]
Hugging Face trending [modality]
```
