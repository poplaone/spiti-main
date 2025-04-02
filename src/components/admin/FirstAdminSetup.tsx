
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FirstAdminSetup = ({ onComplete }: { onComplete: () => void }) => {
  const [email, setEmail] = useState('spitivalleytravels@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // First create the user in Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/admin'
        }
      });
      
      if (authError) throw authError;
      
      // Then add the user to the admin_users table
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert([
          { email, is_active: true }
        ]);
        
      if (adminError) throw adminError;
      
      toast({
        title: 'Success',
        description: 'Admin user created successfully. You can now log in.',
      });
      
      // Sign out so user can log in explicitly
      await supabase.auth.signOut();
      
      onComplete();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create admin user',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create First Admin User</h2>
      <p className="text-gray-600 mb-4">
        Create your first admin user to access the admin panel.
      </p>
      
      <form onSubmit={handleSetupAdmin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter a secure password"
          />
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 6 characters
          </p>
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Admin User'}
        </Button>
      </form>
    </div>
  );
};

export default FirstAdminSetup;
