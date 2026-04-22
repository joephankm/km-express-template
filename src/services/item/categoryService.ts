const listCategories = () => {
  return Promise.resolve([]);
};

const getCategory = (id: string) => {
  return Promise.resolve({ id });
};

const createCategory = (payload: Record<string, unknown>) => {
  return Promise.resolve(payload);
};

const updateCategory = (id: string, payload: Record<string, unknown>) => {
  return Promise.resolve({ id, ...payload });
};

const deleteCategory = (id: string) => {
  return Promise.resolve({ id });
};

export default {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
