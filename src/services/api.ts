// src/services/api.ts
import axios from 'axios';
import { setLoading } from '../context/LoadingContext'; // Loading context yönetiminden yararlanılabilir

// .env'deki VITE_API_URL değişkenini kullanarak base URL’i ayarla
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// İstek öncesi interceptor: Loading durumunu aktif et
api.interceptors.request.use(
  (config) => {
    setLoading(true);
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

// Yanıt sonrası interceptor: Loading durumunu kapat
api.interceptors.response.use(
  (response) => {
    setLoading(false);
    return response;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

export default api;
