import type { LoggerConfig, LoggerPrettyConfig, LoggerFileConfig } from '#logging/constants/logConstants';
import { HttpLoggerConfig } from '#logging/constants/httpConstants';
import env from './env';

const loggerConfig: LoggerConfig & {
  pretty: LoggerPrettyConfig;
  http: HttpLoggerConfig;
  file: LoggerFileConfig;
} = {
  level: env.LOG_LEVEL ?? 'info',
  format: env.LOG_FORMAT ?? 'raw',
  pretty: {
    /** @see {import('#logging/constants/loggingTypes').BaseLogObj} */
    ignore: ['pid', 'hostname'],
    timeSimpleFormat: env.NODE_ENV === 'development',
  },
  http: {
    includeHost: false,
    detail: env.HTTP_LOG_DETAIL ?? 'simple',
  },
  file: {
    path: env.LOG_FILE_PATH || undefined,
    errorPath: env.LOG_FILE_ERROR_PATH || undefined,
  },
};

export default loggerConfig;
