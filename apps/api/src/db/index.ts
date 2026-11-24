/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/index.js';

export const DRIZZLE_DB = Symbol('DRIZZLE_DB');
export const PG_POOL = Symbol('PG_POOL');

export type DrizzleDb = NodePgDatabase<typeof schema>;

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const apiRootDir = path.resolve(currentDir, '../..');
const repoRootDir = path.resolve(currentDir, '../../../..');

for (const envPath of [
  path.join(apiRootDir, '.env.local'),
  path.join(apiRootDir, '.env'),
  path.join(repoRootDir, '.env.local'),
  path.join(repoRootDir, '.env'),
]) {
  if (fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
  }
}

/**
 * Resolve the PostgreSQL connection string across standard and Vercel/Neon env keys.
 */
export function resolveDatabaseUrl(connectionString?: string): string {
  return (
    connectionString ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    'postgresql://postgres:postgres@localhost:5432/collab_plus'
  );
}

/**
 * Create a lazy pg.Pool instance without opening an immediate connection.
 */
export function createPgPool(connectionString?: string): Pool {
  return new Pool({
    connectionString: resolveDatabaseUrl(connectionString),
  });
}

/**
 * Create a typed Drizzle ORM client bound to the modular Collab+ schema.
 */
export function createDrizzleClient(pool: Pool): DrizzleDb {
  return drizzle(pool, { schema });
}

export * from './schema/index.js';
