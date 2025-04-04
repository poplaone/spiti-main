
import React from 'react';
import { Home, Check, X, MapPin } from 'lucide-react';
import { TourPackageProps } from "@/data/types/tourTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface TourPackageDetailsProps {
  tour: TourPackageProps;
  isLoading?: boolean;
}

const TourPackageDetails: React.FC<TourPackageDetailsProps> = ({ tour, isLoading = false }) => {
  // Show skeleton loading state
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />
        
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  // Make sure we have a valid tour object with required properties
  if (!tour || !tour.nightStays || !tour.inclusions) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-red-500">Tour information is unavailable. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4 flex items-center">
        <Home className="text-spiti-forest w-6 h-6 mr-2" />
        Package Details
      </h2>
      
      <Tabs defaultValue="accommodations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
          <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
        </TabsList>
        
        {/* Accommodations Tab */}
        <TabsContent value="accommodations" className="pt-4">
          <p className="text-gray-700 mb-6">
            Relax and unwind in carefully chosen accommodations that enhance your experience with comfort and local hospitality.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tour.nightStays.map((stay, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <MapPin className="text-spiti-blue w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{stay.location}</p>
                    <p className="text-sm text-gray-600">{stay.nights} {stay.nights === 1 ? 'night' : 'nights'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        {/* Inclusions Tab */}
        <TabsContent value="inclusions" className="pt-4">
          <p className="text-gray-600 mb-4">
            Our all-inclusive Spiti Valley package ensures you have everything you need for a comfortable and memorable journey:
          </p>
          <ul className="space-y-2">
            {tour.inclusions.map((inclusion, index) => (
              <li key={index} className="flex items-start">
                <Check className="text-green-500 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span>{inclusion}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        
        {/* Exclusions Tab */}
        <TabsContent value="exclusions" className="pt-4">
          {tour.exclusions ? (
            <>
              <p className="text-gray-600 mb-4">
                The following items are not included in the package price:
              </p>
              <ul className="space-y-2">
                {tour.exclusions.map((exclusion, index) => (
                  <li key={index} className="flex items-start">
                    <X className="text-red-500 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                    <span>{exclusion}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-600">
              Please contact us for detailed information about exclusions.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TourPackageDetails;
