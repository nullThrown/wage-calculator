import Axios from 'axios';
import storage from '../util/storage';

const axios = Axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: { x_auth_token: storage.getToken() },
});

export default axios;
