# Agents

Custom Cursor subagents copied from `~/.cursor/agents/` for portable
development.

| Agent | File | Use when |
|-------|------|----------|
| Architect | [architect.md](./architect.md) | C4, DDD layers, technical architecture |
| Business Analyst | [business-analyst.md](./business-analyst.md) | Ubiquitous language, bounded contexts, domain modeling |
| Compliance Engineer | [compliance-engineer.md](./compliance-engineer.md) | GDPR, audit red lines, DoD constraints, evidence |
| Market Analyst | [market-analyst.md](./market-analyst.md) | Market trends, competitors, GTM, pricing signals |
| Developer | [developer.md](./developer.md) | Full-stack implementation, DDD/TDD, minimal diff |
| AI Engineer | [ai-engineer.md](./ai-engineer.md) | Spring AI, RAG, tools, MCP, agent workflows |
| DevOps Engineer | [devops-engineer.md](./devops-engineer.md) | CI/CD, infra, deploy, monitoring |
| Orchestrator | [orchestrator.md](./orchestrator.md) | Multi-agent workflows |
| Product Owner | [product-owner.md](./product-owner.md) | Jira tasks, user stories, acceptance criteria |
| Security Architect | [security-architect.md](./security-architect.md) | Threat modeling, security architecture, incident/vuln |
| Security Engineer | [security-engineer.md](./security-engineer.md) | PR AppSec: OWASP, secrets, CVE, auth/authz |
| Test Engineer | [test-engineer.md](./test-engineer.md) | Unit/integration/E2E tests, mocks, coverage |
| UX Reviewer | [ux-reviewer.md](./ux-reviewer.md) | Apple-style UI/UX review |

**Note — security three tracks:** `compliance-engineer` (regulatory) /
`security-architect` (threat model & architecture) /
`security-engineer` (PR-level AppSec).

Refresh:

```bash
cp ~/.cursor/agents/*.md .cursor/agents/
# keep this README; do not overwrite from global
```
