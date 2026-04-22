const listSettings = () => {
  return Promise.resolve([]);
};

const getSetting = (id: string) => {
  return Promise.resolve({ id });
};

const createSetting = (payload: Record<string, unknown>) => {
  return Promise.resolve(payload);
};

const updateSetting = (id: string, payload: Record<string, unknown>) => {
  return Promise.resolve({ id, ...payload });
};

const deleteSetting = (id: string) => {
  return Promise.resolve({ id });
};

export default {
  listSettings,
  getSetting,
  createSetting,
  updateSetting,
  deleteSetting,
};
