import {
  APP_NAME,
  APP_VERSION,
  ROOM_CATEGORIES,
  SUPPORTED_LANGUAGES,
  WS_EVENTS
} from '@repo/shared';

/**
 * Send a JSON response with standard headers.
 */
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

/**
 * Route HTTP API requests for health, room metadata, and compiler capabilities.
 */
export function handleApiRequest(req, res) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'GET' && url.pathname === '/health') {
    return sendJson(res, 200, {
      status: 'ok',
      service: `${APP_NAME} API`,
      version: APP_VERSION,
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'GET' && url.pathname === '/api/v1/rooms/meta') {
    return sendJson(res, 200, {
      categories: ROOM_CATEGORIES,
      wsEvents: WS_EVENTS
    });
  }

  if (req.method === 'GET' && url.pathname === '/api/v1/compiler/languages') {
    return sendJson(res, 200, {
      languages: SUPPORTED_LANGUAGES
    });
  }

  return sendJson(res, 404, {
    error: 'Not Found',
    path: url.pathname
  });
}
