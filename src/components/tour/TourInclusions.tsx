
import React from 'react';
import { Check } from 'lucide-react';
import { TourPackageProps } from "@/components/TourPackage";

interface TourInclusionsProps {
  tour: TourPackageProps;
}

const TourInclusions: React.FC<TourInclusionsProps> = ({ tour }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-spiti-forest mb-4">Package Inclusions</h2>
      <p className="text-gray-600 mb-4">
        Our all-inclusive Spiti Valley package ensures you have everything you need for a comfortable and memorable journey:
      </p>
      <ul className="space-y-2">
        {tour.inclusions.map((inclusion, index) => (
          <li key={index} className="flex items-start">
            <Check className="text-green-500 w-5 h-5 mr-2 mt-1" />
            <span>{inclusion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourInclusions;
