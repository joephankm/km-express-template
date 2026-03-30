const env = {
  NODE_ENV: process.env.NODE_ENV! as 'production' | 'development' | 'test',
  APP_ENV: process.env.APP_ENV!,
  RUNTIME_ENV: process.env.PM2_JSON_PROCESSING ? 'PM2' : 'DEFAULT',
  PORT: +process.env.PORT!,
} as const;

export default env;
