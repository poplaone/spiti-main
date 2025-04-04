
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Calendar, FileText, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalInclusions: 0,
    totalItineraryDays: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Get count of packages
        const { count: packageCount, error: packageError } = await supabase
          .from('tour_packages')
          .select('*', { count: 'exact', head: true });
        
        // Get count of inclusions
        const { count: inclusionsCount, error: inclusionsError } = await supabase
          .from('inclusions')
          .select('*', { count: 'exact', head: true });
        
        // Get count of itinerary days
        const { count: daysCount, error: daysError } = await supabase
          .from('itinerary_days')
          .select('*', { count: 'exact', head: true });
        
        if (packageError || inclusionsError || daysError) {
          throw new Error('Error fetching stats');
        }
        
        setStats({
          totalPackages: packageCount || 0,
          totalInclusions: inclusionsCount || 0,
          totalItineraryDays: daysCount || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tour Packages</CardTitle>
            <Package className="h-5 w-5 text-spiti-forest" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? '...' : stats.totalPackages}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Available tour packages
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Inclusions</CardTitle>
            <FileText className="h-5 w-5 text-spiti-forest" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? '...' : stats.totalInclusions}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Features included across all packages
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Itinerary Days</CardTitle>
            <Calendar className="h-5 w-5 text-spiti-forest" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? '...' : stats.totalItineraryDays}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total tour days managed
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/admin/tour-packages" className="bg-white p-4 rounded-md border border-gray-200 hover:border-spiti-forest transition-colors">
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-2 text-spiti-forest" />
              <span>Manage Tour Packages</span>
            </div>
          </a>
          
          <a href="/admin/tour-packages/create" className="bg-white p-4 rounded-md border border-gray-200 hover:border-spiti-forest transition-colors">
            <div className="flex items-center">
              <Plus className="h-5 w-5 mr-2 text-spiti-forest" />
              <span>Create New Tour</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
