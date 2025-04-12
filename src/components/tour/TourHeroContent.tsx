
import React, { memo } from 'react';
import { Clock } from 'lucide-react';

interface TourHeroContentProps {
  title: string;
  duration: {
    nights: number;
    days: number;
  };
}

// Optimized and memoized component
const TourHeroContent = memo(({
  title,
  duration
}: TourHeroContentProps) => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white leading-tight">
        {title}
      </h1>
      
      <div className="flex items-center gap-2 text-white">
        <Clock className="w-4 h-4 text-spiti-blue" strokeWidth={2} />
        <span className="text-sm sm:text-base">{duration.nights} Nights / {duration.days} Days</span>
      </div>
    </div>
  );
});

TourHeroContent.displayName = 'TourHeroContent';
export default TourHeroContent;
