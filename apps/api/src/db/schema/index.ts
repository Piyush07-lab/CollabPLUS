/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { relations } from 'drizzle-orm';
import { oneTimePrekeys, userDevices, users } from './auth.js';
import {
  channelLinks,
  channels,
  containerMembers,
  containers,
  projects,
  spaceMembers,
  spaces,
} from './spaces.js';
import { callSessions, files, messages } from './messaging.js';
import {
  activityLogs,
  activityVisibilityRules,
  userIntegrations,
} from './activity.js';
import { aiAuditLogs, aiManagerConfigs, scheduleEvents } from './ai.js';

export * from './auth.js';
export * from './spaces.js';
export * from './messaging.js';
export * from './activity.js';
export * from './ai.js';

export const usersRelations = relations(users, ({ many }) => ({
  devices: many(userDevices),
  ownedSpaces: many(spaces, { relationName: 'space_owner' }),
  spaceMemberships: many(spaceMembers),
  createdProjects: many(projects, { relationName: 'project_creator' }),
  createdContainers: many(containers, { relationName: 'container_creator' }),
  containerMemberships: many(containerMembers, {
    relationName: 'container_member_user',
  }),
  invitedContainerMembers: many(containerMembers, {
    relationName: 'container_member_inviter',
  }),
  createdChannels: many(channels, { relationName: 'channel_creator' }),
  sentMessages: many(messages, { relationName: 'message_sender' }),
  uploadedFiles: many(files, { relationName: 'file_uploader' }),
  startedCalls: many(callSessions, { relationName: 'call_starter' }),
  integrations: many(userIntegrations),
  activityLogs: many(activityLogs),
  activityVisibilityRules: many(activityVisibilityRules),
  createdScheduleEvents: many(scheduleEvents, {
    relationName: 'schedule_creator',
  }),
}));

export const userDevicesRelations = relations(userDevices, ({ one, many }) => ({
  user: one(users, {
    fields: [userDevices.userId],
    references: [users.id],
  }),
  oneTimePrekeys: many(oneTimePrekeys),
  sentMessages: many(messages),
}));

export const oneTimePrekeysRelations = relations(oneTimePrekeys, ({ one }) => ({
  device: one(userDevices, {
    fields: [oneTimePrekeys.deviceId],
    references: [userDevices.id],
  }),
}));

export const spacesRelations = relations(spaces, ({ one, many }) => ({
  owner: one(users, {
    fields: [spaces.ownerId],
    references: [users.id],
    relationName: 'space_owner',
  }),
  members: many(spaceMembers),
  projects: many(projects),
  containers: many(containers),
  channels: many(channels),
  messages: many(messages),
  files: many(files),
  callSessions: many(callSessions),
  activityVisibilityRules: many(activityVisibilityRules),
  aiManagerConfigs: many(aiManagerConfigs),
  scheduleEvents: many(scheduleEvents),
  aiAuditLogs: many(aiAuditLogs),
}));

