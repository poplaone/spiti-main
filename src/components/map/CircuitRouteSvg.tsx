
import React from 'react';

const CircuitRouteSvg: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
      <path
        d="M200,300 Q300,100 400,300 T600,300"
        fill="none"
        stroke="#059669"
        strokeWidth="3"
        strokeDasharray="8,6"
      />
      <circle cx="200" cy="300" r="8" fill="#059669" />
      <circle cx="400" cy="300" r="8" fill="#059669" />
      <circle cx="600" cy="300" r="8" fill="#059669" />
      
      <text x="190" y="330" fill="#059669" fontSize="12" textAnchor="middle">Shimla</text>
      <text x="400" y="330" fill="#059669" fontSize="12" textAnchor="middle">Kaza</text>
      <text x="600" y="330" fill="#059669" fontSize="12" textAnchor="middle">Manali</text>
    </svg>
  );
};

export default CircuitRouteSvg;
