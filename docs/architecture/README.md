# Architecture Index (`docs/architecture/`)

Technical blueprints for transitioning **Collab+** from the Phase 1 UI prototype to a PostgreSQL + Drizzle ORM + E2EE collaborative platform in Phase 2.

| Document | Scope |
| :--- | :--- |
| [`../ARCHITECTURE_AND_DB_BLUEPRINT.md`](../ARCHITECTURE_AND_DB_BLUEPRINT.md) | Canonical combined System Architecture & PostgreSQL Blueprint |
| [`SYSTEM_DESIGN.md`](./SYSTEM_DESIGN.md) | Production stack (TypeScript, PostgreSQL 16+, Drizzle ORM, Redis, LiveKit, S3/R2) and monorepo topology |
| [`DATABASE_DESIGN.md`](./DATABASE_DESIGN.md) | 19-table relational ER diagram, modular Drizzle schema layout, and custom SQL invariants |
| [`DOMAIN_MODEL.md`](./DOMAIN_MODEL.md) | Building Metaphor topology (`Space`, `Lounge`, `Project`, `Room`, `Workspace`, `Channel`, `DM`), RBAC, and cardinality rules |
| [`SECURITY_E2EE.md`](./SECURITY_E2EE.md) | Default Space E2EE, Owner-only override, DM encryption immunity, zero-knowledge storage, and X3DH device keys |
| [`API_AND_REALTIME.md`](./API_AND_REALTIME.md) | REST `/api/v1/*` endpoints, WebSocket (`WS_EVENTS`) protocol, and LiveKit/WebRTC signaling |

## Related References
- [`../VISION.md`](../VISION.md) — Product requirements and iterative Frontend → Backend direction
- [`../roadmap/MASTER_IMPLEMENTATION_PLAN.md`](../roadmap/MASTER_IMPLEMENTATION_PLAN.md) — Unified DB Design & Encryption execution plan
- [`../roadmap/PHASE_2_SCOPE.md`](../roadmap/PHASE_2_SCOPE.md) — Phase 2 milestones mapped to these architecture specs
- [`../../packages/shared/README.md`](../../packages/shared/README.md) — Code-level shared domain contracts
