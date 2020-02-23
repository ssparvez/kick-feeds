import axios from 'axios';

const HOST = process.env.REACT_APP_JOTTER_API_URL;
const instance = axios.create({
  baseURL: 'http://' + HOST,
});

// add auth token to request if present, before request is sent
instance.interceptors.request.use(config => {

  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config;
}, (error) => { // Do something with request error

  return Promise.reject(error);
});

export default instance;