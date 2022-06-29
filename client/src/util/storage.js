const tokenKey = 'x_auth_token';
// does tokenValue need to be parsed & stringified?
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
