/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Global, Inject, Module, type OnModuleDestroy } from '@nestjs/common';
import type { Pool } from 'pg';
import {
  createDrizzleClient,
  createPgPool,
  DRIZZLE_DB,
  PG_POOL,
} from './index.js';

/**
 * Global NestJS database module providing lazy pg.Pool and Drizzle ORM instances.
 */
@Global()
@Module({
  providers: [
    {
      provide: PG_POOL,
      useFactory: () => createPgPool(),
    },
    {
      provide: DRIZZLE_DB,
      inject: [PG_POOL],
      useFactory: (pool: Pool) => createDrizzleClient(pool),
    },
  ],
  exports: [PG_POOL, DRIZZLE_DB],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async onModuleDestroy(): Promise<void> {
    await this.pool.end();
  }
}
