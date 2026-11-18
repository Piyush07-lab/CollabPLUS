# Project Index & Navigation Map

A structured index of this **Turborepo + pnpm** monorepo (temporary working title: **Collab+**), workspace packages, open-source governance files, indexed documentation folders, path aliases, component registry, and state architecture.

---

## 1. Monorepo Topology

```text
<repo-root>/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md             # Bug report issue template
│   │   ├── config.yml                # Issue template chooser config
│   │   └── feature_request.md        # Phase 2 feature proposal template
│   ├── workflows/
│   │   └── ci.yml                    # GitHub Actions CI (pnpm install, lint, build)
│   └── PULL_REQUEST_TEMPLATE.md      # Pull request verification checklist
│
├── apps/
│   ├── web/                          # @repo/web — Vite + React 19 + Tailwind CSS v4 frontend
│   │   ├── public/                   # Static favicons & SVG sprite assets
│   │   ├── src/
│   │   │   ├── assets/               # Bundled image & SVG assets
│   │   │   ├── components/
│   │   │   │   ├── index.js          # Root component barrel re-export
│   │   │   │   ├── layout/           # App shell chrome (TopBar, BottomBar, BottomNavDock)
│   │   │   │   ├── panels/           # Workspace split panels (Rooms, Chat, Compiler, CommandCenter)
│   │   │   │   └── modals/           # Global overlays (CommandPalette, CreateRoom, Settings)
│   │   │   ├── data/
│   │   │   │   ├── index.js          # Data barrel export
│   │   │   │   └── mockData.js       # Initial rooms, messages, friends, dev feeds, starter code
│   │   │   ├── hooks/
│   │   │   │   └── index.js          # Reusable React state & localStorage hooks
│   │   │   ├── services/
│   │   │   │   └── index.js          # Phase 2 REST & WebSocket API client helpers
│   │   │   ├── utils/
│   │   │   │   └── index.js          # Slug formatting & AI trigger helpers
│   │   │   ├── App.jsx               # Root workspace state, 3-split layout, shortcuts & wiring
│   │   │   ├── App.css               # Legacy/template component styles
│   │   │   ├── index.css             # Tailwind v4 @theme tokens & custom animations
│   │   │   ├── main.jsx              # React DOM mount entry point
│   │   │   └── theme.js              # Central ColorHunt palette JS constants (THEME)
│   │   ├── index.html                # HTML shell with Google Fonts (Plus Jakarta Sans, JetBrains Mono)
│   │   ├── jsconfig.json             # Web workspace path alias IntelliSense
│   │   ├── package.json              # @repo/web manifest
│   │   ├── README.md                 # Frontend package documentation
│   │   └── vite.config.js            # Vite config with @/ and @repo/shared aliases
│   │
│   └── api/                          # @repo/api — NestJS + Fastify + TypeScript backend
│       ├── src/
│       │   ├── modules/              # Indexed NestJS domain modules
│       │   │   ├── index.ts          # Backend module barrel re-export
│       │   │   ├── spaces/           # SpacesModule, SpacesController & SpacesService
│       │   │   ├── messaging/        # MessagingModule & MessagingService
│       │   │   ├── activity/         # ActivityModule & ActivityService
│       │   │   ├── ai/               # AiModule & AiService
│       │   │   └── compiler/         # CompilerModule, CompilerController & CompilerService
│       │   ├── types/shared.d.ts     # Ambient TypeScript definitions for @repo/shared
│       │   ├── app.controller.ts     # Core routes (/health, rooms/meta, integrations/meta)
│       │   ├── app.module.ts         # Root NestJS AppModule
│       │   ├── app.service.ts        # Core health & room protocol metadata service
│       │   └── main.ts               # FastifyAdapter bootstrap entry point (port 4000)
│       ├── nest-cli.json             # NestJS CLI project configuration
│       ├── tsconfig.json             # TypeScript strict configuration (NodeNext)
│       ├── tsconfig.build.json       # Production TypeScript build configuration
│       ├── package.json              # @repo/api manifest
│       └── README.md                 # Backend package documentation
│
├── packages/
│   └── shared/                       # @repo/shared — Shared brand config, constants & Phase 2 contracts
│       ├── src/
│       │   ├── domain/               # Phase 2 domain & DB blueprint contracts
│       │   │   ├── index.js          # Domain contracts barrel export
│       │   │   ├── spaces.js         # SPACE_GROUP_TYPES, CONTAINER_TYPES, CHANNEL_LINK_TARGETS, RBAC_ROLES, SPACE_HIERARCHY_RULES
│       │   │   ├── messaging.js      # MESSAGE_KINDS, DATA_MODEL_SUBTYPES, CALL_TYPES, ENCRYPTION_POLICIES
│       │   │   ├── activity.js       # ACTIVITY_SOURCES, INTEGRATION_PROVIDERS, ACTIVITY_SYNC_DEFAULTS
│       │   │   └── ai.js             # AI_MANAGER_MODULES, AI_MANAGER_TYPES
│       │   ├── constants.js          # BRAND_CONFIG, APP_NAME, ROOM_CATEGORIES, SUPPORTED_LANGUAGES, WS_EVENTS
│       │   └── index.js              # Shared package root barrel export
│       ├── package.json              # @repo/shared manifest
│       └── README.md                 # Shared contracts documentation
│
├── docs/                             # Indexed documentation hub
│   ├── README.md                     # Master documentation index
│   ├── VISION.md                     # Product vision & core feature pillars
│   ├── MARKETING_FEATURES.md         # Master marketing & complete feature showcase
│   ├── ARCHITECTURE_AND_DB_BLUEPRINT.md # Canonical system architecture & PostgreSQL/Drizzle blueprint
│   ├── PROJECT_INDEX.md              # This navigation index
│   ├── assets/
│   │   └── color-palette.png         # ColorHunt palette reference swatch
│   ├── architecture/                 # System design, DB design, domain models, E2EE & API contracts
│   │   ├── README.md
│   │   ├── SYSTEM_DESIGN.md
│   │   ├── DATABASE_DESIGN.md
│   │   ├── DOMAIN_MODEL.md
│   │   ├── SECURITY_E2EE.md
│   │   └── API_AND_REALTIME.md
│   ├── roadmap/                      # Phase roadmap, master plan & Phase 2 scope breakdown
│   │   ├── README.md
│   │   ├── MASTER_IMPLEMENTATION_PLAN.md
│   │   └── PHASE_2_SCOPE.md
│   └── guides/                       # Contributor workflow & UI design system
│       ├── README.md
│       ├── DEVELOPMENT_WORKFLOW.md
│       └── DESIGN_SYSTEM.md
│
├── .vscode/settings.json             # Tailwind config path & search exclusions
├── .env.example                      # Documented Phase 2 environment template
├── .gitignore                        # Workspace, env & Turbo cache ignores
├── .oxlintrc.json                    # Oxlint rules (react, oxc)
├── CODE_OF_CONDUCT.md                # Contributor Covenant v2.1
├── CONTRIBUTING.md                   # Open-source contribution rules & PR checklist
├── jsconfig.json                     # Root IDE path mapping for Go-to-Definition
├── LICENSE                           # GNU AGPL-3.0 License
├── package.json                      # Root scripts (turbo run ...)
├── pnpm-lock.yaml                    # pnpm deterministic lockfile
├── pnpm-workspace.yaml               # pnpm workspace globs (apps/*, packages/*)
├── README.md                         # Monorepo overview & quickstart
├── SECURITY.md                       # Security reporting & E2EE invariants
└── turbo.json                        # Turborepo v2 task pipeline & caching config
```

