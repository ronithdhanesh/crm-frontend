import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { AuthState, User } from '../types';
import apiService from '../services/api';

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const checkAuth = async (): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, loading: false })); // Set loading to false
      console.log('🔍 Bypassing authentication for demo...');
      
      // Always return true for demo purposes
      const mockUser: User = {
        id: 'demo',
        name: 'Demo User',
        email: 'demo@example.com',
      };
      setAuthState({
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      });
      return true;
    } catch (error) {
      console.error('❌ Error in bypassed auth check:', error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
      return false;
    }
  };

  const login = () => {
    window.location.href = apiService.getGoogleAuthUrl();
  };

  const logout = async () => {
    try {
      await apiService.logout();
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
