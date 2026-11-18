# Collab+ (Working Title) — Product Vision

> **Note:** `Collab+` is a temporary prototype working title and is subject to change at any time during development (earlier naming ideas include `chill` and `chill-z`). All internal monorepo packages intentionally use the brand-neutral `@repo/*` scope (`@repo/web`, `@repo/api`, `@repo/shared`), while display branding lives centrally in [`packages/shared/src/constants.js`](../packages/shared/src/constants.js) (`BRAND_CONFIG`).

---

## 1. Product Purpose

Create a social and developer hangout where friends connect, hang out, and code together in one unified workspace:

- Discord-style real-time chat, voice lounges, video meets, and screen sharing
- Rich media sharing, mini social games, interactive polls, and coding quizzes
- An active room AI companion (`CollabBot AI`) inside every chat space
- Built-in developer workflows: shared code scratchpad/compiler, GitHub UI & feeds, LeetCode sync, WakaTime productivity tracking, and goal tracking
- Complete user login and industry-standard authentication

---

## 2. Iterative Foundation (`Frontend → Backend`)

Development starts from a single unified home workspace from which all features branch. The project follows an iterative **Frontend → Backend** lifecycle:

1. **Phase 1 (Completed):** Establish the monorepo structure, shared contracts, and interactive 3-split frontend prototype (`@repo/web`).
2. **Phase 2 (Active):** Iteratively wire real authentication, persistence, real-time messaging/voice, sandboxed code execution, and activity integrations in `@repo/api` and `@repo/shared`. See [`docs/roadmap/PHASE_2_SCOPE.md`](./roadmap/PHASE_2_SCOPE.md).

---

## 3. Four Core Feature Pillars

1. **Communication**
   - Real-time text chat, voice chats, voice call/meet rooms, and video call/meet rooms with screen sharing
   - Media messages (`image`, `video`, `gif`, `sticker`)
   - Structured data-model messaging (`spreadsheet`, `txt`, `ppt`, `mail`, `code_snippet`) — codified in [`packages/shared/src/domain/messaging.js`](../packages/shared/src/domain/messaging.js)
2. **File Sharing**
   - Support for sharing and previewing all file types across Spaces and Direct Messages
3. **Activity Tracking & Synchronisation Engine**
   - **Coding Tracking:** WakaTime integration
   - **Project Tracking:** GitHub, GitLab, IDE telemetry, and LeetCode sync
   - **Social & App Plugins:** Optional activity feed notifications (Instagram, Facebook, X/Twitter) that users can toggle on or off
   - **Activity Synchronisation Engine:** A custom synchronization engine that aggregates activity into a unified user log map (visible to the user by default, opt-in for room sharing) — see [`packages/shared/src/domain/activity.js`](../packages/shared/src/domain/activity.js)
4. **AI Integration (`CollabBot AI`)**
   - Dedicated AI assistants structured around four operational modules (`room_manager`, `file_manager`, `schedule_manager`, `office_manager`) — see [`packages/shared/src/domain/ai.js`](../packages/shared/src/domain/ai.js)

---

## 4. Multi-Tenancy & Permissions (Spaces, Building Metaphor & RBAC)

1. **Spaces ("The Floor"):** Users are organized into **Spaces** — protected multi-user server environments of any scale where connected users share communication channels and resources owned by a Space Owner or the platform.
2. **Spatial Topology & Group Types:** Each Space contains **1 mandatory `LOUNGE`** (auto-joined by all members), **0..N optional `PROJECTS`**, **1..N `ROOMS`** (strict invite-only), **1..N `WORKSPACES`** (peer-invite open), **0..N `CHANNELS`** (cross-level bridges via polymorphic links), and **`DM` Direct Threads**.
3. **Cross-Space Membership:** Users can belong to multiple groups across different Spaces or within the same Space.
4. **Role-Based Access Control (RBAC):** Core roles are `OWNER`, `ADMIN`, `MODERATOR`, and `MEMBER`, defined in [`packages/shared/src/domain/spaces.js`](../packages/shared/src/domain/spaces.js) and detailed in [`docs/architecture/DOMAIN_MODEL.md`](./architecture/DOMAIN_MODEL.md).

---

## 5. Security & Privacy Commitments

1. **End-to-End Encryption (E2EE) by Default:** All messages across all Spaces are end-to-end encrypted by default (`spaces.is_e2ee_enabled = true`).
2. **Owner-Only Space Toggle:** Only the Space **`OWNER`** has authority (`space:toggle_e2ee`) to disable Space-wide E2EE.
3. **Persistent Direct Message (DM) Encryption:** Even inside a Space where E2EE has been disabled by its Owner, individual users retain E2EE for Direct Messages (`containers.is_e2ee_enforced = true`).
4. **Zero-Knowledge Storage & AI Boundary:** When E2EE is active, PostgreSQL persists only ciphertext and S3/R2 stores client-encrypted file blobs; AI Managers only index plaintext in unencrypted Spaces or with user consent. See [`docs/architecture/SECURITY_E2EE.md`](./architecture/SECURITY_E2EE.md).

---

## 6. Target Tech Stack & Architecture Blueprint

The Phase 1 monorepo runs **React 19 + Vite 8 + Tailwind CSS v4** (`@repo/web`) and a **Node.js ESM** API scaffold (`@repo/api`) orchestrated by **Turborepo + pnpm**. The finalized Phase 2 target stack specifies **TypeScript (Node.js / Bun) · PostgreSQL 16+ · Drizzle ORM · Redis (Pub/Sub & Presence) · LiveKit (WebRTC) · S3/R2 (Encrypted Object Storage)**. See [`docs/ARCHITECTURE_AND_DB_BLUEPRINT.md`](./ARCHITECTURE_AND_DB_BLUEPRINT.md), [`docs/architecture/DATABASE_DESIGN.md`](./architecture/DATABASE_DESIGN.md), and [`docs/roadmap/MASTER_IMPLEMENTATION_PLAN.md`](./roadmap/MASTER_IMPLEMENTATION_PLAN.md).
