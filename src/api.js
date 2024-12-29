import axios from 'axios';

const api = axios.create({
  baseURL: 'https://finance-api.torres.fortal.br',
});

export default api;
