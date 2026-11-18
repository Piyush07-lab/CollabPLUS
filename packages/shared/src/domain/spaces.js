/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Multi-tenancy Space topology ("Building Metaphor"), container types, and RBAC contracts.
 *
 * A "Space" is a protected server environment ("floor") where connected users
 * share lounges, projects, rooms, workspaces, channels, and direct threads.
 */

export const SPACE_GROUP_TYPES = Object.freeze([
  'lounge',
  'rooms',
  'workspace',
  'channels',
  'projects',
]);

export const CONTAINER_TYPES = Object.freeze([
  'LOUNGE',
  'ROOM',
  'WORKSPACE',
  'DM',
]);

export const CHANNEL_LINK_TARGETS = Object.freeze([
  'SPACE',
  'PROJECT',
  'WORKSPACE',
  'ROOM',
]);

export const RBAC_ROLES = Object.freeze([
  'owner',
  'admin',
  'moderator',
  'member',
]);

export const SPACE_ROLES_ENUM = Object.freeze([
  'OWNER',
  'ADMIN',
  'MODERATOR',
  'MEMBER',
]);

export const SPACE_HIERARCHY_RULES = Object.freeze({
  lounge: Object.freeze({
    cardinalityPerSpace: 'exact_1',
    requiresInvitation: false,
    projectScoped: false,
    autoJoinAllSpaceMembers: true,
  }),
  project: Object.freeze({
    cardinalityPerSpace: 'zero_or_more',
    optional: true,
    canContain: Object.freeze(['ROOM', 'WORKSPACE']),
  }),
  room: Object.freeze({
    cardinalityPerSpace: 'one_or_more',
    requiresInvitation: true,
    canInviteByDefault: false,
    canAttachToProject: true,
  }),
  workspace: Object.freeze({
    cardinalityPerSpace: 'one_or_more',
    requiresInvitation: true,
    canInviteByDefault: true,
    canAttachToProject: true,
  }),
  channel: Object.freeze({
    cardinalityPerSpace: 'zero_or_more',
    crossLevelBridge: true,
    supportedTargets: CHANNEL_LINK_TARGETS,
  }),
  dm: Object.freeze({
    projectScoped: false,
    persistentE2EEOverride: true,
  }),
});

export const RBAC_CAPABILITIES = Object.freeze({
  owner: Object.freeze([
    'space:delete',
    'space:toggle_e2ee',
    'space:manage_roles',
    'space:manage_groups',
    'space:manage_integrations',
    'space:moderate_messages',
    'space:share_files',
    'space:send_messages',
    'space:join_voice',
  ]),
  admin: Object.freeze([
    'space:manage_roles',
    'space:manage_groups',
    'space:manage_integrations',
    'space:moderate_messages',
    'space:share_files',
    'space:send_messages',
    'space:join_voice',
  ]),
  moderator: Object.freeze([
    'space:moderate_messages',
    'space:share_files',
    'space:send_messages',
    'space:join_voice',
  ]),
  member: Object.freeze([
    'space:share_files',
    'space:send_messages',
    'space:join_voice',
  ]),
});

/**
 * Evaluate whether a role has a specific capability within a Space.
 */
export function hasSpaceCapability(role, capability) {
  const normalizedRole = typeof role === 'string' ? role.toLowerCase() : '';
  const capabilities = RBAC_CAPABILITIES[normalizedRole];
  return Array.isArray(capabilities) ? capabilities.includes(capability) : false;
}
