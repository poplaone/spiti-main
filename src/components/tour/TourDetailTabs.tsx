
import React, { useState } from 'react';
import { TourPackageProps } from "@/data/types/tourTypes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, Check, X, Home } from "lucide-react";
import TourAccommodation from './TourAccommodation';
interface TourDetailTabsProps {
  tour: TourPackageProps;
}
const TourDetailTabs: React.FC<TourDetailTabsProps> = ({
  tour
}) => {
  const [activeTab, setActiveTab] = useState<string>("accommodations");
  return <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4 flex items-center">
        <Home className="text-spiti-forest w-6 h-6 mr-2" />
        Package Details
      </h2>

      <Tabs defaultValue="accommodations" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-200">
          <TabsTrigger 
            value="accommodations" 
            className="data-[state=active]:bg-spiti-blue data-[state=active]:text-white font-medium"
          >
            <span className="hidden sm:inline">Accommodations</span>
            <span className="sm:hidden">Stays</span>
          </TabsTrigger>
          <TabsTrigger 
            value="inclusions"
            className="data-[state=active]:bg-spiti-blue data-[state=active]:text-white font-medium"
          >
            Inclusions
          </TabsTrigger>
          <TabsTrigger 
            value="exclusions"
            className="data-[state=active]:bg-spiti-blue data-[state=active]:text-white font-medium"
          >
            Exclusions
          </TabsTrigger>
        </TabsList>
        
        {/* Accommodations Tab */}
        <TabsContent value="accommodations" className="pt-4">
          <TourAccommodation nightStays={tour.nightStays} />
        </TabsContent>
        
        {/* Inclusions Tab */}
        <TabsContent value="inclusions" className="pt-4">
          <p className="text-gray-600 mb-4">
            Our all-inclusive Spiti Valley package ensures you have everything you need for a comfortable and memorable journey:
          </p>
          <ul className="space-y-2">
            {tour.inclusions && tour.inclusions.map((inclusion, index) => <li key={index} className="flex items-start">
                <Check className="text-green-500 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span>{inclusion}</span>
              </li>)}
          </ul>
        </TabsContent>
        
        {/* Exclusions Tab */}
        <TabsContent value="exclusions" className="pt-4">
          {tour.exclusions ? <>
              <p className="text-gray-600 mb-4">
                The following items are not included in the package price:
              </p>
              <ul className="space-y-2">
                {tour.exclusions.map((exclusion, index) => <li key={index} className="flex items-start">
                    <X className="text-red-500 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                    <span>{exclusion}</span>
                  </li>)}
              </ul>
            </> : <p className="text-gray-600">
              Please contact us for detailed information about exclusions.
            </p>}
        </TabsContent>
      </Tabs>
    </div>;
};
export default TourDetailTabs;
