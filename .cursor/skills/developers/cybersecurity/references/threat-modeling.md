# Threat Modeling

Use when scoping assets, trust boundaries, and STRIDE threats for a system
or feature change.

## STRIDE (per element)

| Category | Question |
|----------|----------|
| Spoofing | Can an actor pretend to be someone/something else? |
| Tampering | Can data or code be modified in transit or at rest? |
| Repudiation | Can actions be denied without evidence? |
| Information disclosure | Can sensitive data leak? |
| Denial of service | Can availability be degraded? |
| Elevation of privilege | Can access exceed intended scope? |

## Trust boundaries

- Draw boundaries where privilege, network, or data sensitivity changes
- External users, admin APIs, third-party integrations, background jobs
- Align with C4 containers when available; do not replace DDD review

## Data flow

1. List entry points (UI, API, webhooks, batch)
2. Mark data stores and sensitive fields (PII, credentials, tokens)
3. Apply STRIDE per crossing boundary

## Output (minimal)

| Asset / flow | Threat | Control | Owner |
|--------------|--------|---------|-------|
| … | … | … | Dev / SecEng |

## References

- https://owasp.org/www-community/Threat_Modeling
- https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html
