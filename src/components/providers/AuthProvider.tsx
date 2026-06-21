import React, { createContext, useContext, useState, ReactNode,useEffect } from 'react';
import { API_BASE_URL } from '../../config';

// 定义 Context 的类型
interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (data: { token: string; data: any }) => void;
  logout: () => void;
}

// 创建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  useEffect(()=>{

    const token = localStorage.getItem('token')
    if(!token) return
    fetch(`${API_BASE_URL}/getMe`, {
      method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data,'userData')
      if (data.data) {
        setUser(data.data.username);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
      }
    })
    .catch(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    });
  },[])
  const login = (data: { token: string; data: any }) => { 
    setIsAuthenticated(true);
    setUser(data?.data?.username || '');
    localStorage.setItem('token', data?.token || '');
    localStorage.setItem('username', data?.data?.username || ''); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 Hook 以方便使用 Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
