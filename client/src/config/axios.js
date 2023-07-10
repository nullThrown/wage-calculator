import Axios, { AxiosRequestTransformer } from 'axios';
import storage from '../services/storage';

// recursive fn that checks every value of request body
// if value is Date it converts it into a timestamp with Date.now()
// this prevents the date from being serialized in a UTC time

// const dateTransformer = (data) => {
//   if (data instanceof Date) {
//     data = Date.now();
//     console.log(data);
//     return data;
//   }
//   if (Array.isArray(data)) {
//     return data.map((val) => dateTransformer(val));
//   }
//   if (typeof data === 'object' && data !== null) {
//     return Object.fromEntries(
//       Object.entries(data).map(([key, val]) => [key, dateTransformer(val)])
//     );
//   }
//   return data;
// };
const axios = Axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: { x_auth_token: storage.getToken() },
  // transformRequest: [dateTransformer].concat(Axios.defaults.transformRequest),
});

export default axios;
