import axios from 'axios';

const API_URL = 'http://localhost:5000/bins';
const USER_API_URL = 'http://localhost:5000/users';

export const getBins = () => axios.get(API_URL);
export const getBin = (id) => axios.get(`${API_URL}/${id}`);
export const createBin = (binData) => axios.post(API_URL, binData);
export const updateBin = (id, binData) => axios.put(`${API_URL}/${id}`, binData);
export const deleteBin = (id) => axios.delete(`${API_URL}/${id}`);

export const loginUser = (credentials) => axios.post(`${USER_API_URL}/login`, credentials);
export const registerUser = (credentials) => axios.post(`${USER_API_URL}/register`, credentials);
