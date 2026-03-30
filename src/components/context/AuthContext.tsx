import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@broadtech.com',
    name: 'Admin User',
    role: 'admin',
    phone: '+254700000000',
    address: 'Nairobi, Kenya'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    phone: '+254700000001',
    address: 'Mombasa, Kenya'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('broadtech_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('broadtech_user', JSON.stringify(foundUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setLoading(false);
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user'
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('broadtech_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('broadtech_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('broadtech_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}