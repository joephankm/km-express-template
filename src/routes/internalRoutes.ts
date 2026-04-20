import env from '#configs/env';

// ERRORS
import { BadRequestError } from '#errors';

import { router } from './routers';
import * as system from '#controllers/systemController';

router
  .get('/', system.getStatus) // GET /
  .get('/info', system.getInfo); // GET /info

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
