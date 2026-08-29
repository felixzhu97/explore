# `@explore/dev-ports`

Canonical **local development port map** for catalogued Explore apps.
Single source of truth so parallel `explore-*` stacks do not collide.

## Band rules

Apps are ordered `ai → iam → chat → commerce → lowcode`. Within each
band, ports use equal spacing:

| Band | Role | Step | Origin |
|------|------|------|--------|
| `42xx` | Web / Admin UI | +10 per slot | `4200` |
| `9xxx` | HTTP API | +100 per app | `9000` |
| `81xx`–`82xx` | Sidecars (Python, etc.) | +10 in-app; +100 between apps | chat `8100`, commerce `8200` |
| `85xx` | Infra (MinIO, …) | fixed | `8500` |

## Port table

| App | Role | Port |
|-----|------|------|
| explore-ai | api | 9000 |
| explore-ai | web | 4200 |
| explore-iam | api | 9100 |
| explore-iam | web | 4210 |
| explore-chat | api | 9200 |
| explore-chat | web | 4220 |
| explore-chat | recommendation | 8100 |
| explore-chat | vision | 8110 |
| explore-chat | rag | 8120 |
| explore-chat | minio | 8500 |
| explore-commerce | api | 9300 |
| explore-commerce | web | 4230 |
| explore-commerce | admin | 4240 |
| explore-commerce | crawler | 8200 |
| explore-lowcode | web | 4250 |

Authoritative JSON: [`ports.json`](./ports.json).

## Usage

```js
import { getPort, getPorts } from '@explore/dev-ports';

getPort('explore-chat', 'api'); // 9200
```

Or read JSON directly:

```js
import ports from '@explore/dev-ports/ports.json' with { type: 'json' };
```

App scripts should hard-code the same numbers as this table (and point
README / QUICKSTART here). Prefer env defaults that match `ports.json`.
