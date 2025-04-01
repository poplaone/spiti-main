
import React from 'react';
import { Check, X } from 'lucide-react';
import { TourPackageProps } from "@/components/TourPackage.d";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TourInclusionsProps {
  tour: TourPackageProps;
}

const TourInclusions: React.FC<TourInclusionsProps> = ({ tour }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4">Package Details</h2>
      
      <Tabs defaultValue="inclusions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
          <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
        </TabsList>
        
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

export default TourInclusions;
