import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tms-js-pro-back-end.herokuapp.com/api',
  // interceptors: res => res.data,
  // transformResponse: [
  //   function (data) {
  //     // Do whatever you want to transform the data

  //     return data;
  //   },
  // ],
});

export function setupApi(token) {
  api.defaults.headers = {
    ...api.defaults.headers,
    Authorization: `Token ${token}`,
  };
}

export default api;
