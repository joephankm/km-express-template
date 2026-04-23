import settingDb from '#database/tables/settingTable';

const listSettings = () => {
  return settingDb.getAll();
};

const getSetting = (id: string) => {
  return settingDb.getById(id);
};

const createSetting = (payload: Record<string, unknown>) => {
  return settingDb.create(payload);
};

const updateSetting = (id: string, payload: Record<string, unknown>) => {
  return settingDb.update(id, payload);
};

const deleteSetting = (id: string) => {
  return settingDb.remove(id);
};

export default {
  listSettings,
  getSetting,
  createSetting,
  updateSetting,
  deleteSetting,
};
