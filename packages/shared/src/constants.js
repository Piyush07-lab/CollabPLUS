/**
 * Shared domain constants, brand configuration, and protocol definitions.
 *
 * NOTE: `APP_NAME` ("Collab+") is a temporary prototype working title and is
 * subject to change. Update `BRAND_CONFIG` here to rebrand across the monorepo
 * without modifying internal `@repo/*` package scopes.
 */

export const BRAND_CONFIG = {
  name: 'Collab+',
  shortName: 'C+',
  version: '0.1.0',
  botName: 'CollabBot AI',
  tagline: 'Vibe, Code & Connect',
};

export const APP_NAME = BRAND_CONFIG.name;
export const APP_SHORT_NAME = BRAND_CONFIG.shortName;
export const APP_VERSION = BRAND_CONFIG.version;
export const BOT_NAME = BRAND_CONFIG.botName;

export const STORAGE_KEYS = {
  leftWidth: 'collab_left_width',
  rightWidth: 'collab_right_width',
};

export const ROOM_CATEGORIES = ['all', 'voice', 'code', 'games'];

export const SUPPORTED_LANGUAGES = [
  { id: 'python', label: 'Python 3.12', extension: 'py' },
  { id: 'javascript', label: 'JavaScript (ES6)', extension: 'js' },
  { id: 'typescript', label: 'TypeScript 5.4', extension: 'ts' },
  { id: 'cpp', label: 'C++ 20', extension: 'cpp' },
];

export const WS_EVENTS = {
  ROOM_JOIN: 'room:join',
  ROOM_LEAVE: 'room:leave',
  MESSAGE_SEND: 'message:send',
  CODE_SHARE: 'code:share',
  VOICE_STATE: 'voice:state',
};
