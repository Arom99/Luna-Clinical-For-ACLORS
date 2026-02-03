import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  role: 'customer' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('lunaUser');
    const rememberMe = localStorage.getItem('lunaRememberMe');
    
    if (savedUser && rememberMe === 'true') {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('lunaUser');
        localStorage.removeItem('lunaRememberMe');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Admin credentials
    if (email === 'admin123@gmail.com' && password === '774953') {
      const adminUser = { email, role: 'admin' as const, name: 'Admin User' };
      setUser(adminUser);
      
      if (rememberMe) {
        localStorage.setItem('lunaUser', JSON.stringify(adminUser));
        localStorage.setItem('lunaRememberMe', 'true');
      }
      localStorage.setItem('userEmail', email);
      setIsLoading(false);
      return true;
    }
    
    // Any other valid credentials (for demo)
    if (email && password) {
      const customerUser = { email, role: 'customer' as const, name: 'Patient User' };
      setUser(customerUser);
      
      if (rememberMe) {
        localStorage.setItem('lunaUser', JSON.stringify(customerUser));
        localStorage.setItem('lunaRememberMe', 'true');
      }
      localStorage.setItem('userEmail', email);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    localStorage.removeItem('lunaUser');
    localStorage.removeItem('lunaRememberMe');
    localStorage.removeItem('userEmail');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};