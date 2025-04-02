
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
        const { count, error } = await supabase
          .from('admin_users')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          throw error;
        }
        
        // If no admin users exist, show the setup component
        if (count === 0) {
          setShowAdminSetup(true);
        }
      } catch (error: any) {
        console.error('Error checking admin users:', error);
        // If there's an error checking, let's show the setup button
        setShowAdminSetup(false);
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
      // Only allow the specific email address to log in
      if (email !== 'spitivalleytravels@gmail.com') {
        throw new Error('You do not have admin privileges');
      }

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
          .select('id, is_active')
          .eq('email', 'spitivalleytravels@gmail.com')
          .single();

        if (adminError || !adminData || !adminData.is_active) {
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

  const forceShowSetup = () => {
    setShowAdminSetup(true);
  };

  if (checkingAdmins) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-spiti-blue"></div>
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

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mt-2">First time setup?</p>
              <Button 
                type="button"
                variant="outline"
                className="mt-2"
                onClick={forceShowSetup}
              >
                Create Admin Account
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
