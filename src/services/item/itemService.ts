import itemDb from '#database/tables/itemTable';

const listItems = () => {
  return itemDb.getAll();
};

const getItem = (id: string) => {
  return itemDb.getById(id);
};

const createItem = (payload: Record<string, unknown>) => {
  return itemDb.create(payload);
};

const updateItem = (id: string, payload: Record<string, unknown>) => {
  return itemDb.update(id, payload);
};

const deleteItem = (id: string) => {
  return itemDb.remove(id);
};

const listChildren = (itemId: string) => {
  return itemDb.getAllChildren(itemId);
};

const getChild = (itemId: string, id: string) => {
  return itemDb.getChildById(itemId, id);
};

const createChild = (itemId: string, payload: Record<string, unknown>) => {
  return itemDb.createChild(itemId, payload);
};

const updateChild = (itemId: string, id: string, payload: Record<string, unknown>) => {
  return itemDb.updateChild(itemId, id, payload);
};

const deleteChild = (itemId: string, id: string) => {
  return itemDb.removeChild(itemId, id);
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
