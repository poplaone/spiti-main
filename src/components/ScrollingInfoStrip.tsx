
import React from 'react';

const ScrollingInfoStrip = () => {
  const infoItems = [
    "Customize your Spiti Valley Holiday in 2025",
    "Spiti Valley Treks from INR 14,750",
    "Full Circuit Spiti Valley Group Departures 2025",
    "Winter Road Trips for 2025",
    "Road Trips to Zanskar & Ladakh"
  ];

  return (
    <div className="bg-spiti-forest text-white py-3 overflow-hidden">
      <div className="relative">
        {/* Desktop version - static */}
        <div className="hidden md:flex justify-between items-center container mx-auto px-4">
          {infoItems.map((item, index) => (
            <div key={index} className="text-center text-sm px-4">
              {item}
            </div>
          ))}
        </div>
        
        {/* Mobile version - auto-scrolling */}
        <div className="md:hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...infoItems, ...infoItems].map((item, index) => (
              <div key={index} className="text-sm px-6">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingInfoStrip;
