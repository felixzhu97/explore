# Engineering References

Top-tier **engineering practice** sources from **Apple, Google, and GitHub**
only. Use for implementation quality, APIs, testing, review, ops, performance,
and security.

Format every cite as **Claim → Company → Doc** (deep link). Prefer these over
secondary blogs.

## Architecture

| Claim | Company | Doc |
|-------|---------|-----|
| Service reliability as a product: error budgets and SLOs | Google | [SRE Book — Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) |
| Site reliability as operational design | Google | [Site Reliability Engineering Book](https://sre.google/sre-book/table-of-contents/) |
| Cloud architecture decision frameworks | Google | [Google Cloud Architecture Framework](https://docs.cloud.google.com/architecture/framework) |

## API Design

| Claim | Company | Doc |
|-------|---------|-----|
| Resource-oriented REST with consistent patterns across a large API surface | Google | [Google Cloud API Design Guide](https://cloud.google.com/apis/design) |
| AIP-style consistency (resources, errors, versioning) | Google | [API Improvement Proposals](https://google.aip.dev/) |

## Testing

| Claim | Company | Doc |
|-------|---------|-----|
| Small, focused tests; prefer fast feedback over brittle end-to-end only | Google | [Testing on the Toilet — Test Behaviors, Not Methods](https://testing.googleblog.com/2019/12/testing-on-toilet-test-behaviors-not.html) |
| Flaky tests destroy trust; treat flakes as P0 for CI health | Google | [Testing on the Toilet — Flaky Tests](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html) |
| Test pyramid / appropriate test levels for change risk | Google | [Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html) |
| Code health includes correct automated tests in the same change when practical | Google | [What to look for in a code review — Tests](https://google.github.io/eng-practices/review/reviewer/looking-for.html) |

## Code Review

| Claim | Company | Doc |
|-------|---------|-----|
| Review for continuous code-health improvement, not perfection theater | Google | [The Standard of Code Review](https://google.github.io/eng-practices/review/reviewer/standard.html) |
| Review design, complexity, tests, naming, docs — not only style nits | Google | [What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html) |
| Speed matters: slow reviews block velocity and create larger CLs | Google | [Speed of Code Reviews](https://google.github.io/eng-practices/review/reviewer/speed.html) |
| Author guide: small, self-contained changes | Google | [The CL Author's Guide](https://google.github.io/eng-practices/review/developer/) |

## Observability

| Claim | Company | Doc |
|-------|---------|-----|
| Four golden signals: latency, traffic, errors, saturation | Google | [SRE Book — Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/) |
| Alert on symptoms with actionable pages; avoid noisy low-value alerts | Google | [SRE Book — Practical Alerting](https://sre.google/sre-book/practical-alerting/) |

## Performance

| Claim | Company | Doc |
|-------|---------|-----|
| Measure Core Web Vitals and optimize user-centric metrics | Google | [web.dev — Core Web Vitals](https://web.dev/articles/vitals) |
| Performance budgets and continuous measurement | Google | [web.dev — Performance budgets](https://web.dev/articles/performance-budgets-101) |
| Reduce payload and critical-path work on the client | Google | [web.dev — Optimize LCP](https://web.dev/articles/optimize-lcp) |

## Security & identity

| Claim | Company | Doc |
|-------|---------|-----|
| Memory / application security engineering culture | Google | [Google Security Blog](https://security.googleblog.com/) |
| Zero Trust / BeyondCorp-style access model | Google | [BeyondCorp](https://cloud.google.com/beyondcorp) |
| Platform security model for Apple systems | Apple | [Apple Platform Security](https://support.apple.com/guide/security/welcome/web) |
| Privacy and permission design for people | Apple | [HIG — Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy) |
| Supply-chain and Actions hardening on GitHub | GitHub | [GitHub Security](https://docs.github.com/en/code-security) |
| Dependabot version and security updates | GitHub | [Dependabot](https://docs.github.com/en/code-security/dependabot) |

## Delivery on GitHub

| Claim | Company | Doc |
|-------|---------|-----|
| Fine-grained stacked / Draft pull requests | GitHub | [Stacked pull requests](https://docs.github.com/en/pull-requests/get-started/stacked-prs-quickstart) |
| Actions CI as the delivery gate | GitHub | [GitHub Actions](https://docs.github.com/en/actions) |
| Code review on pull requests | GitHub | [About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) |
