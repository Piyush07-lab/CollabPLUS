/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { sql } from 'drizzle-orm';
import {
  AnyPgColumn,
  bigint,
  boolean,
  check,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { userDevices, users } from './auth.js';
import { channels, containers, spaces } from './spaces.js';

/**
 * Domain C: Polymorphic Messaging, Encrypted Files & LiveKit Call Sessions
 */
export const messageKindEnum = pgEnum('message_kind', [
  'TEXT',
  'MEDIA',
  'DATA_MODEL',
  'SYSTEM',
  'CALL_EVENT',
]);

export const dataModelSubtypeEnum = pgEnum('data_model_subtype', [
  'SPREADSHEET',
  'TXT',
  'PPT',
  'MAIL',
  'CODE_SNIPPET',
]);

export const callTypeEnum = pgEnum('call_type', [
  'VOICE_CHAT',
  'VOICE_CALL',
  'VIDEO_MEET',
]);

export const messages = pgTable(
  'messages',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    spaceId: uuid('space_id')
      .notNull()
      .references(() => spaces.id, { onDelete: 'cascade' }),
    containerId: uuid('container_id').references(() => containers.id, {
      onDelete: 'cascade',
    }),
    channelId: uuid('channel_id').references(() => channels.id, {
      onDelete: 'cascade',
    }),
    senderId: uuid('sender_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    senderDeviceId: uuid('sender_device_id').references(() => userDevices.id),
    kind: messageKindEnum('kind').notNull(),
    dataModelType: dataModelSubtypeEnum('data_model_type'),
    isEncrypted: boolean('is_encrypted').default(true).notNull(),
    ciphertext: text('ciphertext'),
    encryptionMeta: jsonb('encryption_meta').$type<Record<string, unknown>>(),
    plaintextBody: text('plaintext_body'),
    structuredPayload: jsonb('structured_payload').$type<
      Record<string, unknown>
    >(),
    replyToId: uuid('reply_to_id').references((): AnyPgColumn => messages.id, {
      onDelete: 'set null',
    }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    editedAt: timestamp('edited_at', { withTimezone: true }),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
  },
  (table) => [
    check(
      'chk_message_target_xor',
      sql`(${table.containerId} IS NOT NULL AND ${table.channelId} IS NULL) OR (${table.containerId} IS NULL AND ${table.channelId} IS NOT NULL)`,
    ),
    check(
      'chk_message_e2ee_zero_knowledge',
      sql`(${table.isEncrypted} = true AND ${table.ciphertext} IS NOT NULL AND ${table.plaintextBody} IS NULL AND ${table.structuredPayload} IS NULL) OR (${table.isEncrypted} = false)`,
    ),
    index('idx_messages_container_created_at')
      .on(table.containerId, table.createdAt.desc())
      .where(sql`${table.containerId} IS NOT NULL AND ${table.deletedAt} IS NULL`),
    index('idx_messages_channel_created_at')
      .on(table.channelId, table.createdAt.desc())
      .where(sql`${table.channelId} IS NOT NULL AND ${table.deletedAt} IS NULL`),
  ],
);

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey(),
  spaceId: uuid('space_id')
    .notNull()
    .references(() => spaces.id, { onDelete: 'cascade' }),
  uploaderId: uuid('uploader_id').references(() => users.id),
  messageId: uuid('message_id').references(() => messages.id, {
    onDelete: 'set null',
  }),
  storageBucket: varchar('storage_bucket', { length: 100 }).notNull(),
  storageKey: text('storage_key').notNull(),
  encryptedMetadata: text('encrypted_metadata'),
  plainFilename: varchar('plain_filename', { length: 255 }),
  mimeType: varchar('mime_type', { length: 127 }),
  sizeBytes: bigint('size_bytes', { mode: 'number' }).notNull(),
  encryptionMeta: jsonb('encryption_meta').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const callSessions = pgTable('call_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  spaceId: uuid('space_id')
    .notNull()
    .references(() => spaces.id, { onDelete: 'cascade' }),
  containerId: uuid('container_id').references(() => containers.id),
  channelId: uuid('channel_id').references(() => channels.id),
  type: callTypeEnum('type').notNull(),
  livekitRoomName: varchar('livekit_room_name', { length: 150 })
    .notNull()
    .unique(),
  startedBy: uuid('started_by').references(() => users.id),
  startedAt: timestamp('started_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  endedAt: timestamp('ended_at', { withTimezone: true }),
});
