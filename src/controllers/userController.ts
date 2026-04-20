import type { RequestHandler } from 'express';

export const listUsers: RequestHandler = (_req, res) => {
  res.send({ status: 'OK', data: [] });
};

export const getUser: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};

export const createUser: RequestHandler = (req, res) => {
  res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
};

export const updateUser: RequestHandler = (req, res) => {
  const body = req.body as Record<string, unknown>;
  res.send({ status: 'OK', data: { id: req.params.id, ...body } });
};

export const deleteUser: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};

export const getPublicUser: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};

export const listRoles: RequestHandler = (_req, res) => {
  res.send({ status: 'OK', data: [] });
};

export const getRole: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};

export const createRole: RequestHandler = (req, res) => {
  res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
};

export const updateRole: RequestHandler = (req, res) => {
  const body = req.body as Record<string, unknown>;
  res.send({ status: 'OK', data: { id: req.params.id, ...body } });
};

export const deleteRole: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};
