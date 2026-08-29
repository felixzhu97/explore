# Product Domain Design References

Top-tier **product domain design** — how leading firms shape the *product problem*, domain objects, and user/market flows at scale.  
Use when modeling domains (marketplace, feed, identity, messaging, search, commerce), not when you only need coding standards ([engineering.md](./engineering.md)) or platform blueprints ([solution-design.md](./solution-design.md)).

Each section: **product problem → domain emphasis → Claim + Doc**.

## Marketplace / matching

**Product problem:** Match supply and demand in real time under geography, ETA, fairness, and network-level efficiency — not “nearest driver wins.”

**Domain emphasis:** Rider/Driver (or Consumer/Courier) as peers; Match as a batch optimization over a local graph; ETA and utilization as first-class outcomes.

| Claim | Company | Doc |
|-------|---------|-----|
| Batch matching optimizes network wait/earnings, not only closest pair | Uber | [Marketplace Matching](https://www.uber.com/us/en/marketplace/matching/) |
| Simulate marketplace dynamics before production rollout | Uber | [Simulated Marketplace with ML](https://www.uber.com/blog/simulated-marketplace/) |
| Matching optimizes reliability/efficiency for the network, not only one trip | Uber | [Marketplace Matching](https://www.uber.com/us/en/marketplace/matching/) |

## Content / feed / streaming

**Product problem:** Deliver the right title/episode/track at the right moment; balance discovery, continuity, and catalog scale.

**Domain emphasis:** Title/Catalog vs Member preference; Session and Continuation; Personalization as a product surface, not a side feature.

| Claim | Company | Doc |
|-------|---------|-----|
| Personalization as core product loop (Home / Made for You) | Spotify | [Personalizing Spotify Home with ML](https://engineering.atspotify.com/2020/1/for-your-ears-only-personalizing-spotify-home-with-machine-learning) |
| ML/RL drives long-term listening satisfaction | Spotify | [How Spotify Uses ML for Personalization](https://engineering.atspotify.com/2021/12/how-spotify-uses-ml-to-create-the-future-of-personalization) |
| Editorial + algorithmic playlists (incl. Discover Weekly) | Spotify | [Algotorial playlists](https://engineering.atspotify.com/2023/4/humans-machines-a-look-behind-spotifys-algotorial-playlists) |
| Streaming product + ISP/CDN partnership for viewing quality | Netflix | [How Netflix Works With ISPs](https://netflixtechblog.com/how-netflix-works-with-isps-around-the-globe-to-deliver-a-great-viewing-experience-8452d94e1d40) |
| Personalized homepage ranking as a product surface | Netflix | [Learning a Personalized Homepage](https://netflixtechblog.com/learning-a-personalized-homepage-aa8ec670359a) |

## Identity / auth (product)

**Product problem:** Let people sign in safely with minimal friction; respect privacy and account control.

**Domain emphasis:** Account, Credential, Consent, Session; federated identity as a product choice (who hosts the trust).

| Claim | Company | Doc |
|-------|---------|-----|
| Privacy-preserving Sign in with Apple product requirements | Apple | [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/) |
| Human Interface expectations for authentication flows | Apple | [HIG — Authentication](https://developer.apple.com/design/human-interface-guidelines/authentication) |
| Identity platform product capabilities for consumers/workloads | Google | [Google Identity](https://developers.google.com/identity) |
| Entra ID as enterprise identity product boundary | Microsoft | [Microsoft identity platform overview](https://learn.microsoft.com/en-us/entra/identity-platform/v2-overview) |

## Messaging / realtime collaboration

**Product problem:** Deliver messages/presence with ordering expectations users understand; scale fan-out without breaking conversational UX.

**Domain emphasis:** Conversation, Message, Participant, Delivery/Read state; presence as ephemeral domain state.

| Claim | Company | Doc |
|-------|---------|-----|
| Mobile-first sync queue (Iris) for real-time messaging | Meta | [Building Mobile-First Infrastructure for Messenger](https://engineering.fb.com/2014/10/09/production-engineering/building-mobile-first-infrastructure-for-messenger/) |
| Unified client sync / broker rewrite for conversational UX | Meta | [Project LightSpeed](https://engineering.fb.com/2020/03/02/data-infrastructure/messenger/) |
| Early Messages storage/domain choices (HBase era) | Meta | [The Underlying Technology of Messages](https://engineering.fb.com/2010/11/15/core-infra/the-underlying-technology-of-messages/) |
| Collaborative org messaging solution posters | Microsoft | [Microsoft Teams architecture posters](https://learn.microsoft.com/en-us/microsoftteams/teams-architecture-solutions-posters) |

## Search / discovery

**Product problem:** Interpret intent and return useful, trustworthy results under spam and freshness pressure.

**Domain emphasis:** Query, Document, Ranking signals, Evaluation; quality is a product metric, not only latency.

| Claim | Company | Doc |
|-------|---------|-----|
| How Search interprets queries and ranks results (product-facing) | Google | [How Google Search works](https://www.google.com/search/howsearchworks/) |
| Search quality evaluation culture | Google | [Search Quality Rater Guidelines overview](https://www.google.com/search/howsearchworks/how-search-works/rigorous-testing/) |
| LinkedIn professional graph search / relevance product engineering | LinkedIn | [Search at LinkedIn](https://www.linkedin.com/blog/engineering/search) |

## Commerce / checkout & payments flow

**Product problem:** Convert intent to paid order with trust, clarity, and recovery from failure.

**Domain emphasis:** Cart/Order, PaymentInstrument, Authorization vs Capture, Receipt; failure states are part of the product.

| Claim | Company | Doc |
|-------|---------|-----|
| Human Interface patterns for payments and commerce | Apple | [HIG — Payments](https://developer.apple.com/design/human-interface-guidelines/payments) |
| Apple Pay as a productized payment sheet | Apple | [Apple Pay](https://developer.apple.com/apple-pay/) |
| Customer-obsessed fulfillment / order reliability themes | Amazon | [Builders’ Library — Ensuring rollback safety during deployments](https://aws.amazon.com/builders-library/ensuring-rollback-safety-during-deployments/) (pair with order/deploy safety thinking) |
| Well-Architected reliability applied to revenue-critical flows | Amazon | [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html) |
