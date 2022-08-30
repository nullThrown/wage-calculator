import axios from 'config/axios';

export const getOverviewData = async (filter) => {
  try {
    const { data } = await axios.get(`/entries/overview/${filter}`);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
