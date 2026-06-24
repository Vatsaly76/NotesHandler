import axios from 'axios';

/* ── Axios Instance ─────────────────────────────────────── */
const getBaseURL = () => {
  // In production (Vercel), use the full Render backend URL
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://noteshandler-x97u.onrender.com/api';
  }
  // In development, use '/api' which proxies to localhost:5000 via Vite
  return '/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: { 'Content-Type': 'application/json' },
});

/* ── Request interceptor: attach JWT automatically ───────── */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ── Response interceptor: handle 401 globally ──────────── */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

/* ── Auth API ───────────────────────────────────────────── */
export const authAPI = {
  // Spec says /register → backend has /signup, aliased here
  register: (username, email, password) =>
    api.post('/auth/signup', { username, email, password }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

/* ── Notes API ──────────────────────────────────────────── */
export const notesAPI = {
  getAll: (search = '') =>
    api.get('/notes', { params: search ? { search } : {} }),

  getOne: (id) =>
    api.get(`/notes/${id}`),

  create: (data) =>
    api.post('/notes', data),

  update: (id, data) =>
    api.put(`/notes/${id}`, data),

  remove: (id) =>
    api.delete(`/notes/${id}`),
};

export default api;
