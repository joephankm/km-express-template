import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// CORE
import { httpLogging } from '#logging';

// MIDDLEWARES
import errorHandler from '#middlewares/errorHandler';
import notFound from '#middlewares/notFound';

// ERRORS
import { BadRequestError } from '#errors';

// CONSTANTS
import env from '#configs/env';
import loggerConfig from '#configs/loggerConfig';

export const createApp = () => {
  const app = express();

  /* ══════════════════════ Security ══════════════════════ */
  // Set secure HTTP headers (XSS, clickjacking, etc.)
  /** @see {@link https://github.com/helmetjs/helmet?tab=readme-ov-file#http-header-reference Security Header Reference} */
  app.use(helmet());

  // Allow cross-origin requests from configured origin
  /** @see {@link https://www.npmjs.com/package/cors#configuration-options Config Options} */
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

  /* ═════════════════ Request Processing ═════════════════ */
  // Parse JSON request body -> req.body
  app.use(express.json());

  // Parse URL-encoded body (Form Data)
  app.use(express.urlencoded({ extended: true }));

  /* ═══════════════════════ Logging ══════════════════════ */
  // Log incoming HTTP requests

  if (loggerConfig.http.detail !== 'none') {
    app.use(httpLogging());
  }

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/error', (_req, _res) => {
    throw new BadRequestError('Error Testing');
  });

  app.use(notFound());

  app.use(errorHandler());

  return app;
};
