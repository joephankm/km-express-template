import type { LoggerOptions as PinoLoggerOptions, TransportTargetOptions } from 'pino';
import type { LogLevel } from './logConstants';

export type LoggerOptions<Level extends string = LogLevel> = Pick<
  PinoLoggerOptions<Level>,
  'name' | 'level' | 'formatters'
> & {
  // Override customLevels, make it required.
  //   - Reason: For custom pretty, we need "customLevels" to be passed to `pino-pretty` transport.
  customLevels: Record<Level, number>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransportTarget<Options = Record<string, any>> = TransportTargetOptions<Options>;
