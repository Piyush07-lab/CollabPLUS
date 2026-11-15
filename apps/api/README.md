# `@collab/api`

Backend service scaffold for Collab+. Currently provides a dependency-free Node.js HTTP server (`node:http`) ready for iterative REST and WebSocket wiring.

## Endpoints

- `GET /health` — Service health & version status
- `GET /api/v1/rooms/meta` — Room categories and WebSocket event names from `@collab/shared`
- `GET /api/v1/compiler/languages` — Supported scratchpad compiler languages

## Scripts

- `npm run dev:api` (from root) — Runs `node --watch src/index.js`
- `npm --workspace=@collab/api start` — Starts the server on `PORT` (default `4000`)
