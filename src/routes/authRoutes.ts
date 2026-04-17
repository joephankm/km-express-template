import { Router } from 'express';
import { notImplementedRequest } from '#helpers/requestHandlers';

import { router } from './routers';

const authRoutes = Router();
router.use('/auth', authRoutes);

authRoutes
  .post('/register', notImplementedRequest) // POST /auth/register
  .post('/login', notImplementedRequest) // POST /auth/login
  .post('/logout', notImplementedRequest) // POST /auth/logout
  .post('/refresh', notImplementedRequest); // POST /auth/refresh

const meRoutes = Router();
router.use('/me', meRoutes);

meRoutes
  .get('/', notImplementedRequest) // GET /me
  .patch('/', notImplementedRequest) // PATCH /me
  .post('/change-password', notImplementedRequest) // PATCH /me/change-password
  .delete('/', notImplementedRequest); // DELETE /me
