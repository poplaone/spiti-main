
import React from 'react';
import MobileInfoStrip from './info-strip/MobileInfoStrip';
import DesktopInfoStrip from './info-strip/DesktopInfoStrip';
import { useIsMobile } from "@/hooks/use-mobile";

// Information items to display in the scrolling strip
const infoItems = [
  "Customize your Spiti Valley Holiday in 2025",
  "Spiti Valley Tours from INR 18,900",
  "Full Circuit Spiti Valley Group Departures 2025",
  "Road Trips to Zanskar & Ladakh"
];

const ScrollingInfoStrip = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-spiti-forest text-white py-1 overflow-hidden">
      <div className="relative">
        {/* Render desktop or mobile version based on screen size */}
        {isMobile === false ? (
          <DesktopInfoStrip items={infoItems} />
        ) : (
          <MobileInfoStrip items={infoItems} />
        )}
      </div>
    </div>
  );
};

export default ScrollingInfoStrip;
