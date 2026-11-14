# References

全仓库共用的参考链接清单：法律法规、国际标准、国家标准、行业标准、技术规范、框架文档和作为命名依据的维基百科条目。各计划、Glossary 和代码注释里的标准链接都应能在这里找到。

## 收录规则

- **章节顺序即权威顺序**：按法定权威性和严谨性从高到低排列。同一事项的依据有冲突时，按这个顺序取舍。章节内先按发布组织、再按成熟度排列（例如 IETF 先 Internet Standard，再 Proposed Standard、BCP、Informational、Internet-Draft）。
- **同一标准有多个版本时**（例如 WCAG 2.2 与 ISO/IEC 40500，glTF 2.0 与 ISO/IEC 12113），每个版本都收，放在各自的权威层级，用途列互相指向。代码标注引用权威层级更高的那一条。
- **只收官方原文**：标准组织、立法机关、规范发布方或框架官方文档，不收转载和二手解读。
- **引用现行版本**：表中写明版本和状态。标准被替代、撤销或换版时，先改这里，再改引用处和代码标注（见[命名标准化计划](plans/naming-standards.md)的"版本与时效"）。
- **链接要核验**：
  - 收录前用 `curl -L` 验证可访问。
  - iso.org、webstore.ansi.org、gs1.org 拒绝脚本访问（返回 403），这几处的链接改用搜索结果核对，在备注里注明。
  - 国家标准和行业标准链接全国标准信息公共服务平台的条目页，`hcno`、`id` 从搜索结果里取，不手工拼接。
- **每份标准只收一次**：其他文档链接到这里，或复制同一个 URL，不另找版本。
- **代码里的标准链接必须先收进本清单**：代码标注规则见[命名标准化计划](plans/naming-standards.md)；`tools/check-standard-links.mjs` 以本文件为准做检查。
- **列含义**：
  - 版本/状态：现行、草案、待修订等；
  - 领域：身份、隐私、金融、电商、通信、AI、3D、地理、无障碍、API、术语、工程；
  - 适用产品：ai、iam、ml、chat、portfolio、commerce、lowcode、three，或"全部"。

## 1. 法律法规

| 名称 | 链接 | 版本/状态 | 领域 | 适用产品 | 用于 | 备注 |
|------|------|-----------|------|----------|------|------|
| 《中华人民共和国个人信息保护法》 | <http://www.npc.gov.cn/c2/c30834/202108/t20210820_313088.html> | 现行，2021-11-01 施行 | 隐私 | 全部 | 个人信息、敏感个人信息、跨境提供的合规依据；隐私审查的上位依据 | 中国人大网 |
| Regulation (EU) 2016/679（GDPR） | <https://eur-lex.europa.eu/eli/reg/2016/679/oj> | 现行 | 隐私 | 全部（面向欧盟用户时） | 处理的合法性基础、数据主体权利 | EUR-Lex |

## 2. 国际标准（ISO、IEC、ITU-T）

