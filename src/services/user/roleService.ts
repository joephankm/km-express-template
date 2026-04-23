import roleDb from '#database/tables/roleTable';

const listRoles = () => {
  return roleDb.getAll();
};

const getRole = (id: string) => {
  return roleDb.getById(id);
};

const createRole = (payload: Record<string, unknown>) => {
  return roleDb.create(payload);
};

const updateRole = (id: string, payload: Record<string, unknown>) => {
  return roleDb.update(id, payload);
};

const deleteRole = (id: string) => {
  return roleDb.remove(id);
};

export default {
  listRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
