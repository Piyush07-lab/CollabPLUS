# `@repo/api`

Backend service scaffold for the monorepo. Currently provides a dependency-free Node.js HTTP server (`node:http`) ready for iterative REST and WebSocket wiring.

## Endpoints

- `GET /health` — Service health & version status (reads `APP_NAME` and `APP_VERSION` from `@repo/shared`)
- `GET /api/v1/rooms/meta` — Room categories and WebSocket event names from `@repo/shared`
- `GET /api/v1/compiler/languages` — Supported scratchpad compiler languages

## Scripts

- `pnpm dev:api` (from root) — Runs `turbo run dev --filter=@repo/api` (`node --watch src/index.js`)
- `pnpm --filter @repo/api start` — Starts the server on `PORT` (default `4000`)
- `pnpm --filter @repo/api build` — Syntax-checks `src/index.js`
- `pnpm --filter @repo/api lint` — Runs `oxlint .`
