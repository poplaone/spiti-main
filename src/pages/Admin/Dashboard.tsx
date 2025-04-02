
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTours } from '@/services/tourService';
import { Bike, Car, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TourPackageProps } from '@/components/TourPackage';
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [totalTours, setTotalTours] = useState(0);
  const [bikeTours, setBikeTours] = useState(0);
  const [carTours, setCarTours] = useState(0);
  const [womenOnlyTours, setWomenOnlyTours] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Get tour statistics from the tour service
    const fetchTours = async () => {
      try {
        const tours = await getAllTours();
        setTotalTours(tours.length);
        
        // Count different tour types
        const bikeToursCount = tours.filter(tour => tour.transportType === 'bike').length;
        const carToursCount = tours.filter(tour => tour.transportType === 'car' || tour.transportType === 'premium').length;
        const womenOnlyToursCount = tours.filter((tour: TourPackageProps) => tour.isWomenOnly === true).length;
        
        setBikeTours(bikeToursCount);
        setCarTours(carToursCount);
        setWomenOnlyTours(womenOnlyToursCount);
      } catch (error) {
        console.error("Error fetching tours for dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-10" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tour Packages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalTours}</div>
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <Link to="/admin/tours" className="text-xs text-blue-500 hover:underline mt-2 block">
              View All Packages
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bike Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{bikeTours}</div>
              <Bike className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Car Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{carTours}</div>
              <Car className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Women Only Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{womenOnlyTours}</div>
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
