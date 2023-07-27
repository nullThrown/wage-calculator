import axios from 'config/axios';
import { connection_error } from 'constants/api/error';

export const createEntry = async (entry) => {
  try {
    const shiftTimestamp = entry.shiftDate.getTime();
    const { data } = await axios.post('/entries/create', {
      ...entry,
      shiftDate: shiftTimestamp,
    });
    return data;
  } catch (err) {
    const errorMsg = !err.response ? connection_error : err.response.data.msg;
    return Promise.reject(new Error(errorMsg));
  }
};

export const updateEntry = async (entry) => {
  try {
    const { data } = await axios.post('/entries/update', entry);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const getAllEntries = async (filter) => {
  try {
    const { data } = await axios.get(`/entries/${filter}`);
    return data;
  } catch (err) {
    const errorMsg = !err.response ? connection_error : err.response.data.msg;
    return Promise.reject(new Error(errorMsg));
  }
};
