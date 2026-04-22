import type { RequestHandler } from 'express';

import authMeService from '#services/auth/authMeService';

export const getMe: RequestHandler = async (_req, res) => {
  const data = await authMeService.getMe();
  res.send({ status: 'OK', data });
};

export const updateMe: RequestHandler = async (req, res) => {
  const data = await authMeService.updateMe(req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const changePassword: RequestHandler = async (req, res) => {
  const data = await authMeService.changePassword(req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const deleteMe: RequestHandler = async (_req, res) => {
  const data = await authMeService.deleteMe();
  res.send({ status: 'OK', data });
};
