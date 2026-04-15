import http from 'http';

import { createApp } from '#/app';

// CORE
import { serverLogger } from '#/logging';

// CONSTANTS
import env from '#configs/env';

const app = createApp();

const server = http.createServer(app);

server.listen(env.PORT, () => {
  serverLogger.info(`🚀 App is running on port ${env.PORT}!`);
});

const shutdown = (signal: string) => {
  serverLogger.info(`🛑 ${signal} - Shutting down server...`);
  server.close(() => {
    serverLogger.info('✅  Server closed!');
    process.exit(0); // eslint-disable-line n/no-process-exit
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
