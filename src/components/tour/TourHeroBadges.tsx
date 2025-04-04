
import React from 'react';
import { Bike, Car, Calendar, Settings } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TourHeroBadgesProps {
  transportType: string;
  scrollToItinerary: () => void;
}

const TourHeroBadges: React.FC<TourHeroBadgesProps> = ({
  transportType,
  scrollToItinerary
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={scrollToItinerary} 
        className="border-white text-white hover:text-white bg-transparent sm:size-lg"
      >
        View Itinerary
      </Button>
      
      {transportType?.toLowerCase() === 'bike' ? (
        <Badge className="bg-orange-500 p-1.5">
          <Bike className="w-4 h-4" />
        </Badge>
      ) : (
        <Badge className="bg-green-500 p-1.5">
          <Car className="w-4 h-4" />
        </Badge>
      )}
      
      <Badge className="bg-purple-500 p-1.5">
        <Calendar className="w-4 h-4" />
      </Badge>
      
      <Badge className="bg-blue-400 p-1.5">
        <Settings className="w-4 h-4" /> 
      </Badge>
    </div>
  );
};

export default TourHeroBadges;
