
import React, { memo } from 'react';
import { Clock } from 'lucide-react';

interface TourHeroContentProps {
  title: string;
  duration: {
    nights: number;
    days: number;
  };
}

const TourHeroContent: React.FC<TourHeroContentProps> = memo(({
  title,
  duration
}) => {
  return (
    <div className="max-w-3xl space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-white leading-tight"
          style={{ minHeight: '2.5rem', lineHeight: 1.2 }}>
        {title}
      </h1>
      
      {/* Tour duration info */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-5 text-white">
        <div className="flex items-center">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-spiti-blue" />
          <span className="text-sm sm:text-base">{duration.nights} Nights / {duration.days} Days</span>
        </div>
      </div>
    </div>
  );
});

TourHeroContent.displayName = 'TourHeroContent';
export default TourHeroContent;
