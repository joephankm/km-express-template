import userDb from '#database/tables/userTable';

const listUsers = () => {
  return userDb.getAll();
};

const getUser = (id: string) => {
  return userDb.getById(id);
};

const createUser = (payload: Record<string, unknown>) => {
  return userDb.create(payload);
};

const updateUser = (id: string, payload: Record<string, unknown>) => {
  return userDb.update(id, payload);
};

const deleteUser = (id: string) => {
  return userDb.remove(id);
};

const getPublicUser = (id: string) => {
  return userDb.getById(id);
};

export default {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getPublicUser,
};
