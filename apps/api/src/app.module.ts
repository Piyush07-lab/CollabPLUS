/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import {
  SpacesModule,
  MessagingModule,
  ActivityModule,
  AiModule,
  CompilerModule,
} from './modules/index.js';

/**
 * Root NestJS module wiring all Collab+ API domain modules.
 */
@Module({
  imports: [
    SpacesModule,
    MessagingModule,
    ActivityModule,
    AiModule,
    CompilerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
