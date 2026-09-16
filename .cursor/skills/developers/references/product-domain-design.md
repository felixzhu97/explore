# Product Domain Design References

Top-tier **product domain design** from **Apple, Google, and GitHub** only —
how these firms shape the *product problem*, domain objects, and user flows at
scale.

Use when modeling domains (feed, identity, messaging, search, commerce), not
when you only need coding standards ([engineering.md](./engineering.md)) or
platform blueprints ([solution-design.md](./solution-design.md)).

Each section: **product problem → domain emphasis → Claim + Doc**.

## Content / feed / discovery

**Product problem:** Deliver the right content at the right moment; balance
discovery, continuity, and catalog scale.

**Domain emphasis:** Catalog vs preference; Session; Personalization as a
product surface.

| Claim | Company | Doc |
|-------|---------|-----|
| How Search interprets queries and ranks results (product-facing) | Google | [How Google Search works](https://www.google.com/search/howsearchworks/) |
| Search quality evaluation culture | Google | [Search Quality Rater Guidelines overview](https://www.google.com/search/howsearchworks/how-search-works/rigorous-testing/) |
| Recommendation systems design survey (industry classic) | Google | [Deep Neural Networks for YouTube Recommendations](https://research.google/pubs/pub45530/) |

## Identity / auth (product)

**Product problem:** Let people sign in safely with minimal friction; respect
privacy and account control.

**Domain emphasis:** Account, Credential, Consent, Session; federated identity
as a product choice (who hosts the trust).

| Claim | Company | Doc |
|-------|---------|-----|
| Privacy-preserving Sign in with Apple product requirements | Apple | [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/) |
| Human Interface expectations for authentication flows | Apple | [HIG — Authentication](https://developer.apple.com/design/human-interface-guidelines/authentication) |
| Managing accounts with clear lifecycle and recovery | Apple | [HIG — Managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts) |
| Identity platform product capabilities for consumers/workloads | Google | [Google Identity](https://developers.google.com/identity) |
| Passkeys as phishing-resistant sign-in | Apple | [Passkeys](https://developer.apple.com/passkeys) |
| Passkeys on the open web (Google guidance) | Google | [Passkeys](https://developers.google.com/identity/passkeys) |

## Collaboration / delivery (product)

**Product problem:** Ship software with reviewable changes and clear ownership.

**Domain emphasis:** Pull Request, Review, Branch, Release; Actions as the
shared delivery surface.

| Claim | Company | Doc |
|-------|---------|-----|
| Pull requests as the collaboration unit | GitHub | [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) |
| Code owners and review routing | GitHub | [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) |
| Releases and changelogs as product artifacts | GitHub | [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) |

## Commerce / payments (product)

**Product problem:** Convert intent to paid order with trust and clarity.

**Domain emphasis:** Cart/Order, PaymentInstrument, Authorization vs Capture,
Receipt; failure states are part of the product.

| Claim | Company | Doc |
|-------|---------|-----|
| Human Interface patterns for payments and commerce | Apple | [HIG — Payments](https://developer.apple.com/design/human-interface-guidelines/payments) |
| Apple Pay as a productized payment sheet | Apple | [Apple Pay](https://developer.apple.com/apple-pay/) |
| Google Pay product integration | Google | [Google Pay API](https://developers.google.com/pay/api) |
