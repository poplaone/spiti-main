
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTours } from '@/services/tourService';

const Dashboard = () => {
  const [totalTours, setTotalTours] = useState(0);
  
  useEffect(() => {
    // Get total tours from the tour service
    const tours = getAllTours();
    setTotalTours(tours.length);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tour Packages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTours}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
