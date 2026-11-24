/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { JwtTokenPayload } from './auth.types.js';

export const DEFAULT_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;
export const MIN_JWT_SECRET_LENGTH = 32;
const PLACEHOLDER_SECRET_PREFIX = 'replace-with-';

const JWT_HEADER = Object.freeze({
  alg: 'HS256',
  typ: 'JWT',
});

/**
 * Resolve and validate the HMAC signing secret from override or environment.
 */
export function resolveJwtSecret(overrideSecret?: string): string {
  const secret = (overrideSecret ?? process.env.AUTH_JWT_SECRET ?? '').trim();

  if (!secret) {
    throw new Error('AUTH_JWT_SECRET is not configured.');
  }

  if (
    secret.length < MIN_JWT_SECRET_LENGTH ||
    secret.toLowerCase().startsWith(PLACEHOLDER_SECRET_PREFIX)
  ) {
    throw new Error(
      `AUTH_JWT_SECRET must be a non-placeholder secret of at least ${MIN_JWT_SECRET_LENGTH} characters.`,
    );
  }

  return secret;
}

/**
 * Sign an RFC 7519 HS256 JWT token with iat/exp timestamps.
 */
export function signJwtToken(
  claims: Omit<JwtTokenPayload, 'iat' | 'exp'>,
  options: { ttlSeconds?: number; secret?: string } = {},
): { token: string; payload: JwtTokenPayload; expiresAt: string } {
  const ttlSeconds = options.ttlSeconds ?? DEFAULT_TOKEN_TTL_SECONDS;
  const nowSeconds = Math.floor(Date.now() / 1000);

  const payload: JwtTokenPayload = {
    ...claims,
    iat: nowSeconds,
    exp: nowSeconds + ttlSeconds,
  };

  const encodedHeader = Buffer.from(JSON.stringify(JWT_HEADER), 'utf8').toString(
    'base64url',
  );
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString(
    'base64url',
  );
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const signature = createHmac('sha256', resolveJwtSecret(options.secret))
    .update(signingInput)
    .digest('base64url');

  return {
    token: `${signingInput}.${signature}`,
    payload,
    expiresAt: new Date(payload.exp * 1000).toISOString(),
  };
}

/**
 * Verify an HS256 JWT token signature, header algorithm, claims, and expiration.
 */
export function verifyJwtToken(
  token: string,
  secret?: string,
): JwtTokenPayload {
  const parts = token.split('.');
  if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
    throw new Error('Malformed JWT structure.');
  }

  const [encodedHeader, encodedPayload, signatureSegment] = parts;

  let header: unknown;
  try {
    header = JSON.parse(
      Buffer.from(encodedHeader, 'base64url').toString('utf8'),
    );
  } catch {
    throw new Error('Invalid JWT header encoding.');
  }

  if (
    !header ||
    typeof header !== 'object' ||
    (header as { alg?: unknown }).alg !== 'HS256' ||
    (header as { typ?: unknown }).typ !== 'JWT'
  ) {
    throw new Error('Unsupported JWT algorithm or type.');
  }

  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = createHmac('sha256', resolveJwtSecret(secret))
    .update(signingInput)
    .digest('base64url');

  const actualBuffer = Buffer.from(signatureSegment, 'utf8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    throw new Error('Invalid JWT signature.');
  }

  let rawPayload: unknown;
  try {
    rawPayload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    );
  } catch {
    throw new Error('Invalid JWT payload encoding.');
  }

  if (!isValidJwtPayload(rawPayload)) {
    throw new Error('Invalid JWT claims.');
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (rawPayload.exp <= nowSeconds) {
    throw new Error('JWT token has expired.');
  }

  return rawPayload;
}

function isValidJwtPayload(value: unknown): value is JwtTokenPayload {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.sub === 'string' &&
    record.sub.length > 0 &&
    typeof record.email === 'string' &&
    typeof record.username === 'string' &&
    typeof record.displayName === 'string' &&
    typeof record.iat === 'number' &&
    Number.isFinite(record.iat) &&
    typeof record.exp === 'number' &&
    Number.isFinite(record.exp)
  );
}
