# `@repo/shared`

Shared brand configuration, domain contracts, PostgreSQL blueprint enum mirrors, language metadata, RBAC policies, encryption defaults, activity sources, AI modules, and WebSocket event contracts consumed by `@repo/web` and `@repo/api`.

## Exports

### Core Constants (`src/constants.js`)
- `BRAND_CONFIG`, `APP_NAME`, `APP_SHORT_NAME`, `APP_VERSION`, `BOT_NAME` *(central place to update the temporary project name)*
- `STORAGE_KEYS`
- `ROOM_CATEGORIES`
- `SUPPORTED_LANGUAGES`
- `WS_EVENTS` *(room, messaging, code, voice, WebRTC signaling, screen share, activity sync, AI prompt, and E2EE key exchange)*

### Phase 2 Domain & Blueprint Contracts (`src/domain/`)
- **Spaces, Topology & RBAC** ([`src/domain/spaces.js`](./src/domain/spaces.js)): `SPACE_GROUP_TYPES`, `CONTAINER_TYPES`, `CHANNEL_LINK_TARGETS`, `RBAC_ROLES`, `SPACE_ROLES_ENUM`, `SPACE_HIERARCHY_RULES`, `RBAC_CAPABILITIES`, `hasSpaceCapability`
- **Messaging, Calls & E2EE** ([`src/domain/messaging.js`](./src/domain/messaging.js)): `MESSAGE_CONTENT_TYPES`, `MESSAGE_KINDS`, `MEDIA_ATTACHMENT_TYPES`, `DATA_MODEL_FORMATS`, `DATA_MODEL_SUBTYPES`, `CALL_TYPES`, `ENCRYPTION_POLICIES`
- **Activity Sync** ([`src/domain/activity.js`](./src/domain/activity.js)): `INTEGRATION_PROVIDERS`, `ACTIVITY_SOURCES`, `ACTIVITY_SYNC_DEFAULTS`
- **AI Integration** ([`src/domain/ai.js`](./src/domain/ai.js)): `AI_MANAGER_TYPES`, `AI_MANAGER_MODULES`
