# Engineering References

Top-tier **engineering practice** sources. Use for implementation quality, APIs, testing, review, ops, performance, and security.

Format every cite as **Claim → Company → Doc** (deep link). Prefer these over secondary blogs.

## Architecture

| Claim | Company | Doc |
|-------|---------|-----|
| Prefer static stability (pre-provision for AZ loss) over reactive scale-up | Amazon | [Static stability using Availability Zones](https://aws.amazon.com/builders-library/static-stability-using-availability-zones/) |
| Timeouts, retries, and jittered backoff to contain failure amplification | Amazon | [Timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) |
| Design for avoiding queue backlog meltdown | Amazon | [Avoiding insurmountable queue backlogs](https://aws.amazon.com/builders-library/avoiding-insurmountable-queue-backlogs/) |
| Service reliability as a product: error budgets and SLOs | Google | [SRE Book — Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) |
| Domain-oriented microservice boundaries at marketplace scale | Uber | [Domain-Oriented Microservice Architecture](https://www.uber.com/us/en/blog/microservice-architecture/) |

## API Design

| Claim | Company | Doc |
|-------|---------|-----|
| Resource-oriented REST with consistent patterns across a large API surface | Google | [Google Cloud API Design Guide](https://cloud.google.com/apis/design) |
| Contract-first HTTP/REST for data-plane services | Microsoft | [Azure REST API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md) |
| Practical REST API design principles for cloud workloads | Microsoft | [API design best practices](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design) |
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
| Large-scale observability platform trade-offs (metrics cardinality) | Uber | [Observability at Scale: Defining SLOs](https://www.uber.com/blog/observability-at-scale/) |
| Distributed tracing as first-class debug tool for microservices | Uber | [Jaeger: Uber’s Distributed Tracing System](https://www.uber.com/blog/distributed-tracing/) |

## Performance

| Claim | Company | Doc |
|-------|---------|-----|
| Measure Core Web Vitals and optimize user-centric metrics | Google | [web.dev — Core Web Vitals](https://web.dev/articles/vitals) |
| Performance budgets and continuous measurement | Google | [web.dev — Performance budgets](https://web.dev/articles/performance-budgets-101) |
| Edge caching and global performance patterns | Cloudflare | [Cloudflare Learning Center — CDN](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) |
| Reduce payload and critical-path work on the client | Google | [web.dev — Optimize LCP](https://web.dev/articles/optimize-lcp) |

## Security

| Claim | Company | Doc |
|-------|---------|-----|
| Threat modeling and secure development lifecycle practices | Microsoft | [Microsoft SDL practices](https://www.microsoft.com/en-us/securityengineering/sdl/practices) |
| Design for least privilege and defense in depth in cloud systems | Amazon | [AWS Well-Architected — Security Pillar](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html) |
| Memory / application security engineering culture | Google | [Google Security Blog](https://security.googleblog.com/) |
| Zero Trust / BeyondCorp-style access model | Google | [BeyondCorp](https://cloud.google.com/beyondcorp) |
