import { connection } from '#database/connection';

type UserRecord = { id: string; name: string; email: string; roleId: string };

const getAll = () => {
  return connection().from<UserRecord>('users').select().findMany();
};

const getById = (id: string) => {
  return connection().from<UserRecord>('users').select().where(id).findOne();
};

const create = (data: Record<string, unknown>) => {
  return connection().from<UserRecord>('users').insert(data);
};

const update = (id: string, data: Record<string, unknown>) => {
  return connection().from<UserRecord>('users').update(data).where(id).execute();
};

const remove = (id: string) => {
  return connection().from<UserRecord>('users').delete().where(id).execute();
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
