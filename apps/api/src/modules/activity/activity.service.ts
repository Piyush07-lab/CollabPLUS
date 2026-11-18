/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import {
  INTEGRATION_PROVIDERS,
  ACTIVITY_SOURCES,
  ACTIVITY_SYNC_DEFAULTS,
  WS_EVENTS,
} from '@repo/shared';

/**
 * Provides Activity Synchronisation Engine sources and default privacy metadata.
 */
@Injectable()
export class ActivityService {
  getActivityMetadata() {
    return {
      providers: INTEGRATION_PROVIDERS,
      sources: ACTIVITY_SOURCES,
      defaults: ACTIVITY_SYNC_DEFAULTS,
      realtimeEvent: WS_EVENTS.ACTIVITY_SYNC,
    };
  }
}
