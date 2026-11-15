import http from 'node:http';
import { APP_NAME, WS_EVENTS } from '../../../packages/shared/src/index.js';
import { handleApiRequest } from './routes/index.js';

const PORT = Number(process.env.PORT) || 4000;

const server = http.createServer(handleApiRequest);

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  server.listen(PORT, () => {
    console.log(`[${APP_NAME} API] Listening on http://localhost:${PORT}`);
    console.log(`[${APP_NAME} API] WebSocket events ready:`, Object.values(WS_EVENTS).join(', '));
  });
}

export { server };
