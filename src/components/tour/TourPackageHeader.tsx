
import React, { memo } from 'react';

interface TourPackageHeaderProps {
  title: string;
  description: string;
}

const TourPackageHeader: React.FC<TourPackageHeaderProps> = memo(({
  title,
  description
}) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-spiti-dark">
        {title}
      </h2>
    </div>
  );
});

TourPackageHeader.displayName = 'TourPackageHeader';

export default TourPackageHeader;
