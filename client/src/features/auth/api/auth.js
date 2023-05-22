import axios from 'config/axios';

// error returns might require a promise reject
export const registerUser = async (user) => {
  try {
    const res = await axios.post('/auth/register', user);
    return res;
  } catch (err) {
    // console.log(err.response);
    const errorMsg = !err.response ? 'connection_error' : err.response.data.msg;
    return Promise.reject(new Error(errorMsg));
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post('/auth/login', user);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// place in user feature
export const getUser = async () => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (err) {
    console.log(err);
  }
};
