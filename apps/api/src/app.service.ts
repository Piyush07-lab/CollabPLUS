/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import {
  APP_NAME,
  APP_VERSION,
  ROOM_CATEGORIES,
  WS_EVENTS,
} from '@repo/shared';

/**
 * Provides core API health and room protocol metadata.
 */
@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: `${APP_NAME} API`,
      version: APP_VERSION,
      timestamp: new Date().toISOString(),
    };
  }

  getRoomsMeta() {
    return {
      categories: ROOM_CATEGORIES,
      wsEvents: WS_EVENTS,
    };
  }
}
