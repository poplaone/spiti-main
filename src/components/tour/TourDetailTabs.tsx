
import React, { useState } from 'react';
import { TourPackageProps } from "@/components/TourPackage";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bed, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { MapPin } from 'lucide-react';

interface TourDetailTabsProps {
  tour: TourPackageProps;
}

const TourDetailTabs: React.FC<TourDetailTabsProps> = ({ tour }) => {
  const [activeTab, setActiveTab] = useState<string>("accommodations");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-heading font-bold text-spiti-forest">Package Details</h2>
        <CollapsibleTrigger 
          onClick={() => setIsOpen(!isOpen)} 
          className="hover:bg-gray-100 p-2 rounded-full"
        >
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </CollapsibleTrigger>
      </div>

      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <ToggleGroup 
            type="single" 
            value={activeTab} 
            onValueChange={(value) => value && setActiveTab(value)}
            className="flex mb-6 border rounded-lg overflow-hidden"
          >
            <ToggleGroupItem 
              value="accommodations" 
              className="flex-1 py-3 px-4 data-[state=on]:bg-spiti-blue/10 data-[state=on]:text-spiti-blue font-medium"
            >
              <Bed className="w-4 h-4 mr-2 inline-block" />
              Accommodations
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="inclusions" 
              className="flex-1 py-3 px-4 data-[state=on]:bg-spiti-blue/10 data-[state=on]:text-spiti-blue font-medium"
            >
              <Check className="w-4 h-4 mr-2 inline-block" />
              Inclusions
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="exclusions" 
              className="flex-1 py-3 px-4 data-[state=on]:bg-spiti-blue/10 data-[state=on]:text-spiti-blue font-medium"
            >
              <X className="w-4 h-4 mr-2 inline-block" />
              Exclusions
            </ToggleGroupItem>
          </ToggleGroup>
          
          {/* Accommodations Tab */}
          {activeTab === "accommodations" && (
            <div>
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
            </div>
          )}
          
          {/* Inclusions Tab */}
          {activeTab === "inclusions" && (
            <div>
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
            </div>
          )}
          
          {/* Exclusions Tab */}
          {activeTab === "exclusions" && (
            <div>
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
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TourDetailTabs;