---

## 2. Path Aliases & Barrel Exports

Configured in [`apps/web/vite.config.js`](../apps/web/vite.config.js), [`apps/web/jsconfig.json`](../apps/web/jsconfig.json), and root [`jsconfig.json`](../jsconfig.json):

| Import Alias | Resolves To | Purpose |
| :--- | :--- | :--- |
| `@/*` | `apps/web/src/*` | Direct imports within the frontend app |
| `@/components` | `apps/web/src/components/index.js` | All UI components (layout, panels, modals) |
| `@/components/layout` | `apps/web/src/components/layout/index.js` | `TopBar`, `BottomBar`, `BottomNavDock` |
| `@/components/panels` | `apps/web/src/components/panels/index.js` | `RoomsPanel`, `ChatPanel`, `CompilerWorkspacePanel`, `CommandCenterPanel` |
| `@/components/modals` | `apps/web/src/components/modals/index.js` | `CommandPaletteModal`, `CreateRoomModal`, `SettingsModal` |
| `@/data` | `apps/web/src/data/index.js` | `INITIAL_ROOMS`, `INITIAL_MESSAGES`, `INITIAL_FRIENDS`, `INITIAL_DEV_FEEDS`, `STARTER_CODE` |
| `@/services` | `apps/web/src/services/index.js` | Phase 2 API & WebSocket client helpers |
| `@/hooks` | `apps/web/src/hooks/index.js` | Shared React hooks (`useLocalStorageState`) |
| `@/utils` | `apps/web/src/utils/index.js` | Shared frontend utilities (`formatRoomName`, `isAiTriggerMessage`) |
| `@repo/shared` | `packages/shared/src/index.js` | Cross-workspace constants & Phase 2 domain contracts |

