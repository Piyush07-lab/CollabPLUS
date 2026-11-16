# Project Index & Navigation Map

A structured index of this **Turborepo + pnpm** monorepo (temporary working title: **Collab+**), workspace packages, path aliases, component registry, and state architecture.

---

## 1. Monorepo Topology

```text
<repo-root>/
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
│   │   │   ├── App.jsx               # Root workspace state, 3-split layout, shortcuts & wiring
│   │   │   ├── App.css               # Legacy/template component styles
│   │   │   ├── index.css             # Tailwind v4 @theme tokens & custom animations
│   │   │   ├── main.jsx              # React DOM mount entry point
│   │   │   └── theme.js              # Central ColorHunt palette JS constants (THEME)
│   │   ├── index.html                # HTML shell with Google Fonts (Plus Jakarta Sans, JetBrains Mono)
│   │   ├── jsconfig.json             # Web workspace path alias IntelliSense
│   │   ├── package.json              # @repo/web manifest
│   │   └── vite.config.js            # Vite config with @/ and @repo/shared aliases
│   │
│   └── api/                          # @repo/api — Node.js HTTP/REST & WS readiness scaffold
│       ├── src/
│       │   ├── routes/index.js       # Health, room metadata, and compiler capabilities handlers
│       │   └── index.js              # HTTP server entry point (port 4000)
│       ├── package.json              # @repo/api manifest
│       └── README.md
│
├── packages/
│   └── shared/                       # @repo/shared — Shared brand config, constants & event names
│       ├── src/
│       │   ├── constants.js          # BRAND_CONFIG, APP_NAME, ROOM_CATEGORIES, SUPPORTED_LANGUAGES, WS_EVENTS
│       │   └── index.js              # Shared package barrel export
│       ├── package.json              # @repo/shared manifest
│       └── README.md
│
├── docs/
│   ├── assets/
│   │   └── color-palette.png         # ColorHunt palette reference swatch
│   ├── PROJECT_INDEX.md              # This navigation index
│   └── VISION.md                     # Product vision & roadmap notes
│
├── .vscode/settings.json             # Tailwind config path & search exclusions
├── .gitignore                        # Workspace & Turbo cache ignores
├── .oxlintrc.json                    # Oxlint rules (react, oxc)
├── jsconfig.json                     # Root IDE path mapping for Go-to-Definition
├── package.json                      # Root scripts (turbo run ...)
├── pnpm-lock.yaml                    # pnpm deterministic lockfile
├── pnpm-workspace.yaml               # pnpm workspace globs (apps/*, packages/*)
├── turbo.json                        # Turborepo v2 task pipeline & caching config
└── README.md                         # Monorepo overview & quickstart
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
| `@repo/shared` | `packages/shared/src/index.js` | Cross-workspace constants (`BRAND_CONFIG`, `APP_NAME`, `ROOM_CATEGORIES`, `SUPPORTED_LANGUAGES`, `WS_EVENTS`) |

---

## 3. Component Registry & Navigation Map

### Layout Shell (`apps/web/src/components/layout/`)

| Component | File | Role & Responsibilities | Key Props |
| :--- | :--- | :--- | :--- |
| `TopBar` | [`TopBar.jsx`](../apps/web/src/components/layout/TopBar.jsx) | Global header: panel collapse toggles, branding, expandable search input, live Vibe status pill (Friends / Voice / Streak), user pill | `leftVisible`, `rightVisible`, `activeRoom`, `friends`, `isInVoice`, `onToggleVoiceConnect`, `onOpenCommandPalette`, `onOpenSettings` |
| `BottomBar` | [`BottomBar.jsx`](../apps/web/src/components/layout/BottomBar.jsx) | IDE-style status bar: mic/deafen/voice controls (left), `BottomNavDock` (center), compiler workspace launcher & latency badge (right) | `centerViewMode`, `setCenterViewMode`, `currentLanguage`, `isInVoice`, `isMuted`, `isDeafened`, `activeRoom`, layout & modal callbacks |
| `BottomNavDock` | [`BottomNavDock.jsx`](../apps/web/src/components/layout/BottomNavDock.jsx) | Hover-expanding 3-1-3 floating capsule dock for layout reset, rooms, compiler, CollabBot AI prompt, feeds, friends, and settings | `leftVisible`, `rightVisible`, `activeCommandTab`, `centerViewMode`, `onOpenAiPrompt`, `onOpenSettings`, `onResetLayout` |

### Split Workspace Panels (`apps/web/src/components/panels/`)

| Component | File | Role & Responsibilities | Key Interactions |
| :--- | :--- | :--- | :--- |
| `RoomsPanel` | [`RoomsPanel.jsx`](../apps/web/src/components/panels/RoomsPanel.jsx) | Left sidebar listing spaces filtered by category (`all`, `voice`, `code`, `games`), expandable cards with last message preview & voice connect button | Category filter, room selection, hover/click expansion, `New Space` |
| `ChatPanel` | [`ChatPanel.jsx`](../apps/web/src/components/panels/ChatPanel.jsx) | Center primary view (`centerViewMode === 'chat'`): auto-hiding breadcrumb pill, voice bar, message stream with code blocks, media, and AI chips | `@CollabBot` / `/quiz` triggers, `Copy`, `Send to Compiler ⚡` |
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

All top-level state lives in [`apps/web/src/App.jsx`](../apps/web/src/App.jsx):

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

## 5. Rebranding / Changing Project Name

The current title **Collab+** is a temporary prototype name. To make future rebranding painless:

1. **Internal Workspace Scopes Stay Stable**: Packages use the brand-neutral `@repo/*` convention (`@repo/web`, `@repo/api`, `@repo/shared`), so renaming the product never requires rewriting imports across workspaces.
2. **Central Brand Config**: Update `BRAND_CONFIG` (`name`, `shortName`, `botName`, `tagline`) in [`packages/shared/src/constants.js`](../packages/shared/src/constants.js) when choosing the final product name, then update static HTML metadata in [`apps/web/index.html`](../apps/web/index.html) and UI copy as needed.

---

## 6. Theme & Design System

Based on the ColorHunt palette archived in [`docs/assets/color-palette.png`](./assets/color-palette.png):

| Token / Hex | Role | Defined In |
| :--- | :--- | :--- |
| `#FFF3C8` (Cream) | Soft pills, badges, highlights, dock gradients | [`theme.js`](../apps/web/src/theme.js), [`index.css`](../apps/web/src/index.css) |
| `#E5CB90` (Sand) | Architectural borders, resize handles, secondary badges | [`theme.js`](../apps/web/src/theme.js), [`index.css`](../apps/web/src/index.css) |
| `#34A99D` (Teal) | Primary CTAs, active tabs/rooms, online/accent indicators | [`theme.js`](../apps/web/src/theme.js), [`index.css`](../apps/web/src/index.css) |
| `#458393` (Ocean) | Muted labels, accents, deep ocean slate surfaces (`#1B3E48`, `#142B31`) | [`theme.js`](../apps/web/src/theme.js), [`index.css`](../apps/web/src/index.css) |
