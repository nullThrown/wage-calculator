import axios from 'config/axios';
import { connection_error } from 'constants/api/error';

export const getUser = async () => {
  try {
    const res = await axios.get('/user/me');
    return res;
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
export const addCompany = async (company) => {
  try {
    const res = await axios.post('/user/company/create', company);
    return res;
  } catch (err) {
    const errorMsg = !err.response ? connection_error : err.response.data.msg;
    return Promise.reject(new Error(errorMsg));
  }
};
export const updateCompany = async (company) => {
  try {
    const res = await axios.put('/user/company/update', company);
    return res;
  } catch (err) {
    const errorMsg = !err.response ? 'connection_error' : err.response.data.msg;
    return Promise.reject(new Error(errorMsg));
  }
};
export const deleteCompany = async (_id) => {
  try {
    const res = await axios.delete(`/user/company/delete/${_id}`);
    return res;
  } catch (err) {
    const errorMsg = !err.response ? 'connection_error' : err.response.data.msg;
    return Promise.reject(new Error(errorMsg));
  }
};
export const setCompanyRemovedStatus = async (body) => {
  try {
    const res = await axios.put('/user/company/remove/set', body);
    return res;
  } catch (err) {
    const errorMsg = !err.response ? 'connection_error' : err.response.data.msg;
    return Promise.reject(new Error(errorMsg));
  }
};
