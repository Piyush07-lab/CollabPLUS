/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export interface JwtTokenPayload {
  sub: string;
  email: string;
  username: string;
  displayName: string;
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest {
  headers: Record<string, string | string[] | undefined>;
  user?: JwtTokenPayload;
}

export interface OneTimePrekeyInput {
  keyId: number;
  publicKey: string;
}

export interface RegisterDeviceDto {
  deviceName: string;
  identityPublicKey: string;
  signedPrekey: string;
  signedPrekeySignature: string;
  oneTimePrekeys?: OneTimePrekeyInput[];
}

export interface RegisterUserDto {
  email: string;
  username: string;
  displayName: string;
  password: string;
  avatarUrl?: string;
  device?: RegisterDeviceDto;
}

export interface LoginUserDto {
  identifier?: string;
  email?: string;
  username?: string;
  password: string;
}

export interface ReplenishPrekeysDto {
  oneTimePrekeys: OneTimePrekeyInput[];
}
