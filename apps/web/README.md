# `@repo/web`

React 19 + Vite 8 + Tailwind CSS v4 frontend workspace implementing the 3-split social & developer hangout UI.

## Directory Structure (`src/`)

- [`src/App.jsx`](./src/App.jsx) — Root 3-split layout, keyboard shortcuts, and state coordination
- [`src/components/`](./src/components/index.js) — Barrel-exported UI components (`layout/`, `panels/`, `modals/`)
- [`src/data/`](./src/data/index.js) — Prototype mock datasets (`INITIAL_ROOMS`, `INITIAL_MESSAGES`, `INITIAL_FRIENDS`, `INITIAL_DEV_FEEDS`, `STARTER_CODE`)
- [`src/services/`](./src/services/index.js) — Phase 2 REST & WebSocket API client helpers
- [`src/hooks/`](./src/hooks/index.js) — Reusable React state & persistence hooks
- [`src/utils/`](./src/utils/index.js) — Formatting and command-detection utilities
- [`src/theme.js`](./src/theme.js) & [`src/index.css`](./src/index.css) — Central ColorHunt design tokens

## Path Aliases

Configured in [`vite.config.js`](./vite.config.js) and [`jsconfig.json`](./jsconfig.json):
- `@/*` → `./src/*`
- `@repo/shared` → `../../packages/shared/src/index.js`

## Scripts

- `pnpm dev:web` (from root) — Runs Vite dev server
- `pnpm --filter @repo/web build` — Builds production assets to `dist/`
- `pnpm --filter @repo/web lint` — Runs `oxlint .`
- `pnpm --filter @repo/web preview` — Serves production preview
