/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Phase 2 API and WebSocket client service scaffold for @repo/web.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const WS_BASE_URL =
  import.meta.env.VITE_WS_URL || 'ws://localhost:4000/ws';

/**
 * Perform a JSON GET request against @repo/api.
 */
async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}): ${path}`);
  }

  return response.json();
}

export function fetchApiHealth() {
  return fetchJson('/health');
}

export function fetchRoomsMeta() {
  return fetchJson('/api/v1/rooms/meta');
}

export function fetchSpacesMeta() {
  return fetchJson('/api/v1/spaces/meta');
}

export function fetchIntegrationsMeta() {
  return fetchJson('/api/v1/integrations/meta');
}
