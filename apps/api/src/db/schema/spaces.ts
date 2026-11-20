/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { sql } from 'drizzle-orm';
import {
  boolean,
  check,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './auth.js';

/**
 * Domain B: Multi-Tenancy, Building Hierarchy & RBAC
 */
export const spaceRoleEnum = pgEnum('space_role', [
  'OWNER',
  'ADMIN',
  'MODERATOR',
  'MEMBER',
]);

export const containerTypeEnum = pgEnum('container_type', [
  'LOUNGE',
  'ROOM',
  'WORKSPACE',
  'DM',
]);

export const channelLinkTargetEnum = pgEnum('channel_link_target', [
  'SPACE',
  'PROJECT',
  'WORKSPACE',
  'ROOM',
]);

export const spaces = pgTable('spaces', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  slug: varchar('slug', { length: 140 }).notNull().unique(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => users.id),
  isE2eeEnabled: boolean('is_e2ee_enabled').default(true).notNull(),
  settings: jsonb('settings')
    .$type<Record<string, unknown>>()
    .default({})
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const spaceMembers = pgTable(
  'space_members',
  {
    spaceId: uuid('space_id')
      .notNull()
      .references(() => spaces.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    role: spaceRoleEnum('role').default('MEMBER').notNull(),
    joinedAt: timestamp('joined_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.spaceId, table.userId] })],
);

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  spaceId: uuid('space_id')
    .notNull()
    .references(() => spaces.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 120 }).notNull(),
  description: text('description'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const containers = pgTable(
  'containers',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    spaceId: uuid('space_id')
      .notNull()
      .references(() => spaces.id, { onDelete: 'cascade' }),
    projectId: uuid('project_id').references(() => projects.id, {
      onDelete: 'set null',
    }),
    type: containerTypeEnum('type').notNull(),
    name: varchar('name', { length: 120 }),
    isE2eeEnforced: boolean('is_e2ee_enforced').default(true).notNull(),
    createdBy: uuid('created_by').references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('one_lounge_per_space')
      .on(table.spaceId)
      .where(sql`${table.type} = 'LOUNGE'`),
    check(
      'chk_container_project_placement',
      sql`(${table.type} IN ('LOUNGE', 'DM') AND ${table.projectId} IS NULL) OR (${table.type} IN ('ROOM', 'WORKSPACE'))`,
    ),
  ],
);

export const containerMembers = pgTable(
  'container_members',
  {
    containerId: uuid('container_id')
      .notNull()
      .references(() => containers.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    invitedBy: uuid('invited_by').references(() => users.id),
    canInvite: boolean('can_invite').default(false).notNull(),
    joinedAt: timestamp('joined_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.containerId, table.userId] })],
);

export const channels = pgTable('channels', {
  id: uuid('id').defaultRandom().primaryKey(),
  spaceId: uuid('space_id')
    .notNull()
    .references(() => spaces.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  frequencyCode: varchar('frequency_code', { length: 50 }),
  isPrivate: boolean('is_private').default(false).notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const channelLinks = pgTable(
  'channel_links',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    channelId: uuid('channel_id')
      .notNull()
      .references(() => channels.id, { onDelete: 'cascade' }),
    targetType: channelLinkTargetEnum('target_type').notNull(),
    targetId: uuid('target_id').notNull(),
  },
  (table) => [
    unique('uq_channel_links_target').on(
      table.channelId,
      table.targetType,
      table.targetId,
    ),
  ],
);
