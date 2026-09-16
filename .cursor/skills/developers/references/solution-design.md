# Solution Design References

Top-tier **system / solution / platform** architectures from **Apple, Google,
and GitHub** only — end-to-end shapes, not coding style guides.

Use when proposing how to assemble a platform (data plane, control plane, AI
stack). For domain UX/product framing see
[product-domain-design.md](./product-domain-design.md); for day-to-day eng
practice see [engineering.md](./engineering.md).

---

## A. Classic distributed solutions

### Data stores & consistency

| Claim | Company | Doc |
|-------|---------|-----|
| Globally distributed SQL with external consistency | Google | [Spanner: Google’s Globally-Distributed Database](https://research.google/pubs/pub39966/) |
| Wide-column store design for petabyte workloads | Google | [Bigtable](https://research.google/pubs/pub27898/) |

### Microservices, edge, resilience

| Claim | Company | Doc |
|-------|---------|-----|
| SRE as operational solution design | Google | [Site Reliability Engineering Book](https://sre.google/sre-book/table-of-contents/) |
| Architecture decision frameworks for cloud systems | Google | [Google Cloud Architecture Framework](https://docs.cloud.google.com/architecture/framework) |

---

## B. AI / platform solutions

Prefer **architecture / reference** pages over marketing landings.

### Google

| Claim | Company | Doc |
|-------|---------|-----|
| Vertex AI as managed training/serving control + data plane | Google | [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs) |
| Grounding / RAG patterns on Google Cloud | Google | [Grounding overview (Vertex AI)](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview) |
| Recommendation systems design survey (industry classic from Google) | Google | [Deep Neural Networks for YouTube Recommendations](https://research.google/pubs/pub45530/) |
| Secure AI deployment patterns | Google | [Secure AI Framework (SAIF)](https://safety.google/cybersecurity-advancements/saif/) |
| On-device / research ML from Google DeepMind | Google | [DeepMind research](https://deepmind.google/research/) |

### Apple

| Claim | Company | Doc |
|-------|---------|-----|
| On-device ML and Apple Intelligence research | Apple | [Apple Machine Learning Research](https://machinelearning.apple.com/research) |
| Core ML as on-device inference platform | Apple | [Core ML](https://developer.apple.com/documentation/coreml) |
| Create ML for training on Apple platforms | Apple | [Create ML](https://developer.apple.com/documentation/createml) |

### GitHub

| Claim | Company | Doc |
|-------|---------|-----|
| Actions as CI/CD control plane for delivery | GitHub | [GitHub Actions documentation](https://docs.github.com/en/actions) |
| Supply-chain security for repositories | GitHub | [Supply-chain security](https://docs.github.com/en/code-security/supply-chain-security) |
| Copilot as AI-assisted development surface | GitHub | [GitHub Copilot](https://docs.github.com/en/copilot) |
