/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service.js';

@Module({
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
