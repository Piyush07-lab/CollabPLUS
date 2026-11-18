/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Module } from '@nestjs/common';
import { CompilerController } from './compiler.controller.js';
import { CompilerService } from './compiler.service.js';

@Module({
  controllers: [CompilerController],
  providers: [CompilerService],
  exports: [CompilerService],
})
export class CompilerModule {}
