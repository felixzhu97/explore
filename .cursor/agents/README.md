# Agents

Custom Cursor subagents copied from `~/.cursor/agents/` for portable
development.

| Agent | File | Use when |
|-------|------|----------|
| Architect | [architect.md](./architect.md) | Architecture review, DDD compliance, C4, docs |
| DDD Developer | [ddd-developer.md](./ddd-developer.md) | Domain code, entities, tests (TDD/DDD) |
| Developer | [developer.md](./developer.md) | Full-stack implementation, minimal diff |
| DevOps Engineer | [devops-engineer.md](./devops-engineer.md) | CI/CD, infra, deploy, monitoring |
| Orchestrator | [orchestrator.md](./orchestrator.md) | Multi-agent workflows (PM → dev → test) |
| Product Manager | [product-manager.md](./product-manager.md) | Jira tasks, user stories, acceptance criteria |
| Test Engineer | [test-engineer.md](./test-engineer.md) | Unit/integration/E2E tests, mocks, coverage |
| UX Reviewer | [ux-reviewer.md](./ux-reviewer.md) | Apple-style UI/UX review |

Refresh:

```bash
cp ~/.cursor/agents/*.md .cursor/agents/
# keep this README; do not overwrite from global
```
