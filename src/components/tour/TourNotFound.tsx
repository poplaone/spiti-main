
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Map, ArrowLeft } from 'lucide-react';
import { TourPackageProps } from '@/components/TourPackage';
import TourPackage from '@/components/TourPackage';

interface TourNotFoundProps {
  requestedId?: string;
  recommendedTours?: TourPackageProps[];
}

const TourNotFound: React.FC<TourNotFoundProps> = ({ 
  requestedId,
  recommendedTours = [] 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-md mb-8">
            <Search className="w-16 h-16 text-spiti-blue mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-700 mb-2">Tour Not Found</h2>
            <p className="text-lg text-gray-500 mb-4">
              Sorry, we couldn't find a tour matching "{requestedId || 'the requested URL'}"
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button asChild className="bg-spiti-forest hover:bg-spiti-forest/90">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Homepage
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-spiti-blue text-spiti-blue hover:bg-spiti-blue/10">
                <Link to="/road-trips">
                  <Map className="mr-2 h-4 w-4" />
                  Browse All Tours
                </Link>
              </Button>
            </div>
          </div>

          {recommendedTours.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-6">Recommended Tours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendedTours.map((tour, index) => (
                  <TourPackage key={index} {...tour} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourNotFound;
