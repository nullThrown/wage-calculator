import { useState, useEffect } from 'react';
import axios from 'config/axios';
import storage from 'util/storage';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUser } from '../api/auth';

// const UseAuth = () => {
//   try {
//     const user = useQuery(['user'], getUser);
//     console.log(user);
//     return { user };
//   } catch (err) {
//     console.log(err);
//     return { err };
//   }
// };

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const fetchAuth = async () => {
    const token = storage.getToken();
    if (!token) return isAuth;
    try {
      const res = await axios.get('/auth');
      setIsAuth(() => res.data.msg === 'token_valid');
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    fetchAuth();
  }, [location.pathname]);

  return isAuth;
};
export default useAuth;