| 名称 | 链接 | 版本/状态 | 领域 | 适用产品 | 用于 | 备注 |
|------|------|-----------|------|----------|------|------|
| ISO/IEC 2382:2015 Information technology — Vocabulary | <https://www.iso.org/standard/63598.html> | 现行（2025 复审确认） | 术语 | 全部 | 信息技术通用术语的英文依据；中文见 GB/T 5271.1 | iso.org 拒绝脚本访问，已通过搜索结果核对（下同） |
| ISO/IEC 27000:2026 ISMS — Overview | <https://www.iso.org/standard/27000> | 现行；2018 版已撤销 | 身份 | 全部 | 信息安全管理体系的概念框架 | 2026 版不再是术语标准，信息安全术语见 GB/T 25069 |
| ISO/IEC 22989:2022 AI concepts and terminology | <https://www.iso.org/standard/74296.html> | 现行 | AI | ai、ml | AI 术语的英文依据；中文见 GB/T 41867 | |
| ISO/IEC 42001:2023 AI management systems | <https://www.iso.org/standard/42001> | 现行 | AI | ai、ml | AI 治理与风险管理的参照 | |
| ISO 4217:2015 Codes for the representation of currencies | <https://www.iso.org/standard/64758.html> | 现行；代码表由维护机构持续更新 | 金融 | portfolio、commerce、chat | 币种代码（三位字母）和最小单位；中文版 GB/T 12406 | |
| ISO 3166-1:2020 Country code | <https://www.iso.org/standard/72482.html> | 现行（2025 复审确认） | 电商 | commerce、全部 | 国家代码（alpha-2）；中文版 GB/T 2659.1 | |
| ISO 8601-1:2019 Date and time（含 Amd 1:2022） | <https://www.iso.org/standard/70907.html> | 现行，待修订 | API | 全部 | 日期时间表示；接口用它的子集 RFC 3339 | |
| ISO 6709:2022 Geographic point location by coordinates | <https://www.iso.org/standard/75147.html> | 现行 | 地理 | three | 经纬度的表示和顺序 | |
| ISO 10383:2012 Market identifier codes (MIC) | <https://www.iso.org/standard/61067.html> | 现行（2023 复审确认） | 金融 | portfolio | 交易场所标识，取代自由文本 `exchange` | |
| ISO 6166:2021 International securities identification number (ISIN) | <https://www.iso.org/standard/78502.html> | 现行，待修订（ISO/AWI 6166） | 金融 | portfolio | 证券标识 | |
| ISO 17442-1:2020 Legal entity identifier (LEI) | <https://www.iso.org/standard/78829.html> | 现行（2026 复审确认） | 金融 | portfolio | 发行人、交易对手的法人标识 | |
| ISO 10962:2021 Classification of financial instruments (CFI) | <https://www.iso.org/standard/81140.html> | 现行（2026 复审确认） | 金融 | portfolio | 金融工具分类，作为资产类别命名依据 | |
| ISO 20022-1:2026 Universal financial industry message scheme — Metamodel | <https://www.iso.org/standard/20022-1> | 现行 | 金融 | portfolio | 金融报文与业务词汇（结算、支付、证券） | |
| ISO/IEC 12113:2022 Khronos glTF 2.0 | <https://www.iso.org/standard/83990.html> | 现行 | 3D | commerce、three | 3D 资源格式；代码标注优先引用本条，Khronos 原文见第 6 节 | |
| ISO/IEC 40500:2025 W3C WCAG 2.2 | <https://www.iso.org/standard/91029.html> | 现行 | 无障碍 | 全部 Web 和移动端 | 无障碍要求；W3C 原文见第 6 节 | |
| ITU-T E.164 The international public telecommunication numbering plan | <https://www.itu.int/rec/T-REC-E.164> | 现行 | 通信 | commerce、chat、iam | 电话号码统一存为 E.164 格式（`+` 加国家码） | |

## 3. 中国国家标准

本仓库目前没有引用强制性国家标准（GB）；以后引用时放在本节最前。下表都是推荐性国家标准（GB/T）。

| 名称 | 链接 | 版本/状态 | 领域 | 适用产品 | 用于 |
|------|------|-----------|------|----------|------|
| GB/T 35273-2020《信息安全技术 个人信息安全规范》 | <https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=4568F276E0F8346EB0FBA097AA0CE05E> | 现行（2026 复审结论为修订） | 隐私 | 全部 | 个人信息收集、存储、使用、删除的安全要求；隐私审查依据 |
| GB/T 25069-2022《信息安全技术 术语》 | <https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=56123482721B1AC3CEDCD3B5C022CAD8> | 现行 | 术语 | 全部 | Glossary 中文列的信息安全术语（如"审计记录""访问控制"） |
| GB/T 5271.1-2000《信息技术 词汇 第1部分：基本术语》 | <https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=64CB911C12A67C69987481E4937F59CA> | 现行（2021 复审结论为修订） | 术语 | 全部 | Glossary 中文列的信息技术基本术语；等效采用 ISO/IEC 2382-1 |
| GB/T 41867-2022《信息技术 人工智能 术语》 | <https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=195F522C14AD9A1A0094FF66D0B1EF1B> | 现行（修订计划起草中） | AI | ai、ml | Glossary 中文列的 AI 术语 |
| GB/T 12406-2022《表示货币的代码》 | <https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=196111BC23AC8BDA0BE2C44F2C32F6CF> | 现行；修改采用 ISO 4217:2015 | 金融 | portfolio、commerce、chat | 币种代码的中文名称 |
| GB/T 2659.1-2022《世界各国和地区及其行政区划名称代码 第1部分：国家和地区代码》 | <https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=FBCE39BE204B54F6F944092C209121F2> | 现行；修改采用 ISO 3166-1:2020 | 电商 | commerce、全部 | 国家和地区代码的中文名称 |
| GB/T 37668-2019《信息技术 互联网内容无障碍可访问性技术要求与测试方法》 | <https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=35ECC696805C1A67C93B74FB6D0D8EFB> | 现行（2025 复审结论为修订） | 无障碍 | 全部 Web 和移动端 | 网页和移动应用的无障碍要求与测试方法 |
| 全国标准信息公共服务平台 | <https://std.samr.gov.cn/> | — | — | — | 查找其他国家标准、行业标准和后续新版 |

