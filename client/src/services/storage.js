const tokenKey = 'x_auth_token';
const storage = {
  getToken: () => {
    return localStorage.getItem(tokenKey);
  },
  setToken: (tokenValue) => {
    localStorage.setItem(tokenKey, tokenValue);
  },
  removeToken: () => {
    localStorage.removeItem(tokenKey);
  },
};

export default storage;
