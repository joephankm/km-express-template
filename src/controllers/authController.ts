import type { RequestHandler } from 'express';

import authService from '#services/auth/authService';

export const register: RequestHandler = async (req, res) => {
  const data = await authService.register(req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const login: RequestHandler = async (req, res) => {
  const data = await authService.login(req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const logout: RequestHandler = async (_req, res) => {
  const data = await authService.logout();
  res.send({ status: 'OK', data });
};

export const refresh: RequestHandler = async (req, res) => {
  const data = await authService.refresh(req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};
