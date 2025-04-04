
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

const AdminSettings = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [addingAdmin, setAddingAdmin] = useState(false);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      // This is a complex join query since we need to get admin users with their emails
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id');

      if (adminError) throw adminError;
      
      // Now fetch the user data for each admin
      const admins: AdminUser[] = [];
      
      // This is just for initial display - in a real app you'd use a stored function
      // to avoid multiple round trips
      for (const admin of adminData) {
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(admin.id);
        
        if (!userError && userData) {
          admins.push({
            id: admin.id,
            email: userData.user?.email || 'Unknown',
            created_at: admin.created_at
          });
        }
      }
      
      setAdminUsers(admins);
    } catch (error: any) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to load admin users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;
    
    setAddingAdmin(true);
    try {
      // Check if user exists
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
      
      if (userError) throw userError;
      
      const user = userData?.users?.find(u => u.email?.toLowerCase() === newAdminEmail.toLowerCase());
      
      if (!user) {
        toast.error('User not found. They must sign up first.');
        return;
      }
      
      // Check if already an admin
      const { data: existingAdmin, error: checkError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
        
      if (checkError) throw checkError;
      
      if (existingAdmin) {
        toast.error('This user is already an admin');
        return;
      }
      
      // Add as admin
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({ id: user.id });
        
      if (insertError) throw insertError;
      
      toast.success(`${newAdminEmail} added as admin`);
      setNewAdminEmail('');
      fetchAdmins();
      
    } catch (error: any) {
      console.error('Error adding admin:', error);
      toast.error(error.message || 'Failed to add admin');
    } finally {
      setAddingAdmin(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>
            Manage users who have administrative privileges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <form onSubmit={handleAddAdmin} className="flex gap-4">
              <div className="flex-grow">
                <Input
                  placeholder="Email address"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={addingAdmin} 
                className="bg-spiti-forest hover:bg-spiti-forest/90"
              >
                {addingAdmin ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Admin
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Current Admins</h3>
            {loading ? (
              <div className="flex items-center justify-center h-20">
                <div className="animate-spin h-5 w-5 border-2 border-spiti-forest border-t-transparent rounded-full"></div>
                <span className="ml-2">Loading admins...</span>
              </div>
            ) : adminUsers.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-md">
                <User className="h-10 w-10 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-500">No admin users found</p>
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {adminUsers.map((admin) => (
                      <tr key={admin.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {admin.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
