import axios from 'axios';

const url =
process.env.NODE_ENV === "production"
  ? "/api"
  : "http://localhost:3001/api";

const api = axios.create({
 baseURL: url,
});

export default api;