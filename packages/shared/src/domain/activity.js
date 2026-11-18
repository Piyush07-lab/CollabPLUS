/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Activity Synchronisation Engine sources, providers, and default privacy controls.
 */

export const INTEGRATION_PROVIDERS = Object.freeze([
  'WAKATIME',
  'GITHUB',
  'GITLAB',
  'IDE_PLUGIN',
  'INSTAGRAM',
  'FACEBOOK',
  'X_TWITTER',
]);

export const ACTIVITY_SOURCES = Object.freeze({
  coding: Object.freeze(['wakatime']),
  project: Object.freeze(['github', 'gitlab', 'ide', 'leetcode']),
  social: Object.freeze(['instagram', 'facebook', 'x']),
});

export const ACTIVITY_SYNC_DEFAULTS = Object.freeze({
  userLogMapVisibleToSelf: true,
  roomBroadcastOptIn: false,
  notificationsOptIn: false,
});
