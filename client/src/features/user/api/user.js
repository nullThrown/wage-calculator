import axios from 'config/axios';
import { connection_error } from 'constants/api/error';

export const getUser = async () => {
  try {
    const { data } = await axios.get('/user/me');
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const updateUser = async (user) => {
  try {
    const res = await axios.put('/user/me/update', user);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
