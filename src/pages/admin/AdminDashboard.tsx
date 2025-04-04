
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    bikePackages: 0,
    carPackages: 0,
  });

  const fetchStats = async () => {
    try {
      // Get total packages
      const { data: totalPackages, error: totalError } = await supabase
        .from('tour_packages')
        .select('id');
      
      if (totalError) throw totalError;

      // Get bike packages
      const { data: bikePackages, error: bikeError } = await supabase
        .from('tour_packages')
        .select('id')
        .eq('transport_type', 'bike');
      
      if (bikeError) throw bikeError;

      // Get car packages
      const { data: carPackages, error: carError } = await supabase
        .from('tour_packages')
        .select('id')
        .eq('transport_type', 'car');
      
      if (carError) throw carError;

      setStats({
        totalPackages: totalPackages.length,
        bikePackages: bikePackages.length,
        carPackages: carPackages.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link to="/admin/tour-packages/create">
            <Button className="bg-spiti-forest hover:bg-spiti-forest/90">
              <Plus className="h-4 w-4 mr-2" />
              Create New Package
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Total Packages */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Tour Packages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalPackages}</div>
            </CardContent>
          </Card>

          {/* Bike Tours */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Bike Tours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.bikePackages}</div>
            </CardContent>
          </Card>

          {/* Car Tours */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Car Tours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.carPackages}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/admin/tour-packages/create">
              <Button className="w-full flex justify-start bg-spiti-forest hover:bg-spiti-forest/90">
                <Plus className="h-4 w-4 mr-2" />
                Add New Tour Package
              </Button>
            </Link>

            <Link to="/admin/tour-packages">
              <Button variant="outline" className="w-full flex justify-start">
                Manage Tour Packages
              </Button>
            </Link>

            <Link to="/admin/settings">
              <Button variant="outline" className="w-full flex justify-start">
                Admin Settings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
