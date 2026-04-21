import type { RequestHandler } from 'express';
import { UnauthenticatedError } from '#errors';

const authenticate = (): RequestHandler => (req, _res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    next(new UnauthenticatedError());
    return;
  }

  next();
};

export default authenticate;