## 4. 中国行业标准

| 名称 | 链接 | 版本/状态 | 领域 | 适用产品 | 用于 |
|------|------|-----------|------|----------|------|
| JR/T 0171-2020《个人金融信息保护技术规范》 | <https://std.samr.gov.cn/hb/search/stdHBDetailedCNF?id=A0A45D2A7FA961F3E05397BE0A0A7758> | 现行，推荐性金融行业标准 | 金融、隐私 | portfolio | 个人金融信息 C1/C2/C3 分类和全生命周期保护 |
| JR/T 0197-2020《金融数据安全 数据安全分级指南》 | <https://std.samr.gov.cn/hb/search/stdHBDetailed?id=B081D125A6762DB8E05397BE0A0A5EA7> | 现行，推荐性金融行业标准 | 金融 | portfolio | 金融数据的安全分级 |

## 5. 境外国家标准

| 名称 | 链接 | 版本/状态 | 领域 | 适用产品 | 用于 | 备注 |
|------|------|-----------|------|----------|------|------|
| ANSI INCITS 359-2012 (R2022) Role Based Access Control | <https://webstore.ansi.org/standards/incits/incits3592012r2022> | 现行（2022 复审确认） | 身份 | iam | Role、User Assignment、Permission Assignment | 美国国家标准，付费；ansi.org 拒绝脚本访问，已通过搜索结果核对 |
| NIST SP 800-63B Authentication and Lifecycle Management | <https://pages.nist.gov/800-63-4/sp800-63b.html> | 现行（800-63-4） | 身份 | iam | recovery codes / look-up secrets、认证器术语 | |
| NIST SP 800-162 Guide to ABAC | <https://csrc.nist.gov/pubs/sp/800/162/upd2/final> | 现行 | 身份 | iam | 基于属性的访问控制、Policy 命名 | |
| NIST SP 800-92 Guide to Computer Security Log Management | <https://csrc.nist.gov/pubs/sp/800/92/final> | 现行 | 身份 | iam、全部 | 审计记录（audit record）命名 | |
| NIST AI 100-1 AI Risk Management Framework 1.0 | <https://doi.org/10.6028/NIST.AI.100-1> | 现行 | AI | ai、ml | AI 风险管理术语 | |
| NIST AI 600-1 Generative AI Profile | <https://doi.org/10.6028/NIST.AI.600-1> | 现行 | AI | ai、ml | hallucination / confabulation 等生成式 AI 风险术语 | |
| NIST Role Based Access Control 项目页 | <https://csrc.nist.gov/projects/role-based-access-control> | — | 身份 | iam | INCITS 359 的公开背景资料 | |

## 6. 国际标准化组织的技术规范

### IETF

