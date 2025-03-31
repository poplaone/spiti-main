import React from 'react';
interface TourPackageHeaderProps {
  title: string;
  description: string;
}
const TourPackageHeader: React.FC<TourPackageHeaderProps> = ({
  title,
  description
}) => {
  return <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-spiti-dark">
        {title}
      </h2>
      
    </div>;
};
export default TourPackageHeader;