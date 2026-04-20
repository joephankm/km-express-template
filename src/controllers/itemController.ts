import type { RequestHandler } from 'express';

export const listCategories: RequestHandler = (_req, res) => {
  res.send({ status: 'OK', data: [] });
};

export const getCategory: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};

export const createCategory: RequestHandler = (req, res) => {
  res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
};

export const updateCategory: RequestHandler = (req, res) => {
  const body = req.body as Record<string, unknown>;
  res.send({ status: 'OK', data: { id: req.params.id, ...body } });
};

export const deleteCategory: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};

export const listItems: RequestHandler = (_req, res) => {
  res.send({ status: 'OK', data: [] });
};

export const getItem: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};

export const createItem: RequestHandler = (req, res) => {
  res.status(201).send({ status: 'OK', data: req.body as Record<string, unknown> });
};

export const updateItem: RequestHandler = (req, res) => {
  const body = req.body as Record<string, unknown>;
  res.send({ status: 'OK', data: { id: req.params.id, ...body } });
};

export const deleteItem: RequestHandler = (req, res) => {
  res.send({ status: 'OK', data: { id: req.params.id } });
};

export const listChildren: RequestHandler = (req, res) => {
  const { itemId } = req.params as Record<string, string>;
  res.send({ status: 'OK', data: { itemId, children: [] } });
};

export const getChild: RequestHandler = (req, res) => {
  const { itemId, id } = req.params as Record<string, string>;
  res.send({ status: 'OK', data: { itemId, id } });
};

export const createChild: RequestHandler = (req, res) => {
  const { itemId } = req.params as Record<string, string>;
  res.status(201).send({ status: 'OK', data: { itemId, ...(req.body as Record<string, unknown>) } });
};

export const updateChild: RequestHandler = (req, res) => {
  const { itemId, id } = req.params as Record<string, string>;
  const body = req.body as Record<string, unknown>;
  res.send({ status: 'OK', data: { itemId, id, ...body } });
};

export const deleteChild: RequestHandler = (req, res) => {
  const { itemId, id } = req.params as Record<string, string>;
  res.send({ status: 'OK', data: { itemId, id } });
};
