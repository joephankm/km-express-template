import type { Colorette } from 'colorette';

/**
 * Controls how logs are formatted and displayed:
 *   - `raw`     — structured JSON output (default, for production)
 *   - `verbose` — human-readable plain text
 *   - `pretty`  — colorized and prettified output for development
 *
 * Used with `pino-pretty` for console log formatting:
 *   - `raw`     — disabled (no pretty printing)
 *   - `verbose` — enabled with basic options
 *   - `pretty`  — enabled with colorized, enhanced formatting
 *
 * @category __Env Value__
 */
export type LogFormat = 'raw' | 'verbose' | 'pretty';

/**
 * Controls the level of detail included in logs.
 *
 * This is an abstract setting. The actual content and fields logged are defined by each logging
 * implementation (e.g., HTTP, database).
 *
 * Each level represents the amount of information to include:
 *   - `simple` — minimal, essential information (optimized for performance)
 *   - `middle` — moderate detail with additional context (useful for monitoring and issue tracking)
 *   - `full`   — complete detail with all available data (for debugging only)
 *
 * @category __Env Value__
 */
export type LogDetail = 'simple' | 'middle' | 'full';

/**
 * Represents available text style names for terminal output.
 *
 * This project uses `colorette` to apply styling to console text, including:
 *   - Colors (e.g., `red`, `blue`, `green`, `yellow`)
 *   - Background colors (e.g., `bgRed`, `bgBlue`, `bgGreen`, `bgYellow`)
 *   - Text styles (e.g., `bold`, `italic`, `underline`, `strikethrough`)
 */
export type TextStyle = keyof Colorette;

/**
 * Maps log levels to their corresponding text styles.
 *
 * This is used in `customColors` of `pino-pretty` to define how each log level is visually
 * represented in the terminal (e.g. color, bold, etc.).
 *
 * @category __Util Type__
 * @typeParam Level - A union of log level names
 */
export type LevelColors<Level extends string> = Record<Level, TextStyle>;

/**
 * Maps log levels to their numeric values.
 *
 * This is used in `customLevels` of `pino` and `pino-pretty` to define the priority of each log
 * level.
 *
 * @category __Util Type__
 * @typeParam Level - A union of log level names
 */
export type Levels<Level extends string> = Record<Level, number>;

/**
 * Base log object structure emitted by `pino`.
 *
 * @category __Extracted Type__
 */
export type BaseLogObj = {
  /**
   * Logger name or context identifier.
   */
  name?: string;

  /**
   * Log message describing the event.
   */
  msg: string;

  /**
   * Numeric log level representing severity.
   */
  level: number;

  /**
   * Timestamp of the log in milliseconds since epoch.
   */
  time: number;

  /**
   * Process ID of the running application.
   */
  pid: number;

  /**
   * Hostname of the machine where the log was generated.
   */
  hostname: string;
};
