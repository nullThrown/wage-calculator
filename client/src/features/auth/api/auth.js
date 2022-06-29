import axios from 'config/axios';

// error returns might require a promise reject
export const registerUser = async (user) => {
  try {
    const res = await axios.post('/auth/register', user);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post('/auth/login', user);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
