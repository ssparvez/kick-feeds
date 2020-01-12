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

// instance.interceptors.response.use(
//   response => response,
//   error => {
//     console.log('oi');

//     if (error.response.status === 401) {
//       // we dispatch our logout action (more than likely changes a boolean 
//       // somewhere in your store ex. isAuthenticated: false)

//       store.dispatch(signOut());

//       // this could just as easily be localStorage.removeItem('your-token')
//       // but it's best to encapsulate this logic so it can be used elsewhere
//       // by just importing it.

//       // authService.removeToken();
//       // localStorage.removeItem('token')

//       // send the user to the login page since the user/token is not valid

//       // history.push('/login');
//     }
//   })



export default instance;