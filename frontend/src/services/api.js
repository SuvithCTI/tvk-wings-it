import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tvk_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const sendOtpApi = (phone) => api.post('/auth/send-otp', { phone });
export const verifyOtpApi = (phone, otp, name) => api.post('/auth/verify-otp', { phone, otp, name });
export const adminLoginApi = (credentials) => api.post('/auth/admin-login', credentials);
export const getMeApi = () => api.get('/auth/me');

// Leaders & Assembly Constituency Explorer API
export const getLeadersApi = () => api.get('/leaders');
export const createLeaderApi = (data) => api.post('/leaders', data);
export const updateLeaderApi = (id, data) => api.put(`/leaders/${id}`, data);
export const deleteLeaderApi = (id) => api.delete(`/leaders/${id}`);

// Grievances API
export const submitGrievanceApi = (data) => api.post('/grievances', data);
export const trackGrievanceApi = (trackId) => api.get(`/grievances/track/${trackId}`);
export const getAllGrievancesApi = () => api.get('/grievances');
export const updateGrievanceStatusApi = (id, data) => api.patch(`/grievances/${id}`, data);

// Developments API
export const getDevelopmentsApi = () => api.get('/developments');
export const createDevelopmentApi = (data) => api.post('/developments', data);
export const updateDevelopmentApi = (id, data) => api.put(`/developments/${id}`, data);
export const deleteDevelopmentApi = (id) => api.delete(`/developments/${id}`);

// Services API
export const getServicesApi = () => api.get('/services');
export const applyServiceApi = (data) => api.post('/services/apply', data);
export const createServiceApi = (data) => api.post('/services', data);
export const updateServiceApi = (id, data) => api.put(`/services/${id}`, data);
export const deleteServiceApi = (id) => api.delete(`/services/${id}`);

// Live News API
export const getLiveNewsApi = () => api.get('/news');
export const createNewsApi = (data) => api.post('/news', data);
export const updateNewsApi = (id, data) => api.put(`/news/${id}`, data);
export const deleteNewsApi = (id) => api.delete(`/news/${id}`);

export default api;
