/**
 * Shared domain constants and protocol definitions for the Collab+ monorepo.
 */

export const APP_NAME = 'Collab+';
export const APP_VERSION = '0.1.0';

export const ROOM_CATEGORIES = ['all', 'voice', 'code', 'games'];

export const SUPPORTED_LANGUAGES = [
  { id: 'python', label: 'Python 3.12', extension: 'py' },
  { id: 'javascript', label: 'JavaScript (ES6)', extension: 'js' },
  { id: 'typescript', label: 'TypeScript 5.4', extension: 'ts' },
  { id: 'cpp', label: 'C++ 20', extension: 'cpp' }
];

export const WS_EVENTS = {
  ROOM_JOIN: 'room:join',
  ROOM_LEAVE: 'room:leave',
  MESSAGE_SEND: 'message:send',
  CODE_SHARE: 'code:share',
  VOICE_STATE: 'voice:state'
};
