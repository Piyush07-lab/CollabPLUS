# Documentation Hub — Collab+ (Working Title)

Welcome to the indexed documentation hub for **Collab+**, an open-source **Turborepo + pnpm** monorepo building a social and developer hangout platform (voice/video rooms, E2EE chat, collaborative scratchpad compiler, WakaTime/GitHub/LeetCode/social activity sync, and `CollabBot AI`).

> **Phase Status:** **Phase 1 (UI & Repository Architecture)** is complete. The project is now in **Phase 2 (Iterative Frontend → Backend Wiring & Open-Source Onboarding)**.

---

## 1. Master Index by Folder

| Folder / File | Purpose | Key Audience |
| :--- | :--- | :--- |
| [`docs/VISION.md`](./VISION.md) | Product vision, core pillars, multi-tenancy, and privacy commitments | All contributors & planners |
| [`docs/MARKETING_FEATURES.md`](./MARKETING_FEATURES.md) | Master marketing & product feature showcase, personas, and readiness matrix | Marketing, community & stakeholders |
| [`docs/ARCHITECTURE_AND_DB_BLUEPRINT.md`](./ARCHITECTURE_AND_DB_BLUEPRINT.md) | Canonical Building Metaphor topology & 19-table PostgreSQL/Drizzle blueprint | Architects & backend engineers |
| [`docs/PROJECT_INDEX.md`](./PROJECT_INDEX.md) | Complete monorepo topology, aliases, barrel exports, and component map | Frontend & backend developers |
| [`docs/architecture/`](./architecture/README.md) | System design, PostgreSQL/Drizzle schema, domain models, E2EE & REST/WS contracts | Architects & backend engineers |
| [`docs/roadmap/`](./roadmap/README.md) | Phase progression, Master DB & Encryption Plan, and Phase 2 Scope | Maintainers & contributors |
| [`docs/guides/`](./guides/README.md) | Development workflow, rebranding guide, and ColorHunt UI design system | New open-source contributors |

---

## 2. Quick Navigation by Topic

### Architecture (`docs/architecture/`)
- [`ARCHITECTURE_AND_DB_BLUEPRINT.md`](./ARCHITECTURE_AND_DB_BLUEPRINT.md) — Canonical full-stack architecture & PostgreSQL/Drizzle blueprint
- [`architecture/README.md`](./architecture/README.md) — Architecture folder index
- [`architecture/SYSTEM_DESIGN.md`](./architecture/SYSTEM_DESIGN.md) — Monorepo system topology and finalized target stack (PostgreSQL 16+, Drizzle ORM, Redis, LiveKit, S3/R2)
- [`architecture/DATABASE_DESIGN.md`](./architecture/DATABASE_DESIGN.md) — 19-table relational ER diagram, modular Drizzle schemas, and custom SQL invariants
- [`architecture/DOMAIN_MODEL.md`](./architecture/DOMAIN_MODEL.md) — Building Metaphor hierarchy (`Space`, `Lounge`, `Project`, `Room`, `Workspace`, `Channel`, `DM`), RBAC, and Activity Sync Engine
- [`architecture/SECURITY_E2EE.md`](./architecture/SECURITY_E2EE.md) — Default Space E2EE, Owner-only override, DM encryption immunity, zero-knowledge storage, and X3DH device keys
- [`architecture/API_AND_REALTIME.md`](./architecture/API_AND_REALTIME.md) — HTTP REST `/api/v1/*` routes, WebSocket events (`WS_EVENTS`), and WebRTC signaling contracts

### Roadmap & Scope (`docs/roadmap/`)
- [`roadmap/README.md`](./roadmap/README.md) — Roadmap index & milestone tracker (Phase 1 → Phase 2 → Phase 3)
- [`roadmap/MASTER_IMPLEMENTATION_PLAN.md`](./roadmap/MASTER_IMPLEMENTATION_PLAN.md) — Unified Database Design Plan, E2EE Plan, and Execution Sequence
- [`roadmap/PHASE_2_SCOPE.md`](./roadmap/PHASE_2_SCOPE.md) — 7 Phase 2 work packages with deliverables, workspace targets, and acceptance criteria

### Guides (`docs/guides/`)
- [`guides/README.md`](./guides/README.md) — Developer & design guides index
- [`guides/DEVELOPMENT_WORKFLOW.md`](./guides/DEVELOPMENT_WORKFLOW.md) — Running workspaces, adding contracts/routes/components, and rebranding `BRAND_CONFIG`
- [`guides/DESIGN_SYSTEM.md`](./guides/DESIGN_SYSTEM.md) — ColorHunt palette tokens, 3-split workspace ergonomics, typography, and shortcuts

---

## 3. Workspace & Governance References

- **Root Overview**: [`README.md`](../README.md)
- **Open-Source Governance**: [`CONTRIBUTING.md`](../CONTRIBUTING.md) · [`CODE_OF_CONDUCT.md`](../CODE_OF_CONDUCT.md) · [`SECURITY.md`](../SECURITY.md) · [`LICENSE`](../LICENSE)
- **Package Readmes**: [`@repo/web`](../apps/web/README.md) · [`@repo/api`](../apps/api/README.md) · [`@repo/shared`](../packages/shared/README.md)
