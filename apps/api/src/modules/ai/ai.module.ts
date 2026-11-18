/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Module } from '@nestjs/common';
import { AiService } from './ai.service.js';

@Module({
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
