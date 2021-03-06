import axios from 'config/axios';

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
    console.log(err);
    return err;
  }
};
export const updateCompany = async (company) => {
  try {
    const res = await axios.put('/user/company/update', company);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const setCompanyRemovedStatus = async (companyID, status) => {
  try {
    const res = await axios.put('/user/company/remove/set', {
      companyID,
      status,
    });
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
