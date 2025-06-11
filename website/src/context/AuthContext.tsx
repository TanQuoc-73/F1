"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from '../config/axios';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    }
  }, [isClient]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token) {
        try {
          const response = await axios.get('/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
          setRole(response.data.role);
          setIsAuthenticated(true);
        } catch (error: any) {
          console.error('Error fetching user info:', error.response?.data || error.message);
          // If the token is invalid or expired, clear everything
          if (error.response?.status === 401 || error.response?.status === 403) {
            setToken(null);
            setUser(null);
            setRole(null);
            setIsAuthenticated(false);
            if (isClient) {
              localStorage.removeItem('token');
            }
          }
        }
      }
    };

    fetchUserInfo();
  }, [token, isClient]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('/users/login', { username, password });
      const { token: newToken, username: responseUsername, role: userRole, id } = response.data;
      
      if (isClient) {
        localStorage.setItem('token', newToken);
      }
      
      setToken(newToken);
      setUser({
        id,
        username: responseUsername,
        email: '',
        role: userRole
      });
      setRole(userRole);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    if (isClient) {
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
