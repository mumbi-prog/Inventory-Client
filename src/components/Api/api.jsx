// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://inventory-api-77ys.onrender.com', 
//   withCredentials: true,
// });

// export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://inventory-api-77ys.onrender.com',
  withCredentials: true, 
});


api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
