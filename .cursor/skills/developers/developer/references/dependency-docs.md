# Project Dependency Reference

**Why-corroboration catalog.** Every row is a `Claim in why` you can paste or adapt into a commit/PR why paragraph, plus an official URL that supports that claim. Prefer specific docs pages over marketing homepages.

When adding a dependency: add a row with claim + deep link — never library name alone.

For industry **vendor** research and open-source hubs, use only
[market-tech-analysis sources](../../market-tech-analysis/references/sources.md)
(**Apple, Google, GitHub**). **Protocols, standards, papers, Hugging Face, and Qwen**
(RFC / NIST / W3C / arXiv abs / HF model cards / qwen.ai) stay allowed whenever the claim
needs them.

## AI / Model reference set

For model-driven changes such as ASR, TTS, LLM, RAG, agent, benchmark, or algorithm updates, do not stop at a single docs link.

When available, use this reference set in both the commit and PR:

1. One **academic** source — preferably the arXiv abs page or official paper page
2. One **Hugging Face** model, collection, dataset, or paper page
3. One **Apple or Google research / docs** page for the method or platform capability (when available)
4. One official **blog, release note, or changelog** from Apple, Google, or GitHub
5. The upstream **GitHub repository** or official implementation docs when they are the implementation source

Example (claims → URLs):

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Cite the method paper for the algorithm change | Technical report / paper | [arXiv abs](https://arxiv.org/) (use the specific abs URL) |
| Cite the open weights / model card | Hugging Face model or collection | [huggingface.co/models](https://huggingface.co/models) (use the specific card URL) |
| Cite Qwen family model / report | Qwen blog / HF / GitHub | [qwen.ai](https://qwen.ai/) · [HF Qwen](https://huggingface.co/Qwen) · [QwenLM](https://github.com/QwenLM) |
| Cite Google recommendation ranking lineage | YouTube DNN paper page | [research.google/pubs/pub45530](https://research.google/pubs/pub45530/) |
| Cite Apple on-device ML guidance | Apple ML Research | [machinelearning.apple.com/research](https://machinelearning.apple.com/research) |
| Point at upstream Actions delivery | GitHub Actions docs | [docs.github.com/en/actions](https://docs.github.com/en/actions) |

Industry hubs: [sources.md](../../market-tech-analysis/references/sources.md).
Protocols / standards / papers / HF / Qwen: same file § Protocols, standards, papers, Hugging Face & Qwen.

## Frontend

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Use Angular 22 app / signals / routing patterns | Angular ^22 | [Angular docs](https://angular.dev/overview) |
| Analog meta-framework for Vite/Angular apps | AnalogJS ^2.6 | [AnalogJS](https://analogjs.org/docs) |
| Use PrimeNG components for complex widgets | PrimeNG | [PrimeNG installation](https://primeng.org/installation) |
| Render charts via ECharts in Angular | ngx-echarts | [ngx-echarts API](https://xieziyu.github.io/ngx-echarts/api-doc/) |
| Render structure diagrams from Mermaid fences with strict security | Mermaid | [Mermaid usage](https://mermaid.js.org/config/usage.html) / [securityLevel](https://github.com/mermaid-js/mermaid/blob/develop/packages/mermaid/src/docs/config/security.md) |
| Render LLM Markdown in the UI | ngx-markdown | [ngx-markdown README](https://github.com/jfcere/ngx-markdown#readme) |
| Utility-first CSS without a second design system | Tailwind CSS ^4.3 | [Tailwind CSS docs](https://tailwindcss.com/docs) |
| PostCSS pipeline for Tailwind / CSS transforms | PostCSS ^8.5 | [PostCSS docs](https://postcss.org/docs/) |
| Compose async streams for HTTP/SSE | RxJS ~7.8 | [RxJS API](https://rxjs.dev/api) |
| Sanitize untrusted HTML before render | DOMPurify ^3.4 | [DOMPurify README](https://github.com/cure53/DOMPurify/blob/master/docs/README.md) |
| Parse Markdown to HTML for display | Marked ^18 | [Marked docs](https://marked.js.org/using_pro) |
| Zone.js change-detection bridge when enabled | Zone.js ~0.15 | [Zone.js package](https://github.com/angular/angular/tree/main/packages/zone.js) |
| Author component styles in Sass | Dart Sass ^1.100 | [Sass documentation](https://sass-lang.com/documentation/) |
| Type-check frontend with TypeScript 6 | TypeScript ~6.0 | [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) |
| Lint TS/JS with project ESLint rules | ESLint | [ESLint docs](https://eslint.org/docs/latest/) |
| Unit-test frontend with Vitest | Vitest ^4 | [Vitest guide](https://vitest.dev/guide/) |
| Install and run frontend scripts with pnpm | pnpm | [pnpm CLI](https://pnpm.io/cli/install) |

## Backend

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Target Java 25 language / runtime APIs | Java 25 | [Java documentation](https://docs.oracle.com/en/java/) |
| Boot the platform with Spring Boot | Spring Boot (managed) | [Spring Boot](https://docs.spring.io/spring-boot/documentation.html) |
| Slice / integration tests on JVM | Spring Boot Test | [Spring Boot Testing](https://docs.spring.io/spring-boot/reference/testing/index.html) |
| Chat / tools / MCP / RAG via Spring AI | Spring AI (managed) | [Spring AI reference](https://docs.spring.io/spring-ai/reference/) |
| Persist aggregates with Spring Data JPA | Spring Data JPA (managed) | [Spring Data JPA](https://docs.spring.io/spring-data/jpa/reference/) |
| Retry transient external calls | Spring Retry 2.0.10 | [Spring Retry](https://docs.spring.io/spring-retry/reference/index.html) |
| Map entities with Hibernate ORM | Hibernate ORM (managed) | [Hibernate ORM docs](https://hibernate.org/orm/documentation/) |
| Version DB schema as code | Liquibase | [Liquibase docs](https://docs.liquibase.com/) |
| Export metrics / observations | Micrometer (managed) | [Micrometer docs](https://docs.micrometer.io/micrometer/reference/) |
| JSON serialize API payloads | Jackson (managed) | [Jackson](https://github.com/FasterXML/jackson#jackson-project-home--wiki) |
| Generate type-safe mappers | MapStruct | [MapStruct](https://mapstruct.org/documentation/stable/reference/html/) |
| Reduce boilerplate on domain + infra types | Lombok (managed) | [Lombok features](https://projectlombok.org/features/) |
| HTTP request/response logging | Logbook | [Logbook README](https://github.com/zalando/logbook#readme) |
| Embedded SQL / vector-friendly local DB | H2 (managed) | [H2 Database](https://www.h2database.com/html/main.html) |
| Connect to MySQL when configured | MySQL Connector/J | [MySQL Connector/J](https://dev.mysql.com/doc/connector-j/en/) |
| Connect to PostgreSQL when configured | PostgreSQL JDBC (managed) | [PostgreSQL JDBC](https://jdbc.postgresql.org/documentation/) |
| Extract text from PDF uploads | Apache PDFBox 3.0.3 | [Apache PDFBox](https://pdfbox.apache.org/) |
| Extra Hibernate types / JSON | Hypersistence Utils 3.10 | [Hypersistence Utils](https://docs.hypersistence.io/hypersistence-utils/) |
| Unit / integration tests on JVM | JUnit | [JUnit 5 user guide](https://docs.junit.org/current/user-guide/) |
| Integration tests with disposable containers | Testcontainers 1.20 | [Testcontainers](https://java.testcontainers.org/) |
| Optional LangChain4j adapters when used | LangChain4j | [LangChain4j](https://docs.langchain4j.info/) |
| On-device / DJL model inference when used | DJL | [Deep Java Library](https://docs.djl.ai/) |
| NLP utilities via OpenNLP when used | Apache OpenNLP | [OpenNLP](https://opennlp.apache.org/docs/) |
| Content detection / parsing via Tika when used | Apache Tika | [Apache Tika](https://tika.apache.org/) |

## Build & Tooling

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Build and test with Gradle Wrapper | Gradle (wrapper) | [Gradle user manual](https://docs.gradle.org/current/userguide/userguide.html) |
| Enforce JVM coverage with JaCoCo | JaCoCo 0.8.13 | [JaCoCo](https://www.jacoco.org/jacoco/trunk/doc/index.html) |
| Static analysis via Error Prone | Error Prone | [Error Prone](https://errorprone.info/docs/installation) |
| Style checks via Checkstyle | Checkstyle | [Checkstyle](https://checkstyle.sourceforge.io/) |
| Git hook runner for local quality gates | Husky | [Husky](https://typicode.github.io/husky/) |
| Run linters only on staged files | lint-staged | [lint-staged](https://github.com/lint-staged/lint-staged#readme) |

## Learning References

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Use evolutionary design / refactoring vocabulary | Martin Fowler | [martinfowler.com](https://martinfowler.com/) |
| Cite Clean Code / craftsmanship practices | Robert C. Martin | [cleancoder.com](https://blog.cleancoder.com/) |
| Cite XP / manifesto values for delivery trade-offs | Agile Manifesto | [agilemanifesto.org](https://agilemanifesto.org/) |
| Google eng / SRE / style / Cloud claim rows | Google Ecosystem | [§ Google Ecosystem](#google-ecosystem) below |
| Apple HIG / identity / security claim rows | Apple Developer | [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) |
| GitHub Actions / security / PR delivery claim rows | GitHub Docs | [docs.github.com](https://docs.github.com/) |

## Google Ecosystem

**Full Google ecosystem** (engineering, SRE, AI/research, Android, Cloud) — not Cloud-only. **UI design stays Apple HIG** (do not cite Material Design for product UI in this repo). Pick the row whose claim matches the commit/PR why. Prefer deep links over homepages.

### Engineering practices & style

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Code review / CL quality | Google eng-practices | [Code Review](https://google.github.io/eng-practices/review/) |
| Java formatting / naming / Javadoc conventions | Google Java Style Guide | [javaguide.html](https://google.github.io/styleguide/javaguide.html) |
| TypeScript style (frontend when relevant) | Google TypeScript Style Guide | [tsguide.html](https://google.github.io/styleguide/tsguide.html) |
| JavaScript style (frontend when relevant) | Google JavaScript Style Guide | [jsguide.html](https://google.github.io/styleguide/jsguide.html) |
| Style guide index (other languages) | Google Style Guides | [styleguide index](https://google.github.io/styleguide/) |

### SRE & production

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| SRE practices / reliability culture | sre.google | [Site Reliability Engineering](https://sre.google/) |
| Latency / traffic / errors / saturation (golden signals) | SRE Book | [Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/) |
| Eliminating toil / automation | SRE Book | [Eliminating Toil](https://sre.google/sre-book/eliminating-toil/) |

### Android / mobile (when relevant)

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Android app architecture / quality | Android Developers | [Guide to app architecture](https://developer.android.com/topic/architecture) |
| AOSP / Android Java conventions | AOSP | [Java code style](https://source.android.com/docs/setup/contribute/code-style) |

### AI & research (Apple / Google / GitHub industry set + papers + HF)

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Cite academic method / result (abs page) | arXiv | [arxiv.org](https://arxiv.org/) |
| Cite open weights / model or collection card | Hugging Face | [huggingface.co/models](https://huggingface.co/models) · [Papers](https://huggingface.co/papers) · [Trending](https://huggingface.co/models?sort=trending) |
| Cite Qwen family models | Qwen | [qwen.ai](https://qwen.ai/) · [HF Qwen](https://huggingface.co/Qwen) · [QwenLM](https://github.com/QwenLM) |
| Gemini / Google AI developer APIs | ai.google.dev | [Google AI for Developers](https://ai.google.dev/) |
| Google Research publications | research.google | [research.google](https://research.google/) · [Publications](https://research.google/pubs/) |
| Apple Machine Learning Research | machinelearning.apple.com | [Apple ML Research](https://machinelearning.apple.com/research) |
| GitHub Copilot / AI on GitHub | Copilot docs | [GitHub Copilot](https://docs.github.com/en/copilot) |

## Learning / protocol & standard references

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Cite academic papers (abs page) | arXiv | [arxiv.org](https://arxiv.org/) |
| Cite open model / dataset / paper cards | Hugging Face | [huggingface.co](https://huggingface.co/) |
| Cite IETF / RFC protocol text | RFC Editor | [rfc-editor.org](https://www.rfc-editor.org/) |
| Cite IETF working-group drafts / RFCs | IETF Datatracker | [datatracker.ietf.org](https://datatracker.ietf.org/) |
| Cite W3C technical reports | W3C TR | [w3.org/TR](https://www.w3.org/TR/) |
| Cite NIST security / identity publications | NIST CSRC | [csrc.nist.gov/publications](https://csrc.nist.gov/publications) |

### Google Cloud (subset of ecosystem)

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Secure / resilient / performant / cost-effective topology | Well-Architected Framework | [Architecture Framework](https://docs.cloud.google.com/architecture/framework) |
| Reliability as a design pillar | Well-Architected Reliability | [Reliability pillar](https://docs.cloud.google.com/architecture/framework/reliability) |
| Performance optimization | Well-Architected Performance | [Performance optimization](https://docs.cloud.google.com/architecture/framework/performance-optimization) |
| Cost / right-sizing | Well-Architected Cost | [Cost optimization](https://docs.cloud.google.com/architecture/framework/cost-optimization) |
| SLOs, ops readiness, reduce toil | Well-Architected Ops | [Operational excellence](https://docs.cloud.google.com/architecture/framework/operational-excellence) |
| Scalable / resilient app patterns (incl. golden signals) | Cloud Architecture Center | [Scalable and resilient apps](https://docs.cloud.google.com/architecture/scalable-and-resilient-apps) |
| Java on Google Cloud | GCP Java | [Java on Google Cloud](https://cloud.google.com/java) |

## Design References

Product UI design for this repo: **Apple HIG only** (not Material).

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Product UI follows Apple design principles | Apple Human Interface Guidelines | [Apple Design](https://developer.apple.com/design/) |
| Guidelines hub for HIG topics | Apple HIG | [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) |
| Utility CSS without inventing a second design system | Tailwind CSS | [Tailwind CSS docs](https://tailwindcss.com/docs) |

## UX References

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Clarity and layout deference in product UI | Apple HIG Layout | [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) |
| Typography hierarchy | Apple HIG Typography | [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) |
| Color system and contrast | Apple HIG Color | [Color](https://developer.apple.com/design/human-interface-guidelines/color) |
| Purposeful motion | Apple HIG Motion | [Motion](https://developer.apple.com/design/human-interface-guidelines/motion) |
| Accessibility for inclusive UI | Apple HIG Accessibility | [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) |
| Apple-inspired component patterns via shadcn reference | shadcn/ui Apple | [shadcn Apple design](https://www.shadcn.io/design/apple) |
| Animate with Tailwind utilities | Tailwind animation | [Animation](https://tailwindcss.com/docs/animation) |

## Jira

| Claim in why | Artifact | Official doc |
|--------------|----------|--------------|
| Track ExploreAI work in Jira Cloud | Jira site | [felixzhu.atlassian.net](https://felixzhu.atlassian.net) |
| ExploreAI project backlog / SP | Project AI | [AI project](https://felixzhu.atlassian.net/projects/AI) |
