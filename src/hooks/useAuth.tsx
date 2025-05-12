
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  points: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('ecochain_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Demo credentials
      const demoAdminUser = { 
        id: 'admin1', 
        name: 'Admin User', 
        email: 'admin@example.com', 
        isAdmin: true,
        points: 1250
      };
      
      const demoRegularUser = { 
        id: 'user1', 
        name: 'Regular User', 
        email: 'user@example.com', 
        isAdmin: false,
        points: 750
      };

      let loggedInUser = null;
      
      if (email === 'admin@example.com' && password === 'password') {
        loggedInUser = demoAdminUser;
      } else if (email === 'user@example.com' && password === 'password') {
        loggedInUser = demoRegularUser;
      } else {
        throw new Error('Invalid credentials');
      }

      // Set user in state and localStorage
      setUser(loggedInUser);
      localStorage.setItem('ecochain_user', JSON.stringify(loggedInUser));
      
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      
      // Redirect based on user role
      if (loggedInUser.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newUser = {
        id: `user${Date.now()}`,
        name,
        email,
        isAdmin: false,
        points: 0
      };

      // Set user in state and localStorage
      setUser(newUser);
      localStorage.setItem('ecochain_user', JSON.stringify(newUser));
      
      toast.success('Registration successful!');
      navigate('/profile'); // Direct new users to their profile
    } catch (error) {
      toast.error('Registration failed');
      console.error('Register error:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecochain_user');
    toast.info('Logged out successfully');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        login,
        register,
        logout,
      }}
    >
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
