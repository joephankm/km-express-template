import os from 'os';
import process from 'process';

import type { RequestHandler } from 'express';

import env from '#configs/env';

export const getStatus: RequestHandler = (_req, res) => {
  res.send({ status: 'OK', message: `Server is running on "${env.APP_ENV.toUpperCase()}"` });
};

export const getInfo: RequestHandler = (_req, res) => {
  res.send({
    status: 'OK',
    data: {
      env: env.APP_ENV,
      node: process.version,
      platform: os.platform(),
      uptime: Math.floor(process.uptime()),
    },
  });
};
