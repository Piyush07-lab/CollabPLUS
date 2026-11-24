/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';
import type {
  AuthenticatedRequest,
  LoginUserDto,
  RegisterDeviceDto,
  RegisterUserDto,
  ReplenishPrekeysDto,
} from './auth.types.js';

/**
 * Exposes registration, login, authenticated profile, and X3DH device key endpoints.
 */
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() req: AuthenticatedRequest) {
    return this.authService.getProfile(req.user!.sub);
  }

  @Post('devices')
  @UseGuards(AuthGuard)
  registerDevice(
    @Req() req: AuthenticatedRequest,
    @Body() body: RegisterDeviceDto,
  ) {
    return this.authService.registerDevice(req.user!.sub, body);
  }

  @Post('devices/:deviceId/prekeys')
  @UseGuards(AuthGuard)
  replenishPrekeys(
    @Req() req: AuthenticatedRequest,
    @Param('deviceId') deviceId: string,
    @Body() body: ReplenishPrekeysDto,
  ) {
    return this.authService.replenishPrekeys(req.user!.sub, deviceId, body);
  }

  @Get('keys/:userId')
  @UseGuards(AuthGuard)
  getRecipientKeys(@Param('userId') userId: string) {
    return this.authService.claimPrekeyBundlesForUser(userId);
  }
}
