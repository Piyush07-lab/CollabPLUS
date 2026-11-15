# Collab+ Monorepo

> **Vibe, Code & Connect** — A social & developer hangout combining Discord-style voice/chat rooms, an in-app code scratchpad compiler, GitHub/LeetCode/WakaTime activity feeds, and an AI room companion (`CollabBot AI`).

For a full map of files, components, path aliases, and state architecture, see **[`docs/PROJECT_INDEX.md`](./docs/PROJECT_INDEX.md)** and **[`docs/VISION.md`](./docs/VISION.md)**.

---

## Workspace Packages

| Workspace | Package Name | Location | Description |
| :--- | :--- | :--- | :--- |
| Frontend Web App | `@collab/web` | [`apps/web`](./apps/web) | React 19 + Vite 8 + Tailwind CSS v4 workspace UI |
| Backend API Scaffold | `@collab/api` | [`apps/api`](./apps/api) | Node.js HTTP/REST & WebSocket readiness server |
| Shared Contracts | `@collab/shared` | [`packages/shared`](./packages/shared) | Shared constants, language metadata, and WS event definitions |

---

## Key Features (Prototype v0.1)

- **Resizable 3-Split Workspace**: Collapsible & draggable Rooms sidebar, Center Viewport (`Chat ⇋ Compiler`), and Community Command Center.
- **Spaces & Voice Lounge**: Category filtering (`All Spaces`, `Voice`, `Code`, `Social`), expandable space cards, and live voice/mute/deafen controls.
- **Interactive Chat + CollabBot AI**: Embedded syntax-styled code blocks with one-click **Send to Compiler**, media previews, and `@CollabBot` / `/quiz` prompt responses.
- **Scratchpad Code Runner**: Multi-language editor (`Python 3.12`, `JavaScript`, `TypeScript`, `C++ 20`) with `Ctrl+Enter` execution output and **Share to Room**.
- **Command Center**: Live Friends presence with streaks, WakaTime productivity breakdown, interactive Developer Poll, and GitHub/LeetCode activity feed.

---

## Quickstart & Scripts

Run all commands from the repository root:

```bash
# Start the frontend dev server (@collab/web)
npm run dev

# Start the backend API scaffold (@collab/api)
npm run dev:api

# Production build for the frontend
npm run build

# Preview production build
npm run preview

# Run Oxlint across the repository
npm run lint
```

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
- **[Shared Package Docs](./packages/shared/README.md)** — Shared constants and WebSocket event names
