import React, { createContext, useState, useEffect } from 'react';
import { getMeApi } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('tvk_jwt_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getMeApi()
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const loginSuccess = (userObj, tokenStr) => {
    localStorage.setItem('tvk_jwt_token', tokenStr);
    setToken(tokenStr);
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem('tvk_jwt_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
