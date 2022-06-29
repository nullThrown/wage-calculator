import axios from 'config/axios';

export const getOverviewData = async (filter) => {
  try {
    const res = await axios.get(`/entries/overview/${filter}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
