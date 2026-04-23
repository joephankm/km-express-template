import { connection } from '#database/connection';

type SettingRecord = { id: string; key: string; value: string };

const getAll = () => {
  return connection().from<SettingRecord>('settings').select().findMany();
};

const getById = (id: string) => {
  return connection().from<SettingRecord>('settings').select().where(id).findOne();
};

const create = (data: Record<string, unknown>) => {
  return connection().from<SettingRecord>('settings').insert(data);
};

const update = (id: string, data: Record<string, unknown>) => {
  return connection().from<SettingRecord>('settings').update(data).where(id).execute();
};

const remove = (id: string) => {
  return connection().from<SettingRecord>('settings').delete().where(id).execute();
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
