import os from 'os';
import process from 'process';

// ERRORS
import { BadRequestError } from '#errors';

// CONSTANTS
import env from '#configs/env';

import { router } from './routers';

router
  .get('/', (_req, res) => {
    // GET /

    res.send({ status: 'OK', message: `Server is running on "${env.APP_ENV.toUpperCase()}"` });
  })
  .get('/info', (_req, res) => {
    // GET /info

    res.send({
      status: 'OK',
      data: {
        env: env.APP_ENV,
        node: process.version,
        platform: os.platform(),
        uptime: Math.floor(process.uptime()),
      },
    });
  });

if (env.NODE_ENV === 'development') {
  router
    .get('/dev', (_req, res) => {
      // GET /dev

      const testingData = {
        foo: 'bar',
      };

      res.send({ status: 'OK', message: 'DEV testing', data: testingData });
    })
    .get('/dev/error', (_req, _res) => {
      // GET /dev/error

      throw new BadRequestError('DEV testing error');
    });
}
