# Developer References (hub)

Central citation index for the **Developers** role.  
Guidance under this role should cite **engineering practice**, **product domain design**, and **solution / platform design** from top-tier firms — not only coding standards.

## Citation policy

1. Prefer links from this folder. **Claim + deep URL**; never company name alone.
2. Do **not** invent URLs. Do **not** replace a whitelist primary source with a random Medium/secondary summary.
3. If nothing here fits, add a row to the matching file (same whitelist) before citing elsewhere.
4. Whitelist: **Google, Meta, Apple, Microsoft, Amazon, Netflix, Uber, Spotify, LinkedIn, Cloudflare** — official eng blogs, design docs, research pubs, architecture centers.

## Which file to use

| Need | File |
|------|------|
| Role policy: prefer host framework built-ins | [`framework-first.md`](./framework-first.md) |
| Role policy: Google Checkstyle + AIP | [`checkstyle-aip.md`](./checkstyle-aip.md) |
| Role policy: fine-grained Draft PRs / GitHub Stack / pre-submit checks | [`delivery-github-stack.md`](./delivery-github-stack.md) |
| How to build/test/review/operate software well | [`engineering.md`](./engineering.md) |
| How a **product domain** is designed at scale (marketplace, feed, identity, …) | [`product-domain-design.md`](./product-domain-design.md) |
| End-to-end **system / platform / AI** solution shape | [`solution-design.md`](./solution-design.md) |

## Citation format (answers / design notes)

```text
Claim: Batch marketplace matching optimizes network wait time, not only nearest supply.
Source: Uber — https://www.uber.com/us/en/marketplace/matching/
```

```text
Claim: Prefer static stability over reactive scale-out when an AZ fails.
Source: Amazon Builders’ Library — https://aws.amazon.com/builders-library/static-stability-using-availability-zones/
```

## Indexes

### Role policies
- [`framework-first.md`](./framework-first.md) — Framework-first implementation  
- [`checkstyle-aip.md`](./checkstyle-aip.md) — Checkstyle + AIP  
- [`delivery-github-stack.md`](./delivery-github-stack.md) — Fine-grained **Draft** PRs / `gh stack` / validate before submit  

### Big-tech citation hubs
- [`engineering.md`](./engineering.md) — architecture, API, testing, code review, observability, performance, security  
- [`product-domain-design.md`](./product-domain-design.md) — marketplace, content, identity, messaging, search, commerce  
- [`solution-design.md`](./solution-design.md) — classic distributed systems + AI/platform architectures  
