import { connection } from '#database/connection';

type RoleRecord = { id: string; name: string };

const getAll = () => {
  return connection().from<RoleRecord>('roles').select().findMany();
};

const getById = (id: string) => {
  return connection().from<RoleRecord>('roles').select().where(id).findOne();
};

const create = (data: Record<string, unknown>) => {
  return connection().from<RoleRecord>('roles').insert(data);
};

const update = (id: string, data: Record<string, unknown>) => {
  return connection().from<RoleRecord>('roles').update(data).where(id).execute();
};

const remove = (id: string) => {
  return connection().from<RoleRecord>('roles').delete().where(id).execute();
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
