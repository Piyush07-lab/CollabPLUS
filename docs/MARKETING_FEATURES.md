# Collab+ (Working Title) — Master Product & Marketing Feature Guide

> **Tagline:** *Vibe, Code & Connect*  
> **Category:** Open-Source Social & Developer Hangout Platform  
> **License:** [GNU AGPL-3.0](../LICENSE) (`AGPL-3.0-only`)  
> **Note on Naming:** `Collab+` is the current working title (`BRAND_CONFIG` in [`packages/shared/src/constants.js`](../packages/shared/src/constants.js)), allowing effortless rebranding across the monorepo without altering internal `@repo/*` workspace scopes.

---

## 1. Executive Summary & Brand Positioning

**Collab+** brings the casual warmth of a friend hangout together with the productivity of a developer command center — all inside a single, end-to-end encrypted workspace.

Instead of switching between Discord for voice, Slack for rooms, LeetCode/GitHub tabs for coding progress, an online compiler for quick debugging, and separate AI assistants, Collab+ unifies **real-time communication**, **in-app code execution**, **cross-platform developer & social activity feeds**, **multi-module AI assistance**, and **zero-knowledge privacy** under one roof.

### Core Brand Differentiators
- **Built to Hang Out *and* Ship:** Designed equally for late-night lo-fi study lounges, competitive LeetCode sprints, hackathon brainstorming, and team project rooms.
- **Privacy by Default, Not by Upgrade:** End-to-End Encryption (E2EE) is enabled by default across every Space, with Direct Messages permanently immune to Space-wide E2EE downgrades.
- **IDE-Grade Ergonomics Meets Warm Design:** Rejects sterile enterprise clutter in favor of a resizable 3-split workspace crafted around a warm Sand, Cream, Teal, and Deep Ocean palette.
- **Open-Source & Cloud-Transparent (`AGPL-3.0-only`):** Community-auditable code and architecture ensuring cloud deployments give users full transparency and ownership over their collaboration infrastructure.

---

## 2. Who Collab+ Is For (Target Personas)

| Persona | Pain Point Today | How Collab+ Solves It |
| :--- | :--- | :--- |
| **Developer Friend Groups & Study Circles** | Juggling voice calls, code pastebins, LeetCode screenshots, and tracking coding streaks across 4–5 apps | Always-on voice lounges paired with a 1-click `Chat ⇋ Scratchpad Compiler` loop, live friend streaks, and coding quizzes |
| **Hackathon Teams & Open-Source Squads** | Fragmented permissions, scattered project files, and clunky onboarding between casual chat and project channels | Structured **Building Metaphor** Spaces separating open Lounges, invite-only Meeting Rooms, peer-open Workspaces, and cross-level Channels |
| **Competitive Programmers & Bootcamps** | Hard to collaborate on algorithm walkthroughs or track peer momentum without context switching | Built-in Python/JS/TS/C++ scratchpad, LeetCode & WakaTime command-center tracking, and `@CollabBot` algorithm explanations |
| **Privacy-First Technical Communities** | Hosted chat platforms store plaintext messages and train/index indiscriminately | Zero-knowledge E2EE by default, Owner-only Space E2EE toggle, DM E2EE immunity, and explicit AI opt-in boundaries |

---

## 3. Master Feature Showcase

### 3.1 Resizable 3-Split Workspace & Warm Design System
A keyboard-first, desktop-inspired workspace engineered for both focus and social energy (`@repo/web`):
- **Left Sidebar — Spaces & Voice Lounge (`RoomsPanel`)**:
  - Category filtering across `All Spaces`, `Voice`, `Code`, and `Social` (`games`).
  - Expandable room cards showing live member counts, voice/screen-share indicators, unread counts, and last message previews.
  - Drag-resizable width (`200px`–`460px`, persisted in `localStorage`) and double-click or `Ctrl+B` / `Cmd+B` collapse.
