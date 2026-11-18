/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Controller, Get, Inject } from '@nestjs/common';
import { SpacesService } from './spaces.service.js';
import { MessagingService } from '../messaging/messaging.service.js';

/**
 * Exposes Space topology, RBAC capabilities, and E2EE messaging metadata.
 */
@Controller('api/v1/spaces')
export class SpacesController {
  constructor(
    @Inject(SpacesService) private readonly spacesService: SpacesService,
    @Inject(MessagingService) private readonly messagingService: MessagingService,
  ) {}

  @Get('meta')
  getMeta() {
    return {
      spaces: this.spacesService.getSpacesMetadata(),
      messaging: this.messagingService.getMessagingMetadata(),
    };
  }
}