---

## 3. Component Registry & Navigation Map

### Layout Shell (`apps/web/src/components/layout/`)

| Component | File | Role & Responsibilities | Key Props |
| :--- | :--- | :--- | :--- |
| `TopBar` | [`TopBar.jsx`](../apps/web/src/components/layout/TopBar.jsx) | Global header: panel collapse toggles, branding, expandable search input, live Vibe status pill (Friends / Voice / Streak), settings trigger | `leftVisible`, `rightVisible`, `activeRoom`, `friends`, `isInVoice`, `onToggleVoiceConnect`, `onOpenCommandPalette`, `onOpenSettings` |
| `BottomBar` | [`BottomBar.jsx`](../apps/web/src/components/layout/BottomBar.jsx) | IDE-style status bar: mic/deafen/voice controls (left), `BottomNavDock` (center), compiler workspace launcher & latency badge (right) | `centerViewMode`, `setCenterViewMode`, `currentLanguage`, `isInVoice`, `isMuted`, `isDeafened`, `activeRoom`, layout & modal callbacks |
| `BottomNavDock` | [`BottomNavDock.jsx`](../apps/web/src/components/layout/BottomNavDock.jsx) | Hover-expanding floating capsule dock for layout reset, rooms, chat, compiler, CollabBot AI prompt, feeds, friends, and settings | `leftVisible`, `rightVisible`, `activeCommandTab`, `centerViewMode`, `onOpenAiPrompt`, `onOpenSettings`, `onResetLayout` |

### Split Workspace Panels (`apps/web/src/components/panels/`)

| Component | File | Role & Responsibilities | Key Interactions |
| :--- | :--- | :--- | :--- |
| `RoomsPanel` | [`RoomsPanel.jsx`](../apps/web/src/components/panels/RoomsPanel.jsx) | Left sidebar listing spaces filtered by category (`all`, `voice`, `code`, `games`), expandable cards with last message preview & voice connect button | Category filter, room selection, hover/click expansion, `New Space` |
| `ChatPanel` | [`ChatPanel.jsx`](../apps/web/src/components/panels/ChatPanel.jsx) | Center primary view (`centerViewMode === 'chat'`): auto-hiding breadcrumb pill, voice bar, message stream with code blocks, media, and AI chips | `@CollabBot` / `/quiz` triggers, `Copy`, `Send to Compiler` |
| `CompilerWorkspacePanel` | [`CompilerWorkspacePanel.jsx`](../apps/web/src/components/panels/CompilerWorkspacePanel.jsx) | Center alternate view (`centerViewMode === 'compiler'`): multi-language scratchpad (`python`, `javascript`, `typescript`, `cpp`) & simulated stdout console | `Ctrl+Enter` / `Cmd+Enter` run, `Tab` 4-space indent, `Share to Room`, language switch |
| `CommandCenterPanel` | [`CommandCenterPanel.jsx`](../apps/web/src/components/panels/CommandCenterPanel.jsx) | Right sidebar with two tabs: **Friends** (rich presence & streaks) and **Dev Feeds** (WakaTime gauge, interactive daily poll, GitHub/LeetCode/WakaTime stream) | Tab switching (`friends` / `feeds`), interactive poll voting |

