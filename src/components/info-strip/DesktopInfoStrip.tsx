
import React from 'react';

interface DesktopInfoStripProps {
  items: string[];
}

const DesktopInfoStrip = ({ items }: DesktopInfoStripProps) => {
  return (
    <div className="hidden md:flex justify-between items-center container mx-auto px-4 py-1">
      {items.map((item, index) => (
        <div key={index} className="text-center text-sm font-medium px-4 whitespace-nowrap">
          {item}
        </div>
      ))}
    </div>
  );
};

export default DesktopInfoStrip;
