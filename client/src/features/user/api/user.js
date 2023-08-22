import axios from 'config/axios';
import { connection_error } from 'constants/api/error';

export const getUser = async () => {
  try {
    const { data } = await axios.get('/user/me');
    return data;
  } catch (err) {
    const errorMsg = !err.response ? connection_error : err.response.data.msg;
    return Promise.reject(new Error(errorMsg));
  }
};
export const updatePersonal = async (personalInfo) => {
  try {
    const res = await axios.put('/user/me/update/personal', personalInfo);
    return res;
  } catch (err) {
    console.log(err.response);
    const errorMsg = !err.response ? connection_error : err.response.data.type;
    return Promise.reject(new Error(errorMsg));
  }
};

export const updatePassword = async (passwordInfo) => {
  try {
    const res = await axios.put('/user/me/update/password', passwordInfo);
    return res;
  } catch (err) {
    console.log(err.response);
    const errorMsg = !err.response ? connection_error : err.response.data.type;
    return Promise.reject(new Error(errorMsg));
  }
};
export const updateCompanyActiveStatus = async (isActive) => {
  try {
    const { data } = await axios.put(
      '/user/company/update/active-status',
      isActive
    );
    return data;
  } catch (err) {
    console.log(err.response);
    const errorMsg = !err.response ? connection_error : err.response.data.type;
    return Promise.reject(new Error(errorMsg));
  }
};
