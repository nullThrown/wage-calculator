import axios from 'config/axios';
import { connection_error } from 'constants/api/error';

export const registerUser = async (user) => {
  try {
    const { data } = await axios.post('/auth/register', user);
    return data;
  } catch (err) {
    const errorMsg = !err.response ? connection_error : err.response.data.type;
    return Promise.reject(new Error(errorMsg));
  }
};

export const loginUser = async (user) => {
  try {
    const { data } = await axios.post('/auth/login', user);
    return data;
  } catch (err) {
    const errorMsg = !err.response ? connection_error : err.response.data.msg;
    return Promise.reject(new Error(errorMsg));
  }
};
