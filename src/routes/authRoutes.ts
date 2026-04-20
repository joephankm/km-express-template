import { Router } from 'express';

import { router } from './routers';
import * as auth from '#controllers/authController';
import * as authMe from '#controllers/authMeController';

const authRoutes = Router();
router.use('/auth', authRoutes);

authRoutes
  .post('/register', auth.register) // POST /auth/register
  .post('/login', auth.login) // POST /auth/login
  .post('/logout', auth.logout) // POST /auth/logout
  .post('/refresh', auth.refresh); // POST /auth/refresh

const meRoutes = Router();
router.use('/me', meRoutes);

meRoutes
  .get('/', authMe.getMe) // GET /auth/me
  .patch('/', authMe.updateMe) // PATCH /auth/me
  .post('/change-password', authMe.changePassword) // PATCH /auth/me/password
  .delete('/', authMe.deleteMe); // DELETE /auth/me
