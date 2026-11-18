/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Rich messaging, media attachments, data-model formats, call sessions, and E2EE policy contracts.
 */

export const MESSAGE_CONTENT_TYPES = Object.freeze([
  'text',
  'media',
  'code',
  'data_model',
  'poll',
  'quiz',
  'ai_response',
]);

export const MESSAGE_KINDS = Object.freeze([
  'TEXT',
  'MEDIA',
  'DATA_MODEL',
  'SYSTEM',
  'CALL_EVENT',
]);

export const MEDIA_ATTACHMENT_TYPES = Object.freeze([
  'image',
  'video',
  'gif',
  'sticker',
  'file',
]);

export const DATA_MODEL_FORMATS = Object.freeze([
  'spreadsheet',
  'txt',
  'ppt',
  'mail',
  'code_snippet',
]);

export const DATA_MODEL_SUBTYPES = Object.freeze([
  'SPREADSHEET',
  'TXT',
  'PPT',
  'MAIL',
  'CODE_SNIPPET',
]);

export const CALL_TYPES = Object.freeze([
  'VOICE_CHAT',
  'VOICE_CALL',
  'VIDEO_MEET',
]);

export const ENCRYPTION_POLICIES = Object.freeze({
  enabledByDefault: true,
  ownerCanDisableSpaceWide: true,
  dmOverrideAlwaysAllowed: true,
  zeroKnowledgeStorage: true,
  aiPlaintextRequiresOptInOrUnencryptedSpace: true,
});
