# Glossary | 领域术语表

> WhatsFeed — Ubiquitous Language（统一语言）

---

## 1. Purpose | 文档说明

This document defines the project **Ubiquitous Language**. English terms are the **preferred canonical names** and must align with code, API, and architecture naming. Chinese labels are for localization and stakeholder communication only.

### Maintenance Principles

1. **Glossary first**: Add or update terms here before implementing code
2. **Code sync**: Domain model changes must update the corresponding glossary entry
3. **Preferred term**: Use the **Preferred Term (English)** column for code, API, commits, and technical docs

---

## 2. Business Domains | 业务域总览

| Preferred Term | 中文 | Package / Area（planned） | Notes |
| -------------- | ---- | ------------------------- | ----- |
| Auth | 认证 | `auth/` | JWT / session |
| User | 用户 | `users/` | Profiles, follows |
| Post | 帖子 | `post/` | Feed items, engagement |
| Feed | 信息流 | Feed / Explore / Reels | Ranking optional |
| Chat | 聊天 | chat / messaging | Socket.IO |
| Call | 通话 | WebRTC signaling | STUN/TURN |
| Media | 媒体 | uploads + media-gen | Object / local storage |
| Admin | 管理 | admin | Ops console |
| Explore AI BFF | AI 代理 | Nest BFF | `X-Service-Key` |

---

## 3. Core Terms

| Preferred Term (English) | 中文 | Definition | Type | Notes |
| ------------------------ | ---- | ---------- | ---- | ----- |
| Feed Item | 信息流条目 | Content unit in home / explore / reels | Entity | — |
| Follow | 关注 | Directed relationship between users | Entity | — |
| Chat Thread | 会话 | Conversation container for messages | Aggregate | — |
| Presence | 在线状态 | Online / offline signal | Technical | Redis |
| Explore AI BFF | Explore AI 网关 | Proxies AI calls to Explore AI | Adapter | Service key |

## Reference

- [C4 model](developer/c4-model/)
- [User Story Map](product-owner/User-Story-Map.md)
