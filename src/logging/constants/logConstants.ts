import { bold, magenta, magentaBright } from 'colorette';
import type { LevelColors, LogFormat, Levels, BaseLogObj } from './loggingTypes';

/* ════════════════════════════════════════════════════════╗
 ║                       LOG CONFIG                        ║
 ╚════════════════════════════════════════════════════════ */

/**
 * Standard log levels used across the application.
 *
 * Defines the severity of log messages, from lowest to highest:
 *   - `trace` — very detailed diagnostics (fine-grained debugging)
 *   - `debug` — diagnostic information for debugging and issue investigation (including production)
 *   - `info`  — normal application flow and key events
 *   - `warn`  — unexpected situations that do not break execution
 *   - `error` — failures that affect a specific operation
 *   - `fatal` — critical failures that may stop the application
 *
 * @category __Env Value__
 */
export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Define log levels.
 */
export const LOG_LEVELS: Levels<LogLevel> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

/**
 * Define color for each log level (used by `pino-pretty`).
 */
export const LOG_COLORS: LevelColors<LogLevel> = {
  trace: 'gray', // default: gray
  debug: 'bgBlue', // default: blue
  info: 'blue', // default: green
  warn: 'yellow', // default: yellow
  error: 'red', // default: red
  fatal: 'bgRed', // default: bgRed
};

/**
 * Primary log object structure.
 *
 * @category __Extracted Type__
 */
export type LogObj = BaseLogObj;

/* ════════════════════════════════════════════════════════╗
 ║                      CATEGORIES                         ║
 ╚════════════════════════════════════════════════════════ */

/**
 * Identifies the source or category of logs.
 *
 * Used to group logs by context (e.g. server lifecycle, HTTP requests) for easier filtering and
 * readability.
 */
export type LogName =
  | 'server' // process lifecycle (startup, shutdown, configuration)
  | 'http'; // inbound HTTP requests/responses (via `pino-http`)

/**
 * Define displaying labels for each log name (used in `pino-pretty`).
 *
 * Used to format log prefixes in the console, typically with styling to improve readability.
 */
export const NAME_LABELS: Record<LogName, string> = {
  server: bold(magentaBright('SERVER')),
  http: bold(magenta('HTTP')),
};

/* ════════════════════════════════════════════════════════╗
 ║                     PUBLIC TYPES                        ║
 ╚════════════════════════════════════════════════════════ */

/**
 * Configuration for file-based log output.
 */
export type LoggerFileConfig = {
  /**
   * Absolute or relative path to write all logs.
   * Leave empty to disable.
   */
  path?: string;

  /**
   * Absolute or relative path to write only `error`-level and above logs.
   * Leave empty to disable.
   */
  errorPath?: string;
};

/**
 * Main config for application logging.
 */
export type LoggerConfig = {
  /**
   * Minimum log level to output.
   * Logs below this level will be ignored.
   * Use `'silent'` to disable logging completely.
   */
  level: LogLevel | 'silent';

  /**
   * Log output format.
   *
   * @see LogFormat
   */
  format: LogFormat;
};

/**
 * Config for pretty (console) log output.
 *
 * Used to customize how logs are rendered when `pino-pretty` is enabled.
 */
export type LoggerPrettyConfig = {
  /**
   * List of common log fields to omit from output.
   */
  ignore?: string[];

  /**
   * Use simplified time format (e.g. HH:mm:ss) instead of full timestamp.
   */
  timeSimpleFormat?: boolean;
};
