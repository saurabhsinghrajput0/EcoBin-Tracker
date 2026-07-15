import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001', // Changed to 5001 to match backend server logs
});

// Interceptor to attach token
API.interceptors.request.use((req) => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user.token) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return req;
});

// Bins API
export const getBins = () => API.get('/bins');
export const getBin = (id) => API.get(`/bins/${id}`);
export const createBin = (binData) => API.post('/bins', binData);
export const updateBin = (id, binData) => API.put(`/bins/${id}`, binData);
export const deleteBin = (id) => API.delete(`/bins/${id}`);

// Auth API
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (credentials) => API.post('/auth/register', credentials);

