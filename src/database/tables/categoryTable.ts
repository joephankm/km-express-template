import { connection } from '#database/connection';

type CategoryRecord = { id: string; name: string };

const getAll = () => {
  return connection().from<CategoryRecord>('categories').select().findMany();
};

const getById = (id: string) => {
  return connection().from<CategoryRecord>('categories').select().where(id).findOne();
};

const create = (data: Record<string, unknown>) => {
  return connection().from<CategoryRecord>('categories').insert(data);
};

const update = (id: string, data: Record<string, unknown>) => {
  return connection().from<CategoryRecord>('categories').update(data).where(id).execute();
};

const remove = (id: string) => {
  return connection().from<CategoryRecord>('categories').delete().where(id).execute();
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
