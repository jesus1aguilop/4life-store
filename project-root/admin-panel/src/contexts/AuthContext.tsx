import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  phone: string;
  city: string;
  country: string;
  bio: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  profile?: UserProfile;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<User & UserProfile>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, username: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData: User = {
        id: '1',
        email,
        username,
        name: username,
        profile: {
          phone: '',
          city: '',
          country: '',
          bio: ''
        }
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = (profile: Partial<User & UserProfile>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...profile,
        profile: {
          ...user.profile,
          ...(profile as UserProfile)
        }
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isLoading }}>
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