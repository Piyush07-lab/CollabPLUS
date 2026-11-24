/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { AuthenticatedRequest } from './auth.types.js';

/**
 * NestJS route guard validating Authorization Bearer JWT tokens and populating request.user.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const rawAuthHeader = request.headers?.authorization;
    const authHeader = Array.isArray(rawAuthHeader)
      ? rawAuthHeader[0]
      : rawAuthHeader;

    if (!authHeader || typeof authHeader !== 'string') {
      throw new UnauthorizedException('Missing Authorization header.');
    }

    const match = /^Bearer\s+(\S+)$/i.exec(authHeader.trim());
    if (!match) {
      throw new UnauthorizedException(
        'Authorization header must follow "Bearer <token>" format.',
      );
    }

    const token = match[1];
    request.user = this.authService.verifyToken(token);
    return true;
  }
}
