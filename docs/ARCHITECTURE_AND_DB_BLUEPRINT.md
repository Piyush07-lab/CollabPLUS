# Collab+ — System Architecture & PostgreSQL Database Blueprint

> **Target Stack:** TypeScript (Node.js / Bun) · PostgreSQL 16+ · Drizzle ORM · Redis (Pub/Sub & Presence) · LiveKit (WebRTC) · S3/R2 (Encrypted Object Storage)  
> **Intended Use:** Canonical architectural reference and implementation specification for Phase 2 code generation.  
> **Related Modular Specs:** [`Database Design`](./architecture/DATABASE_DESIGN.md) · [`Domain Model`](./architecture/DOMAIN_MODEL.md) · [`Security & E2EE`](./architecture/SECURITY_E2EE.md) · [`Master Implementation Plan`](./roadmap/MASTER_IMPLEMENTATION_PLAN.md)

---

## 1. Conceptual Topology: The Building Metaphor

Collab+ models multi-tenant collaboration as a multi-story building where each **Space** is a self-contained floor. Access boundaries, encryption states, and communication frequencies follow strict spatial rules:

```text
================================================================================
  SPACE (A Floor in the Building)
  - Hard tenant boundary | Default E2EE: ON (Owner-controlled override)
  - Space Roles: OWNER, ADMIN, MODERATOR, MEMBER
================================================================================
  │
  ├──► [1] LOUNGE (Mandatory: Exactly 1 per Space)
  │        └── Open floor lobby / general chat. Auto-joins all Space members.
  │
  ├──► [0..N] PROJECT (Optional Major Classification / Wing)
  │        ├──► [0..N] ROOM (Invite-only, custom-named: Meeting, Presentation)
  │        └──► [0..N] WORKSPACE (Member-invited collaborative studio)
  │
  ├──► [1..N] STANDALONE ROOMS (Directly on the Space floor, project_id = NULL)
  │
  ├──► [1..N] STANDALONE WORKSPACES (Directly on the Space floor, project_id = NULL)
  │
  └──► [0..N] CHANNELS (Cross-Level "Satellite Radio Frequencies")
               ├── Can link: Space-wide (Floor-level broadcast)
               ├── Can link: Project <──> Project
               ├── Can link: Workspace <──> Workspace
               ├── Can link: Room <──> Room
               └── Can link: Room <──> Workspace (Cross-sibling bridge)
```

### Entity & Cardinality Rules

| Entity | Metaphor | Cardinality per Space | Access & Invitation Policy | Placement |
| --- | --- | --- | --- | --- |
| **Space** | The Floor | Root tenant (`1..N` per user) | Protected server boundary. E2EE enabled by default; only `OWNER` can disable it. | Top-level tenant. |
| **Lounge** | Floor Lobby | **Exact 1** (`1:1` with Space) | **No invitation required.** Open to 100% of Space members automatically. | Directly under `Space`. |
| **Project** | Floor Wing | **0 or more** (Optional) | Major organizational grouping. Restricts or organizes nested Rooms & Workspaces. | Directly under `Space`. |
| **Room** | Meeting Room | **1 or more** (Total in Space) | **Strict invite-only & sectioned.** Custom-named (e.g., *Meeting Room*, *Presentation Room*). Sibling to Workspace. | Under `Space` (optional `project_id`). |
| **Workspace** | Team Studio | **1 or more** (Total in Space) | **Peer-invite open.** Any current Workspace member can invite other Space members. Sibling to Room. | Under `Space` (optional `project_id`). |
| **Channel** | Radio Frequency | **0 or many** | **Cross-cutting frequency.** Bridges 2 or more nodes at the same or different levels. | Under `Space` + polymorphic `channel_links`. |
| **Direct Thread** | Intercom | User-to-User (`1:1` / small group) | **Persistent E2EE.** Users can enforce E2EE on DMs even inside a Space where E2EE is disabled. | Scoped to `Space` (or global) with independent E2EE flag. |

---

## 2. Security & End-to-End Encryption (E2EE) Model

1. **Default-On Encryption:** Every newly created `Space` initializes with `is_e2ee_enabled = true`.
2. **Owner-Only Override:** Only a user with `role = 'OWNER'` in `space_members` can toggle `spaces.is_e2ee_enabled` to `false`.
3. **DM Encryption Immunity:** `direct_threads` (or `containers` of type `DM`) maintain an independent `is_e2ee_enforced` boolean (`true` by default). Even if a Space Owner disables E2EE for the Space, users retain E2EE in their DMs.
4. **Zero-Knowledge Storage:**
   - When E2EE is active, PostgreSQL stores **only** `ciphertext`, `iv`/`nonce`, `sender_device_id`, and `key_version`. Plaintext columns remain `NULL`.
   - Files are encrypted client-side before upload to S3/R2; PostgreSQL stores encrypted symmetric file keys per recipient/group.
