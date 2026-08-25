# Implementation policy: Framework-first (required)

When implementing under the Developers role:

1. **Detect the project’s primary frameworks** from the repo (e.g. Angular, Spring Boot / Spring AI, Vite/Vitest) before choosing libraries or patterns.
2. **Prefer first-party framework capabilities** over third-party or hand-rolled equivalents when they cover the need:
   - Angular: signals / `resource` / DI / Router / HttpClient / forms / built-in control flow — not custom state/HTTP stacks when Angular already provides them
   - Spring Boot / Spring ecosystem: starters, auto-configuration, Spring Data, Spring Security, Spring AI abstractions — not parallel DIY frameworks
   - Tests: framework test harnesses (TestBed, `@SpringBootTest`, Vitest project defaults) before inventing runners
3. **Add a third-party dependency only when** the framework has no adequate built-in (document why in the answer / PR why).
4. **Cite official framework docs** for the chosen API (in addition to big-tech [`README.md`](./README.md) indexes when proposing architecture/domain/solution design).
