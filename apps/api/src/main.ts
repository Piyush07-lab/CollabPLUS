/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import 'reflect-metadata';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { APP_NAME, WS_EVENTS } from '@repo/shared';
import { AppModule } from './app.module.js';

const PORT = Number(process.env.PORT) || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

/**
 * Create and configure the NestJS + Fastify application instance.
 */
export async function createApiApp(): Promise<NestFastifyApplication> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: CORS_ORIGIN,
    credentials: true,
  });

  return app;
}

/**
 * Start the HTTP/Fastify server on the configured port.
 */
export async function bootstrap(): Promise<NestFastifyApplication> {
  const app = await createApiApp();
  await app.listen(PORT, '0.0.0.0');

  console.log(`[${APP_NAME} API] NestJS + Fastify listening on http://localhost:${PORT}`);
  console.log(
    `[${APP_NAME} API] WebSocket events ready:`,
    Object.values(WS_EVENTS).join(', '),
  );

  return app;
}

const entryUrl = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : '';

if (import.meta.url === entryUrl) {
  void bootstrap();
}
