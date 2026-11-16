# Collab+ (Working Title) — Turborepo + pnpm Monorepo

> **Vibe, Code & Connect** — A social & developer hangout combining Discord-style voice/chat rooms, an in-app code scratchpad compiler, GitHub/LeetCode/WakaTime activity feeds, and an AI room companion (`CollabBot AI`).
>
> *Note: **Collab+** is a temporary prototype name subject to change. Workspace packages use the brand-neutral `@repo/*` scope.*

For a full map of files, components, path aliases, and state architecture, see **[`docs/PROJECT_INDEX.md`](./docs/PROJECT_INDEX.md)** and **[`docs/VISION.md`](./docs/VISION.md)**.

---

## Workspace Packages

| Workspace | Package Name | Location | Description |
| :--- | :--- | :--- | :--- |
| Frontend Web App | `@repo/web` | [`apps/web`](./apps/web) | React 19 + Vite 8 + Tailwind CSS v4 workspace UI |
| Backend API Scaffold | `@repo/api` | [`apps/api`](./apps/api) | Node.js HTTP/REST & WebSocket readiness server |
| Shared Contracts | `@repo/shared` | [`packages/shared`](./packages/shared) | Central `BRAND_CONFIG`, language metadata, and WS event definitions |

---

## Key Features (Prototype v0.1)

- **Resizable 3-Split Workspace**: Collapsible & draggable Rooms sidebar, Center Viewport (`Chat ⇋ Compiler`), and Community Command Center.
- **Spaces & Voice Lounge**: Category filtering (`All Spaces`, `Voice`, `Code`, `Social`), expandable space cards, and live voice/mute/deafen controls.
- **Interactive Chat + CollabBot AI**: Embedded syntax-styled code blocks with one-click **Send to Compiler**, media previews, and `@CollabBot` / `/quiz` prompt responses.
- **Scratchpad Code Runner**: Multi-language editor (`Python 3.12`, `JavaScript`, `TypeScript`, `C++ 20`) with `Ctrl+Enter` execution output and **Share to Room**.
- **Command Center**: Live Friends presence with streaks, WakaTime productivity breakdown, interactive Developer Poll, and GitHub/LeetCode activity feed.

---

## Quickstart & Turborepo Commands

Requires **pnpm** (`packageManager: pnpm@11.13.1`). Run all commands from the repository root:

```bash
# Install workspace dependencies
pnpm install

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
- Brand display constants live in [`packages/shared/src/constants.js`](./packages/shared/src/constants.js) (`BRAND_CONFIG`). Update that file and [`apps/web/index.html`](./apps/web/index.html) when finalizing the product name.

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

- **[Project Index & Component Map](./docs/PROJECT_INDEX.md)** — Complete directory tree, `@/` aliases, barrel exports, and state reference
- **[Product Vision](./docs/VISION.md)** — Original feature goals and iterative Frontend → Backend plan
- **[API Scaffold Docs](./apps/api/README.md)** — Backend endpoints and scripts
- **[Shared Package Docs](./packages/shared/README.md)** — Shared brand config, constants, and WebSocket event names
