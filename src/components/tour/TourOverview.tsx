
import React from 'react';
import { Clock, Home, Calendar, Users, MapPin, Mountain, Compass } from 'lucide-react';
import { TourPackageProps } from "@/components/TourPackage";

interface TourOverviewProps {
  tour: TourPackageProps;
  getTransportIcon: () => JSX.Element;
}

const TourOverview: React.FC<TourOverviewProps> = ({ tour, getTransportIcon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4 flex items-center">
        {getTransportIcon()}
        <span className="ml-2">Tour Overview</span>
      </h2>
      <p className="text-gray-700 mb-6">
        {tour.overview || `Experience the magic of Spiti Valley with our ${tour.duration.nights}-night, ${tour.duration.days}-day adventure through the breathtaking
        Himalayan landscape. Journey through ancient Buddhist monasteries, remote high-altitude villages, and pristine
        natural wonders in this trans-Himalayan region often called "Little Tibet" or the "Middle Land."`}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <Clock className="text-spiti-blue w-5 h-5 mr-3" />
          <div>
            <p className="text-gray-600 text-sm">Duration</p>
            <p className="font-medium">{tour.duration.nights} Nights / {tour.duration.days} Days</p>
          </div>
        </div>
        <div className="flex items-center">
          <Home className="text-spiti-blue w-5 h-5 mr-3" />
          <div>
            <p className="text-gray-600 text-sm">Accommodation</p>
            <p className="font-medium">Hotels & Homestays</p>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="text-spiti-blue w-5 h-5 mr-3" />
          <div>
            <p className="text-gray-600 text-sm">Best Time</p>
            <p className="font-medium">June to September</p>
          </div>
        </div>
        <div className="flex items-center">
          <Users className="text-spiti-blue w-5 h-5 mr-3" />
          <div>
            <p className="text-gray-600 text-sm">Group Size</p>
            <p className="font-medium">2-10 People</p>
          </div>
        </div>
        <div className="flex items-center">
          <Mountain className="text-spiti-blue w-5 h-5 mr-3" />
          <div>
            <p className="text-gray-600 text-sm">Terrain</p>
            <p className="font-medium">Himalayan Mountain Passes</p>
          </div>
        </div>
        <div className="flex items-center">
          <Compass className="text-spiti-blue w-5 h-5 mr-3" />
          <div>
            <p className="text-gray-600 text-sm">Elevation</p>
            <p className="font-medium">2,000 - 4,550 meters</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourOverview;
