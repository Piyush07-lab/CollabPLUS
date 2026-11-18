# Contributing to Collab+ (Working Title)

Thank you for your interest in contributing! This repository is an open-source **Turborepo + pnpm** monorepo entering **Phase 2 (Iterative Frontend → Backend Wiring)**.

Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) and [Documentation Hub](./docs/README.md) before getting started.

---

## Prerequisites

- **Node.js**: `>= 20.0.0` (LTS recommended)
- **pnpm**: `11.13.1` (enforced via `packageManager` in root [`package.json`](./package.json); use `corepack enable` or install `pnpm@11.13.1`)
- **Git**: Standard feature-branch workflow

---

## Local Setup

```bash
# 1. Clone and install workspace dependencies
pnpm install

# 2. Copy environment template for local Phase 2 work
cp .env.example .env

# 3. Start all development servers via Turborepo
pnpm dev

# Or run a single workspace
pnpm dev:web
pnpm dev:api
```

---

## Monorepo Architecture Rules

Follow these conventions across every pull request:

1. **Brand-Neutral Workspace Scopes**:
   - All packages use `@repo/*` (`@repo/web`, `@repo/api`, `@repo/shared`).
   - Never hardcode the temporary product title in package names or import paths. Central branding lives in [`packages/shared/src/constants.js`](./packages/shared/src/constants.js) (`BRAND_CONFIG`).
2. **Barrel Exports (`index.js`)**:
   - Export public module APIs through folder `index.js` files (`@/components`, `@/components/panels`, `@/services`, `@repo/shared`, `apps/api/src/modules`).
3. **Path Aliases**:
   - Inside `apps/web`, import internal code via `@/*` (e.g., `@/components/panels`, `@/services`, `@/utils`) and cross-package contracts via `@repo/shared`.
4. **Shared Contracts First**:
   - Define domain constants, RBAC roles, Space group types, language specs, and WebSocket event names in `@repo/shared` before consuming them in `@repo/web` or `@repo/api`.
5. **Iterative Frontend → Backend Development**:
   - Follow our [Product Vision](./docs/VISION.md) and [Phase 2 Scope](./docs/roadmap/PHASE_2_SCOPE.md): validate UI ergonomics first, define shared contracts in `@repo/shared`, implement the backend route/module in `@repo/api`, and wire the client via `apps/web/src/services/`.
6. **License & SPDX Headers (`AGPL-3.0-only`)**:
   - New source files (`.js`, `.jsx`, `.ts`, `.tsx`, `.css`) must include the standard FSF/SPDX header at the top of the file:
     ```js
     /*
      * Copyright (C) 2026 Collab+ Contributors
      * SPDX-License-Identifier: AGPL-3.0-only
      */
     ```

---

## Branching & Commit Convention

1. Fork the repository and create a branch from `main`:
   - `feat/<short-topic>` for new features
   - `fix/<short-topic>` for bug fixes
   - `docs/<short-topic>` for documentation updates
   - `refactor/<short-topic>` for structural improvements
2. Use **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`).
   - Example: `feat(api): add space RBAC policy evaluation endpoint`

---

## Pull Request Checklist

Before opening a pull request, run from the repository root:

```bash
pnpm lint
pnpm build
```

- [ ] `pnpm lint` passes across `@repo/web`, `@repo/api`, and `@repo/shared`
- [ ] `pnpm build` succeeds across all workspaces
- [ ] New source files include the `SPDX-License-Identifier: AGPL-3.0-only` header
- [ ] New exports are documented and exposed via barrel `index.js` files
- [ ] Documentation in [`docs/`](./docs/README.md) is updated if architecture, contracts, or endpoints changed
- [ ] No secrets, `.env` files, or personal tokens are committed
