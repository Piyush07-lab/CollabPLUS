/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './auth.js';
import { containers, spaces } from './spaces.js';

/**
 * Domain D: Activity Synchronization Engine
 */
export const integrationProviderEnum = pgEnum('integration_provider', [
  'WAKATIME',
  'GITHUB',
  'GITLAB',
  'IDE_PLUGIN',
  'INSTAGRAM',
  'FACEBOOK',
  'X_TWITTER',
]);

export const userIntegrations = pgTable(
  'user_integrations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: integrationProviderEnum('provider').notNull(),
    externalAccountId: varchar('external_account_id', { length: 255 }),
    encryptedTokens: text('encrypted_tokens').notNull(),
    isBroadcastEnabled: boolean('is_broadcast_enabled')
      .default(false)
      .notNull(),
    syncCursor: text('sync_cursor'),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique('uq_user_integrations_user_provider').on(
      table.userId,
      table.provider,
    ),
  ],
);

export const activityLogs = pgTable('activity_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  provider: integrationProviderEnum('provider').notNull(),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  summary: text('summary').notNull(),
  rawPayload: jsonb('raw_payload').$type<Record<string, unknown>>().notNull(),
  occurredAt: timestamp('occurred_at', { withTimezone: true }).notNull(),
  indexedAt: timestamp('indexed_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const activityVisibilityRules = pgTable(
  'activity_visibility_rules',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    provider: integrationProviderEnum('provider').notNull(),
    targetSpaceId: uuid('target_space_id')
      .notNull()
      .references(() => spaces.id, { onDelete: 'cascade' }),
    targetContainerId: uuid('target_container_id').references(
      () => containers.id,
      { onDelete: 'cascade' },
    ),
    isVisible: boolean('is_visible').default(false).notNull(),
  },
  (table) => [
    unique('uq_activity_visibility_scope').on(
      table.userId,
      table.provider,
      table.targetSpaceId,
      table.targetContainerId,
    ),
  ],
);
