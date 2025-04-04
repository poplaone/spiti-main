
import React from 'react';

interface DesktopInfoStripProps {
  items: string[];
}

const DesktopInfoStrip = ({ items }: DesktopInfoStripProps) => {
  return (
    <div className="hidden md:flex justify-between items-center container mx-auto px-4">
      {items.map((item, index) => (
        <div key={index} className="text-center text-sm px-4">
          {item}
        </div>
      ))}
    </div>
  );
};

export default DesktopInfoStrip;
