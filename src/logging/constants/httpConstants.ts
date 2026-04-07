import type { Request, Response } from 'express';
import { LOG_COLORS, type LogLevel, type LogObj } from './logConstants';
import type { LogDetail, Levels, LevelColors, TextStyle } from './loggingTypes';

/* ════════════════════════════════════════════════════════╗
 ║                       LOG CONFIG                        ║
 ╚════════════════════════════════════════════════════════ */

/**
 * Supported HTTP methods.
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT';

/**
 * HTTP-specific log levels based on response outcome.
 *
 * Used to classify requests by result for logging and visualization:
 *   - `meta`     — non-business requests (e.g. preflight, OPTIONS, health checks)
 *   - `success`  — successful responses (2xx)
 *   - `invalid`  — client errors due to invalid input (4xx)
 *   - `failed`   — request rejected by application logic
 *   - `critical` — critical failures during request processing
 */
export type HttpLogLevel = 'meta' | 'success' | 'invalid' | 'failed' | 'critical';

/**
 * Define HTTP log levels.
 */
export const HTTP_LEVELS: Levels<HttpLogLevel> = {
  meta: 20,
  success: 30,
  invalid: 40,
  failed: 50,
  critical: 60,
};

/**
 * Define HTTP log colors (used by `pino-pretty`).
 */
export const HTTP_COLORS: LevelColors<HttpLogLevel> = {
  meta: LOG_COLORS.debug,
  success: 'green',
  invalid: LOG_COLORS.warn,
  failed: LOG_COLORS.error,
  critical: LOG_COLORS.fatal,
};

/**
 * Color mapping for HTTP methods
 */
type MethodColors = Partial<Record<HttpMethod, TextStyle>> & { default: TextStyle };

/**
 * Define HTTP method colors (used by `pino-pretty`).
 */
export const METHOD_COLORS: MethodColors = {
  GET: 'yellow',
  POST: 'green',
  PUT: 'blue',
  PATCH: 'blue',
  DELETE: 'red',
  default: 'gray',
};

/**
 * Maps application log levels to HTTP log levels.
 *
 * Used to align general logging severity with HTTP-specific outcomes.
 */
export const LOG_LEVEL_MAP: Record<LogLevel, HttpLogLevel> = {
  trace: 'meta',
  debug: 'meta',
  info: 'success',
  warn: 'failed',
  error: 'critical',
  fatal: 'critical',
};

/**
 * Define HTTP request object used by serializers.
 */
export type RequestObj = Pick<Request, 'id' | 'method' | 'url' | 'query' | 'params' | 'body' | 'headers'> &
  Pick<Request['socket'], 'remoteAddress' | 'remotePort'>;

/**
 * Define HTTP response object used by serializers.
 */
export type ResponseObj = Pick<Response, 'statusCode'> & {
  contentLength: number;
  headers: Record<string, unknown>;
};

/**
 * HTTP log object structure.
 *
 * @category __Extracted Type__
 */
export type HttpLogObj = LogObj & {
  req: RequestObj;
  res: ResponseObj;
  responseTime: number;
};

/**
 * Parameters for formatting HTTP logs (used by `pino-pretty`).
 */
export type HttpFormatParams = {
  methodColors: MethodColors;
  includeHost?: boolean;
};

/* ════════════════════════════════════════════════════════╗
 ║                     PUBLIC TYPES                        ║
 ╚════════════════════════════════════════════════════════ */

/**
 * Configuration for HTTP logging behavior.
 */
export type HttpLoggerConfig = {
  includeHost?: boolean;
  detail?: LogDetail | 'none';
};
