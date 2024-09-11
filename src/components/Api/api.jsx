import axios from 'axios';

const api = axios.create({
  baseURL: 'https://inventory-api-77ys.onrender.com', 
  withCredentials: true,
});

export default api;
