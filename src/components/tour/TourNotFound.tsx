
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TourNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Tour Not Found</h2>
          <p className="text-gray-500">The requested tour could not be found.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourNotFound;
