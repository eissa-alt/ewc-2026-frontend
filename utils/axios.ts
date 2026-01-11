import axios from 'axios';

/** -------------------------------------------------------------------------- **/
/**        This file should have all axios instances, add more if needed       **/
/** -------------------------------------------------------------------------- **/

/** --------- Make sure to add their keys inside enviroment variables -------- **/

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const token = process.env.NEXT_PUBLIC_API_TOKEN || '';

const Axios = axios.create({
   baseURL,
   headers: {
      token: token,
      // Accept: 'application/json',
      // 'Content-Type': 'application/json',
   },
});

/** --------------------------- Interceptor example -------------------------- **/

/** -------------------------------------------------------------------------- **/
/**           Read axios docs: {@link https://github.com/axios/axios}          **/
/** -------------------------------------------------------------------------- **/

Axios.interceptors.response.use(
   function (response) {
      return Promise.resolve(response);
   },
   function (error) {
      return Promise.reject(error);
   }
);

export default Axios;
