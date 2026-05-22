import { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

/* Decode JWT payload without any library */
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  /* ── Bootstrap from localStorage on mount ── */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = decodeToken(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser({
          token,
          id:       payload.id,
          email:    payload.email,
          username: localStorage.getItem('username') ?? '',
        });
      } else {
        // Token expired — clean up
        localStorage.removeItem('token');
        localStorage.removeItem('username');
      }
    }
    setLoading(false);
  }, []);

  /* ── Auth actions ── */
  const register = useCallback(async (username, email, password) => {
    const res = await authAPI.register(username, email, password);
    const { token, username: uname } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', uname ?? username);
    const payload = decodeToken(token);
    setUser({ token, id: payload?.id, email: payload?.email, username: uname ?? username });
    return res.data;
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authAPI.login(email, password);
    const { token, username } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username ?? '');
    const payload = decodeToken(token);
    setUser({ token, id: payload?.id, email: payload?.email, username: username ?? '' });
    return res.data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};