const listRoles = () => {
  return Promise.resolve([]);
};

const getRole = (id: string) => {
  return Promise.resolve({ id });
};

const createRole = (payload: Record<string, unknown>) => {
  return Promise.resolve(payload);
};

const updateRole = (id: string, payload: Record<string, unknown>) => {
  return Promise.resolve({ id, ...payload });
};

const deleteRole = (id: string) => {
  return Promise.resolve({ id });
};

export default {
  listRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
