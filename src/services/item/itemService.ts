const listItems = () => {
  return Promise.resolve([]);
};

const getItem = (id: string) => {
  return Promise.resolve({ id });
};

const createItem = (payload: Record<string, unknown>) => {
  return Promise.resolve(payload);
};

const updateItem = (id: string, payload: Record<string, unknown>) => {
  return Promise.resolve({ id, ...payload });
};

const deleteItem = (id: string) => {
  return Promise.resolve({ id });
};

const listChildren = (itemId: string) => {
  return Promise.resolve({ itemId, children: [] });
};

const getChild = (itemId: string, id: string) => {
  return Promise.resolve({ itemId, id });
};

const createChild = (itemId: string, payload: Record<string, unknown>) => {
  return Promise.resolve({ itemId, ...payload });
};

const updateChild = (itemId: string, id: string, payload: Record<string, unknown>) => {
  return Promise.resolve({ itemId, id, ...payload });
};

const deleteChild = (itemId: string, id: string) => {
  return Promise.resolve({ itemId, id });
};

export default {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  listChildren,
  getChild,
  createChild,
  updateChild,
  deleteChild,
};
