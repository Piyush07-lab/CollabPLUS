/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import { SUPPORTED_LANGUAGES } from '@repo/shared';

/**
 * Provides supported scratchpad compiler languages and sandbox execution mode.
 */
@Injectable()
export class CompilerService {
  getCompilerMetadata() {
    return {
      languages: SUPPORTED_LANGUAGES,
      executionMode: 'scaffold',
    };
  }
}