5. **AI Manager Boundary:** AI Managers (*Room, File, Schedule, Office*) can index plaintext messages/files only when Space E2EE is disabled, or when explicitly fed decrypted context/activity logs permitted by the user.

---

## 3. PostgreSQL & Drizzle ORM Schema Specification

> **Implementation Instructions:**
> - Use **Drizzle ORM (`drizzle-orm/pg-core`)** with native PostgreSQL `uuid` primary keys (`defaultRandom()`), `timestamp(..., { withTimezone: true })`, and `jsonb` for structured payloads.
> - Enforce database-level invariants using partial unique indexes and check constraints.

### Domain A: Identity, Devices & Key Registry

```typescript
// 1. users
// - id: uuid PK
// - email: varchar(255) UNIQUE NOT NULL
// - username: varchar(64) UNIQUE NOT NULL
// - display_name: varchar(120) NOT NULL
// - password_hash: text NOT NULL (Argon2id)
// - avatar_url: text
// - created_at, updated_at: timestamptz

// 2. user_devices (Multi-device E2EE key distribution)
// - id: uuid PK
// - user_id: uuid FK -> users.id (ON DELETE CASCADE)
// - device_name: varchar(100) NOT NULL
// - identity_public_key: text NOT NULL
// - signed_prekey: text NOT NULL
// - signed_prekey_signature: text NOT NULL
// - last_active_at: timestamptz
// - created_at: timestamptz

// 3. one_time_prekeys (X3DH / Signal-style session establishment)
// - id: uuid PK
// - device_id: uuid FK -> user_devices.id (ON DELETE CASCADE)
// - key_id: integer NOT NULL
// - public_key: text NOT NULL
// - is_consumed: boolean DEFAULT false NOT NULL
```

### Domain B: Multi-Tenancy, Building Hierarchy & RBAC

```typescript
// Enums:
// - space_role: 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER'
// - container_type: 'LOUNGE' | 'ROOM' | 'WORKSPACE' | 'DM'
// - channel_link_target: 'SPACE' | 'PROJECT' | 'WORKSPACE' | 'ROOM'

// 4. spaces (The Floor)
// - id: uuid PK
// - name: varchar(120) NOT NULL
// - slug: varchar(140) UNIQUE NOT NULL
// - owner_id: uuid FK -> users.id NOT NULL
// - is_e2ee_enabled: boolean DEFAULT true NOT NULL
// - settings: jsonb DEFAULT '{}' NOT NULL
// - created_at, updated_at: timestamptz

// 5. space_members
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - user_id: uuid FK -> users.id (ON DELETE CASCADE)
// - role: space_role DEFAULT 'MEMBER' NOT NULL
// - joined_at: timestamptz
// - PK: (space_id, user_id)

// 6. projects (Optional Major Classification / Wing)
// - id: uuid PK
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - name: varchar(120) NOT NULL
// - description: text
// - created_by: uuid FK -> users.id
// - created_at, updated_at: timestamptz

// 7. containers (Unified table for LOUNGE, ROOM, WORKSPACE, and DM)
// - id: uuid PK
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - project_id: uuid FK -> projects.id (ON DELETE SET NULL) -- NULL if standalone on floor
// - type: container_type NOT NULL
// - name: varchar(120) -- Custom name (e.g., "Meeting Room", "Frontend Studio")
// - is_e2ee_enforced: boolean DEFAULT true NOT NULL -- Always true for DM unless user disables
// - created_by: uuid FK -> users.id
// - created_at, updated_at: timestamptz
//
// CRITICAL DB CONSTRAINTS:
// - Partial Unique Index: CREATE UNIQUE INDEX one_lounge_per_space ON containers (space_id) WHERE type = 'LOUNGE';
// - Check Constraint: LOUNGE and DM must have project_id IS NULL.

// 8. container_members (Explicit membership for ROOM, WORKSPACE, DM; LOUNGE inherits space_members)
// - container_id: uuid FK -> containers.id (ON DELETE CASCADE)
// - user_id: uuid FK -> users.id (ON DELETE CASCADE)
// - invited_by: uuid FK -> users.id
// - can_invite: boolean DEFAULT false NOT NULL -- True by default for WORKSPACE members, false for ROOM
// - joined_at: timestamptz
// - PK: (container_id, user_id)

// 9. channels (Cross-level satellite radio frequencies)
// - id: uuid PK
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - name: varchar(100) NOT NULL
// - frequency_code: varchar(50) -- Optional identifier
// - is_private: boolean DEFAULT false NOT NULL
// - created_by: uuid FK -> users.id
// - created_at: timestamptz

// 10. channel_links (Polymorphic bridge linking a Channel to 1..N nodes)
// - id: uuid PK
// - channel_id: uuid FK -> channels.id (ON DELETE CASCADE)
// - target_type: channel_link_target NOT NULL -- 'SPACE' | 'PROJECT' | 'WORKSPACE' | 'ROOM'
// - target_id: uuid NOT NULL -- References spaces.id, projects.id, or containers.id
// - UNIQUE(channel_id, target_type, target_id)
```