| 名称 | 链接 | 版本/状态 | 领域 | 适用产品 | 用于 |
|------|------|-----------|------|----------|------|
| RFC 3986 URI Generic Syntax | <https://www.rfc-editor.org/rfc/rfc3986> | Internet Standard（STD 66） | API | 全部 | problem `type`、资源标识等 URI 的格式 |
| RFC 8259 JSON | <https://www.rfc-editor.org/rfc/rfc8259> | Internet Standard（STD 90） | API | 全部 | JSON 数据格式 |
| RFC 9110 HTTP Semantics | <https://www.rfc-editor.org/rfc/rfc9110> | Internet Standard（STD 97） | API | 全部 | 方法、状态码和头字段的语义 |
| RFC 3339 Date and Time on the Internet: Timestamps | <https://www.rfc-editor.org/rfc/rfc3339> | Proposed Standard | API | 全部 | 接口里的时间戳格式（ISO 8601 的子集） |
| RFC 6120 XMPP Core | <https://www.rfc-editor.org/rfc/rfc6120> | Proposed Standard | 通信 | chat | 即时通信的地址、会话、在线状态用语 |
| RFC 6121 XMPP Instant Messaging and Presence | <https://www.rfc-editor.org/rfc/rfc6121> | Proposed Standard | 通信 | chat | roster、presence、message 用语 |
| RFC 6455 The WebSocket Protocol | <https://www.rfc-editor.org/rfc/rfc6455> | Proposed Standard | 通信 | chat、ml | WebSocket 连接与关闭码 |
| RFC 6749 OAuth 2.0 | <https://www.rfc-editor.org/rfc/rfc6749> | Proposed Standard | 身份 | iam、全部 | client 类型（§2.1）、scope（§3.3）、令牌响应字段（§5.1） |
| RFC 6750 Bearer Token Usage | <https://www.rfc-editor.org/rfc/rfc6750> | Proposed Standard | 身份 | 全部 | `Authorization: Bearer` 取代自定义密钥头 |
| RFC 7519 JSON Web Token | <https://www.rfc-editor.org/rfc/rfc7519> | Proposed Standard | 身份 | 全部 | `iss`、`sub`、`exp` 等注册 claim |
| RFC 7591 Dynamic Client Registration | <https://www.rfc-editor.org/rfc/rfc7591> | Proposed Standard | 身份 | iam | OAuth 客户端元数据命名 |
| RFC 7636 PKCE | <https://www.rfc-editor.org/rfc/rfc7636> | Proposed Standard | 身份 | 全部移动端和 SPA | 公共客户端的授权码保护 |
| RFC 7643 SCIM Core Schema | <https://www.rfc-editor.org/rfc/rfc7643> | Proposed Standard | 身份 | iam | User、Group、`active` 等资源与属性名 |
| RFC 7644 SCIM Protocol | <https://www.rfc-editor.org/rfc/rfc7644> | Proposed Standard | 身份 | iam | 供应（provisioning）接口和路径 |
| RFC 7946 The GeoJSON Format | <https://www.rfc-editor.org/rfc/rfc7946> | Proposed Standard | 地理 | three | 地理数据交换格式；坐标顺序为经度在前 |
| RFC 8141 Uniform Resource Names | <https://www.rfc-editor.org/rfc/rfc8141> | Proposed Standard | 身份 | iam | 资源名改用 URN（如 `urn:explore:iam:user:<name>`） |
| RFC 8414 Authorization Server Metadata | <https://www.rfc-editor.org/rfc/rfc8414> | Proposed Standard | 身份 | iam | `issuer` 与发现文档 |
| RFC 8693 OAuth 2.0 Token Exchange | <https://www.rfc-editor.org/rfc/rfc8693> | Proposed Standard | 身份 | iam、ai | 短期凭证改为令牌交换；`act`、`may_act` claim |
| RFC 8825 Overview: Real-Time Protocols for Browser-Based Applications | <https://www.rfc-editor.org/rfc/rfc8825> | Proposed Standard | 通信 | chat | WebRTC 协议族总览 |
| RFC 8866 SDP: Session Description Protocol | <https://www.rfc-editor.org/rfc/rfc8866> | Proposed Standard | 通信 | chat | offer/answer 中的会话描述 |
| RFC 9068 JWT Profile for Access Tokens | <https://www.rfc-editor.org/rfc/rfc9068> | Proposed Standard | 身份 | iam、全部 | 访问令牌只用 `scope` claim |
| RFC 9420 Messaging Layer Security (MLS) | <https://www.rfc-editor.org/rfc/rfc9420> | Proposed Standard | 通信 | chat | 端到端加密群聊用语 |
| RFC 9429 JavaScript Session Establishment Protocol (JSEP) | <https://www.rfc-editor.org/rfc/rfc9429> | Proposed Standard；取代 RFC 8829 | 通信 | chat | WebRTC 信令的 offer/answer；chat 文档仍引用 RFC 8829，需改为本条 |
| RFC 9457 Problem Details for HTTP APIs | <https://www.rfc-editor.org/rfc/rfc9457> | Proposed Standard | API | 全部 | 错误响应格式；`type` 用绝对 URI |
| RFC 9562 Universally Unique IDentifiers (UUIDs) | <https://www.rfc-editor.org/rfc/rfc9562> | Proposed Standard；取代 RFC 4122 | API | 全部 | 标识生成（含 UUIDv7） |
| RFC 6648 Deprecating the "X-" Prefix | <https://www.rfc-editor.org/rfc/rfc6648> | BCP 178 | API | 全部 | HTTP 头不用 `X-` 前缀 |
| RFC 6838 Media Type Specifications and Registration Procedures | <https://www.rfc-editor.org/rfc/rfc6838> | BCP 13 | API | 全部 | 媒体类型命名（如 `application/problem+json`） |
| RFC 8252 OAuth 2.0 for Native Apps | <https://www.rfc-editor.org/rfc/rfc8252> | BCP 212 | 身份 | 全部 iOS 和移动端 | 原生应用的重定向 URI 和登录流程 |
| RFC 8725 JSON Web Token Best Current Practices | <https://www.rfc-editor.org/rfc/rfc8725> | BCP 225 | 身份 | 全部 | JWT 校验要求 |
| BCP 47 Tags for Identifying Languages | <https://www.rfc-editor.org/info/bcp47> | BCP 47 | API | 全部 | 语言标记；未确定语言用 `und` |
| RFC 6238 TOTP | <https://www.rfc-editor.org/rfc/rfc6238> | Informational | 身份 | iam | 多因素认证的一次性密码 |
| RateLimit header fields for HTTP | <https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/> | Internet-Draft | API | 全部 | `RateLimit`、`RateLimit-Policy` 取代 `X-Quota-*`；定稿后改链 RFC |