- **Center Viewport — Dynamic `Chat ⇋ Compiler` Toggle**:
  - Seamlessly swaps between live room conversation (`ChatPanel`) and the multi-language code workspace (`CompilerWorkspacePanel`).
  - Auto-hiding floating room breadcrumb pill and live voice connection bar.
- **Right Sidebar — Community Command Center (`CommandCenterPanel`)**:
  - **Friends Tab:** Real-time friend presence (`online`, `voice`, `idle`, `offline`), live activity status (e.g., VS Code file, LeetCode problem, voice room), and daily coding streaks.
  - **Dev Feeds Tab:** WakaTime daily productivity breakdown, interactive community Polls with instant voting stats, and a unified GitHub / LeetCode / WakaTime milestone stream.
  - Drag-resizable width (`300px`–`650px`) and `Ctrl+J` / `Cmd+J` toggle.
- **Unified Bottom Horizon (`BottomBar` & `BottomNavDock`)**:
  - IDE-style status bar housing microphone mute/deafen/voice controls, a hover-expanding floating capsule dock (`BottomNavDock`) for instant navigation, `@CollabBot` quick prompt, layout reset, and `CommandPaletteModal` (`Ctrl+K` / header search).
- **Signature Visual Identity**:
  - Warm Cream (`#FFF3C8`) and Sand (`#E5CB90`) surfaces balanced with vibrant Teal (`#34A99D`) actions and Deep Ocean (`#1B3E48` / `#0D1E22`) developer surfaces, paired with `Plus Jakarta Sans` and `JetBrains Mono` typography. See [`docs/guides/DESIGN_SYSTEM.md`](./guides/DESIGN_SYSTEM.md).

---

### 3.2 Spatial Collaboration: The Building Metaphor (`Spaces`, `Projects`, `Rooms`, `Workspaces`, `Channels`)
Rather than a flat channel list, Collab+ structures multi-tenant communities like floors in a building ([`docs/architecture/DOMAIN_MODEL.md`](./architecture/DOMAIN_MODEL.md)):

- **Space ("The Floor"):** Protected multi-tenant server boundary of any scale. Users can belong to multiple groups across different Spaces or within the same Space.
- **Lounge ("The Floor Lobby"):** Exactly **1 mandatory Lounge per Space** (`1:1`), auto-joining 100% of Space members with zero invitation friction.
- **Projects ("Floor Wings"):** Optional organizational classifications (`0..N`) grouping related Rooms and Workspaces under a shared initiative.
- **Rooms ("Meeting Rooms"):** Strict **invite-only**, custom-named spaces (e.g., *Meeting Room*, *Presentation Room*) where `can_invite` is disabled by default for regular members.
- **Workspaces ("Team Studios"):** **Peer-invite open** collaborative studios where existing members can invite teammates (`can_invite = true` by default).
- **Channels ("Satellite Radio Frequencies"):** Cross-cutting communication bridges linking nodes across the same or different hierarchy levels (`Space`-wide, `Project ↔ Project`, `Room ↔ Room`, `Workspace ↔ Workspace`, or `Room ↔ Workspace`).
- **Role-Based Access Control (RBAC):** Fine-grained permissions across `OWNER`, `ADMIN`, `MODERATOR`, and `MEMBER` (`packages/shared/src/domain/spaces.js`).

---

### 3.3 Real-Time Communication, Voice, Video & Screen Sharing
- **Real-Time Text & Media Messaging:** Supports text, images, videos, GIFs, stickers, and arbitrary file sharing across Spaces and Direct Messages.
- **Polymorphic Data-Model Messaging:** First-class structured message payloads for `SPREADSHEET`, `TXT`, `PPT`, `MAIL`, and `CODE_SNIPPET` formats — turning chat messages into actionable collaboration artifacts.
- **Voice Lounges, Voice Calls & Video Meets:** Persistent voice status (`inVoice`, `isMuted`, `isDeafened`) with animated soundwave indicators in Phase 1, designed for **LiveKit (WebRTC)** SFU voice/video rooms and screen sharing in Phase 2 (`VOICE_CHAT`, `VOICE_CALL`, `VIDEO_MEET`).

