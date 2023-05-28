import axios from 'config/axios';

export const createEntry = async (entry) => {
  try {
    entry = { ...entry, shiftDate: Date.now() };
    const { data } = await axios.post('/entries/create', entry);
    return data;
  } catch (err) {
    console.log(err);
    return err;
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

export const getEntriesByWeek = async (date, filter) => {
  try {
    const { data } = await axios.get(`/entries/week/${date}/${filter}`);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
