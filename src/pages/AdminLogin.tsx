
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import FirstAdminSetup from '@/components/admin/FirstAdminSetup';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminSetup, setShowAdminSetup] = useState(false);
  const [checkingAdmins, setCheckingAdmins] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Check if any admin users exist
    const checkAdminUsers = async () => {
      try {
        const { data, error, count } = await supabase
          .from('admin_users')
          .select('*', { count: 'exact' });
        
        if (error) {
          throw error;
        }
        
        // If no admin users exist, show the setup component
        if (count === 0) {
          setShowAdminSetup(true);
        }
      } catch (error) {
        console.error('Error checking admin users:', error);
      } finally {
        setCheckingAdmins(false);
      }
    };
    
    checkAdminUsers();
  }, []);

  useEffect(() => {
    // If already logged in, redirect to admin dashboard
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data) {
        // Check if the user is an admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .eq('is_active', true)
          .single();

        if (adminError || !adminData) {
          // Not an admin, sign out
          await supabase.auth.signOut();
          throw new Error('You do not have admin privileges');
        }

        toast({
          title: "Login successful",
          description: "Welcome to the admin panel!",
        });
        navigate('/admin');
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred while logging in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAdmins) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </div>
    );
  }

  if (showAdminSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <FirstAdminSetup onComplete={() => setShowAdminSetup(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
