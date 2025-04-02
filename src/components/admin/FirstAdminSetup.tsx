
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

const FirstAdminSetup = ({ onComplete }: { onComplete: () => void }) => {
  const [email] = useState('spitivalleytravels@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSetupAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if password matches the required one
    if (password !== 'Spiti@0001') {
      toast({
        title: 'Error',
        description: 'Please use the provided admin password: Spiti@0001',
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
      const isUserExists = error.message.includes('already registered');
      
      if (isUserExists) {
        // User exists but might not be in admin_users table
        try {
          // Check if user is in admin_users table
          const { data, error: checkError } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', email);
            
          if (checkError) throw checkError;
          
          if (!data || data.length === 0) {
            // User exists but not in admin_users table, add them
            const { error: insertError } = await supabase
              .from('admin_users')
              .insert([{ email, is_active: true }]);
              
            if (insertError) throw insertError;
            
            toast({
              title: 'Success',
              description: 'Admin user activated. You can now log in with the provided credentials.',
            });
            
            onComplete();
            return;
          } else {
            toast({
              title: 'Admin Already Exists',
              description: 'This admin user already exists. You can log in with the provided credentials.',
            });
            onComplete();
            return;
          }
        } catch (adminError: any) {
          toast({
            title: 'Error',
            description: adminError.message || 'Failed to check or create admin user',
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Error',
          description: error.message || 'Failed to create admin user',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Admin User</h2>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start">
        <AlertCircle className="text-blue-500 mr-2 mt-0.5" size={18} />
        <div>
          <p className="text-sm text-blue-800">
            Create your admin account with these credentials:
          </p>
          <ul className="list-disc list-inside text-sm text-blue-800 mt-2 ml-2">
            <li>Email: spitivalleytravels@gmail.com</li>
            <li>Password: Spiti@0001</li>
          </ul>
        </div>
      </div>
      
      <form onSubmit={handleSetupAdmin} className="space-y-4">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            readOnly
            className="bg-gray-100"
          />
        </div>
        
        <div>
          <Label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter admin password"
          />
          <p className="text-xs text-gray-500 mt-1">
            Please use the provided admin password: Spiti@0001
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
