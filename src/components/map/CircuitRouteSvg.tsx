
import React from 'react';

const CircuitRouteSvg: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M200,100 C250,150 300,120 350,180 C400,240 450,260 500,220 C550,180 600,200 650,250"
          stroke="#FF5722"
          strokeWidth="4"
          strokeDasharray="8 4"
          strokeLinecap="round"
        />
        
        {/* Key locations */}
        <circle cx="200" cy="100" r="8" fill="#2C5282" />
        <circle cx="350" cy="180" r="8" fill="#2C5282" />
        <circle cx="500" cy="220" r="8" fill="#2C5282" />
        <circle cx="650" cy="250" r="8" fill="#2C5282" />
        
        {/* Location labels */}
        <text x="190" y="85" fill="#2C5282" fontWeight="bold" fontSize="12">Shimla</text>
        <text x="340" y="165" fill="#2C5282" fontWeight="bold" fontSize="12">Kalpa</text>
        <text x="490" y="205" fill="#2C5282" fontWeight="bold" fontSize="12">Kaza</text>
        <text x="640" y="235" fill="#2C5282" fontWeight="bold" fontSize="12">Manali</text>
      </svg>
    </div>
  );
};

export default CircuitRouteSvg;
