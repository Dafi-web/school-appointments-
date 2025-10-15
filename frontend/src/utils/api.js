import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'https://school-appointments.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

