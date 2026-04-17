import { Router } from 'express';

export const router = Router();

export const publicRouter = Router();
router.use('/public', publicRouter);

export const privateRouter = Router();
router.use('/', privateRouter);
