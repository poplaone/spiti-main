
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    tourCount: 0,
    adminCount: 0,
    imageCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Get tour packages count
        const { count: tourCount, error: tourError } = await supabase
          .from('tour_packages')
          .select('*', { count: 'exact', head: true });
        
        if (tourError) throw tourError;
        
        // Get admin users count
        const { count: adminCount, error: adminError } = await supabase
          .from('admin_users')
          .select('*', { count: 'exact', head: true });
        
        if (adminError) throw adminError;
        
        // Get storage files count (images)
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('tour_images')
          .list();
        
        if (storageError) throw storageError;
        
        setStats({
          tourCount: tourCount || 0,
          adminCount: adminCount || 0,
          imageCount: storageData?.length || 0
        });
        
      } catch (error: any) {
        console.error('Error fetching stats:', error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/tour-packages/create">
          <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-spiti-forest/80 to-spiti-forest">
            <CardContent className="pt-6 text-white flex items-center justify-center flex-col h-40">
              <Plus size={40} className="mb-2" />
              <h2 className="text-xl font-semibold">Create New Tour Package</h2>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/tour-packages">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Tour Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? '-' : stats.tourCount}
              </div>
              <p className="text-sm text-gray-500 mt-1">Total tours in the system</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/settings">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? '-' : stats.adminCount}
              </div>
              <p className="text-sm text-gray-500 mt-1">Total admin accounts</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
