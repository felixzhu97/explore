# DDD Rich Model

Aligned with [architecture rule](../../../../../rules/architecture.mdc). C4: [c4-model](./c4-model.md).

## Rich vs anemic

| Rich (preferred) | Anemic (avoid) |
|------------------|----------------|
| Entity methods enforce invariants | Entity is only fields + getters/setters |
| Service loads aggregate, calls domain API, saves | Service contains all if/else business rules |
| VO validates on construction | Primitives passed everywhere |

## Kernel

Place in `domain/model/` (or shared `base/domain/model` if the repo already has it).

| Type | Role |
|------|------|
| `AbstractImmutable` | Identity `id`, created-at |
| `AbstractEntity` | Extends immutable; last-modified, optimistic `@Version` |
| `AbstractEmbeddable` | Embeddable VO base (reserved field so Hibernate empty composites are not `null`) |

```java
@MappedSuperclass
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public abstract class AbstractImmutable {
    @Id
    @GeneratedValue
    private final Long id;

    @Column(updatable = false)
    @CreationTimestamp
    private final LocalDateTime createdAt = LocalDateTime.now();

    protected AbstractImmutable(Long id) {
        this.id = id;
    }
}

@MappedSuperclass
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class AbstractEntity extends AbstractImmutable {
    @UpdateTimestamp
    private LocalDateTime lastModifiedAt = LocalDateTime.now();

    @Version
    private int version;

    protected AbstractEntity(Long id) {
        super(id);
    }
}

@MappedSuperclass
public abstract class AbstractEmbeddable {
    @SuppressWarnings("unused")
    private final String reserved = "";
}
```

### Annotations

| Kind | Annotations |
|------|-------------|
| Immutable base | `@MappedSuperclass` `@Id` `@GeneratedValue` `@CreationTimestamp` `@Getter` `@SuperBuilder` `@NoArgsConstructor(PROTECTED, force=true)` |
| Mutable base | same inheritance; add `@UpdateTimestamp` `@Version` |
| Embeddable base | `@MappedSuperclass` + reserved field |
| Aggregate / entity | `@Entity` `@Getter` `@NoArgsConstructor(PROTECTED, force=true)`; **no** `@Setter`; collections `@Getter(AccessLevel.NONE)` + custom unmodifiable getter; `@OneToMany(cascade=ALL, orphanRemoval=true)` |
| Immutable / JOINED tree | `@Inheritance(JOINED)` on abstract root; `@Immutable`; `@SuperBuilder`; `final` fields |
| Value object | `@Embeddable` `@AllArgsConstructor` `@Getter`; `final` fields; **no** setter; parent `@ElementCollection` |

Do **not** use `@Data`, `@Builder`, `@EqualsAndHashCode`, or **class-level `@Setter`** on aggregates. Do **not** put `@AllArgsConstructor` on JPA inheritance trees (use `@SuperBuilder` or an `id` ctor). No `@Service` / `@Component` on domain types.

Bean Validation on fields (`@NotBlank`, `@NotNull`, `@Size`). Cross-field / collection invariants stay in entity methods.

### Getter / Setter (by scenario)

| Scenario | Getter | Setter |
|----------|--------|--------|
| Aggregate/entity scalar (changed only via behavior) | Class `@Getter` for read; or field-level `@Getter` | **No** `@Setter`; assign inside behavior methods |
| Aggregate collection (`@OneToMany`, etc.) | Custom `getXxx()` returns unmodifiable view; field `@Getter(AccessLevel.NONE)` | **No** `@Setter` |
| Value object | Class `@Getter`; `final` fields | **No** setter |
| Kernel (`AbstractImmutable` / `AbstractEntity`) | Class `@Getter` (id, audit fields) | No public setter; `@Version` / timestamps managed by JPA |
| Forbidden | Class `@Data`, class `@Setter` | Public setter on business fields “for ORM convenience” |

Principles: **change state through behavior, not setters**; **never expose mutable collection references**.

### JPA mapping (default names)

Use Hibernate/JPA **default physical naming** — do not override table or column names in domain types:

- `@Entity` / `@Embeddable`: **no** `@Table` or `@Table(name = …)`.
- Fields: **no** `@Column(name = …)` (validation and non-name attributes such as `updatable = false` are fine).
- Associations: **no** `@JoinColumn(name = …)` or custom `@JoinTable` names; rely on default FK / join-table names.
- Do not add table/column naming overrides in domain code or domain-local config.

## Basic implementation (default)

Use the **simplest DDD shape** that satisfies the story:

1. **Kernel inheritance** — aggregates/entities extend `AbstractEntity`; VOs extend `AbstractEmbeddable`.
2. **Rich behavior** — invariants and state changes live on aggregate/entity methods (`rename`, `addChild`, …), not in `service/`.
3. **Orchestration only** — `service/` loads, calls domain API, saves via repository.
4. **No independent domain events** — do not add `domain/model/event/`, `*Event` types, in-memory event lists, bus, or outbox in the default path. Model outcomes as entity state; integrate asynchronously only when a ticket explicitly requires it.
5. **Domain diagram** — Phase 1 `C4-Code-Domain-Model.puml` lists each aggregate/entity `+method` matching the public domain API (no getters); see [c4-model](./c4-model.md).

## Patterns

### Aggregate / entity

```java
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public class SampleAggregate extends AbstractEntity {
    @NotBlank
    private String name;

    @Getter(AccessLevel.NONE)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn
    private final List<SampleEntity> children = new ArrayList<>();

    public SampleAggregate(Long id, String name) {
        super(id);
        this.name = name;
    }

    public void rename(@NotBlank String name) {
        if (name.isBlank()) {
            throw new IllegalArgumentException("name required");
        }
        this.name = name;
    }

    public List<SampleEntity> getChildren() {
        return Collections.unmodifiableList(children);
    }
}
```

### Value object

```java
@Embeddable
@AllArgsConstructor
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public class SampleValue extends AbstractEmbeddable {
    @NotBlank
    private final String key;
}
```

### Repository

```java
public interface SampleAggregateRepository {
    Optional<SampleAggregate> findById(Long id);
    void save(SampleAggregate aggregate);
}
```

Implementation lives in `infra/` only.

### Service (orchestration)

```java
@Service
@RequiredArgsConstructor
class SampleService {
    private final SampleAggregateRepository repository;

    public void rename(Long id, String name) {
        SampleAggregate aggregate = repository.findById(id).orElseThrow();
        aggregate.rename(name);
        repository.save(aggregate);
    }
}
```

Invariants stay on the aggregate, not in the service.

## Ubiquitous language

Source of truth: repo `docs/Glossary.md` (when present)

- Name types, variables, and methods with the glossary Preferred Term for that bounded context
- Domain diagram `+method` names must match aggregate/entity public API in code
- Keep the same terms in BDD scenarios, unit tests, domain code, REST/DTO fields, and commits
- New concept: glossary entry → domain model → API → PR references the glossary change
