
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-transparent rounded-full"></div>
      <p className="mt-4 text-gray-600">Loading tour packages...</p>
    </div>
  );
};

export default LoadingState;