### W3C

| 名称 | 链接 | 版本/状态 | 领域 | 适用产品 | 用于 |
|------|------|-----------|------|----------|------|
| Web Content Accessibility Guidelines (WCAG) 2.2 | <https://www.w3.org/TR/WCAG22/> | W3C Recommendation | 无障碍 | 全部 Web 和移动端 | 无障碍成功准则；国际标准版 ISO/IEC 40500:2025 见第 2 节 |
| WAI-ARIA 1.2 | <https://www.w3.org/TR/wai-aria-1.2/> | W3C Recommendation | 无障碍 | 全部 Web | role、`aria-*` 属性 |
| Web Authentication Level 3 | <https://www.w3.org/TR/webauthn-3/> | W3C Recommendation | 身份 | iam | 通行密钥（passkey）、authenticator、credential 命名 |
| WebRTC: Real-Time Communication in Browsers | <https://www.w3.org/TR/webrtc/> | W3C Recommendation | 通信 | chat、commerce | `RTCPeerConnection`、offer/answer、ICE candidate |
| WebGPU | <https://www.w3.org/TR/webgpu/> | W3C Candidate Recommendation Draft | 3D | three | 渲染接口用语（WebGL 之后的方向） |

### IEEE / The Open Group、OASIS、OpenID Foundation、Khronos、WHATWG

| 名称 | 链接 | 版本/状态 | 领域 | 适用产品 | 用于 |
|------|------|-----------|------|----------|------|
| POSIX.1-2024 Base Definitions: Environment Variables | <https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap08.html> | IEEE Std 1003.1-2024 | 工程 | 全部 | 环境变量名只用大写字母、数字和下划线 |
| OASIS XACML 3.0 Core | <https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html> | OASIS Standard | 身份 | iam | Policy、Rule、Effect `PERMIT`/`DENY` |
| OpenID Connect Core 1.0 | <https://openid.net/specs/openid-connect-core-1_0.html> | Final | 身份 | iam、全部 | `issuer`/`subject`（§5.7）、`name` 等标准 claim |
| glTF 2.0 Specification | <https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html> | Khronos 批准 | 3D | commerce、three | glTF 原文；国际标准版 ISO/IEC 12113 见第 2 节 |
| WebGL 2.0 Specification | <https://registry.khronos.org/webgl/specs/latest/2.0/> | Khronos 批准 | 3D | three、commerce | 渲染接口用语 |
| HTML Living Standard: Server-sent events | <https://html.spec.whatwg.org/multipage/server-sent-events.html> | WHATWG Living Standard | 通信 | ai、ml | SSE 的 `event`、`data`、`id` 字段 |

