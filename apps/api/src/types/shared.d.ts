/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

declare module '@repo/shared' {
  export interface BrandConfig {
    readonly name: string;
    readonly shortName: string;
    readonly version: string;
    readonly botName: string;
    readonly tagline: string;
  }

  export interface SupportedLanguage {
    readonly id: string;
    readonly label: string;
    readonly extension: string;
  }

  export interface AiManagerModuleDescriptor {
    readonly id: string;
    readonly type: string;
    readonly label: string;
    readonly description: string;
    readonly triggers: readonly string[];
  }

  export const BRAND_CONFIG: BrandConfig;
  export const APP_NAME: string;
  export const APP_SHORT_NAME: string;
  export const APP_VERSION: string;
  export const BOT_NAME: string;

  export const STORAGE_KEYS: {
    readonly leftWidth: string;
    readonly rightWidth: string;
  };

  export const ROOM_CATEGORIES: readonly string[];
  export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[];

  export const WS_EVENTS: {
    readonly ROOM_JOIN: string;
    readonly ROOM_LEAVE: string;
    readonly MESSAGE_SEND: string;
    readonly CODE_SHARE: string;
    readonly VOICE_STATE: string;
    readonly SPACE_SYNC: string;
    readonly VOICE_SIGNAL: string;
    readonly SCREEN_SHARE_STATE: string;
    readonly ACTIVITY_SYNC: string;
    readonly AI_PROMPT: string;
    readonly E2EE_KEY_EXCHANGE: string;
  };

  export const SPACE_GROUP_TYPES: readonly string[];
  export const CONTAINER_TYPES: readonly string[];
  export const CHANNEL_LINK_TARGETS: readonly string[];
  export const RBAC_ROLES: readonly string[];
  export const SPACE_ROLES_ENUM: readonly string[];
  export const SPACE_HIERARCHY_RULES: Record<string, Record<string, unknown>>;
  export const RBAC_CAPABILITIES: Record<string, readonly string[]>;
  export function hasSpaceCapability(role: string, capability: string): boolean;

  export const MESSAGE_CONTENT_TYPES: readonly string[];
  export const MESSAGE_KINDS: readonly string[];
  export const MEDIA_ATTACHMENT_TYPES: readonly string[];
  export const DATA_MODEL_FORMATS: readonly string[];
  export const DATA_MODEL_SUBTYPES: readonly string[];
  export const CALL_TYPES: readonly string[];
  export const ENCRYPTION_POLICIES: {
    readonly enabledByDefault: boolean;
    readonly ownerCanDisableSpaceWide: boolean;
    readonly dmOverrideAlwaysAllowed: boolean;
    readonly zeroKnowledgeStorage: boolean;
    readonly aiPlaintextRequiresOptInOrUnencryptedSpace: boolean;
  };

  export const INTEGRATION_PROVIDERS: readonly string[];
  export const ACTIVITY_SOURCES: {
    readonly coding: readonly string[];
    readonly project: readonly string[];
    readonly social: readonly string[];
  };
  export const ACTIVITY_SYNC_DEFAULTS: {
    readonly userLogMapVisibleToSelf: boolean;
    readonly roomBroadcastOptIn: boolean;
    readonly notificationsOptIn: boolean;
  };

  export const AI_MANAGER_TYPES: readonly string[];
  export const AI_MANAGER_MODULES: readonly AiManagerModuleDescriptor[];
}
