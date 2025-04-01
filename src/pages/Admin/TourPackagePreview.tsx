
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { tourPackagesData } from '@/data/tourPackagesData';

// Import components from tour detail page
import TourHero from '@/components/tour/TourHero';
import TourOverview from '@/components/tour/TourOverview';
import TourItinerary from '@/components/tour/TourItinerary';
import TourInclusions from '@/components/tour/TourInclusions';
import TourAccommodation from '@/components/tour/TourAccommodation';
import RelatedTours from '@/components/tour/RelatedTours';

const TourPackagePreview = () => {
  useAdminAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const packageIndex = id ? parseInt(id) : -1;
  const tourPackage = packageIndex >= 0 && packageIndex < tourPackagesData.length ? 
    tourPackagesData[packageIndex] : null;
    
  if (!tourPackage) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-red-600">Tour Package Not Found</h1>
        <p className="mt-4 text-xl">The requested tour package does not exist or has been removed.</p>
        <Button 
          className="mt-8"
          onClick={() => navigate('/admin/tour-packages')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Tour Packages
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Control Bar */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate('/admin/tour-packages')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              Preview Mode
            </div>
            <Button onClick={() => navigate(`/admin/tour-packages/${id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Package
            </Button>
          </div>
        </div>
      </div>

      {/* Regular Tour Detail Content */}
      <TourHero
        title={tourPackage.title}
        image={tourPackage.image}
        duration={tourPackage.duration}
        transportType={tourPackage.transportType}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <TourOverview overview={tourPackage.overview || ''} />
            <TourItinerary itinerary={tourPackage.itinerary || []} />
            <TourInclusions 
              inclusions={tourPackage.inclusions} 
              exclusions={tourPackage.exclusions || []} 
            />
          </div>
          
          <div className="md:col-span-4">
            <div className="space-y-6 sticky top-24">
              <div className="bg-white rounded-lg shadow-md p-6 border">
                <h2 className="text-xl font-semibold mb-4 text-spiti-forest">Package Pricing</h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Original Price:</span>
                  <span className="text-gray-500 line-through">₹{tourPackage.originalPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Discounted Price:</span>
                  <span className="text-2xl font-bold text-spiti-forest">₹{tourPackage.discountedPrice}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">You Save:</span>
                  <span className="text-green-600 font-medium">
                    ₹{tourPackage.originalPrice - tourPackage.discountedPrice} ({tourPackage.discount}%)
                  </span>
                </div>
              </div>
              
              <TourAccommodation nightStays={tourPackage.nightStays} />
            </div>
          </div>
        </div>
      </div>
      
      <RelatedTours currentTour={tourPackage} />
    </div>
  );
};

export default TourPackagePreview;
