# Explore IAM

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-25-orange.svg)](https://adoptium.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1-green.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-22-red.svg)](https://angular.dev/)

Explore IAM frees everyone to safely use any technology. Our mission is to connect the right people to the right apps at the right time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Testing](#testing)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [License](#license)

## Features

| Area | Capability |
|------|------------|
| **Identity** | IAM User / Group / Role / federated principal |
| **Policy** | Identity-based and resource-based policies; Action / Resource / Condition; explicit Deny over Allow |
| **STS** | AssumeRole → temporary credentials for least-privilege sessions |
| **SSO** | OIDC (primary) / SAML (secondary) federation into Relying Parties |
| **Audit** | Management events and authorization decision logs |
| **Multi-app** | Explore AI, WhatsFeed, Shopping System, Low Code Platform as resource accounts / OIDC clients |

Optional product modules (console UX depth, permission boundaries, organizations) are documented in the [User Story Map](docs/product-owner/User-Story-Map.md) and sketched in the [C4 model](docs/developer/c4-model/).

## Tech Stack

| Layer | Choice (planned architecture) |
|-------|-------------------------------|
| Runtime | Java 25, Spring Boot 4.1 |
| Frontend | Angular 22, TypeScript, pnpm (IAM Console) |
| OIDC Provider | [Spring Authorization Server](https://docs.spring.io/spring-authorization-server/reference/getting-started.html) (`spring-boot-starter-oauth2-authorization-server`) |
| Federation | Spring Security OAuth2 Client (`spring-boot-starter-oauth2-client`) → Google / GitHub |
| API security | Spring Security + OAuth2 Resource Server (`spring-boot-starter-security`, `spring-boot-starter-oauth2-resource-server`) |
| REST | Spring Web MVC + Validation (`spring-boot-starter-web`, `spring-boot-starter-validation`) |
| Persistence | Spring Data JPA + Liquibase; PostgreSQL (metadata + audit) |
| Cache | Spring Data Redis (optional sessions / token metadata) |
| Ops | Spring Boot Actuator |
| Custom domain | Policy Engine, STS AssumeRole, IAM models, AuthZ decision API (not provided by Spring starters) |
| Diagrams | PlantUML + [C4-PlantUML](https://github.com/plantuml-stdlib/C4-PlantUML) |

Suggested Control Plane starters (BOM-managed; prefer Boot 4.1 `spring-boot-starter-security-oauth2-*` names if the BOM renames them):

```kotlin
implementation("org.springframework.boot:spring-boot-starter-security")
implementation("org.springframework.boot:spring-boot-starter-oauth2-authorization-server")
implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
implementation("org.springframework.boot:spring-boot-starter-web")
implementation("org.springframework.boot:spring-boot-starter-validation")
implementation("org.springframework.boot:spring-boot-starter-data-jpa")
implementation("org.springframework.boot:spring-boot-starter-liquibase")
implementation("org.springframework.boot:spring-boot-starter-data-redis") // optional
implementation("org.springframework.boot:spring-boot-starter-actuator")
```

Architecture target: `web → application → domain ← infrastructure` for the control plane (see C3). **Not implemented as application source in this catalog.** See also [Spring Security OAuth2](https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html).

## Prerequisites

| Tool | Version |
|------|---------|
| JDK | 25+ |
| Node.js | 20+ |
| pnpm | 8+ |
| PlantUML | latest (CLI or editor extension) |
| Git | latest |

Online alternative for diagrams: [PlantUML Online](https://www.plantuml.com/plantuml/uml/) — paste any `.puml` without local install.

## Getting Started

```bash
git clone https://github.com/felixzhu97/explore-iam.git
cd explore-iam
```

In this meta-repo (`public`), the same tree lives at `explore-iam/`.

### 1. Browse C4 sources

```bash
ls docs/developer/c4-model/*.puml
```

### 2. Render diagrams

```bash
# macOS
brew install plantuml
plantuml docs/developer/c4-model/*.puml
```

Or open `docs/developer/c4-model/C1-Context.puml` in VS Code / Cursor with a PlantUML extension.

More detail: [docs/developer/c4-model/README.md](docs/developer/c4-model/README.md).

## Configuration

Planned environment variables for a future implementation (docs-only today — do not expect a running server):

| Variable | Required | Purpose |
|----------|----------|---------|
| `OIDC_ISSUER` | Planned | Explore IAM issuer URL |
| `OIDC_CLIENT_ID` | Planned | Relying Party client id |
| `OIDC_CLIENT_SECRET` | Planned | Relying Party client secret |
| `DATABASE_URL` | Planned | PostgreSQL for identity / policy / audit |
| `REDIS_URL` | Planned | Optional session / token cache |
| `EXTERNAL_IDP_*` | Planned | Google / GitHub federation credentials |

Do not commit real secrets. Defaults and wiring will live in application config when code exists.

## Testing

There is no application test suite yet. Acceptance for this docs package:

```bash
plantuml docs/developer/c4-model/*.puml
# → each diagram renders without PlantUML errors
```

## Documentation

| Doc | Link |
|-----|------|
| C4 model | [docs/developer/c4-model/](docs/developer/c4-model/) |
| Glossary | [docs/Glossary.md](docs/Glossary.md) |
| User story map | [docs/product-owner/User-Story-Map.md](docs/product-owner/User-Story-Map.md) |
| System context (C1) | [docs/developer/c4-model/C1-Context.puml](docs/developer/c4-model/C1-Context.puml) |
| SSO sequence | [docs/developer/c4-model/C4-Sequence-SSOLogin.puml](docs/developer/c4-model/C4-Sequence-SSOLogin.puml) |
| Policy evaluation | [docs/developer/c4-model/C4-Sequence-PolicyEvaluation.puml](docs/developer/c4-model/C4-Sequence-PolicyEvaluation.puml) |
| AWS IAM intro (reference) | [AWS IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) |

## Deployment

| Target | Role |
|--------|------|
| Local | Console + Control Plane + Postgres (+ optional Redis) — see [C4-Deployment.puml](docs/developer/c4-model/C4-Deployment.puml) |
| Production (planned) | Separated Console / API / OIDC endpoints, managed Postgres, audit retention — see [C4-Deployment-Production.puml](docs/developer/c4-model/C4-Deployment-Production.puml) |

No live deployment is claimed for Explore IAM yet; diagrams describe the intended topology.

## License

[MIT](LICENSE) © 2026 Felix