### Domain C: Polymorphic Messaging, Media, Data Models & Calls

```typescript
// Enums:
// - message_kind: 'TEXT' | 'MEDIA' | 'DATA_MODEL' | 'SYSTEM' | 'CALL_EVENT'
// - data_model_subtype: 'SPREADSHEET' | 'TXT' | 'PPT' | 'MAIL' | 'CODE_SNIPPET'
// - call_type: 'VOICE_CHAT' | 'VOICE_CALL' | 'VIDEO_MEET'

// 11. messages
// - id: uuid PK
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - container_id: uuid FK -> containers.id (ON DELETE CASCADE) -- Mutually exclusive with channel_id
// - channel_id: uuid FK -> channels.id (ON DELETE CASCADE) -- Mutually exclusive with container_id
// - sender_id: uuid FK -> users.id (ON DELETE SET NULL)
// - sender_device_id: uuid FK -> user_devices.id
// - kind: message_kind NOT NULL
// - data_model_type: data_model_subtype -- Populated when kind = 'DATA_MODEL'
// - is_encrypted: boolean DEFAULT true NOT NULL
// - ciphertext: text -- Base64/Hex encrypted payload (when is_encrypted = true)
// - encryption_meta: jsonb -- { iv, keyVersion, algorithm, recipientKeys }
// - plaintext_body: text -- Populated ONLY when is_encrypted = false
// - structured_payload: jsonb -- For unencrypted DATA_MODEL (code language, mail headers, sheet cells)
// - reply_to_id: uuid FK -> messages.id (ON DELETE SET NULL)
// - created_at, edited_at, deleted_at: timestamptz
//
// CRITICAL DB CONSTRAINT:
// - CHECK ((container_id IS NOT NULL AND channel_id IS NULL) OR (container_id IS NULL AND channel_id IS NOT NULL))

// 12. files (Encrypted object storage pointers)
// - id: uuid PK
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - uploader_id: uuid FK -> users.id
// - message_id: uuid FK -> messages.id (ON DELETE SET NULL)
// - storage_bucket: varchar(100) NOT NULL
// - storage_key: text NOT NULL
// - encrypted_metadata: text -- Encrypted filename, mime_type, size if E2EE
// - plain_filename: varchar(255) -- Populated if Space E2EE = false
// - mime_type: varchar(127)
// - size_bytes: bigint NOT NULL
// - encryption_meta: jsonb -- { iv, fileKeyWrap }
// - created_at: timestamptz

// 13. call_sessions (Backed by LiveKit / WebRTC)
// - id: uuid PK
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - container_id: uuid FK -> containers.id
// - channel_id: uuid FK -> channels.id
// - type: call_type NOT NULL
// - livekit_room_name: varchar(150) UNIQUE NOT NULL
// - started_by: uuid FK -> users.id
// - started_at: timestamptz NOT NULL
// - ended_at: timestamptz
```

### Domain D: Activity Synchronization Engine

