import axios from 'axios';

const fichaSenaService = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    timeout: 30000,
  });

  export { fichaSenaService }