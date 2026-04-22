import type { RequestHandler } from 'express';

import settingService from '#services/setting/settingService';

export const listSettings: RequestHandler = async (_req, res) => {
  const data = await settingService.listSettings();
  res.send({ status: 'OK', data });
};

export const getSetting: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await settingService.getSetting(id);
  res.send({ status: 'OK', data });
};

export const createSetting: RequestHandler = async (req, res) => {
  const data = await settingService.createSetting(req.body as Record<string, unknown>);
  res.status(201).send({ status: 'OK', data });
};

export const updateSetting: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await settingService.updateSetting(id, req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const deleteSetting: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await settingService.deleteSetting(id);
  res.send({ status: 'OK', data });
};
