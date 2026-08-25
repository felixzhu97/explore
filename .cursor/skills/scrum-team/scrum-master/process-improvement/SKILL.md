---
name: process-improvement
description: >-
  Facilitates continuous process improvement for Agile teams: retrospective
  design, Kaizen experiments, impediment removal, and lightweight flow metrics
  (WIP, cycle time, throughput). Use when the user asks for retros, process
  improvement, Scrum Master coaching, unblocking delivery, or team effectiveness.
---

# Process Improvement

## When to use

- Sprint / iteration retrospective
- Delivery feels slow, chaotic, or repeatedly blocked
- Team wants to adopt or repair Scrum / Kanban habits
- Need a small, measurable improvement experiment (not a big-bang process rewrite)

## Principles

1. **Inspect → Adapt → Experiment** — one change at a time, time-boxed.
2. **Team-owned** — SM facilitates; the team chooses and commits.
3. **Evidence over opinion** — prefer flow signals and concrete examples.
4. **Psychological safety** — blameless retros; attack the system, not people.
5. **Do not steal PO/Dev jobs** — no product prioritization or coding as the SM role.

## Retrospective facilitation (default flow)

1. **Set the stage** (2–5 min) — goal, timebox, working agreements.
2. **Gather data** (10–15 min) — what happened; facts + feelings.
3. **Generate insights** (10–15 min) — patterns, root causes (5 Whys sparingly).
4. **Decide what to try** (10 min) — 1–3 actions max; each has owner + due date.
5. **Close** (2–5 min) — confirm experiment and how you will check it next retro.

### Retro formats (pick one)

| Format | Best when |
|--------|-----------|
| Start / Stop / Continue | Habit tuning |
| Mad / Sad / Glad | Morale + friction |
| 4Ls (Liked, Learned, Lacked, Longed for) | Learning-heavy sprint |
| Sailboat (wind / anchors / rocks / island) | Vision vs blockers |
| Timeline + emotions | Incident or rough delivery period |

## Improvement experiment template

For each action, write:

```text
Hypothesis: If we <change>, then <outcome>, measured by <signal>.
Owner: <name>
Check-in: <next retro / date>
Revert if: <failure condition>
```

Keep experiments **≤ 1–2 weeks** unless clearly justified.

## Impediments

1. Make the blocker **visible** (board / chat / impediment list).
2. Classify: team-solvable vs needs org help.
3. Escalate with a **clear ask** (who, what, by when) — not a complaint dump.
4. Track age of impediments; stale ones are a process smell.

## Lightweight flow signals (optional)

Use only if data already exists or is cheap to get:

| Signal | Question it answers |
|--------|---------------------|
| WIP | Are we starting too much? |
| Cycle time | How long from start → done? |
| Throughput | How many items finish per period? |
| Blocked time | Where does wait accumulate? |

Do not build heavy dashboards for their own sake.

## Anti-patterns

- Retro with no follow-up actions
- More than 3 concurrent improvement initiatives
- SM dictating technical or product decisions
- Process theater (ceremonies without outcomes)
- Blaming individuals in retros

## Output checklist

When helping the user, prefer delivering:

- [ ] Retro agenda + chosen format
- [ ] 1–3 experiment cards (hypothesis / owner / check-in)
- [ ] Impediment list with escalation asks (if any)
- [ ] Next inspection point
