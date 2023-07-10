import { useState, useEffect } from 'react';
import axios from 'config/axios';
import storage from 'services/storage';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const fetchAuth = async () => {
    const token = storage.getToken();
    if (!token) return isAuth;
    try {
      const res = await axios.get('/auth');
      setIsAuth(() => res.data.msg === 'valid_token');
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAuth();
  }, [location.pathname]);

  return isAuth;
};
export default useAuth;
