import categoryDb from '#database/tables/categoryTable';

const listCategories = () => {
  return categoryDb.getAll();
};

const getCategory = (id: string) => {
  return categoryDb.getById(id);
};

const createCategory = (payload: Record<string, unknown>) => {
  return categoryDb.create(payload);
};

const updateCategory = (id: string, payload: Record<string, unknown>) => {
  return categoryDb.update(id, payload);
};

const deleteCategory = (id: string) => {
  return categoryDb.remove(id);
};

export default {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
