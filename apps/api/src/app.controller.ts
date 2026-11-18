/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ActivityService } from './modules/activity/activity.service.js';
import { AiService } from './modules/ai/ai.service.js';

/**
 * Root REST controller for service health, room metadata, and integration capabilities.
 */
@Controller()
export class AppController {
  constructor(
    @Inject(AppService) private readonly appService: AppService,
    @Inject(ActivityService) private readonly activityService: ActivityService,
    @Inject(AiService) private readonly aiService: AiService,
  ) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('api/v1/rooms/meta')
  getRoomsMeta() {
    return this.appService.getRoomsMeta();
  }

  @Get('api/v1/integrations/meta')
  getIntegrationsMeta() {
    return {
      activity: this.activityService.getActivityMetadata(),
      ai: this.aiService.getAiMetadata(),
    };
  }
}
