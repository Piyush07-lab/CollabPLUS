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
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './auth.js';
import { containers, spaces } from './spaces.js';

/**
 * Domain E: CollabBot AI Managers (Room, File, Schedule, Office)
 */
export const aiManagerTypeEnum = pgEnum('ai_manager_type', [
  'ROOM_MANAGER',
  'FILE_MANAGER',
  'SCHEDULE_MANAGER',
  'OFFICE_MANAGER',
]);

export const aiManagerConfigs = pgTable('ai_manager_configs', {
  id: uuid('id').defaultRandom().primaryKey(),
  spaceId: uuid('space_id')
    .notNull()
    .references(() => spaces.id, { onDelete: 'cascade' }),
  containerId: uuid('container_id').references(() => containers.id, {
    onDelete: 'cascade',
  }),
  managerType: aiManagerTypeEnum('manager_type').notNull(),
  isEnabled: boolean('is_enabled').default(true).notNull(),
  config: jsonb('config')
    .$type<Record<string, unknown>>()
    .default({})
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const scheduleEvents = pgTable('schedule_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  spaceId: uuid('space_id')
    .notNull()
    .references(() => spaces.id, { onDelete: 'cascade' }),
  containerId: uuid('container_id').references(() => containers.id, {
    onDelete: 'set null',
  }),
  creatorId: uuid('creator_id').references(() => users.id),
  title: varchar('title', { length: 200 }).notNull(),
  description: text('description'),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  endTime: timestamp('end_time', { withTimezone: true }).notNull(),
  generatedByAi: boolean('generated_by_ai').default(false).notNull(),
  metadata: jsonb('metadata')
    .$type<Record<string, unknown>>()
    .default({})
    .notNull(),
});

export const aiAuditLogs = pgTable('ai_audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  spaceId: uuid('space_id')
    .notNull()
    .references(() => spaces.id, { onDelete: 'cascade' }),
  managerType: aiManagerTypeEnum('manager_type').notNull(),
  actionType: varchar('action_type', { length: 100 }).notNull(),
  summary: text('summary').notNull(),
  contextRefs: jsonb('context_refs').$type<unknown[]>().default([]).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
