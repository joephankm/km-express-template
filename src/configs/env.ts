import type { LogFormat, LogDetail } from '#logging/constants/loggingTypes';

const env = {
  NODE_ENV: process.env.NODE_ENV! as 'production' | 'development' | 'test',
  APP_ENV: process.env.APP_ENV!,
  RUNTIME_ENV: process.env.PM2_JSON_PROCESSING ? 'PM2' : 'DEFAULT',
  PORT: +process.env.PORT!,
  CORS_ORIGIN: process.env.CORS_ORIGIN! || '*',
  LOG_LEVEL: process.env.LOG_LEVEL! as 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent',
  LOG_FORMAT: process.env.LOG_FORMAT! as LogFormat,
  HTTP_LOG_DETAIL: process.env.HTTP_LOG_DETAIL! as LogDetail,
  LOG_FILE_PATH: process.env.LOG_FILE_PATH ?? '',
  LOG_FILE_ERROR_PATH: process.env.LOG_FILE_ERROR_PATH ?? '',
} as const;

export default env;
