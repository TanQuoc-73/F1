import { useAuth } from '../context/AuthContext';

export const useAuthHook = () => {
  const auth = useAuth();

  const handleLogin = async (username: string, password: string) => {
    try {
      await auth.login(username, password);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleLogout = () => {
    auth.logout();
  };

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    handleLogin,
    handleLogout
  };
}; 
