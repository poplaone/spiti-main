
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Bike, Car, Users } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { 
  bikeTours, 
  carTours, 
  ownCarTours, 
  womenOnlyTours, 
  buddhistTours 
} from '@/data/tourPackagesData';

const TourTypes = () => {
  useAdminAuth(); // This will redirect to login if not authenticated

  const tourTypes = [
    {
      id: 'bike',
      title: 'Bike Tours',
      description: 'Adventure tours across Spiti Valley on motorbikes',
      count: bikeTours.length,
      icon: <Bike className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'car',
      title: 'Car Tours',
      description: 'Guided car tours exploring Spiti Valley destinations',
      count: carTours.length,
      icon: <Car className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'owncar',
      title: 'Own Car Tours',
      description: 'Self-drive tours with accommodation and guide',
      count: ownCarTours.length,
      icon: <Car className="h-5 w-5 text-amber-600" />,
      color: 'bg-amber-50 border-amber-200'
    },
    {
      id: 'women',
      title: 'Women Only Tours',
      description: 'Exclusive tours designed for women travelers',
      count: womenOnlyTours.length,
      icon: <Users className="h-5 w-5 text-pink-600" />,
      color: 'bg-pink-50 border-pink-200'
    },
    {
      id: 'buddhist',
      title: 'Buddhist Circuit Tours',
      description: 'Cultural tours focused on Buddhist heritage and monasteries',
      count: buddhistTours.length,
      icon: <Car className="h-5 w-5 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tour Types</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tourTypes.map((type) => (
          <Card key={type.id} className={`border ${type.color}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-full ${type.color}`}>
                  {type.icon}
                </div>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="mt-4">{type.title}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Active tours</div>
                <div className="text-2xl font-bold">{type.count}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TourTypes;
