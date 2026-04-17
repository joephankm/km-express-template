import type { RequestHandler } from 'express';
import { NotImplementedError } from '#errors';

export const notImplementedRequest: RequestHandler = (_req, _res, next) => {
  next(new NotImplementedError());
};
