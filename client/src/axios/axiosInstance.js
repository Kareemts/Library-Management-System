import axios from 'axios';

export const axiosUrl = axios.create({
  // baseURL:"http://localhost:4000" ,
});

axiosUrl.interceptors.request.use(function (config) {
  // const token = localStorage.getItem('token');
  // // Do something before request is sent
  // config.headers['Authorization'] = 'Bearer ' + token;
  // config.headers['Access-Control-Allow-Origin'] = '*';

  return config;
});