### Modals & Overlays (`apps/web/src/components/modals/`)

| Component | File | Trigger & Purpose |
| :--- | :--- | :--- |
| `CommandPaletteModal` | [`CommandPaletteModal.jsx`](../apps/web/src/components/modals/CommandPaletteModal.jsx) | Quick jump to Compiler, Dev Feeds, or filtered Rooms (`Ctrl+K` badge / TopBar search `Enter`; `Escape` to close) |
| `CreateRoomModal` | [`CreateRoomModal.jsx`](../apps/web/src/components/modals/CreateRoomModal.jsx) | Create a new space with normalized `#name`, `topic`, and `category` (`voice`, `code`, `games`) |
| `SettingsModal` | [`SettingsModal.jsx`](../apps/web/src/components/modals/SettingsModal.jsx) | Prototype preferences for theme display, room voice chimes, friend activity notifications, and compiler auto-run |

---

## 4. State, Persistence & Keyboard Shortcuts

All top-level prototype state lives in [`apps/web/src/App.jsx`](../apps/web/src/App.jsx):

- **Resizable 3-Split Layout**:
  - Left panel width (`leftWidth`, default `280px`, clamped `200px`–`460px`) persisted under `localStorage['collab_left_width']`.
  - Right panel width (`rightWidth`, default `390px`, clamped `300px`–`650px`) persisted under `localStorage['collab_right_width']`.
  - Double-clicking either drag handle collapses that panel; `handleResetLayout()` restores defaults and clears both `localStorage` keys.
- **Cross-Panel Data Flow**:
  - **Chat → Compiler**: `handleSendToCompiler(snippet, lang)` switches `centerViewMode` to `'compiler'`, updates `currentLanguage` if present in `STARTER_CODE`, and populates `codeSnippet`.
  - **Compiler → Chat**: `handleShareCodeToChat(code, lang)` appends a formatted code-snippet message into `messagesByRoom[activeRoomId]`.
  - **AI Companion (`CollabBot AI`)**: `handleSendMessage(text)` inspects incoming text for `@collab`, `/quiz`, or `explain` (case-insensitive) and posts a simulated response with suggested follow-up chips.
- **Keyboard Shortcuts**:
  - `Ctrl+B` / `Cmd+B` — Toggle Left Rooms Panel (`App.jsx`)
  - `Ctrl+J` / `Cmd+J` — Toggle Right Command Center Panel (`App.jsx`)
  - `Ctrl+Enter` / `Cmd+Enter` — Execute code in Scratchpad (`CompilerWorkspacePanel.jsx`)
  - `Escape` — Close Command Palette modal or collapse TopBar search (`CommandPaletteModal.jsx`, `TopBar.jsx`)

---

## 5. Rebranding & Design System

- **Central Branding**: Update `BRAND_CONFIG` in [`packages/shared/src/constants.js`](../packages/shared/src/constants.js) and HTML metadata in [`apps/web/index.html`](../apps/web/index.html). Workspace package names (`@repo/*`) stay brand-neutral. See [`docs/guides/DEVELOPMENT_WORKFLOW.md`](./guides/DEVELOPMENT_WORKFLOW.md).
- **Design Tokens**: See [`docs/guides/DESIGN_SYSTEM.md`](./guides/DESIGN_SYSTEM.md) and [`docs/assets/color-palette.png`](./assets/color-palette.png).
