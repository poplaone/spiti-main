
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import useAdminAuth from '@/hooks/useAdminAuth';

interface AdminUser {
  user_id: string;
  created_at: string;
  email?: string;
}

const AdminSettings: React.FC = () => {
  const { user } = useAdminAuth();
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminId, setNewAdminId] = useState('');
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    setLoading(true);
    try {
      // Get all users with admin role
      const { data: adminData, error: adminError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role', 'admin');
      
      if (adminError) throw adminError;
      
      // Get user details from auth to match with admin IDs
      const adminUsers: AdminUser[] = adminData || [];
      
      // For display purposes, try to add email to each admin user
      // Note: this is an admin interface, so we're authorized to see this data
      for (const admin of adminUsers) {
        const { data: userData } = await supabase.auth.admin.getUserById(admin.user_id);
        if (userData?.user) {
          admin.email = userData.user.email;
        }
      }
      
      setAdminUsers(adminUsers);
    } catch (error: any) {
      toast.error(`Error fetching admin users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    
    try {
      if (!newAdminId) {
        toast.error("Please enter a User ID");
        return;
      }
      
      // Check if already an admin
      const { data: existingAdmin } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', newAdminId)
        .eq('role', 'admin')
        .single();
      
      if (existingAdmin) {
        toast.error("This user is already an admin");
        return;
      }
      
      // Add the new admin role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: newAdminId, role: 'admin' });
      
      if (error) throw error;
      
      toast.success('Admin user added successfully');
      setNewAdminId('');
      fetchAdminUsers();
      
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setAddLoading(false);
    }
  };
  
  const handleRemoveAdmin = async (adminId: string) => {
    // Prevent removing yourself
    if (adminId === user?.id) {
      toast.error("You cannot remove yourself as an admin");
      return;
    }
    
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', adminId)
        .eq('role', 'admin');
      
      if (error) throw error;
      
      toast.success('Admin user removed');
      fetchAdminUsers();
      
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Admin Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Administrators</CardTitle>
          <CardDescription>
            Add or remove admin access to the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Current Administrators</h2>
              {loading ? (
                <div className="animate-pulse h-20 bg-gray-100 rounded-md"></div>
              ) : adminUsers.length === 0 ? (
                <p className="text-sm text-gray-500">No admins found</p>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {adminUsers.map((admin) => (
                        <tr key={admin.user_id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.user_id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email || 'Unknown'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(admin.created_at).toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {admin.user_id === user?.id ? (
                              <span className="text-gray-400">Current User</span>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleRemoveAdmin(admin.user_id)}
                              >
                                Remove
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t">
              <h2 className="text-lg font-semibold mb-2">Add New Administrator</h2>
              <p className="text-sm text-gray-500 mb-4">
                Enter the User ID of the person you want to grant admin access to.
                The user must have an account in the system first.
              </p>
              
              <form onSubmit={handleAddAdmin} className="flex gap-2">
                <Input
                  placeholder="Enter User ID"
                  value={newAdminId}
                  onChange={(e) => setNewAdminId(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={addLoading || !newAdminId}
                  className="bg-spiti-forest hover:bg-spiti-forest/90"
                >
                  {addLoading ? 'Adding...' : 'Add Admin'}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
