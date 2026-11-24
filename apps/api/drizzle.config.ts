/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'drizzle-kit';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const repoRootDir = path.resolve(configDir, '../..');

for (const envPath of [
  path.join(configDir, '.env.local'),
  path.join(configDir, '.env'),
  path.join(repoRootDir, '.env.local'),
  path.join(repoRootDir, '.env'),
]) {
  if (fs.existsSync(envPath)) {
    process.loadEnvFile(envPath);
  }
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './dist/db/schema/index.js',
  out: './src/db/migrations',
  strict: true,
  verbose: true,
  dbCredentials: {
    url:
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL ||
      'postgresql://postgres:postgres@localhost:5432/collab_plus',
  },
});
