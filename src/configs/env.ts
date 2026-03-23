const env = {
  NODE_ENV: process.env.NODE_ENV! as 'production' | 'development' | 'test',
  APP_ENV: process.env.APP_ENV!,
  PORT: +process.env.PORT!,
} as const;

export default env;
