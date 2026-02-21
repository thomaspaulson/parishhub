import axios from 'axios';

// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const api = axios.create({
  baseURL: '/',
});

// 🔐 Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
