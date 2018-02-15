import axios from 'axios';

// eslint-disable-next-line
export default() => {
  return axios.create({
    baseURL: 'https://tigertimeapi.herokuapp.com/',
  });
};
// 'http://localhost:8081',
