import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface NotificationState {
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loginUser: (userData: User) => void;
  loginDirect: (userData: User) => void;
  logout: () => void;
  notification: NotificationState | null;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('besor_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [notification, setNotification] = useState<NotificationState | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('besor_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('besor_user');
    }
  }, [user]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const loginUser = (userData: User) => {
    setUser(userData);
    showNotification(`Selamat datang, ${userData.name}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('besor_user');
    showNotification('Anda telah berhasil keluar dari akun.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        loginDirect: loginUser,
        logout,
        notification,
        showNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
