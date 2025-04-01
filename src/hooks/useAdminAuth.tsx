
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminAuth {
  isAdmin: boolean;
  email: string;
}

export const useAdminAuth = (requireAuth: boolean = true) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('adminAuth');
      
      if (!authData && requireAuth) {
        // Redirect to login if not authenticated and authentication is required
        navigate('/admin/login');
        setIsLoading(false);
        return;
      }
      
      if (authData) {
        try {
          const auth = JSON.parse(authData) as AdminAuth;
          if (auth.isAdmin) {
            setIsAuthenticated(true);
          } else if (requireAuth) {
            navigate('/admin/login');
          }
        } catch (error) {
          // Invalid auth data
          localStorage.removeItem('adminAuth');
          if (requireAuth) navigate('/admin/login');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate, requireAuth]);

  const logout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  return { isAuthenticated, isLoading, logout };
};
