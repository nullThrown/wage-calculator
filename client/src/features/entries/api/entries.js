import axios from 'config/axios';

export const createEntry = async (entry) => {
  try {
    const res = await axios.post('/entries/create', entry);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updateEntry = async (entry) => {
  try {
    const res = await axios.post('/entries/update', entry);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getEntriesByWeek = async (date, filter) => {
  try {
    const res = await axios.get(`/entries/week/${date}/${filter}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
