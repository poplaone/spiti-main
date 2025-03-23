
import React, { useState } from 'react';
import { TourPackageProps } from "@/components/TourPackage";
import { MapPin, Calendar, Mountain, Compass, Sun, Route, Flag } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TourItineraryProps {
  tour: TourPackageProps;
}

const TourItinerary: React.FC<TourItineraryProps> = ({ tour }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Choose an icon based on the day number
  const getDayIcon = (day: number) => {
    const icons = [
      <Flag className="text-spiti-blue w-5 h-5" />,
      <MapPin className="text-spiti-blue w-5 h-5" />,
      <Compass className="text-spiti-blue w-5 h-5" />,
      <Mountain className="text-spiti-blue w-5 h-5" />,
      <Route className="text-spiti-blue w-5 h-5" />,
      <Sun className="text-spiti-blue w-5 h-5" />
    ];
    return icons[day % icons.length];
  };

  return (
    <div className="bg-white/90 p-6 rounded-lg shadow-sm tour-itinerary">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4 flex items-center">
        <Calendar className="text-spiti-forest w-6 h-6 mr-2" />
        Tour Itinerary
      </h2>
      <p className="text-gray-700 mb-6">
        Follow our carefully crafted day-by-day itinerary through the magnificent landscapes of Spiti Valley. 
        From ancient monasteries to quaint villages and breathtaking lakes, each day offers unique experiences in this Himalayan paradise.
      </p>

      {tour.itinerary ? (
        <Accordion type="single" collapsible className="w-full">
          {tour.itinerary.map((day, index) => (
            <AccordionItem key={index} value={`day-${day.day}`} className="border-b border-gray-200">
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center text-left">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-spiti-forest text-white rounded-full mr-3 flex-shrink-0">
                    {day.day}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-spiti-forest">{day.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {tour.nightStays.find((stay, i) => i === day.day - 1)?.location || "Journey"}
                    </p>
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
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="border-l-2 border-spiti-blue pl-4 space-y-6">
          {Array.from({length: tour.duration.days}).map((_, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold text-spiti-forest flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-spiti-forest text-white rounded-full mr-2">
                  {index + 1}
                </span>
                Day {index + 1}: {tour.nightStays[index]?.location || "Tour End"}
              </h3>
              <p className="mt-2 text-gray-600">
                {index === 0 ? 
                  "Start your journey from your pickup location and drive to your first destination. Enjoy the scenic beauty as you enter the highland regions." : 
                  index === tour.duration.days - 1 ? 
                    "After breakfast, check out from the hotel and end your journey with beautiful memories of Spiti Valley that will last a lifetime." : 
                    `Explore the beautiful landscapes of ${tour.nightStays[index]?.location || "the region"} and visit local attractions, ancient monasteries, and experience the unique culture of this Himalayan region.`
                }
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourItinerary;
