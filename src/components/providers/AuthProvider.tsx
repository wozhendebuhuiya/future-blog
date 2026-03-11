import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定义 Context 的类型
interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

// 创建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 组件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUser(username);
  };

  const logout = () => {
    setIsAuthenticated(false);
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
