// src/lib/api.ts
import axios from 'axios';
const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});
// REQUEST-Interceptor: wird vor jedem Request ausgeführt
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Token zu jedem Request automatisch hinzufügen
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;  // Request weiterschicken
  },
  (error) => Promise.reject(error)  // Fehler beim Erstellen des Requests
);
// RESPONSE-Interceptor: wird nach jeder Antwort ausgeführt
api.interceptors.response.use(
  (response) => response,  // Erfolgreiche Antwort: einfach durchlassen
  (error) => {
    if (error.response?.status === 401) {
      // Token abgelaufen: zur Login-Seite weiterleiten
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default api;