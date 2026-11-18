# UI Design System & Workspace Ergonomics

Visual specifications for `@repo/web`, derived from the ColorHunt palette (`#E5CB90 | #FFF3C8 | #34A99D | #458393`) archived in [`docs/assets/color-palette.png`](../assets/color-palette.png).

---

## 1. Color Palette Tokens

Defined in [`apps/web/src/theme.js`](../../apps/web/src/theme.js) (`THEME`) and [`apps/web/src/index.css`](../../apps/web/src/index.css) (`@theme` CSS custom properties):

| Token / Hex | Name | Semantic Usage |
| :--- | :--- | :--- |
| `#FFF3C8` | Cream | Soft badges, highlight pills, dock gradients, text on deep ocean headers |
| `#E5CB90` | Sand | Architectural 2px borders, resize drag handles, secondary badges |
| `#34A99D` | Teal | Primary CTAs, active tabs/rooms, online presence, syntax keywords |
| `#458393` | Ocean | Muted metadata labels, secondary gradients, scrollbar accents |
| `#F8F3E5` / `#FAF3E3` | Warm Canvas / Sand Surface | App root background and side panel surfaces |
| `#FFFDF7` | Cream Surface | Input fields, elevated cards, modal inner containers |
| `#1B3E48` / `#132B32` / `#0D1E22` | Deep Ocean Slate | TopBar headers, Scratchpad code editor, and console terminal surfaces |
| `#14252D` / `#56727D` | Ink / Muted Ink | Primary and secondary body typography on warm surfaces |

---

## 2. Typography

Loaded in [`apps/web/index.html`](../../apps/web/index.html) and mapped in [`apps/web/src/index.css`](../../apps/web/src/index.css):

- **UI Sans (`--font-sans`)**: `'Plus Jakarta Sans'`
- **Code & Metrics (`--font-mono`)**: `'JetBrains Mono'`

---

## 3. Resizable 3-Split Workspace Layout

Implemented in [`apps/web/src/App.jsx`](../../apps/web/src/App.jsx):

- **Left Sidebar (`RoomsPanel`)**: Default `280px`, clamped `200px`–`460px`, persisted to `localStorage['collab_left_width']`.
- **Center Viewport (`min-w-[320px]`)**: Dynamically toggles between `ChatPanel` (`centerViewMode === 'chat'`) and `CompilerWorkspacePanel` (`centerViewMode === 'compiler'`).
- **Right Sidebar (`CommandCenterPanel`)**: Default `390px`, clamped `300px`–`650px`, persisted to `localStorage['collab_right_width']`.
- **Unified Bottom Horizon (`BottomBar` + `BottomNavDock`)**: Houses live voice/mute/deafen controls, hover-expanding center navigation dock, and quick Scratchpad launcher.

---

## 4. Global Keyboard Shortcuts

| Shortcut | Scope | Action |
| :--- | :--- | :--- |
| `Ctrl+B` / `Cmd+B` | Global (`App.jsx`) | Toggle Left Rooms Panel |
| `Ctrl+J` / `Cmd+J` | Global (`App.jsx`) | Toggle Right Command Center Panel |
| `Ctrl+Enter` / `Cmd+Enter` | `CompilerWorkspacePanel` | Execute code in Scratchpad |
| `Esc` | `CommandPaletteModal` / `TopBar` | Close Command Palette or collapse header search |
