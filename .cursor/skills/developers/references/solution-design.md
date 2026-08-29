# Solution Design References

Top-tier **system / solution / platform** architectures — end-to-end shapes, not coding style guides.  
Use when proposing how to assemble a platform (data plane, control plane, AI stack). For domain UX/product framing see [product-domain-design.md](./product-domain-design.md); for day-to-day eng practice see [engineering.md](./engineering.md).

---

## A. Classic distributed solutions

### Data stores & consistency

| Claim | Company | Doc |
|-------|---------|-----|
| Prefer eventual consistency + quorum for shopping-cart scale KV | Amazon | [Dynamo: Amazon’s Highly Available Key-value Store (PDF)](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) |
| Globally distributed SQL with external consistency | Google | [Spanner: Google’s Globally-Distributed Database](https://research.google/pubs/pub39966/) |
| Wide-column store design for petabyte workloads | Google | [Bigtable](https://research.google/pubs/pub27898/) |

### Event / log-centric architecture

| Claim | Company | Doc |
|-------|---------|-----|
| Commit-log as central data pipeline (Kafka origin at LinkedIn) | LinkedIn | [Kafka Ecosystem at LinkedIn](https://www.linkedin.com/blog/engineering/open-source/kafka-ecosystem-at-linkedin) |
| Operating Kafka at multi-trillion messages / day | LinkedIn | [Kafka at 7 trillion messages per day](https://www.linkedin.com/blog/engineering/open-source/apache-kafka-trillion-messages) |
| Evolution beyond Kafka for LinkedIn-scale log storage | LinkedIn | [Northguard and Xinfra](https://www.linkedin.com/blog/engineering/infrastructure/introducing-northguard-and-xinfra) |

### Microservices, edge, resilience

| Claim | Company | Doc |
|-------|---------|-----|
| Domain-oriented microservice architecture | Uber | [DOMA](https://www.uber.com/us/en/blog/microservice-architecture/) |
| Edge / CDN partnership model for global streaming | Netflix | [How Netflix Works With ISPs / CDNs](https://netflixtechblog.com/how-netflix-works-with-isps-around-the-globe-to-deliver-a-great-viewing-experience-8452d94e1d40) |
| Active-active / multi-region resilience patterns | Amazon | [Static stability using Availability Zones](https://aws.amazon.com/builders-library/static-stability-using-availability-zones/) |
| Chaos / failure injection as solution validation | Netflix | [Netflix TechBlog — Chaos Engineering](https://netflixtechblog.com/tagged/chaos-engineering) |
| SRE as operational solution design | Google | [Site Reliability Engineering Book](https://sre.google/sre-book/table-of-contents/) |

---

## B. AI / platform solutions

Prefer **architecture / reference** pages over marketing landings.

### Google

| Claim | Company | Doc |
|-------|---------|-----|
| Vertex AI as managed training/serving control + data plane | Google | [Vertex AI documentation](https://cloud.google.com/vertex-ai/docs) |
| Grounding / RAG patterns on Google Cloud | Google | [Grounding overview (Vertex AI)](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview) |
| Recommendation systems design survey (industry classic from Google) | Google | [Deep Neural Networks for YouTube Recommendations](https://research.google/pubs/pub45530/) |

### Meta

| Claim | Company | Doc |
|-------|---------|-----|
| Large-scale ranking / recommendation serving lessons | Meta | [Meta Engineering — AI](https://engineering.fb.com/category/ml-applications/) |
| Ads / ranking systems research publication hub | Meta | [Meta Research — Machine Learning](https://research.facebook.com/blog/category/machine-learning/) |
| PyTorch as production ML platform foundation | Meta | [PyTorch at Meta scale narratives](https://engineering.fb.com/category/developer-tools/) |

### Microsoft

| Claim | Company | Doc |
|-------|---------|-----|
| Separate control plane vs inference data plane for Azure OpenAI | Microsoft | [Azure OpenAI reference](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference) |
| Baseline Azure OpenAI landing-zone / solution architecture | Microsoft | [Baseline OpenAI end-to-end chat reference architecture](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/architecture/baseline-openai-e2e-chat) |
| RAG solution pattern on Azure | Microsoft | [RAG with Azure AI Search](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-solution-design-and-evaluation-guide) |

### Amazon

| Claim | Company | Doc |
|-------|---------|-----|
| Managed personalization as a productized recommender service | Amazon | [Amazon Personalize Developer Guide](https://docs.aws.amazon.com/personalize/latest/dg/what-is-personalize.html) |
| SageMaker as end-to-end ML platform (train → deploy → monitor) | Amazon | [SageMaker Developer Guide](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html) |
| Generative AI on AWS solution guidance | Amazon | [Generative AI on AWS](https://docs.aws.amazon.com/generative-ai-on-aws/) |

### Cross-cutting AI platform notes

| Claim | Company | Doc |
|-------|---------|-----|
| Responsible AI / safety evaluation as part of solution DoD | Microsoft | [Responsible AI Standard](https://www.microsoft.com/en-us/ai/responsible-ai) |
| Secure AI deployment patterns | Google | [Secure AI Framework (SAIF)](https://safety.google/cybersecurity-advancements/saif/) |