## 7. 行业组织与联盟规范

| 名称 | 链接 | 版本/状态 | 领域 | 适用产品 | 用于 | 备注 |
|------|------|-----------|------|----------|------|------|
| PCI DSS（PCI Security Standards Council） | <https://www.pcisecuritystandards.org/standards/pci-dss/> | 现行 v4.x | 金融 | commerce | 支付卡数据不落库，只保存支付网关返回的标识 | |
| GS1 General Specifications（含 GTIN） | <https://ref.gs1.org/standards/genspecs/> | 现行 | 电商 | commerce | 商品标识 GTIN | gs1.org 主站拒绝脚本访问，改链 GS1 参考站 |
| FIX Protocol | <https://www.fixtrading.org/standards/> | 现行 | 金融 | portfolio | 订单、成交、行情的字段命名参照 | |
| EIP-155 Simple replay attack protection | <https://eips.ethereum.org/EIPS/eip-155> | Final | 金融 | portfolio | 区块链 `chainId` 命名 | |
| OpenAPI Specification | <https://spec.openapis.org/oas/v3.2.0.html> | 现行 3.2.0 | API | 全部 | 接口契约文件 | |
| AsyncAPI Specification | <https://www.asyncapi.com/docs/reference/specification/v3.0.0> | 现行 3.0.0 | API | chat、portfolio | Kafka、WebSocket 消息契约 | |
| JSON Schema | <https://json-schema.org/draft/2020-12> | 2020-12 | API | lowcode、全部 | 页面和组件定义、请求体校验 | |
| CloudEvents（CNCF） | <https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md> | 1.0.2 | API | chat、portfolio | 事件信封字段（`id`、`source`、`type`、`time`） | |
| Google AIP-121 Resource-oriented design | <https://google.aip.dev/121> | Approved | API | 全部 | REST 资源导向设计 | |
| Google AIP-122 Resource names | <https://google.aip.dev/122> | Approved | API | 全部 | 集合名用复数 lowerCamelCase | |
| Google AIP-131 至 135 Standard methods | <https://google.aip.dev/131> | Approved | API | 全部 | Get（131）、List（<https://google.aip.dev/132>）、Create（<https://google.aip.dev/133>）、Update（<https://google.aip.dev/134>）、Delete（<https://google.aip.dev/135>） | |
| Google AIP-136 Custom methods | <https://google.aip.dev/136> | Approved | API | 全部 | 动作用 `:verb` 自定义方法 | |
| Google AIP-140 Field names | <https://google.aip.dev/140> | Approved | API | 全部 | 字段命名 | |
| Google AIP-158 Pagination | <https://google.aip.dev/158> | Approved | API | 全部 | `pageSize`、`pageToken`、`nextPageToken` | |
| Google AIP-193 Errors | <https://google.aip.dev/193> | Approved | API | 全部 | 错误模型；本仓库的错误格式以 RFC 9457 为准 | |
| Agent2Agent (A2A) Protocol | <https://a2a-protocol.org/latest/specification/> | 现行 | AI | ai | `AgentSkill`、Task state 等智能体互通命名 | |
| Model Context Protocol | <https://modelcontextprotocol.io/specification/latest> | 现行 | AI | ai | MCP 工具、资源、服务端命名 | |
| ONNX Intermediate Representation | <https://onnx.ai/onnx/repo-docs/IR.html> | 现行 | AI | ml | 可移植模型格式 | |
| safetensors | <https://huggingface.co/docs/safetensors/index> | 现行 | AI | ml | 模型权重格式 | |
| GGUF | <https://github.com/ggml-org/ggml/blob/master/docs/gguf.md> | 现行 | AI | ml | 本地推理模型格式 | |
| EPSG:4326 WGS 84（IOGP EPSG 注册表） | <https://epsg.org/crs_4326/WGS-84.html> | 现行 | 地理 | three | 经纬度的坐标参考系 | |
| schema.org Product / Offer | <https://schema.org/Product> | 现行 | 电商 | commerce | 商品与报价的字段命名；Offer 见 <https://schema.org/Offer> | |
| Design Tokens Format Module | <https://www.designtokens.org/tr/2025.10/format/> | 2025.10，W3C Community Group 最终报告 | 无障碍 | lowcode、全部 Web | 主题变量命名；不是 W3C 正式标准 | |
| OpenTelemetry Semantic Conventions | <https://opentelemetry.io/docs/specs/semconv/> | 现行 | 工程 | 全部 | 日志、指标、链路的属性命名 | |
| OpenTelemetry Tracing API | <https://opentelemetry.io/docs/specs/otel/trace/api/> | Stable | 工程 | 全部 | span、trace 命名 | |
| Conventional Commits | <https://www.conventionalcommits.org/en/v1.0.0/> | 1.0.0 | 工程 | 全部 | 提交信息类型前缀 | |
| Semantic Versioning | <https://semver.org/spec/v2.0.0.html> | 2.0.0 | 工程 | 全部 | 版本号 | |

