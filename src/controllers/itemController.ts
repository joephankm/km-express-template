import type { RequestHandler } from 'express';

import categoryService from '#services/item/categoryService';
import itemService from '#services/item/itemService';

export const listCategories: RequestHandler = async (_req, res) => {
  const data = await categoryService.listCategories();
  res.send({ status: 'OK', data });
};

export const getCategory: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await categoryService.getCategory(id);
  res.send({ status: 'OK', data });
};

export const createCategory: RequestHandler = async (req, res) => {
  const data = await categoryService.createCategory(req.body as Record<string, unknown>);
  res.status(201).send({ status: 'OK', data });
};

export const updateCategory: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await categoryService.updateCategory(id, req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await categoryService.deleteCategory(id);
  res.send({ status: 'OK', data });
};

export const listItems: RequestHandler = async (_req, res) => {
  const data = await itemService.listItems();
  res.send({ status: 'OK', data });
};

export const getItem: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await itemService.getItem(id);
  res.send({ status: 'OK', data });
};

export const createItem: RequestHandler = async (req, res) => {
  const data = await itemService.createItem(req.body as Record<string, unknown>);
  res.status(201).send({ status: 'OK', data });
};

export const updateItem: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await itemService.updateItem(id, req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const deleteItem: RequestHandler = async (req, res) => {
  const { id } = req.params as Record<string, string>;
  const data = await itemService.deleteItem(id);
  res.send({ status: 'OK', data });
};

export const listChildren: RequestHandler = async (req, res) => {
  const { itemId } = req.params as Record<string, string>;
  const data = await itemService.listChildren(itemId);
  res.send({ status: 'OK', data });
};

export const getChild: RequestHandler = async (req, res) => {
  const { itemId, id } = req.params as Record<string, string>;
  const data = await itemService.getChild(itemId, id);
  res.send({ status: 'OK', data });
};

export const createChild: RequestHandler = async (req, res) => {
  const { itemId } = req.params as Record<string, string>;
  const data = await itemService.createChild(itemId, req.body as Record<string, unknown>);
  res.status(201).send({ status: 'OK', data });
};

export const updateChild: RequestHandler = async (req, res) => {
  const { itemId, id } = req.params as Record<string, string>;
  const data = await itemService.updateChild(itemId, id, req.body as Record<string, unknown>);
  res.send({ status: 'OK', data });
};

export const deleteChild: RequestHandler = async (req, res) => {
  const { itemId, id } = req.params as Record<string, string>;
  const data = await itemService.deleteChild(itemId, id);
  res.send({ status: 'OK', data });
};
