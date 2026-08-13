# WhatsFeed

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Architecture](https://img.shields.io/badge/Architecture-C4-blue.svg)](docs/developer/c4-model/)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E.svg)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-docs-black.svg)](https://nextjs.org/)

WhatsFeed brings social feed and messaging into one product. Our mission is to help people share, chat, and discover safely across web and mobile.

> Architecture docs in this meta-repo. Full application source lives in the project remote.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Documentation](#documentation)
- [License](#license)

## Features

| Area | Capability |
|------|------------|
| **Feed** | Posts, Reels, explore, comments, follows |
| **Chat** | Messaging, presence, calls (WebRTC) |
| **Admin** | Ops for users, content, safety |
| **AI (optional)** | Explore AI via Nest BFF (`X-Service-Key`) |

Optional / planned modules are indexed in the [User Story Map](docs/product-owner/User-Story-Map.md).

## Tech Stack

| Layer | Choice |
|-------|--------|
| Web / Admin | Next.js, React, TypeScript |
| Mobile | React Native, Expo |
| API | NestJS, Prisma, Socket.IO, GraphQL |
| Data | PostgreSQL, Redis (+ optional stores) |
| Diagrams | PlantUML + C4-PlantUML |

## Documentation

| Doc | Link |
|-----|------|
| C4 model | [docs/developer/c4-model/](docs/developer/c4-model/) |
| Glossary | [docs/Glossary.md](docs/Glossary.md) |
| User story map | [docs/product-owner/User-Story-Map.md](docs/product-owner/User-Story-Map.md) |

## License

[MIT](LICENSE) © 2026 Felix
