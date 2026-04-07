import type { TransportTarget, LoggerOptions } from '../constants/loggerTypes';
import type { LogLevel } from '#logging/constants/logConstants';

export type LogFileOptions<Level extends string = LogLevel> = {
  path?: string;
  errorPath?: string;
  errorLevel?: Level;
};

export default <Level extends string = LogLevel>(
  { path, errorPath, errorLevel }: LogFileOptions<Level>,
  loggerOptions: LoggerOptions<Level>
): TransportTarget[] => {
  const targets: TransportTarget[] = [];

  if (path) {
    targets.push({
      target: 'pino/file',
      options: { destination: path, append: true, mkdir: true },
    });
  }

  if (errorPath) {
    if (!errorLevel) {
      if ('error' in loggerOptions.customLevels) {
        errorLevel = 'error' as Level;
      } else {
        throw new Error('`errorLevel` is required for non-standard custom levels');
      }
    }

    targets.push({
      target: 'pino/file',
      options: { destination: errorPath, append: true, mkdir: true },
      level: errorLevel,
    });
  }

  return targets;
};
