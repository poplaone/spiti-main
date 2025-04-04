import React from 'react';
import { TourItineraryDay } from "@/data/types/tourTypes";
import { MapPin, Calendar, Mountain, Compass, Sun, Route, Flag } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
interface ItineraryDayProps {
  day: TourItineraryDay;
  location: string;
}
const ItineraryDay: React.FC<ItineraryDayProps> = ({
  day,
  location
}) => {
  // Choose an icon based on the day number
  const getDayIcon = (day: number) => {
    const icons = [<Flag className="text-spiti-blue w-5 h-5" />, <MapPin className="text-spiti-blue w-5 h-5" />, <Compass className="text-spiti-blue w-5 h-5" />, <Mountain className="text-spiti-blue w-5 h-5" />, <Route className="text-spiti-blue w-5 h-5" />, <Sun className="text-spiti-blue w-5 h-5" />];
    return icons[day % icons.length];
  };
  return <AccordionItem key={day.day} value={`day-${day.day}`} className="border-b border-gray-200">
      <AccordionTrigger className="py-4 hover:no-underline">
        <div className="flex items-center text-left">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-spiti-forest text-white rounded-full mr-3 flex-shrink-0">
            {day.day}
          </span>
          <div>
            <h3 className="text-lg font-bold text-spiti-forest">{day.title}</h3>
            
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-4">
        <div className="flex">
          <div className="mt-1 mr-3">
            {getDayIcon(day.day)}
          </div>
          <div className="prose prose-sm max-w-none text-gray-600">
            {day.description}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>;
};
export default ItineraryDay;