# `@repo/api`

Backend API service for **Collab+**, built with **NestJS + Fastify + TypeScript** (`@nestjs/platform-fastify`, Node.js ESM).

## Directory Structure (`src/`)

```text
apps/api/
├── src/
│   ├── main.ts                          # NestFastifyApplication bootstrap & CORS setup
│   ├── app.module.ts                    # Root NestJS module importing all domain modules
│   ├── app.controller.ts                # Core endpoints (/health, /api/v1/rooms/meta, /api/v1/integrations/meta)
│   ├── app.service.ts                   # Core health & room protocol metadata service
│   ├── types/
│   │   └── shared.d.ts                  # TypeScript ambient declarations for @repo/shared
│   └── modules/
│       ├── index.ts                     # Barrel export of all NestJS domain modules
│       ├── spaces/                      # Multi-tenant Space topology & RBAC module
│       ├── messaging/                   # Rich messaging, call types & E2EE policy module
│       ├── activity/                    # Activity Synchronisation Engine metadata module
│       ├── ai/                          # CollabBot AI 4-module suite metadata module
│       └── compiler/                    # Scratchpad compiler languages & execution scaffold
├── nest-cli.json                        # NestJS CLI project config
├── tsconfig.json                        # Strict TypeScript config (NodeNext + decorators)
├── tsconfig.build.json                  # Production build TypeScript config (outputs to dist/)
└── package.json                         # @repo/api manifest
```

## Endpoints

- `GET /health` — Service health & version status (`APP_NAME` and `APP_VERSION` from `@repo/shared`)
- `GET /api/v1/rooms/meta` — Room categories and `WS_EVENTS` registry from `@repo/shared`
- `GET /api/v1/spaces/meta` — Space topology rules, RBAC capabilities, and E2EE messaging policies (`SpacesController`)
- `GET /api/v1/integrations/meta` — Activity Synchronisation Engine providers and `CollabBot AI` manager modules
- `GET /api/v1/compiler/languages` — Supported scratchpad compiler languages and execution mode (`CompilerController`)

## Scripts

- `pnpm dev:api` (from root) — Runs `turbo run dev --filter=@repo/api` (performs an initial `tsc -p tsconfig.build.json` build, then runs `tsc --watch` alongside `node --watch dist/main.js`)
- `pnpm --filter @repo/api build` — Compiles TypeScript sources to `dist/` (`tsc -p tsconfig.build.json`)
- `pnpm --filter @repo/api build:watch` — Watches `src/**/*.ts` and automatically recompiles to `dist/` on every modification (`tsc -p tsconfig.build.json --watch --preserveWatchOutput`)
- `pnpm --filter @repo/api start` — Starts the compiled Fastify server (`node dist/main.js`) on `PORT` (default `4000`)
- `pnpm --filter @repo/api typecheck` — Runs `tsc --noEmit`
- `pnpm --filter @repo/api lint` — Runs `oxlint .`
