import pino, { LoggerOptions as PinoLoggerOptions } from 'pino';
import {
  type LogName,
  type LogLevel,
  type LoggerFileConfig,
  LOG_COLORS,
  NAME_LABELS,
  LOG_LEVELS,
} from './constants/logConstants';

// TRANSPORTS
import prettyTransport from './transports/prettyTransport';
import fileTransport from './transports/fileTransport';

// CONSTANTS
import config from '#configs/loggerConfig';
import type { PrettierOptions } from './constants/prettierTypes';
import type { LoggerOptions, TransportTarget } from './constants/loggerTypes';

type CreateLoggerOptions<Level extends string = LogLevel> = LoggerOptions<Level> & {
  ignore?: string[];
  customColors: PrettierOptions['customColors'];
  prettyFormat?: string;
  /** When provided, appends file transport targets for this logger. */
  fileConfig?: LoggerFileConfig;
};

/**
 * Application-wide logger.
 *
 * - Development: pretty-printed, human-readable output via pino-pretty
 * - Production:  structured JSON, ready for log aggregators (Datadog, Loki, etc.)
 *
 * Usage:
 *   import { logger } from '../config/logger';
 *   logger.info('Server started');
 *   logger.error({ err }, 'Something went wrong');
 *
 * @see {@link https://getpino.io/#/ Pino Docs}
 */
export const createLogger = <
  Level extends string = LogLevel,
  Format extends Record<string, unknown> = Record<string, unknown>,
>(
  { ignore = [], customColors, prettyFormat, fileConfig, ...loggerOptions }: CreateLoggerOptions<Level>,
  formatParams?: Format
) => {
  loggerOptions.level ??= config.level as Level;

  const transportTargets: TransportTarget[] = [];

  if (config.format && config.format !== 'raw') {
    transportTargets.push(
      prettyTransport(
        {
          // >> Auto guess the pretty format name if not provided
          formatFile: prettyFormat ?? `${loggerOptions.name ?? 'log'}Format`,
          nameLabels: NAME_LABELS,
          timeSimpleFormat: config.pretty?.timeSimpleFormat,
          logFormat: config.format,
          customColors,
          ignore: config.pretty?.ignore ? [...ignore, ...config.pretty.ignore] : ignore,
          formatParams,
        },
        loggerOptions
      )!
    );
  }

  if (fileConfig?.path || fileConfig?.errorPath) {
    transportTargets.push(
      ...fileTransport(
        {
          path: fileConfig?.path,
          errorPath: fileConfig?.errorPath,
          // errorLevel: fileConfig?.errorLevel,
        },
        loggerOptions
      )
    );
  }

  return pino<Level>({
    ...loggerOptions,
    useOnlyCustomLevels: !!loggerOptions.customLevels,
    ...genTransportProps(transportTargets),
  });
};

const genTransportProps = (transports: TransportTarget[]): Pick<PinoLoggerOptions, 'transport'> => {
  if (transports.length > 1) return { transport: { targets: transports } };
  if (transports.length === 1) return { transport: transports[0] };

  return {};
};

const logger = createLogger({
  customLevels: LOG_LEVELS,
  customColors: LOG_COLORS,
  fileConfig: config.file,
});

/**
 * Create a child logger bound to a specific context label.
 * Every log line it emits will include `"context": "<label>"`.
 *
 * Usage:
 *   const log = createLogger('database');
 *   log.info({ query }, 'User lookup');
 *   // -> { "context": "database", "msg": "User lookup", "query": "..." }
 */
const createStandardLogger = (name: LogName) => logger.child<LogLevel>({ name });

// ── Pre-built common loggers — import these directly in each layer ──────────────────

/** Process lifecycle — startup, shutdown, config loading */
export const serverLogger = createStandardLogger('server');

export default logger;
