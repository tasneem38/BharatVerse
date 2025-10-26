import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext(null);

// 👇 Enable or disable real authentication
const DEMO_MODE = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEMO_MODE) {
      // 👇 Automatically log in as guest
      setUser({
        id: 'guest-001',
        name: 'Guest User',
        email: 'guest@bharatverse.in',
        role: 'demo',
      });
      setLoading(false);
    } else {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (DEMO_MODE) {
      throw new Error('Login is disabled in demo mode.');
    }
    const userData = await authService.login(email, password);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    if (DEMO_MODE) {
      setUser({
        id: 'guest-001',
        name: 'Guest User',
        email: 'guest@bharatverse.in',
        role: 'demo',
      });
      return;
    }
    authService.logout();
    setUser(null);
  };

  const register = async (userData) => {
    if (DEMO_MODE) {
      throw new Error('Registration is disabled in demo mode.');
    }
    await authService.register(userData);
    return await login(userData.email, userData.password);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
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
