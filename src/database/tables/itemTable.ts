import { connection } from '#database/connection';

type ItemRecord = { id: string; name: string; categoryId: string };
type ItemChildRecord = { id: string; itemId: string; name: string };

const getAll = () => {
  return connection().from<ItemRecord>('items').select().findMany();
};

const getById = (id: string) => {
  return connection().from<ItemRecord>('items').select().where(id).findOne();
};

const create = (data: Record<string, unknown>) => {
  return connection().from<ItemRecord>('items').insert(data);
};

const update = (id: string, data: Record<string, unknown>) => {
  return connection().from<ItemRecord>('items').update(data).where(id).execute();
};

const remove = (id: string) => {
  return connection().from<ItemRecord>('items').delete().where(id).execute();
};

const getAllChildren = (itemId: string) => {
  return connection().from<ItemChildRecord>('itemChildren').select().where({ itemId }).findMany();
};

const getChildById = (itemId: string, id: string) => {
  return connection().from<ItemChildRecord>('itemChildren').select().where({ itemId, id }).findOne();
};

const createChild = (itemId: string, data: Record<string, unknown>) => {
  return connection()
    .from<ItemChildRecord>('itemChildren')
    .insert({ itemId, ...data });
};

const updateChild = (itemId: string, id: string, data: Record<string, unknown>) => {
  return connection().from<ItemChildRecord>('itemChildren').update(data).where({ itemId, id }).execute();
};

const removeChild = (itemId: string, id: string) => {
  return connection().from<ItemChildRecord>('itemChildren').delete().where({ itemId, id }).execute();
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getAllChildren,
  getChildById,
  createChild,
  updateChild,
  removeChild,
};
