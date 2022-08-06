import { useState, useEffect } from 'react';
import axios from 'config/axios';
import storage from 'util/storage';
import { useLocation } from 'react-router-dom';

// will need to find when this hook runs
// also why it doesn't seem to update routes when auth status changes ?
// only seems to run on page reload
const UseAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const fetchAuth = async () => {
    const token = storage.getToken();
    if (!token) return isAuth;
    try {
      const res = await axios.get('/auth');
      setIsAuth(() => res.data.msg === 'token_valid');
    } catch (err) {
      // storage.removeToken();
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAuth();
  }, [location.pathname]);

  return isAuth;
};

export default UseAuth;
