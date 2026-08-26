# Incident Response & Vulnerability Management

## Incident severity (example)

| Level | Criteria | Initial actions |
|-------|----------|-----------------|
| Critical | Active exploit, data breach | Contain, notify, preserve evidence |
| High | Exploitable vuln in prod | Patch or mitigate within SLA |
| Medium | Limited impact, workaround exists | Schedule fix, monitor |
| Low | Hardening, no direct exploit path | Backlog |

## Vulnerability lifecycle

```
Discover → Triage → Remediate → Verify → Document
```

- **Discover**: SCA, pen test, bug bounty, monitoring alerts
- **Triage**: CVSS + exploitability + asset criticality
- **Remediate**: patch, config, WAF rule, feature flag
- **Verify**: regression + security-engineer PR review
- **Document**: ticket, changelog, evidence for audit

## Monitoring / SOC (design level)

- Log authentication failures, authorization denials, admin actions
- Alert on anomaly: rate spikes, geo, privilege changes
- Retention aligned with compliance-engineer constraints
- devops-engineer owns pipeline; security-architect defines signals

## References

- https://www.nist.gov/cyberframework
- https://attack.mitre.org/