## 8. 厂商与框架文档

| 名称 | 链接 | 适用产品 | 用于 |
|------|------|----------|------|
| Spring Boot: Externalized Configuration（relaxed binding） | <https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding> | ai、iam、chat、portfolio | 环境变量命名 |
| Spring Security: OAuth 2.0 Resource Server JWT | <https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html> | ai、iam、chat、portfolio | 资源服务器、issuer、scope 映射 |
| Spring AI: Chat Memory | <https://docs.spring.io/spring-ai/reference/api/chat-memory.html> | ai | 对话记忆相关命名 |
| Nx: Tag in multiple dimensions | <https://nx.dev/docs/guides/enforce-module-boundaries/tag-multiple-dimensions> | 全部 | 标签 `scope:*`、`type:*` 两个维度 |
| Gradle: Sharing build logic between subprojects | <https://docs.gradle.org/current/userguide/sharing_build_logic_between_subprojects.html> | 全部 Java 项目 | 约定插件 `explore.<名>-conventions` 和 `build-logic` |
| Compose Specification | <https://compose-spec.io/> | 全部 | `compose.yaml` 服务与字段命名 |
| Render Blueprint spec | <https://render.com/docs/blueprint-spec> | ai、iam | `render.yaml` 服务命名 |
| Vercel: Monorepos | <https://vercel.com/docs/monorepos> | ai、chat、portfolio、commerce、lowcode、three | 项目与 Root Directory |
| Apache Kafka Documentation | <https://kafka.apache.org/documentation/> | chat、portfolio | `bootstrap.servers` 等配置名，环境变量统一为 `KAFKA_BOOTSTRAP_SERVERS` |
| Tesseract documentation | <https://tesseract-ocr.github.io/tessdoc/> | ai | `TESSDATA_PREFIX` 环境变量 |
| Apple Human Interface Guidelines | <https://developer.apple.com/design/human-interface-guidelines/> | ai、chat、portfolio 的 iOS | 原生界面用语 |
| The Twelve-Factor App: Config | <https://12factor.net/config> | 全部 | 配置放环境变量 |

## 9. 领域建模著作

| 名称 | 链接 | 用于 |
|------|------|------|
| Eric Evans, Domain-Driven Design Reference | <https://www.domainlanguage.com/ddd/reference/> | Shared Kernel、Entity、Value Object、Repository |
| Martin Fowler, Repository | <https://martinfowler.com/eaaCatalog/repository.html> | 区分仓储和其他出站接口（gateway） |

## 10. 维基百科

只收以上各节都找不到、作为命名依据的条目。

| 条目 | 链接 | 用于 |
|------|------|------|
| Multitenancy | <https://en.wikipedia.org/wiki/Multitenancy> | 租户（tenant）相关命名 |
| Attribute-based access control | <https://en.wikipedia.org/wiki/Attribute-based_access_control> | ABAC 概念的通俗说明，正式依据为 NIST SP 800-162 |
| Hallucination (artificial intelligence) | <https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)> | "hallucination"是通用术语，不列为禁用词 |
| Speech synthesis | <https://en.wikipedia.org/wiki/Speech_synthesis> | 语音合成（TTS）命名 |
| Object detection | <https://en.wikipedia.org/wiki/Object_detection> | 视觉检测接口的资源名 |