---

### 3.4 Integrated `Chat ⇋ Scratchpad Compiler` Loop
Code is a first-class citizen in every conversation:
- **Multi-Language Support:** Pre-configured for **Python 3.12** (`.py`), **JavaScript (ES6)** (`.js`), **TypeScript 5.4** (`.ts`), and **C++ 20** (`.cpp`).
- **One-Click `Send to Compiler`:** Any code snippet shared in chat can be launched directly into the Scratchpad editor with its language auto-selected.
- **Keyboard-Driven Execution (`Ctrl+Enter` / `Cmd+Enter`):** Run code inline with `Tab` 4-space indentation, reset to starter templates, copy snippets, and inspect stdout in the Deep Ocean terminal pane. *(Phase 1 simulates runner stdout; Phase 2 executes in network-isolated ephemeral sandboxes.)*
- **One-Click `Share to Room`:** Push edited code straight back into the active chat room as a syntax-styled card.

---

### 3.5 Activity Synchronisation Engine & Social Plugins
Collab+ connects coding telemetry, repository activity, problem-solving streaks, and optional social feeds into one personal **Activity Log Map**:
- **Coding & IDE Tracking:** `WakaTime` coding hours/language breakdown and `IDE_PLUGIN` heartbeats.
- **Project & Competitive Tracking:** `GitHub` PRs/commits, `GitLab` activity, and `LeetCode` problem completions and rankings.
- **Optional Social Plugins:** `Instagram`, `Facebook`, and `X (Twitter)` activity feed sharing with per-plugin notification toggles (`on` / `off`).
- **Privacy-First Visibility Controls:** Synced activity populates the user's personal log map **visible to the user by default** (`userLogMapVisibleToSelf: true`), while broadcasting to Spaces or Rooms is strictly **opt-in** (`roomBroadcastOptIn: false`).

---

### 3.6 `CollabBot AI` — 4-Module Intelligent Space Companion
Every room includes an active AI companion structured around four specialized manager modules (`packages/shared/src/domain/ai.js`):
1. **Room & Space Manager (`ROOM_MANAGER`):** Triggers on `@CollabBot`, `/quiz`, and `/summarize` — handles room onboarding, interactive CS quizzes, complexity feedback, and thread summaries.
2. **File Manager (`FILE_MANAGER`):** Triggers on `/files` and `/find-file` — indexes shared attachments, code snippets, and data-model payloads.
3. **Schedule Manager (`SCHEDULE_MANAGER`):** Triggers on `/schedule` and `/sprint` — coordinates coding sprints, reminders, polls, and goal tracking checkpoints.
4. **Office Manager (`OFFICE_MANAGER`):** Triggers on `/notes` and `/action-items` — generates structured notes, action items, and `TXT` / `SPREADSHEET` / `PPT` / `MAIL` payloads.

---

### 3.7 Zero-Knowledge Security & End-to-End Encryption (E2EE)
Security is built into the data model rather than bolted on ([`docs/architecture/SECURITY_E2EE.md`](./architecture/SECURITY_E2EE.md)):
- **Default-On E2EE:** Every new Space enables E2EE automatically (`is_e2ee_enabled = true`).
- **Exclusive Owner Authority:** Only the Space **`OWNER`** holds `space:toggle_e2ee`; admins, moderators, and members cannot weaken Space encryption.
- **DM Encryption Immunity:** Direct Messages enforce an independent `is_e2ee_enforced` flag (`true` by default) — even inside a Space where the Owner disabled Space-wide E2EE, private DMs remain encrypted.
- **Zero-Knowledge Database & Object Storage:** Under E2EE, PostgreSQL stores only ciphertext and device key metadata (plaintext columns remain `NULL`), while S3/R2 stores client-encrypted file blobs with wrapped keys (`{ iv, fileKeyWrap }`).
- **Multi-Device Key Registry:** Supports multi-device identity keys and one-time X3DH pre-keys (`user_devices`, `one_time_prekeys`).
- **Strict AI Boundary:** AI Managers index plaintext messages/files only when Space E2EE is disabled or when users explicitly consent to share decrypted context.

