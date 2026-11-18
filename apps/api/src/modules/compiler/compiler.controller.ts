/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Controller, Get, Inject } from '@nestjs/common';
import { CompilerService } from './compiler.service.js';

/**
 * Exposes scratchpad compiler language capabilities.
 */
@Controller('api/v1/compiler')
export class CompilerController {
  constructor(
    @Inject(CompilerService) private readonly compilerService: CompilerService,
  ) {}

  @Get('languages')
  getLanguages() {
    return this.compilerService.getCompilerMetadata();
  }
}
