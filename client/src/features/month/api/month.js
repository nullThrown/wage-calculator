import axios from 'config/axios';

export const getEntryDataByMonth = async (year, month, filter) => {
  try {
    const { data } = await axios.get(
      `/entries/month/${year}/${month}/${filter}`
    );
    return data;
  } catch (err) {
    // add error handler
    console.log(err);
    return err;
  }
};
