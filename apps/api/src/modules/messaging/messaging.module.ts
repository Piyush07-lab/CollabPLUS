/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service.js';

@Module({
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}
