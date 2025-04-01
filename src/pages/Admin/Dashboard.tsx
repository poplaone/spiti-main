
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Calendar, 
  Users, 
  TrendingUp,
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { tourPackagesData } from '@/data/tourPackagesData';

const Dashboard = () => {
  useAdminAuth(); // This will redirect to login if not authenticated
  
  const stats = [
    {
      title: "Total Tour Packages",
      value: tourPackagesData.length,
      icon: <Package className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Tour Types",
      value: 5,
      icon: <Calendar className="h-6 w-6 text-green-600" />,
      color: "bg-green-50"
    },
    {
      title: "Active Bookings",
      value: 24,
      icon: <Users className="h-6 w-6 text-violet-600" />,
      color: "bg-violet-50"
    },
    {
      title: "Monthly Traffic",
      value: "2.4K",
      icon: <TrendingUp className="h-6 w-6 text-amber-600" />,
      color: "bg-amber-50"
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className={`flex flex-row items-center justify-between pb-2 ${stat.color} rounded-t-lg`}>
              <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 border-b pb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New tour package added</p>
                  <p className="text-sm text-gray-500">BUDDHIST AND TRIBAL CIRCUIT–SPITI was added to the catalog</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b pb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New booking request</p>
                  <p className="text-sm text-gray-500">Booking received for SPITI VALLEY WOMEN ONLY TOUR</p>
                  <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Tour package updated</p>
                  <p className="text-sm text-gray-500">UNEXPLORED SPITI price was updated</p>
                  <p className="text-xs text-gray-400 mt-1">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
