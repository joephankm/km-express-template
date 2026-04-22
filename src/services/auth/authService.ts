import { NotImplementedError } from '#errors';

const register = (_payload: Record<string, unknown>) => {
  return Promise.reject(new NotImplementedError());
};

const login = (_payload: Record<string, unknown>) => {
  return Promise.reject(new NotImplementedError());
};

const logout = () => {
  return Promise.reject(new NotImplementedError());
};

const refresh = (_payload: Record<string, unknown>) => {
  return Promise.reject(new NotImplementedError());
};

export default {
  register,
  login,
  logout,
  refresh,
};
