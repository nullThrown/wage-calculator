import axios from 'config/axios';

export const getEntryDataByMonth = async (year, month, filter) => {
  try {
    const res = await axios.get(`/entries/month/${year}/${month}/${filter}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
