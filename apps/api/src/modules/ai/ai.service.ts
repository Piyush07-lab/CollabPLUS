/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import { AI_MANAGER_TYPES, AI_MANAGER_MODULES, BOT_NAME, WS_EVENTS } from '@repo/shared';

/**
 * Provides CollabBot AI manager module metadata and trigger contracts.
 */
@Injectable()
export class AiService {
  getAiMetadata() {
    return {
      botName: BOT_NAME,
      managerTypes: AI_MANAGER_TYPES,
      modules: AI_MANAGER_MODULES,
      realtimeEvent: WS_EVENTS.AI_PROMPT,
    };
  }
}
