import { Router } from 'express';
import authenticate from '#middlewares/authenticate';

export const router = Router();

export const publicRouter = Router();
router.use('/public', publicRouter);

export const privateRouter = Router();
privateRouter.use(authenticate());
router.use('/', privateRouter);