```typescript
// Enums:
// - integration_provider: 'WAKATIME' | 'GITHUB' | 'GITLAB' | 'IDE_PLUGIN' | 'INSTAGRAM' | 'FACEBOOK' | 'X_TWITTER'

// 14. user_integrations
// - id: uuid PK
// - user_id: uuid FK -> users.id (ON DELETE CASCADE)
// - provider: integration_provider NOT NULL
// - external_account_id: varchar(255)
// - encrypted_tokens: text NOT NULL -- OAuth access/refresh tokens encrypted at rest
// - is_broadcast_enabled: boolean DEFAULT false NOT NULL -- Global toggle per integration
// - sync_cursor: text -- Last webhook/poll checkpoint
// - updated_at: timestamptz
// - UNIQUE(user_id, provider)

// 15. activity_logs (Normalized cross-platform activity log map)
// - id: uuid PK
// - user_id: uuid FK -> users.id (ON DELETE CASCADE)
// - provider: integration_provider NOT NULL
// - event_type: varchar(100) NOT NULL -- e.g., 'COMMIT_PUSHED', 'CODING_HEARTBEAT', 'POST_PUBLISHED'
// - summary: text NOT NULL
// - raw_payload: jsonb NOT NULL
// - occurred_at: timestamptz NOT NULL
// - indexed_at: timestamptz DEFAULT now() NOT NULL

// 16. activity_visibility_rules (Fine-grained sharing: private by default, optional per Room/Space)
// - id: uuid PK
// - user_id: uuid FK -> users.id (ON DELETE CASCADE)
// - provider: integration_provider NOT NULL
// - target_space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - target_container_id: uuid FK -> containers.id (ON DELETE CASCADE) -- NULL = entire Space, or specific Room/Workspace
// - is_visible: boolean DEFAULT false NOT NULL
// - UNIQUE(user_id, provider, target_space_id, target_container_id)
```

### Domain E: AI Managers (Room, File, Schedule, Office)

```typescript
// Enums:
// - ai_manager_type: 'ROOM_MANAGER' | 'FILE_MANAGER' | 'SCHEDULE_MANAGER' | 'OFFICE_MANAGER'

// 17. ai_manager_configs
// - id: uuid PK
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - container_id: uuid FK -> containers.id (ON DELETE CASCADE) -- NULL if Space-wide
// - manager_type: ai_manager_type NOT NULL
// - is_enabled: boolean DEFAULT true NOT NULL
// - config: jsonb DEFAULT '{}' NOT NULL -- Prompts, automation rules, permissions
// - updated_at: timestamptz

// 18. schedule_events (Managed by Schedule & Office AI Managers)
// - id: uuid PK
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - container_id: uuid FK -> containers.id (ON DELETE SET NULL)
// - creator_id: uuid FK -> users.id
// - title: varchar(200) NOT NULL
// - description: text
// - start_time: timestamptz NOT NULL
// - end_time: timestamptz NOT NULL
// - generated_by_ai: boolean DEFAULT false NOT NULL
// - metadata: jsonb DEFAULT '{}' NOT NULL

// 19. ai_audit_logs (Tracks automated actions taken by AI Managers)
// - id: uuid PK
// - space_id: uuid FK -> spaces.id (ON DELETE CASCADE)
// - manager_type: ai_manager_type NOT NULL
// - action_type: varchar(100) NOT NULL
// - summary: text NOT NULL
// - context_refs: jsonb DEFAULT '[]' NOT NULL
// - created_at: timestamptz DEFAULT now() NOT NULL
```

---

## 4. Implementation Execution Checklist

1. **Initialize Drizzle Setup:** Configure `drizzle.config.ts` targeting PostgreSQL with `strict: true` and `verbose: true`.
2. **Modularize Schema Files:** Split the schema into `src/db/schema/auth.ts`, `spaces.ts`, `messaging.ts`, `activity.ts`, and `ai.ts`, re-exporting all tables and Drizzle `relations()` from `src/db/schema/index.ts`.
3. **Custom SQL Migration for Invariants:** Generate the initial migration via `drizzle-kit generate` and append raw SQL for:
   - Partial unique index ensuring `1 LOUNGE per Space`.
   - `CHECK` constraint ensuring `LOUNGE` and `DM` containers have `project_id IS NULL`.
   - `CHECK` constraint ensuring `messages` belong to either a `container_id` OR a `channel_id`.
   - Composite indexes on `(container_id, created_at DESC)` and `(channel_id, created_at DESC)` for fast paginated chat history.
4. **Atomic Space Creation Service:** Implement a transactional `createSpace()` service that atomically inserts the `Space`, adds the creator as `OWNER` in `space_members`, and provisions the mandatory `LOUNGE` container.

For the full actionable roadmap combining DB design and E2EE implementation, see [`docs/roadmap/MASTER_IMPLEMENTATION_PLAN.md`](./roadmap/MASTER_IMPLEMENTATION_PLAN.md).
