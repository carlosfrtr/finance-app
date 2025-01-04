import axios from 'axios';

const api = axios.create({
  baseURL: process.env.PUBLIC_SERVER_URL,
  withCredentials: true,
});

export default api;
