/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import {
  MESSAGE_CONTENT_TYPES,
  MESSAGE_KINDS,
  MEDIA_ATTACHMENT_TYPES,
  DATA_MODEL_FORMATS,
  DATA_MODEL_SUBTYPES,
  CALL_TYPES,
  ENCRYPTION_POLICIES,
  WS_EVENTS,
} from '@repo/shared';

/**
 * Provides rich messaging, attachment, call session, and E2EE policy metadata.
 */
@Injectable()
export class MessagingService {
  getMessagingMetadata() {
    return {
      contentTypes: MESSAGE_CONTENT_TYPES,
      messageKinds: MESSAGE_KINDS,
      attachmentTypes: MEDIA_ATTACHMENT_TYPES,
      dataModelFormats: DATA_MODEL_FORMATS,
      dataModelSubtypes: DATA_MODEL_SUBTYPES,
      callTypes: CALL_TYPES,
      encryptionPolicy: ENCRYPTION_POLICIES,
      realtimeEvents: [
        WS_EVENTS.MESSAGE_SEND,
        WS_EVENTS.CODE_SHARE,
        WS_EVENTS.E2EE_KEY_EXCHANGE,
      ],
    };
  }
}
