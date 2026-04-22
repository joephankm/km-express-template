const listUsers = () => {
  return Promise.resolve([]);
};

const getUser = (id: string) => {
  return Promise.resolve({ id });
};

const createUser = (payload: Record<string, unknown>) => {
  return Promise.resolve(payload);
};

const updateUser = (id: string, payload: Record<string, unknown>) => {
  return Promise.resolve({ id, ...payload });
};

const deleteUser = (id: string) => {
  return Promise.resolve({ id });
};

const getPublicUser = (id: string) => {
  return Promise.resolve({ id });
};

export default {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getPublicUser,
};
