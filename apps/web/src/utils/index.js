/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Shared frontend helper utilities for @repo/web.
 */

/**
 * Normalize a user-provided Space or Room name into a slug.
 */
export function formatRoomName(rawName) {
  return String(rawName || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

/**
 * Check whether a chat message invokes CollabBot AI commands.
 */
export function isAiTriggerMessage(text) {
  const normalized = String(text || '').toLowerCase();
  return (
    normalized.includes('@collab') ||
    normalized.includes('/quiz') ||
    normalized.includes('explain')
  );
}
