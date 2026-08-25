# Agents

Custom Cursor subagents copied from `~/.cursor/agents/` for portable
development.

| Agent | File | Use when |
|-------|------|----------|
| Architect | [architect.md](./architect.md) | Architecture review, DDD compliance, C4, docs |
| Business Analyst | [business-analyst.md](./business-analyst.md) | Ubiquitous language, bounded contexts, domain modeling |
| Developer | [developer.md](./developer.md) | Full-stack implementation, DDD/TDD, minimal diff |
| AI Engineer | [ai-engineer.md](./ai-engineer.md) | Spring AI, RAG, tools, MCP, agent workflows |
| DevOps Engineer | [devops-engineer.md](./devops-engineer.md) | CI/CD, infra, deploy, monitoring |
| Orchestrator | [orchestrator.md](./orchestrator.md) | Multi-agent workflows (BA → PO → dev → test) |
| Product Owner | [product-owner.md](./product-owner.md) | Jira tasks, user stories, acceptance criteria |
| Security Engineer | [security-engineer.md](./security-engineer.md) | Security review, secrets, CVE, auth/authz |
| Test Engineer | [test-engineer.md](./test-engineer.md) | Unit/integration/E2E tests, mocks, coverage |
| UX Reviewer | [ux-reviewer.md](./ux-reviewer.md) | Apple-style UI/UX review |

Refresh:

```bash
cp ~/.cursor/agents/*.md .cursor/agents/
# keep this README; do not overwrite from global
```
