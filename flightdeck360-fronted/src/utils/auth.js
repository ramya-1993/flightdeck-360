export const saveAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
};

export const getToken = () => localStorage.getItem('token');
