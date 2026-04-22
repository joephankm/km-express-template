import type { RequestHandler } from 'express';

import userService from '#services/user/userService';
import roleService from '#services/user/roleService';

export const listUsers: RequestHandler = async (_req, res) => {
  const data = await userService.listUsers();
  res.send({ status: 'OK', data });
};

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await userService.getUser(id);
  res.send({ status: 'OK', data });
};

export const createUser: RequestHandler = async (req, res) => {
  const data = await userService.createUser(req.body as Record<string, unknown>);
  res.status(201).send({ status: 'OK', data });
};

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await userService.updateUser(id, req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await userService.deleteUser(id);
  res.send({ status: 'OK', data });
};

export const getPublicUser: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await userService.getPublicUser(id);
  res.send({ status: 'OK', data });
};

export const listRoles: RequestHandler = async (_req, res) => {
  const data = await roleService.listRoles();
  res.send({ status: 'OK', data });
};

export const getRole: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await roleService.getRole(id);
  res.send({ status: 'OK', data });
};

export const createRole: RequestHandler = async (req, res) => {
  const data = await roleService.createRole(req.body as Record<string, unknown>);
  res.status(201).send({ status: 'OK', data });
};

export const updateRole: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await roleService.updateRole(id, req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const deleteRole: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await roleService.deleteRole(id);
  res.send({ status: 'OK', data });
};
