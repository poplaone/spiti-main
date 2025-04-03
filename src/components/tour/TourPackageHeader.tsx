
import React from 'react';

interface TourPackageHeaderProps {
  title: string;
  description: string;
}

const TourPackageHeader: React.FC<TourPackageHeaderProps> = ({
  title,
  description
}) => {
  return <div className="text-center mb-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-spiti-dark">
        {title}
      </h2>
      <p className="text-sm text-gray-700 max-w-3xl mx-auto">{description}</p>      
    </div>;
};

export default TourPackageHeader;
