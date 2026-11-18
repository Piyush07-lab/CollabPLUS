/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import {
  SPACE_GROUP_TYPES,
  CONTAINER_TYPES,
  CHANNEL_LINK_TARGETS,
  RBAC_ROLES,
  SPACE_ROLES_ENUM,
  SPACE_HIERARCHY_RULES,
  RBAC_CAPABILITIES,
  hasSpaceCapability,
} from '@repo/shared';

/**
 * Provides multi-tenant Space topology metadata and RBAC capability checks.
 */
@Injectable()
export class SpacesService {
  getSpacesMetadata() {
    return {
      groupTypes: SPACE_GROUP_TYPES,
      containerTypes: CONTAINER_TYPES,
      channelLinkTargets: CHANNEL_LINK_TARGETS,
      roles: RBAC_ROLES,
      roleEnum: SPACE_ROLES_ENUM,
      hierarchyRules: SPACE_HIERARCHY_RULES,
      capabilities: RBAC_CAPABILITIES,
    };
  }

  checkCapability(role: string, capability: string): boolean {
    return hasSpaceCapability(role, capability);
  }
}
