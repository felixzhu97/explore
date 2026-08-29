---
name: cybersecurity
description: >-
  Cybersecurity practice: threat modeling STRIDE, security architecture,
  incident response, vulnerability management, and monitoring strategy.
  Use when threat modeling, attack surface review, security architecture,
  incident response, SOC design, or vuln program — not PR-level AppSec
  (security-engineer) or regulatory DoD (compliance-engineer).
---

# Cybersecurity

Threat modeling, security architecture, and security operations **design** —
not line-by-line OWASP PR review (→ `security-engineer`) or legal/regulatory
DoD (→ `compliance-engineer`).

Subagent: [`security-architect`](../../../agents/security-architect.md).

## When to run

- New system, major feature, or new external exposure
- Threat modeling or attack surface review requested
- Security architecture or zero-trust boundary decisions
- Incident response planning or post-incident review
- Vulnerability management program or SLA definition
- SOC / monitoring / alerting strategy (with devops-engineer)

## Hard rules

1. Separate **fact** (observed) from **inference** from **recommendation**
2. Do **not** replace AppSec PR review → `security-engineer`
3. Do **not** interpret law or audit policy → `compliance-engineer`
4. Do **not** replace C4/DDD architecture review → `architect` (collaborate on boundaries)
5. Controls must be **actionable** with an owner (Dev, SecEng, DevOps)

## Workflow

```
Scope → Assets & trust boundaries → Threat model → Controls → Residual risk → Handoff
```

### 1. Scope

System/feature, environments, adversary assumptions, decision (ship, defer, mitigate).

### 2. Assets & trust boundaries

See [references/threat-modeling.md](references/threat-modeling.md).

### 3. Threat model

STRIDE per boundary crossing; link to MITRE ATT&CK techniques when useful.

### 4. Controls

Prevent / detect / respond; map to layers (identity, network, app, data, ops).

### 5. Residual risk

What remains after controls; severity; accept vs transfer vs fix.

### 6. Handoff

| Output | Receiver |
|--------|----------|
| Control implementation | `developer` |
| PR/diff AppSec review | `security-engineer` |
| Logs, alerts, pipelines | `devops-engineer` |
| Regulatory / DoD mapping | `compliance-engineer` |
| C4 container / boundary docs | `architect` |

## Output template

```markdown
# [System/Feature] — Security Architecture Brief
**Date:** YYYY-MM-DD | **Scope:** …

## Assets & trust boundaries
- …

## Threat model (STRIDE summary)
| Flow / asset | Threat | Control | Owner |
|--------------|--------|---------|-------|

## Residual risk
| Risk | Severity | Decision |
|------|----------|----------|

## Handoff
- [ ] …

## References
- https://…
```

## Related

| Need | Where |
|------|-------|
| Subagent | [security-architect](../../../agents/security-architect.md) |
| PR OWASP / secrets / CVE | [security-engineer](../../../agents/security-engineer.md) |
| GDPR / audit / DoD | [compliance-engineer](../../../agents/compliance-engineer.md) |
| C4 / DDD layers | [architect](../../../agents/architect.md) |
| Threat modeling detail | [references/threat-modeling.md](references/threat-modeling.md) |
| Incident / vuln detail | [references/incident-vuln.md](references/incident-vuln.md) |

## References

- https://owasp.org/www-community/Threat_Modeling
- https://www.nist.gov/cyberframework
- https://attack.mitre.org/
