"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario } from '@/lib/services';

interface AuthContextType {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const SESSION_DURATION = 30 * 60 * 1000;
const SESSION_KEY = 'auth_session';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionData = localStorage.getItem(SESSION_KEY);
        const userData = localStorage.getItem(USER_KEY);

        if (sessionData && userData) {
          const session = JSON.parse(sessionData);
          const now = Date.now();

          if (now - session.timestamp < SESSION_DURATION) {
            setUser(JSON.parse(userData));
          } else {
            localStorage.removeItem(SESSION_KEY);
            localStorage.removeItem(USER_KEY);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(USER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        const now = Date.now();

        if (now - session.timestamp >= SESSION_DURATION) {
          logout();
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const resetSessionTimer = () => {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        const now = Date.now();
        
        if (now - session.timestamp < SESSION_DURATION) {
          session.timestamp = now;
          localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        }
      }
    };

    let timeoutId: NodeJS.Timeout;
    const throttledReset = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resetSessionTimer, 1000);
    };

    events.forEach(event => {
      document.addEventListener(event, throttledReset, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, throttledReset, true);
      });
      clearTimeout(timeoutId);
    };
  }, [isAuthenticated]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.usuario;

        const sessionData = {
          timestamp: Date.now(),
          userId: userData.id
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const refreshSession = () => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      session.timestamp = Date.now();
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
