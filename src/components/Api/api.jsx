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

api.interceptors.request.use((config) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});

export default api;