---

### 3.8 Mini Social Games, Polls & Goal Tracking
- **Interactive Daily Polls:** Built-in developer polls right inside the Command Center with instant percentage visualization.
- **AI-Hosted Coding Trivia & Quizzes:** Instant `@CollabBot` / `/quiz` coding challenges in dedicated `games` spaces (`#daily-trivia`).
- **Goal & Streak Tracking:** Daily coding streaks, WakaTime milestone progress gauges, and scheduled sprint events (`schedule_events`).

---

## 4. Platform Architecture & Feature Readiness Matrix

| Capability | Phase 1 (Current Prototype) | Phase 2 (Target Architecture) |
| :--- | :--- | :--- |
| **Frontend Workspace (`@repo/web`)** | Live React 19 + Vite 8 + Tailwind CSS v4 3-split UI | Wired to `@repo/api` REST, WebSockets, LiveKit & WebCrypto E2EE |
| **Backend Services (`@repo/api`)** | NestJS + Fastify + TypeScript modular scaffold (`/health`, metadata routes) | PostgreSQL 16+ (Drizzle ORM), Redis Pub/Sub, Argon2id auth & RBAC |
| **Spaces & Hierarchy** | Category-filtered rooms, space creation modal, mock state | Full Building Metaphor (`Lounge 1:1`, `Projects`, `Rooms`, `Workspaces`, `Channels`) |
| **Messaging & Files** | Rich messages, media previews, syntax code blocks | Zero-knowledge E2EE, X3DH device keys, S3/R2 encrypted files, Data Models |
| **Voice, Video & Screenshare** | Interactive voice/mute/deafen UI states & soundwave animations | LiveKit (WebRTC) SFU rooms (`VOICE_CHAT`, `VOICE_CALL`, `VIDEO_MEET`) |
| **Scratchpad Compiler** | Multi-language editor (`Python`, `JS`, `TS`, `C++`) with simulated stdout | Isolated container sandbox execution with live stdout/stderr |
| **Activity Sync & Integrations** | WakaTime gauge, GitHub/LeetCode feeds, friend streaks | OAuth/webhook Activity Sync Engine + opt-in social feed plugins |
| **CollabBot AI** | Interactive `@CollabBot` / `/quiz` / `explain` prompts & action chips | 4-module AI suite (`Room`, `File`, `Schedule`, `Office` Managers) |

---

## 5. Technical Foundation & Open-Source Stack

- **Monorepo Orchestration:** Turborepo + pnpm workspaces with brand-neutral `@repo/*` packages (`@repo/web`, `@repo/api`, `@repo/shared`)
- **Frontend:** React 19, Vite 8, Tailwind CSS v4, Lucide Icons
- **Backend:** NestJS, Fastify, TypeScript (`NodeNext` ESM)
- **Target Data & Realtime Stack:** PostgreSQL 16+, Drizzle ORM, Redis, LiveKit (WebRTC), S3/Cloudflare R2
- **License:** [GNU Affero General Public License v3.0 (`AGPL-3.0-only`)](../LICENSE)

---

## 6. Further Reading

- **[Product Vision](./VISION.md)** — Original product philosophy and core pillars
- **[System Architecture & DB Blueprint](./ARCHITECTURE_AND_DB_BLUEPRINT.md)** — Complete 19-table PostgreSQL/Drizzle and topology specification
- **[Master Implementation Plan](./roadmap/MASTER_IMPLEMENTATION_PLAN.md)** — Database design and E2EE execution roadmap
- **[Phase 2 Scope](./roadmap/PHASE_2_SCOPE.md)** — Milestone breakdown for contributors
- **[Contributing Guide](../CONTRIBUTING.md)** — How to get involved in building Collab+

