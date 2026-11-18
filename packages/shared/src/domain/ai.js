/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * CollabBot AI manager modules, database enum types, and trigger definitions for Space automation.
 */

export const AI_MANAGER_TYPES = Object.freeze([
  'ROOM_MANAGER',
  'FILE_MANAGER',
  'SCHEDULE_MANAGER',
  'OFFICE_MANAGER',
]);

export const AI_MANAGER_MODULES = Object.freeze([
  {
    id: 'room_manager',
    type: 'ROOM_MANAGER',
    label: 'Room & Space Manager',
    description: 'Assists with room onboarding, summaries, quizzes, and Space moderation.',
    triggers: ['@CollabBot', '/quiz', '/summarize'],
  },
  {
    id: 'file_manager',
    type: 'FILE_MANAGER',
    label: 'File Manager',
    description: 'Indexes shared attachments, code snippets, and data-model documents.',
    triggers: ['/files', '/find-file'],
  },
  {
    id: 'schedule_manager',
    type: 'SCHEDULE_MANAGER',
    label: 'Schedule Manager',
    description: 'Coordinates coding sprints, polls, reminders, and goal checkpoints.',
    triggers: ['/schedule', '/sprint'],
  },
  {
    id: 'office_manager',
    type: 'OFFICE_MANAGER',
    label: 'Office Manager',
    description: 'Drafts structured notes, mail/spreadsheet/slide payloads, and action items.',
    triggers: ['/notes', '/action-items'],
  },
]);
