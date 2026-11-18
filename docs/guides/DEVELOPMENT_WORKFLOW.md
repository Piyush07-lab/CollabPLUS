# Development Workflow & Rebranding Guide

## 1. Running the Monorepo Locally

All tasks run via **Turborepo** from the repository root (`pnpm@11.13.1`):

```bash
# Install dependencies across all workspaces
pnpm install

# Start frontend (@repo/web) and backend (@repo/api) concurrently
pnpm dev

# Target a single app
pnpm dev:web
pnpm dev:api

# Run cached linting and builds across all packages
pnpm lint
pnpm build
```

To configure local environment variables for Phase 2 development, copy [`.env.example`](../../.env.example) to `.env`.

---

## 2. Iterative `Frontend → Backend` Contribution Pattern

When implementing a Phase 2 feature:

1. **Define Shared Contracts First (`@repo/shared`)**:
   - Add domain constants, validation enums, or `WS_EVENTS` keys inside [`packages/shared/src/`](../../packages/shared/src/index.js) and re-export via barrel `index.js`.
2. **Implement Backend Module (`@repo/api`)**:
   - Add NestJS domain modules/services inside [`apps/api/src/modules/`](../../apps/api/src/modules/index.ts) and expose REST/WS controllers in modules or [`apps/api/src/app.controller.ts`](../../apps/api/src/app.controller.ts).
3. **Wire Frontend Services & Hooks (`@repo/web`)**:
   - Add API/WS client functions in [`apps/web/src/services/index.js`](../../apps/web/src/services/index.js), reusable state hooks in [`apps/web/src/hooks/index.js`](../../apps/web/src/hooks/index.js), and pure helpers in [`apps/web/src/utils/index.js`](../../apps/web/src/utils/index.js).
   - Consume them in components via `@/services`, `@/hooks`, `@/utils`, and `@repo/shared`.
4. **Verify**:
   - Run `pnpm lint` and `pnpm build` before opening a PR using [`.github/PULL_REQUEST_TEMPLATE.md`](../../.github/PULL_REQUEST_TEMPLATE.md).

---

## 3. Rebranding / Changing the Working Title

Because `Collab+` is a temporary prototype title:

1. **Keep Package Scopes Unchanged**: Internal workspaces stay `@repo/web`, `@repo/api`, and `@repo/shared` so cross-package imports never break.
2. **Update `BRAND_CONFIG`**: Edit `name`, `shortName`, `botName`, and `tagline` in [`packages/shared/src/constants.js`](../../packages/shared/src/constants.js).
3. **Update HTML Metadata**: Update `<title>` and `<meta name="description">` in [`apps/web/index.html`](../../apps/web/index.html).
4. **Review Docs & Seed Data**: Update display copy in [`apps/web/src/data/mockData.js`](../../apps/web/src/data/mockData.js) and `docs/` as needed.