export const spaceMembersRelations = relations(spaceMembers, ({ one }) => ({
  space: one(spaces, {
    fields: [spaceMembers.spaceId],
    references: [spaces.id],
  }),
  user: one(users, {
    fields: [spaceMembers.userId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  space: one(spaces, {
    fields: [projects.spaceId],
    references: [spaces.id],
  }),
  creator: one(users, {
    fields: [projects.createdBy],
    references: [users.id],
    relationName: 'project_creator',
  }),
  containers: many(containers),
}));

export const containersRelations = relations(containers, ({ one, many }) => ({
  space: one(spaces, {
    fields: [containers.spaceId],
    references: [spaces.id],
  }),
  project: one(projects, {
    fields: [containers.projectId],
    references: [projects.id],
  }),
  creator: one(users, {
    fields: [containers.createdBy],
    references: [users.id],
    relationName: 'container_creator',
  }),
  members: many(containerMembers),
  messages: many(messages),
  callSessions: many(callSessions),
  activityVisibilityRules: many(activityVisibilityRules),
  aiManagerConfigs: many(aiManagerConfigs),
  scheduleEvents: many(scheduleEvents),
}));

export const containerMembersRelations = relations(
  containerMembers,
  ({ one }) => ({
    container: one(containers, {
      fields: [containerMembers.containerId],
      references: [containers.id],
    }),
    user: one(users, {
      fields: [containerMembers.userId],
      references: [users.id],
      relationName: 'container_member_user',
    }),
    inviter: one(users, {
      fields: [containerMembers.invitedBy],
      references: [users.id],
      relationName: 'container_member_inviter',
    }),
  }),
);

export const channelsRelations = relations(channels, ({ one, many }) => ({
  space: one(spaces, {
    fields: [channels.spaceId],
    references: [spaces.id],
  }),
  creator: one(users, {
    fields: [channels.createdBy],
    references: [users.id],
    relationName: 'channel_creator',
  }),
  links: many(channelLinks),
  messages: many(messages),
  callSessions: many(callSessions),
}));

export const channelLinksRelations = relations(channelLinks, ({ one }) => ({
  channel: one(channels, {
    fields: [channelLinks.channelId],
    references: [channels.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one, many }) => ({
  space: one(spaces, {
    fields: [messages.spaceId],
    references: [spaces.id],
  }),
  container: one(containers, {
    fields: [messages.containerId],
    references: [containers.id],
  }),
  channel: one(channels, {
    fields: [messages.channelId],
    references: [channels.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: 'message_sender',
  }),
  senderDevice: one(userDevices, {
    fields: [messages.senderDeviceId],
    references: [userDevices.id],
  }),
  replyTo: one(messages, {
    fields: [messages.replyToId],
    references: [messages.id],
    relationName: 'message_replies',
  }),
  replies: many(messages, { relationName: 'message_replies' }),
  files: many(files),
}));

export const filesRelations = relations(files, ({ one }) => ({
  space: one(spaces, {
    fields: [files.spaceId],
    references: [spaces.id],
  }),
  uploader: one(users, {
    fields: [files.uploaderId],
    references: [users.id],
    relationName: 'file_uploader',
  }),
  message: one(messages, {
    fields: [files.messageId],
    references: [messages.id],
  }),
}));

export const callSessionsRelations = relations(callSessions, ({ one }) => ({
  space: one(spaces, {
    fields: [callSessions.spaceId],
    references: [spaces.id],
  }),
  container: one(containers, {
    fields: [callSessions.containerId],
    references: [containers.id],
  }),
  channel: one(channels, {
    fields: [callSessions.channelId],
    references: [channels.id],
  }),
  starter: one(users, {
    fields: [callSessions.startedBy],
    references: [users.id],
    relationName: 'call_starter',
  }),
}));

export const userIntegrationsRelations = relations(
  userIntegrations,
  ({ one }) => ({
    user: one(users, {
      fields: [userIntegrations.userId],
      references: [users.id],
    }),
  }),
);

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const activityVisibilityRulesRelations = relations(
  activityVisibilityRules,
  ({ one }) => ({
    user: one(users, {
      fields: [activityVisibilityRules.userId],
      references: [users.id],
    }),
    targetSpace: one(spaces, {
      fields: [activityVisibilityRules.targetSpaceId],
      references: [spaces.id],
    }),
    targetContainer: one(containers, {
      fields: [activityVisibilityRules.targetContainerId],
      references: [containers.id],
    }),
  }),
);

export const aiManagerConfigsRelations = relations(
  aiManagerConfigs,
  ({ one }) => ({
    space: one(spaces, {
      fields: [aiManagerConfigs.spaceId],
      references: [spaces.id],
    }),
    container: one(containers, {
      fields: [aiManagerConfigs.containerId],
      references: [containers.id],
    }),
  }),
);

export const scheduleEventsRelations = relations(scheduleEvents, ({ one }) => ({
  space: one(spaces, {
    fields: [scheduleEvents.spaceId],
    references: [spaces.id],
  }),
  container: one(containers, {
    fields: [scheduleEvents.containerId],
    references: [containers.id],
  }),
  creator: one(users, {
    fields: [scheduleEvents.creatorId],
    references: [users.id],
    relationName: 'schedule_creator',
  }),
}));

export const aiAuditLogsRelations = relations(aiAuditLogs, ({ one }) => ({
  space: one(spaces, {
    fields: [aiAuditLogs.spaceId],
    references: [spaces.id],
  }),
}));
