/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/index.js';

export const DRIZZLE_DB = Symbol('DRIZZLE_DB');
export const PG_POOL = Symbol('PG_POOL');

export type DrizzleDb = NodePgDatabase<typeof schema>;

/**
 * Create a lazy pg.Pool instance without opening an immediate connection.
 */
export function createPgPool(connectionString?: string): Pool {
  return new Pool({
    connectionString:
      connectionString ||
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/collab_plus',
  });
}

/**
 * Create a typed Drizzle ORM client bound to the modular Collab+ schema.
 */
export function createDrizzleClient(pool: Pool): DrizzleDb {
  return drizzle(pool, { schema });
}

export * from './schema/index.js';
