/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Algorithm,
  hash as hashPassword,
  verify as verifyPassword,
} from '@node-rs/argon2';
import { and, asc, eq, or, sql } from 'drizzle-orm';
import {
  DRIZZLE_DB,
  type DrizzleDb,
  oneTimePrekeys,
  userDevices,
  users,
} from '../../db/index.js';
import type {
  JwtTokenPayload,
  LoginUserDto,
  OneTimePrekeyInput,
  RegisterDeviceDto,
  RegisterUserDto,
  ReplenishPrekeysDto,
} from './auth.types.js';
import { signJwtToken, verifyJwtToken } from './jwt.util.js';

type DbExecutor = Pick<DrizzleDb, 'insert' | 'select' | 'update'>;

const PUBLIC_USER_COLUMNS = {
  id: users.id,
  email: users.email,
  username: users.username,
  displayName: users.displayName,
  avatarUrl: users.avatarUrl,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

/**
 * Handles Argon2id authentication, JWT issuance/verification, and X3DH device key registry.
 */
@Injectable()
export class AuthService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDb) {}

  /**
   * Verify a Bearer JWT token and return its claims or throw 401 Unauthorized.
   */
  verifyToken(token: string): JwtTokenPayload {
    try {
      return verifyJwtToken(token);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Invalid or expired token.';
      throw new UnauthorizedException(message);
    }
  }

  /**
   * Register a new user account, optionally bind an initial device key bundle, and issue a JWT.
   */
  async register(dto: RegisterUserDto) {
    const email = dto?.email?.trim().toLowerCase();
    const username = dto?.username?.trim().toLowerCase();
    const displayName = dto?.displayName?.trim();
    const password = dto?.password;

    if (!email || !username || !displayName || typeof password !== 'string') {
      throw new BadRequestException(
        'email, username, displayName, and password are required.',
      );
    }

    if (password.length < 8) {
      throw new BadRequestException(
        'Password must be at least 8 characters long.',
      );
    }

    if (dto.device) {
      this.validateDeviceInput(dto.device);
    }

    const existing = await this.db
      .select({ id: users.id, email: users.email, username: users.username })
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)))
      .limit(1);

    if (existing.length > 0) {
      throw new ConflictException(
        existing[0].email === email
          ? 'Email is already registered.'
          : 'Username is already taken.',
      );
    }

    const passwordHash = await hashPassword(password, {
      algorithm: Algorithm.Argon2id,
    });

    const { createdUser, createdDevice } = await this.db.transaction(
      async (tx) => {
        const [user] = await tx
          .insert(users)
          .values({
            email,
            username,
            displayName,
            passwordHash,
            avatarUrl: dto.avatarUrl?.trim() || null,
          })
          .returning(PUBLIC_USER_COLUMNS);

        let device = null;
        if (dto.device) {
          device = await this.insertDeviceWithPrekeys(tx, user.id, dto.device);
        }

        return { createdUser: user, createdDevice: device };
      },
    );

    const { token, expiresAt } = signJwtToken({
      sub: createdUser.id,
      email: createdUser.email,
      username: createdUser.username,
      displayName: createdUser.displayName,
    });

    return {
      user: createdUser,
      device: createdDevice,
      token,
      expiresAt,
    };
  }

  /**
   * Authenticate an existing user with email or username and return a signed JWT.
   */
  async login(dto: LoginUserDto) {
    const identifier = (dto?.identifier || dto?.email || dto?.username || '')
      .trim()
      .toLowerCase();
    const password = dto?.password;

    if (!identifier || typeof password !== 'string' || password.length === 0) {
      throw new BadRequestException(
        'identifier (or email/username) and password are required.',
      );
    }

    const [user] = await this.db
      .select({
        ...PUBLIC_USER_COLUMNS,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .where(or(eq(users.email, identifier), eq(users.username, identifier)))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await verifyPassword(user.passwordHash, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const { passwordHash: _passwordHash, ...publicUser } = user;
    const { token, expiresAt } = signJwtToken({
      sub: publicUser.id,
      email: publicUser.email,
      username: publicUser.username,
      displayName: publicUser.displayName,
    });

    return {
      user: publicUser,
      token,
      expiresAt,
    };
  }

  /**
   * Retrieve the authenticated user's profile and registered E2EE devices.
   */
  async getProfile(userId: string) {
    const [user] = await this.db
      .select(PUBLIC_USER_COLUMNS)
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('Authenticated user account not found.');
    }

    const devices = await this.db
      .select({
        id: userDevices.id,
        userId: userDevices.userId,
        deviceName: userDevices.deviceName,
        identityPublicKey: userDevices.identityPublicKey,
        signedPrekey: userDevices.signedPrekey,
        signedPrekeySignature: userDevices.signedPrekeySignature,
        lastActiveAt: userDevices.lastActiveAt,
        createdAt: userDevices.createdAt,
        remainingPrekeys: sql<number>`count(CASE WHEN ${oneTimePrekeys.isConsumed} = false THEN 1 END)::int`,
      })
      .from(userDevices)
      .leftJoin(oneTimePrekeys, eq(oneTimePrekeys.deviceId, userDevices.id))
      .where(eq(userDevices.userId, userId))
      .groupBy(userDevices.id)
      .orderBy(asc(userDevices.createdAt));

    return { user, devices };
  }

  /**
   * Register an E2EE device key bundle and optional batch of one-time pre-keys for a user.
   */
  async registerDevice(userId: string, dto: RegisterDeviceDto) {
    this.validateDeviceInput(dto);

    return this.db.transaction((tx) =>
      this.insertDeviceWithPrekeys(tx, userId, dto),
    );
  }

  /**
   * Upload additional unconsumed X3DH one-time pre-keys for a device owned by the user.
   */
  async replenishPrekeys(
    userId: string,
    deviceId: string,
    dto: ReplenishPrekeysDto,
  ) {
    if (
      !dto ||
      !Array.isArray(dto.oneTimePrekeys) ||
      dto.oneTimePrekeys.length === 0
    ) {
      throw new BadRequestException(
        'oneTimePrekeys must be a non-empty array.',
      );
    }

    this.validatePrekeysInput(dto.oneTimePrekeys);

    const [device] = await this.db
      .select({ id: userDevices.id, userId: userDevices.userId })
      .from(userDevices)
      .where(eq(userDevices.id, deviceId))
      .limit(1);

    if (!device) {
      throw new NotFoundException('Device not found.');
    }

    if (device.userId !== userId) {
      throw new ForbiddenException('You do not own this device.');
    }

    await this.db.transaction(async (tx) => {
      await tx.insert(oneTimePrekeys).values(
        dto.oneTimePrekeys.map((prekey) => ({
          deviceId: device.id,
          keyId: prekey.keyId,
          publicKey: prekey.publicKey.trim(),
          isConsumed: false,
        })),
      );

      await tx
        .update(userDevices)
        .set({ lastActiveAt: new Date() })
        .where(eq(userDevices.id, device.id));
    });

    return {
      deviceId: device.id,
      addedCount: dto.oneTimePrekeys.length,
    };
  }

  /**
   * Return recipient device key bundles and atomically claim one unconsumed X3DH pre-key per device.
   */
  async claimPrekeyBundlesForUser(targetUserId: string) {
    const [targetUser] = await this.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, targetUserId))
      .limit(1);

    if (!targetUser) {
      throw new NotFoundException('Target user not found.');
    }

    return this.db.transaction(async (tx) => {
      const devices = await tx
        .select()
        .from(userDevices)
        .where(eq(userDevices.userId, targetUserId))
        .orderBy(asc(userDevices.createdAt));

      const bundles = [];

      for (const device of devices) {
        const [claimedPrekey] = await tx
          .select()
          .from(oneTimePrekeys)
          .where(
            and(
              eq(oneTimePrekeys.deviceId, device.id),
              eq(oneTimePrekeys.isConsumed, false),
            ),
          )
          .orderBy(asc(oneTimePrekeys.keyId))
          .limit(1)
          .for('update', { skipLocked: true });

        if (claimedPrekey) {
          await tx
            .update(oneTimePrekeys)
            .set({ isConsumed: true })
            .where(eq(oneTimePrekeys.id, claimedPrekey.id));
        }

        bundles.push({
          deviceId: device.id,
          deviceName: device.deviceName,
          identityPublicKey: device.identityPublicKey,
          signedPrekey: device.signedPrekey,
          signedPrekeySignature: device.signedPrekeySignature,
          oneTimePrekey: claimedPrekey
            ? {
                id: claimedPrekey.id,
                keyId: claimedPrekey.keyId,
                publicKey: claimedPrekey.publicKey,
              }
            : null,
        });
      }

      return {
        userId: targetUserId,
        devices: bundles,
      };
    });
  }

  private async insertDeviceWithPrekeys(
    executor: DbExecutor,
    userId: string,
    dto: RegisterDeviceDto,
  ) {
    const [device] = await executor
      .insert(userDevices)
      .values({
        userId,
        deviceName: dto.deviceName.trim(),
        identityPublicKey: dto.identityPublicKey.trim(),
        signedPrekey: dto.signedPrekey.trim(),
        signedPrekeySignature: dto.signedPrekeySignature.trim(),
        lastActiveAt: new Date(),
      })
      .returning();

    const prekeys = dto.oneTimePrekeys ?? [];
    if (prekeys.length > 0) {
      await executor.insert(oneTimePrekeys).values(
        prekeys.map((prekey) => ({
          deviceId: device.id,
          keyId: prekey.keyId,
          publicKey: prekey.publicKey.trim(),
          isConsumed: false,
        })),
      );
    }

    return {
      ...device,
      uploadedPrekeysCount: prekeys.length,
    };
  }

  private validateDeviceInput(dto: RegisterDeviceDto): void {
    if (
      !dto?.deviceName?.trim() ||
      !dto?.identityPublicKey?.trim() ||
      !dto?.signedPrekey?.trim() ||
      !dto?.signedPrekeySignature?.trim()
    ) {
      throw new BadRequestException(
        'deviceName, identityPublicKey, signedPrekey, and signedPrekeySignature are required.',
      );
    }

    if (dto.oneTimePrekeys !== undefined) {
      if (!Array.isArray(dto.oneTimePrekeys)) {
        throw new BadRequestException('oneTimePrekeys must be an array.');
      }
      this.validatePrekeysInput(dto.oneTimePrekeys);
    }
  }

  private validatePrekeysInput(prekeys: OneTimePrekeyInput[]): void {
    for (const prekey of prekeys) {
      if (
        typeof prekey?.keyId !== 'number' ||
        !Number.isInteger(prekey.keyId) ||
        !prekey?.publicKey?.trim()
      ) {
        throw new BadRequestException(
          'Each one-time prekey must contain an integer keyId and non-empty publicKey.',
        );
      }
    }
  }
}
