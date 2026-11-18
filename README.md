# Collab+ (Working Title) — Turborepo + pnpm Monorepo

> **Vibe, Code & Connect** — An open-source social & developer hangout combining Discord-style voice/chat rooms, an in-app code scratchpad compiler, GitHub/LeetCode/WakaTime activity feeds, and an AI room companion (`CollabBot AI`).
>
> *Note: **Collab+** is a temporary prototype name subject to change. Workspace packages use the brand-neutral `@repo/*` scope.*

Start exploring the codebase and Phase 2 specifications in the **[Documentation Hub (`docs/README.md`)](./docs/README.md)**.

---

## Workspace Packages

| Workspace | Package Name | Location | Description |
| :--- | :--- | :--- | :--- |
| Frontend Web App | `@repo/web` | [`apps/web`](./apps/web) | React 19 + Vite 8 + Tailwind CSS v4 workspace UI |
| Backend API Scaffold | `@repo/api` | [`apps/api`](./apps/api) | Node.js HTTP/REST & WebSocket readiness server with indexed domain modules |
| Shared Contracts | `@repo/shared` | [`packages/shared`](./packages/shared) | Central `BRAND_CONFIG`, RBAC policies, E2EE defaults, activity/AI contracts, and `WS_EVENTS` |

---

## Key Features (Phase 1 Completed → Phase 2 Active)

- **Resizable 3-Split Workspace**: Collapsible & draggable Rooms sidebar, Center Viewport (`Chat ⇋ Compiler`), and Community Command Center.
- **Spaces & Voice Lounge**: Category filtering (`All Spaces`, `Voice`, `Code`, `Social`), expandable space cards, and live voice/mute/deafen controls.
- **Interactive Chat + CollabBot AI**: Embedded syntax-styled code blocks with one-click **Send to Compiler**, media previews, and `@CollabBot` / `/quiz` prompt responses.
- **Scratchpad Code Runner**: Multi-language editor (`Python 3.12`, `JavaScript`, `TypeScript`, `C++ 20`) with `Ctrl+Enter` execution output and **Share to Room**.
- **Command Center**: Live Friends presence with streaks, WakaTime productivity breakdown, interactive Developer Poll, and GitHub/LeetCode activity feed.
- **Phase 2 Architecture Readiness**: Indexed `@repo/shared` domain contracts (multi-tenant `Spaces`, RBAC, default Space E2EE with DM override, Activity Sync Engine, and 4 AI manager modules) and modular `@repo/api` / `@repo/web` scaffolds.

---

## Quickstart & Turborepo Commands

Requires **Node.js `>= 20`** and **pnpm** (`packageManager: pnpm@11.13.1`). Run all commands from the repository root:

```bash
# Install workspace dependencies
pnpm install

# Copy Phase 2 environment template (optional for prototype UI)
cp .env.example .env

# Start all dev servers in parallel via Turborepo
pnpm dev

# Start only the frontend dev server (@repo/web)
pnpm dev:web

# Start only the backend API scaffold (@repo/api)
pnpm dev:api

# Run cached builds across all workspaces
pnpm build

# Run cached linting across all workspaces
pnpm lint

# Preview frontend production build
pnpm preview

# Target a single workspace directly with pnpm --filter
pnpm --filter @repo/web build
```

---

## Rebranding / Changing Project Name

Because the project name is temporary during prototyping:
- Package scopes stay brand-agnostic (`@repo/web`, `@repo/api`, `@repo/shared`).
- Brand display constants live in [`packages/shared/src/constants.js`](./packages/shared/src/constants.js) (`BRAND_CONFIG`). Update that file and [`apps/web/index.html`](./apps/web/index.html) when finalizing the product name. See the [Development Workflow Guide](./docs/guides/DEVELOPMENT_WORKFLOW.md).

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl+B` / `Cmd+B` | Toggle Left Rooms Panel |
| `Ctrl+J` / `Cmd+J` | Toggle Right Command Center Panel |
| `Ctrl+Enter` / `Cmd+Enter` | Run code in Compiler Workspace |
| `Esc` | Close active modal or collapse header search |

---

## Documentation & Navigation

- **[Documentation Hub (`docs/README.md`)](./docs/README.md)** — Master index for all architecture, database, roadmap, and developer guides
- **[Master Feature & Marketing Guide](./docs/MARKETING_FEATURES.md)** — Complete product feature breakdown, target personas, and Phase 1 → Phase 2 readiness matrix
- **[System Architecture & DB Blueprint](./docs/ARCHITECTURE_AND_DB_BLUEPRINT.md)** — Canonical Building Metaphor topology and 19-table PostgreSQL/Drizzle specification
- **[Product Vision](./docs/VISION.md)** — Product pillars, multi-tenancy, E2EE commitments, and iterative Frontend → Backend plan
- **[Project Index & Component Map](./docs/PROJECT_INDEX.md)** — Complete directory tree, `@/` aliases, barrel exports, and state reference
- **[Architecture Specs (`docs/architecture/`)](./docs/architecture/README.md)** — System design, PostgreSQL/Drizzle database design, domain models, E2EE security, and REST/WS contracts
- **[Roadmap & Master Plan (`docs/roadmap/`)](./docs/roadmap/README.md)** — Master DB & E2EE implementation plan and 7 Phase 2 milestones
- **[Developer & Design Guides (`docs/guides/`)](./docs/guides/README.md)** — Workflow guide and ColorHunt UI design system
- **[Workspace Docs](./apps/web/README.md)** — [`@repo/web`](./apps/web/README.md) · [`@repo/api`](./apps/api/README.md) · [`@repo/shared`](./packages/shared/README.md)

---

## Open-Source Contributing & Security

- **[Contributing Guide](./CONTRIBUTING.md)** — Prerequisites, monorepo conventions, branching, and PR checklist
- **[Code of Conduct](./CODE_OF_CONDUCT.md)** — Community standards (Contributor Covenant v2.1)
- **[Security Policy](./SECURITY.md)** — Responsible vulnerability disclosure and E2EE architecture invariants
- **[License](./LICENSE)** — GNU AGPL-3.0 License
