import type { RequestHandler } from 'express';

export const listSettings: RequestHandler = (_req, res) => {
  res.send({ status: 'OK', data: [] });
};

export const getSetting: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};

export const createSetting: RequestHandler = (req, res) => {
  res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
};

export const updateSetting: RequestHandler = (req, res) => {
  const body = req.body as Record<string, unknown>;
  res.send({ status: 'OK', data: { id: req.params.id, ...body } });
};

export const deleteSetting: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};
