# Testing Core

Minimal testing standards for this repo. Applied via the [developer skill](../SKILL.md).

## Pyramid

| Layer | Share | Focus |
|-------|-------|-------|
| Unit | ~70% | Domain / pure logic; &lt; 1ms; no I/O |
| Integration | ~20% | Collaborators (DB, Spring, queues); Testcontainers when needed |
| E2E | ~10% | Critical user journeys only (Playwright); keep few |

Prefer many fast unit tests over a wide E2E suite.

## BDD

- Business language; one scenario = one behavior
- Structure: **Given** precondition → **When** action → **Then** outcome
- Outcomes, not “system calls X”
- Same vocabulary as repo `docs/Glossary.md` (when present)

## TDD

```
Red (failing test) → Green (minimal code) → Refactor (keep green)
```

- Write the test first when implementing domain/application behavior
- AAA: Arrange / Act / Assert
- Do not test private methods; do not hit network/DB in unit tests

## Naming

Natural language with spaces — do **not** use `should_result_when_condition` snake_case:

```
should expected result when condition
```

| Surface | Example |
|---------|---------|
| Vitest `it(...)` / JUnit `@DisplayName` | `should open popover below chip when space is available` |
| Java method identifier | `shouldOpenPopoverBelowChipWhenSpaceIsAvailable` |

## Test doubles

| Type | Use |
|------|-----|
| Dummy | Unused parameter filler |
| Fake | In-memory repo / simplified collaborator |
| Stub | Fixed return values |
| Mock | Verify interactions only when the interaction is the contract |
| Spy | Partial real object + call recording |

Prefer **Fake** for repositories over heavy mocking.

## Anti-patterns (avoid)

| Smell | Fix |
|-------|-----|
| Asserting internals / counts of private state | Assert business outcomes |
| `assertTrue(result)` with no meaning | Precise assertions |
| Mock everything | Fake or real simple collaborators |
| Unit tests that open DB/network | Move to integration or stub |
| Commented-out / ignored tests | Delete or fix |
| Ice-cream cone (many E2E, few unit) | Rebalance toward unit |

## Spring Test (JVM)

Stack: `spring-boot-starter-test` → JUnit 5 + AssertJ + Mockito. Deeper BDD / fixtures: [tdd-unit-testing](../../tdd-unit-testing/SKILL.md).

Pick the **smallest** Spring context that fits. Prefer slice over `@SpringBootTest`.

| Code under test | Prefer | Annotations / tools |
|-----------------|--------|---------------------|
| `domain/` pure logic | Unit | `@ExtendWith(MockitoExtension.class)` — **no** Spring context |
| `controller/` HTTP contract | Slice | `@WebMvcTest(SampleController.class)` + `MockMvc` + `@MockitoBean` collaborators |
| `infra/` JPA / repository | Slice | `@DataJpaTest` (or `@JdbcTest`); Testcontainers only when dialect matters |
| Cross-layer end-to-end | Few integration | `@SpringBootTest` + `@AutoConfigureMockMvc` or Testcontainers |

Rules:

- Do **not** start Spring in domain tests for “convenient injection”.
- Do **not** use `@SpringBootTest` for every controller test.
- Use `@MockitoBean` (Spring Boot 3.4+), not deprecated `@MockBean`.

### Controller slice skeleton

```java
@WebMvcTest(SampleController.class)
@Import({ /* Security / filters needed for this test only */ })
@WithMockUser // or @WithUserDetails
class SampleControllerTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper objectMapper;
    @MockitoBean SampleService service;

    @Test
    void shouldReturn200WhenResourceExists() throws Exception {
        when(service.findById(1L)).thenReturn(Optional.of(sample()));
        mvc.perform(get("/api/v1/samples/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1));
    }
}
```

- `@Import` only what the test needs (security, filters).
- Stub collaborators with `@MockitoBean`; assert **HTTP status / body**, not Mockito call counts unless interaction is the contract.

### Domain unit skeleton

```java
@ExtendWith(MockitoExtension.class)
class SampleAggregateTest {
    @InjectMocks SampleService service;
    @Mock SampleAggregateRepository repository;

    @Test
    void shouldRejectRenameWhenNameBlank() {
        assertThatThrownBy(() -> aggregate.rename(" "))
            .isInstanceOf(IllegalArgumentException.class);
    }
}
```

### Assertions

- Domain / service: AssertJ (`assertThat`, `assertThatThrownBy`).
- HTTP: `MockMvcResultMatchers.status()`, `jsonPath()`.

### Spring Test anti-patterns

| Smell | Fix |
|-------|-----|
| `@SpringBootTest` for every controller | `@WebMvcTest` + MockMvc |
| Spring context in domain tests | `@ExtendWith(MockitoExtension.class)` only |
| Heavy `verify(mock, times(n))` | Assert observable HTTP / domain outcome |
| JUnit 4 + JUnit 5 mixed | JUnit 5 only |

## Layers in this codebase

| Code under test | Prefer |
|-----------------|--------|
| `domain/` | Unit + TDD; no Spring (see Spring Test table) |
| `service/` | Unit with Fake repos; `@ExtendWith(MockitoExtension.class)` |
| `controller/` | `@WebMvcTest` slice + MockMvc |
| `infra/` | `@DataJpaTest` or integration with Testcontainers |
| Critical UI flows | Few E2E (Vitest / Playwright) |

## References

- https://docs.spring.io/spring-boot/reference/testing/index.html
- https://docs.spring.io/spring-framework/reference/testing.html
