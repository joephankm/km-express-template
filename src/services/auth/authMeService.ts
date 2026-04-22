import { NotImplementedError } from '#errors';

const getMe = () => {
  return Promise.reject(new NotImplementedError());
};

const updateMe = (_payload: Record<string, unknown>) => {
  return Promise.reject(new NotImplementedError());
};

const changePassword = (_payload: Record<string, unknown>) => {
  return Promise.reject(new NotImplementedError());
};

const deleteMe = () => {
  return Promise.reject(new NotImplementedError());
};

export default {
  getMe,
  updateMe,
  changePassword,
  deleteMe,
};
